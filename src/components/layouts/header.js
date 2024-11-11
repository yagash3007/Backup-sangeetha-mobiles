import { UserContext } from "src/context/currenUserContext";
import DomoApi from "../../helpers/DomoAPI";
import React, { useContext, useEffect, useState } from "react";
import { FaExpand, FaCompress } from "react-icons/fa";

const Header = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const handleFullScreenChange = () => {
    setIsFullscreen(!!document.fullscreenElement);
  };

  useEffect(() => {
   setCurrentUser("GWC Owner")

    document.addEventListener("fullscreenchange", handleFullScreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullScreenChange);
    };
  }, []);

  return (
    <header className="bg-[#24272A] text-[#F0EFF2]">
      <div className="container mx-auto flex justify-between items-center h-15 px-4 py-2">
        <div className="flex items-center">
          <img
            src="https://www.sangeethamobiles.com/_next/static/media/sangeethaLogo.03f773c0.svg"
            alt="Trellis Logo"
            className="h-8 w-auto"
          />
        </div>

        <div className="text-center">
          <h1 className="text-2xl font-semibold text-[#0b73b7]">
            Sangeetha
          </h1>
          <p className="text-sm text-[#ea8827]">
           Mobile phone & Accessories
          </p>
        </div>

        <div className="flex items-center space-x-6">
          <button
            onClick={toggleFullScreen}
            className="text-[#F0EFF2] hover:text-[#0CE5A7] transition-all duration-200"
          >
            {isFullscreen ? (
              <FaCompress className="h-6 w-6" />
            ) : (
              <FaExpand className="h-6 w-6" />
            )}
          </button>

          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-[#0CE5A7] flex items-center justify-center text-[#24272A] text-sm font-bold">
              {currentUser[0]?.toUpperCase()}
            </div>
            <span className="text-[#F0EFF2] font-medium">{currentUser}</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
