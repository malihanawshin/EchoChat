import { generateToken } from '../lib/utils.js';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import { sendWelcomeEmail } from '../emails/emailHandlers.js';
import { ENV } from '../lib/env.js';

export const signup = async (req, res) => {
    //res.send('Signup endpoint');
    const {fullName, email, password} = req.body

    try{
        if(!fullName || !email || !password){
            return res.status(400).json({message: "All fields required"})
        }

        if(password.length < 6){
            return res.status(400).json({message: "Password must be atleast 6 characters"})
        }

        // check if email valid
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Invalid email format" });
        }

        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({message: "Email already registered"})
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new User({
            fullName,
            email,
            password: hashedPassword
        });

        if(newUser){
            // generateToken(newUser._id, res);
            // await newUser.save();
            const savedUser = await newUser.save();
            generateToken(savedUser._id, res);

            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
                profilePic: newUser.profilePic,
            });

            try{
                await sendWelcomeEmail(savedUser.email, savedUser.fullName, ENV.CLIENT_URL);
            }catch(err){
                console.log("Error sending welcome email: ", err);
            }

        } else{
            res.status(400).json({message: "Invalid user data"});
        }
    } 
    catch (error) {
        console.log("Error in signup controller ", error);
        res.status(500).json({message: "Server error"});
    }
}
