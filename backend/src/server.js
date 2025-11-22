import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.route.js';
import path from 'path';
import { connect_DB } from './lib/db.js';

dotenv.config();

const app = express();
const __dirname = path.resolve();
const port = process.env.PORT || 3000;

console.log(`PORT: ${process.env.PORT}`);

app.use(express.json());

app.use("/api/auth",authRoutes);

//ready for production
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../frontend/dist')));
    
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
    });
}

app.listen(port, () =>  {console.log(`Server is running on http://localhost:${port}`);
    connect_DB(process.env.MONGO_URL);
});
