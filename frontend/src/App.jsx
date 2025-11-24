import { Routes, Route } from 'react-router';
import LoginPage from './pages/LoginPage.jsx';
import SignUpPage from './pages/SignUpPage.jsx';
import ChatPage from './pages/ChatPage.jsx'; 
import { useAuthStore } from './store/useAuthStore.js';

function App() {

  const {authUser, login, isLoggedIn} = useAuthStore();
  console.log("Auth User: ", authUser, " Is Logged: ", isLoggedIn);

  return (

    <div className="min-h-screen bg-slate-900 relative flex items-center justify-center p-4 overflow-hidden">
      
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]" />
      <div className="absolute top-0 -left-4 size-96 bg-pink-500 opacity-20 blur-[100px]" />
      <div className="absolute bottom-0 -right-4 size-96 bg-cyan-500 opacity-20 blur-[100px]" />

      <button onClick={login} className="absolute top-4 right-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
        Simulate Login
      </button>
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/chat" element={<ChatPage />} />
    </Routes>   
    </div>

  );
}

export default App;