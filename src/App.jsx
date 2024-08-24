import Hero from "./components/Hero";
import Post from "./components/Post";
import {Route, Routes} from "react-router-dom";
import MainLayout from "./components/MainLayout.jsx";

export default function App() {
    return (
        <Routes>
            <Route index element={
                <MainLayout >
                    <Hero/>
                    <Post/>
                </MainLayout>
            } />
        </Routes>
    );
}