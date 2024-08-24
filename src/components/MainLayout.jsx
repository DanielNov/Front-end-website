import Navbar from "./Navbar.jsx";
import PropTypes from "prop-types";

export default function MainLayout({ children }) {
    return (
        <main>
            <div className="fixed top-0 left-0 w-full h-full bg-neutral-950 z-[-1]"></div>
            <div className="relative min-h-screen">
                <div className="mx-auto px-10">
                    <Navbar/>
                    {children}
                </div>
            </div>
        </main>
    );
}

MainLayout.propTypes = {
    children: PropTypes.node.isRequired,
};