import { useNavigate } from "react-router-dom";

const Topbar = () => {
    const navigate = useNavigate();
    const relativeURL = window.location.pathname;

    return (
        <div className="dashboard-topbar">
            <div
                className="pointer"
                onClick={() => {
                    navigate("/dashboard");
                }}
            >
                {relativeURL}
            </div>
        </div>
    );
};

export default Topbar;
