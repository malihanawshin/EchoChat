## EchoChat

**EchoChat** is a modern real-time messaging web app for fast and seamless communication. Built with React for the frontend and Node.js/Express/Socket.IO for the backend, it allows users to create accounts, login securely, and exchange messages instantly. MongoDB handles data storage, and the app features a responsive design for desktop and mobile. Check out the app: https://echochat-jdwys.sevalla.app/signup.

### Features
- **User Authentication:** Secure signup, login, and JWT protection.
- **Responsive UI:** Built with React and modern CSS for a great experience on any device.
- **User Profiles:** Basic profile management.
- **Real-time Messaging:** Instant message exchange powered by Socket.IO.
- **Online Status:** See which users are active in real time.
- **Media Sharing:** Support for image/file uploads (extendable).
- **Cloud-ready:** Easily deployable to popular cloud hosting solutions.

## Screenshots
<img width="500" height="400" alt="Screenshot 2025-11-28 at 6 14 07 PM" src="https://github.com/user-attachments/assets/c2d701ca-9d63-482b-9f5b-466eb24abfdd" />
<img width="500" height="400" alt="Screenshot 2025-11-28 at 6 13 54 PM" src="https://github.com/user-attachments/assets/19e60151-9e62-4dfa-b30c-ecce6b5d1a63" />
<img width="500" height="400" alt="Screenshot 2025-11-28 at 6 13 37 PM" src="https://github.com/user-attachments/assets/6e1ed022-bd06-464f-961b-77b34c39b415" />
<img width="500" height="409" alt="Screenshot 2025-11-28 at 6 19 51 PM" src="https://github.com/user-attachments/assets/b9491030-09fa-4625-91fa-f99b1947ce91" />


## Getting Started

### Prerequisites

- Node.js >= 20
- MongoDB (local or Atlas)
- npm (or yarn)

### Installation

1. **Clone the repo:**
   ```sh
   git clone https://github.com/malihanawshin/EchoChat.git
   cd EchoChat
   ```

2. **Install dependencies:**
   - Backend:
     ```sh
     cd backend
     npm install
     ```
   - Frontend:
     ```sh
     cd ../frontend
     npm install
     ```

3. **Configuration:**
   - Backend: Create a `.env` file in the `backend` directory and add:
     ```
     MONGODB_URI=<your_mongodb_uri>
     JWT_SECRET=<your_jwt_secret>
     ```
   - Frontend: Update API endpoints in the code if needed.

4. **Run the app:**
   - **Backend:**
     ```sh
     npm run dev
     ```
   - **Frontend:**
     ```sh
     npm run dev
     ```

   Visit `http://localhost:5173` to use EchoChat.

### Project Structure

```
EchoChat/
├── backend/   # Node.js/Express API + Socket.IO
├── frontend/  # React client
```

### Deployment

Being deployed on Sevalla.

## License

This project is licensed under the MIT License.
