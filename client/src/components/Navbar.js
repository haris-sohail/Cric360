import React, { useState, useEffect } from "react";
import Logo from "../system/assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import "../css/Navbar.css";

function Navbar({ username }) {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 600); // Adjust the threshold according to your design needs
    };

    // Call handleResize initially and add event listener for window resize
    handleResize();
    window.addEventListener("resize", handleResize);

    // Cleanup function to remove event listener
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleLogoClick = () => {
    navigate("/home", { state: { username } });
  };

  const handleTeamsClick = () => {
    navigate("/teams", { state: { username } });
  };

  const handleMatchesClick = () => {
    navigate("/matches", { state: { username } });
  };

  const handleStatsClick = () => {
    navigate('/stats', { state: { username } })
  }

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="Overall-Nav">
      <div className="sidebar-menu">
        {isMobile && (
          <>
            <div className={isSidebarOpen ? "sidebar show" : "sidebar"}>
              <ul>
                <li>
                  <a href="" onClick={handleLogoClick}>
                    <button>Home</button>
                  </a>
                </li>
                <li>
                  <a href="" onClick={handleStatsClick}>
                    <button>Stats</button>
                  </a>
                </li>

                <li>
                  <a href="" onClick={handleTeamsClick}>
                    <button>Teams</button>
                  </a>
                </li>

                <li>
                  <a href="" onClick={handleMatchesClick}>
                    <button>Matches</button>
                  </a>
                </li>
              </ul>
            </div>
            <button className="toggle-btn" onClick={toggleSidebar}>
              &#9776;
            </button>
          </>
        )}
      </div>
      <div className="navbar">
        <a onClick={handleLogoClick} id="logo-link">
          <img src={Logo} alt="logo" />
        </a>

        <div className="btns-container">
          <a onClick={handleMatchesClick}>
            <button>
              <h6>Matches</h6>
            </button>
          </a>

          <a onClick={handleStatsClick}>
            <button>
              <h6>Stats</h6>
            </button>
          </a>
          <a onClick={handleTeamsClick}>
            <button>
              <h6>Teams</h6>
            </button>
          </a>
        </div>
      </div>
    </div>
  );
}

export default Navbar;