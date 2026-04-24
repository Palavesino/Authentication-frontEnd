import { lazy, Suspense } from "react";
import { Route } from "react-router-dom";
import RoutesWithNotFound from "../../pages/404/routes-with-not-found";
import { useAuth } from "../../contexts/auth-context";
import { RouteAccessRole } from "./route-access-rol";
import { Rol } from "../../enum/rol";
import PageLoader from "../../pages/Loader/loader";

const Home = lazy(() => import("../../pages/home/home"));
const Login = lazy(() => import("../../pages/login/login"));
const Register = lazy(() => import("../../pages/register/register"));
const Profile = lazy(() => import("../../pages/profile/profile"));
const Users = lazy(() => import("../../pages/admin/users"));
const Unauthorized = lazy(() => import("../../pages/401/401"));
const NotFound = lazy(() => import("../../pages/404/404"));


const Router = () => {
    const { user } = useAuth();

    return (
        <Suspense fallback={<PageLoader />}>
            <RoutesWithNotFound>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/profile" element={
                    <RouteAccessRole
                        isRolPermited={user?.rol === Rol.USER || user?.rol === Rol.ADMIN}>
                        <Profile />
                    </RouteAccessRole>
                } />
                <Route path="/users" element={
                    <RouteAccessRole
                        isRolPermited={user?.rol === Rol.ADMIN}>
                        <Users />
                    </RouteAccessRole>
                } />
                <Route path="/401" element={<Unauthorized />} />
                <Route path="/404" element={<NotFound />} />
            </RoutesWithNotFound>
        </Suspense>
    );
};

export default Router;