import {useEffect, useState} from "react";
import LoginModal from "./LoginModal.jsx";
import RegisterModal from "./RegisterModal.jsx";

export default function Navbar() {
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
    const [isLoggedin, setIsLoggedin] = useState(false);

    useEffect(() => {
        fetch("http://localhost:3010/user", {
            method: "GET",
            credentials: 'include'
        })
        .then(res => {
            if (res.ok) {
                return res.json();
            } else {
                throw new Error("Not logged in");
            }
        })
        .then(data => {
            if (data.isLoggedIn) {
                setIsLoggedin(true);
            } else {
                setIsLoggedin(false);
            }
        })
            .catch(err => {
                console.error("Error checking login status:", err);
                setIsLoggedin(false);
            });
    }, []);



    const handleLogout = () => {
        fetch("http://localhost:3010/logout", {
            method: "POST",
            credentials: 'include'
        })
        .then(res => {
            if (res.ok) {
                setIsLoggedin(false);
            }
        });
    };

    return (
        <>
            <nav className="mb-10 flex items-center justify-between py-6 text-white font-custom">
                <div className="flex flex-shrink-0 items-center">
                    <h1 className="text-2xl font-bold">ZenBlog</h1>
                </div>
                <div className="flex gap-4">
                    {isLoggedin ? (
                        <>
                            <button className="hover:text-gray-500" onClick={handleLogout}>Log out</button>
                            <button className="hover:text-gray-500">Create a new post</button>
                        </>
                    ) : (
                        <>
                            <button className="hover:text-gray-500" onClick={() => setIsLoginModalOpen(true)}>Log in</button>
                            <button className="hover:text-gray-500" onClick={() => setIsRegisterModalOpen(true)}>Sign up</button>
                        </>
                    )}
                </div>
            </nav>
            <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)}/>
            <RegisterModal isOpen={isRegisterModalOpen} onClose={() => setIsRegisterModalOpen(false)} />
        </>
    );
}