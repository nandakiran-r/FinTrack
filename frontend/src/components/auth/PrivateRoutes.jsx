import { useEffect, useState } from "react";
import { useNavigate, Outlet, Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";

const UserRoutes = () => {
    const [IsLoggedIn, setIsLoggedIn] = useState("unknown");
    var navigate = useNavigate();
    useEffect(() => {
        const token = localStorage.getItem("token");
        try {
            if (token) {
                const user = jwtDecode(token);
                if (user) {
                    if (Date.now() >= user.exp * 1000) {
                        localStorage.removeItem("token");
                        toast.warning("User Expired");
                        navigate("/login");
                        setIsLoggedIn(false);
                    } else {
                        setIsLoggedIn(true);
                    }
                } else {
                    localStorage.removeItem("token");
                    navigate("/login");
                    setIsLoggedIn(false);
                }
            } else {
                setIsLoggedIn(false);
            }
        } catch (e) {
            localStorage.removeItem("token");
            navigate("/login");
            setIsLoggedIn(false);
        }
    }, [navigate]);

    if (IsLoggedIn === false) {
        return <Navigate to="/login"></Navigate>;
    } else if (IsLoggedIn === true) {
        return <Outlet />;
    } else {
        return <div></div>;
    }
};

export { UserRoutes };
