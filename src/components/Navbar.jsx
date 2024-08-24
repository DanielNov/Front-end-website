import {useState} from "react";
import LoginModal from "./LoginModal.jsx";
import RegisterModal from "./RegisterModal.jsx";

export default function Navbar() {
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

    return (
        <>
            <nav className="mb-10 flex items-center justify-between py-6 text-white font-custom">
                <div className="flex flex-shrink-0 items-center">
                    <h1 className="text-2xl font-bold">ZenBlog</h1>
                </div>
                <div className="flex gap-4">
                    <button className="hover:text-gray-500" onClick={() => setIsLoginModalOpen(true)}>Login</button>
                    <button className="hover:text-gray-500" onClick={() => setIsRegisterModalOpen(true)}>Register</button>
                </div>
            </nav>
            <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
            <RegisterModal isOpen={isRegisterModalOpen} onClose={() => setIsRegisterModalOpen(false)} />
        </>
    );
}