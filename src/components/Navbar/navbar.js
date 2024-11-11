import React, { useState } from "react";
import {
  FaBars,
  FaTimes,
  FaUser,
  FaList,
  FaShapes,
  FaBuilding,
  FaChartBar,
  FaChartLine,
  FaClipboardList,
  FaUsers
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const navigateClient = () => {
    navigate("/addclient");
  };

  // const handleLineItemsClick = () => {
  //   navigate("/viewlineitems");
  // };

  const handleFormatClick = () => {
    navigate("/viewformat");
  };

  const handlePublishersClick = () => {
    navigate("/viewpublisher");
  };

  const handleChannelsClick = () => {
    navigate("/viewchannels");
  };

  const handlePlacementClick = () => {
    navigate("/viewplacements");
  }

  const handleMediaPlanClick = () => {
    navigate("/");
  };

  const handleUserClick = () => {
    navigate("/userManagement");
  };

  return (
    <nav className="bg-gradient-to-r from-blue-900 via-blue-700 to-blue-800 shadow-lg">
      <div className="container mx-auto px-4 py-2 flex justify-between items-center">
        <div className="text-white text-lg font-bold tracking-wide">
          <button
            onClick={handleMediaPlanClick}
            className="flex items-center text-white hover:text-blue-300 transition-all duration-200 tracking-wide text-base"
          >
            <FaClipboardList className="mr-2" />
            Media Plans
          </button>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8">
          {/* <button
            onClick={handleLineItemsClick}
            className="flex items-center text-white hover:text-blue-300 transition-all duration-200 tracking-wide text-base"
          >
            <FaList className="mr-2" />
            Line Items
          </button> */}
          <button
            onClick={handleFormatClick}
            className="flex items-center text-white hover:text-blue-300 transition-all duration-200 tracking-wide text-base"
          >
            <FaShapes className="mr-2" />
            Format
          </button>
          <button
            onClick={navigateClient}
            className="flex items-center text-white hover:text-blue-300 transition-all duration-200 tracking-wide text-base"
          >
            <FaUser className="mr-2" />
            Client & Brand
          </button>
          <button
            onClick={handlePublishersClick}
            className="flex items-center text-white hover:text-blue-300 transition-all duration-200 tracking-wide text-base"
          >
            <FaBuilding className="mr-2" />
            Publishers
          </button>
          <button
            onClick={handleChannelsClick}
            className="flex items-center text-white hover:text-blue-300 transition-all duration-200 tracking-wide text-base"
          >
            <FaChartBar className="mr-2" />
            Channels
          </button>
          <button
            onClick={handlePlacementClick}
            className="flex items-center text-white hover:text-blue-300 transition-all duration-200 tracking-wide text-base"
          >
            <FaChartLine className="mr-2" />
            Placements
          </button>
          <button
            onClick={handleUserClick}
            className="flex items-center text-white hover:text-blue-300 transition-all duration-200 tracking-wide text-base"
          >
            <FaUsers className="mr-2" />
            User Management
          </button>
        </div>

        {/* Mobile Menu Icon */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white hover:text-blue-300 focus:outline-none"
          >
            {isOpen ? (
              <FaTimes className="w-6 h-6 transition-transform transform hover:rotate-180" />
            ) : (
              <FaBars className="w-6 h-6 transition-transform transform hover:rotate-90" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-blue-700 shadow-inner space-y-4 p-4 text-center">
          {/* <button
            onClick={handleLineItemsClick}
            className="flex items-center justify-center text-white hover:text-blue-300 transition-all duration-200 tracking-wide text-base py-1"
          >
            <FaList className="mr-2" />
            Line Items
          </button> */}
          <button
            onClick={handleFormatClick}
            className="flex items-center justify-center text-white hover:text-blue-300 transition-all duration-200 tracking-wide text-base py-1"
          >
            <FaShapes className="mr-2" />
            Format
          </button>
          <button
            onClick={navigateClient}
            className="flex items-center justify-center text-white hover:text-blue-300 transition-all duration-200 tracking-wide text-base py-1"
          >
            <FaUser className="mr-2" />
            Client & Brand
          </button>
          <button
            onClick={handlePublishersClick}
            className="flex items-center justify-center text-white hover:text-blue-300 transition-all duration-200 tracking-wide text-base py-1"
          >
            <FaBuilding className="mr-2" />
            Publishers
          </button>
          <button
            onClick={handleChannelsClick}
            className="flex items-center justify-center text-white hover:text-blue-300 transition-all duration-200 tracking-wide text-base py-1"
          >
            <FaChartBar className="mr-2" />
            Channels
          </button>
          <button
            onClick={handlePlacementClick}
            className="flex items-center justify-center text-white hover:text-blue-300 transition-all duration-200 tracking-wide text-base py-1"
          >
            <FaChartLine className="mr-2" />
            Placements
          </button>
          <button
            onClick={handleUserClick}
            className="flex items-center justify-center text-white hover:text-blue-300 transition-all duration-200 tracking-wide text-base py-1"
          >
            <FaUsers className="mr-2" />
            User Management
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
