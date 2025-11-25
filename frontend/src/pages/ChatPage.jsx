import { useAuthStore } from "../store/useAuthStore";


function ChatPage() {

    const {logout} = useAuthStore();

    return (
        <div className="text-white z-10">
            Chat Page
            <button onClick={logout} >Logout</button>
        </div>
    );
}

export default ChatPage;