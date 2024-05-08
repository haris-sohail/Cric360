import React, { useState } from "react";
import Logo from "../system/assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import "../css/Navbar.css";

function Navbar({ username }) {
    const navigate = useNavigate();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const handleLogoClick = () => {
        navigate("/home", { state: { username } });
    };

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <>
            <div className="Overall-Nav">
                <div className="navbar">
                    <a onClick={handleLogoClick} id="logo-link">
                        <img src={Logo} alt="logo" />
                    </a>

                    <div className="btns-container">
                        <ul>
                            <li>
                                <Link>
                                    <button>
                                        <h6>Matches</h6>
                                    </button>
                                </Link>
                            </li>
                        </ul>
                        <ul>
                            <li>
                                <Link>
                                    <button>
                                        <h6>Stats</h6>
                                    </button>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Sidebar */}
                <div className={isSidebarOpen ? "sidebar show" : "sidebar"}>
                    <ul>
                        <li>
                            <a href="#">Home</a>
                        </li>
                        <li>
                            <a href="#">About</a>
                        </li>
                        <li>
                            <a href="#">Services </a>
                        </li>
                        <li>
                            <a href="#">Contact</a>
                        </li>
                    </ul>
                </div>

                {/* Toggle button */}
                <button className="toggle-btn" onClick={toggleSidebar}>
                    &#9776;
                </button>
            </div>
        </>
    );
}

export default Navbar;