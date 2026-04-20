// components/route/route.tsx
import { Suspense } from "react";
import { Routes, Route } from "react-router-dom"; 
import { useAuth } from "../../contexts/auth-context";
import { Home } from "../../pages/home/home";
import { Login } from "../../pages/login/login";
import Register from "../../pages/register/register";

const Router = () => {
    const { user } = useAuth();

    return (
        <Suspense fallback={<h1>Loading...</h1>}>
            <Routes>  
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Routes>
        </Suspense>
    );
};

export default Router;