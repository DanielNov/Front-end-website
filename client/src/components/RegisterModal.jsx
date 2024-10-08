import PropTypes from "prop-types";
import {useState} from "react";

export default function RegisterModal({ isOpen, onClose }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function register(e) {
        e.preventDefault();
        fetch("http://localhost:3010/register", {
            method: "POST",
            body: JSON.stringify({email, password}),
            headers: {'Content-Type': 'application/json'},
        })
    }

    if (!isOpen) return null;


    return (
        <div
            onClick={onClose}
            className="fixed grid place-items-center backdrop-blur-sm top-0 right-0 left-0 z-50 w-full inset-0 h-modal h-full justify-center items-center">
            <div
                onClick={(e) => e.stopPropagation()}
                className="relative container m-auto px-6">
                <div className="m-auto md:w-7/12">
                    <div className="rounded-xl bg-white dark:bg-black shadow-xl">
                        <div className="p-8">
                            <button onClick={onClose}
                                    type="button"
                                    className="p-0.5 inline-flex items-center justify-center text-white hover:text-gray-500 focus:outline-none">
                                <span className="sr-only">Close menu</span>
                                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none"
                                     viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                          d="M6 18L18 6M6 6l12 12"/>
                                </svg>
                            </button>
                            <div className="space-y-4 flex text-center flex-col">
                                <h2 className=" text-2xl text-cyan-900 dark:text-white font-bold">Join the ZenBlog.
                                </h2>
                            </div>
                            <div className="mt-10 grid space-y-4">
                                <button
                                    className="group h-12 px-6 border-2 border-gray-300 rounded-full transition duration-300 hover:border-blue-400 focus:bg-transparent active:bg-transparent">
                                    <div className="relative flex items-center space-x-4 justify-center">
                                        <img src="https://www.svgrepo.com/show/475656/google-color.svg"
                                             className="absolute left-0 w-5" alt="google logo"/>
                                        <span
                                            className="block w-max font-semibold tracking-wide text-gray-700 dark:text-white text-sm transition duration-300 group-hover:text-blue-600 sm:text-base">Sign up
                                        with Google
                                    </span>
                                    </div>
                                </button>
                            </div>

                            <div className="flex w-full items-center gap-2 py-6 text-sm text-white">
                                <div className="h-px w-full bg-slate-200"></div>
                                Or
                                <div className="h-px w-full bg-slate-200"></div>
                            </div>

                            <form className="space-y-4 md:space-y-6" onSubmit={register}>
                                <div>
                                    <label htmlFor="email"
                                           className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your
                                            email</label>
                                    <input type="email"
                                           className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                           placeholder="name@example.com"
                                           value={email}
                                           onChange={(e) => setEmail(e.target.value)}/>
                                </div>
                                <div>
                                    <label htmlFor="password"
                                           className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                    <input type="password"  placeholder="••••••••"
                                           className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                           value={password}
                                           onChange={(e) => setPassword(e.target.value)}/>

                                </div>
                                <div>
                                    <label htmlFor="confirm-password"
                                           className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm
                                        password</label>
                                    <input type="password"
                                           placeholder="••••••••"
                                           className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                           />
                                </div>
                                <button type="submit"
                                        className="w-full text-black bg-white hover:bg-gray-400 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign up
                                </button>
                                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                    Already have an account? <a href="#" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Log in
                                    here</a>
                                </p>
                            </form>

                            <div className="mt-5 space-y-4 py-3 text-gray-600 dark:text-gray-400 text-center">
                                <p className="text-xs">By proceeding, you agree to our
                                    <a href="#" className="underline">Terms of Use</a>
                                    and confirm you have read our
                                    <a href="#" className="underline">Privacy and Cookie Statement</a>.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

RegisterModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose:
    PropTypes.func.isRequired,
};