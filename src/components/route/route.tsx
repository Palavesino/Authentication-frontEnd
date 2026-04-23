// components/route/route.tsx
import { Suspense } from "react";
import { Routes, Route } from "react-router-dom"; 
import { Home } from "../../pages/home/home";
import { Login } from "../../pages/login/login";
import Register from "../../pages/register/register";
import { HomeAux } from "../../pages/home/homeAux";
import Profile from "../../pages/profile/profile";

const Router = () => {

    return (
        <Suspense fallback={<h1>Loading...</h1>}>
            <Routes>  
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/aux" element={<HomeAux />} />
            </Routes>
        </Suspense>
    );
};

export default Router;