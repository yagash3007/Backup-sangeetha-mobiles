import React, { useState, useEffect } from "react";
import SpeechRecognitionHandler from "./SpeechRecognitionHandler";
import ProductCards from "./ProductCards";
import { mobile_data } from "../helpers/data";
import AlertSnackbar from "./AlertSnackbar";
import alasql from "alasql";
import { ToastContainer } from "react-toastify"; // Import ToastContainer
import "react-toastify/dist/ReactToastify.css"; // Import CSS for Toastify

const HomePage = () => {
  const [filteredData, setFilteredData] = useState([]);
  const [recommendedData, setRecommendedData] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [status, setStatus] = useState("idle");
  const [isSpeechProcessed, setIsSpeechProcessed] = useState(false); // State to track if speech recognition is processed
  const [noResultsMessage, setNoResultsMessage] = useState(""); // State to track "Currently not available" message

  // Initialize mobile data in alasql
  useEffect(() => {
    try {
      alasql(
        "CREATE TABLE IF NOT EXISTS mobile_data (brand STRING, ram INT, screen_size INT, storage INT, battery INT, camera INT, price INT, product_name STRING, product_img STRING)"
      );
      alasql("DELETE FROM mobile_data");

      mobile_data.forEach((item) => {
        alasql("INSERT INTO mobile_data VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)", [
          item.brand,
          item.ram,
          item.screen_size,
          item.storage,
          item.battery,
          item.camera,
          item.Price,
          item.product_name,
          item.product_img,
        ]);
      });
    } catch (error) {
      console.error("Error initializing database:", error);
      setSnackbarMessage("Error initializing database. Please refresh the page.");
      setOpenSnackbar(true);
    }
  }, []);

  // When speech recognition is processed, update the state
  const handleSpeechProcessed = () => {
    setIsSpeechProcessed(true);
  };

  // Handle case when no results are found for the query
  const handleNoResults = () => {
    setNoResultsMessage("Currently not available");
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      <div className="grid grid-cols-4 w-full max-w-7xl">
        <SpeechRecognitionHandler
          setFilteredData={setFilteredData}
          setRecommendedData={setRecommendedData}
          setSnackbarMessage={setSnackbarMessage}
          setOpenSnackbar={setOpenSnackbar}
          status={status}
          setStatus={setStatus}
          onSpeechProcessed={handleSpeechProcessed} // Pass a callback for when speech is processed
          onNoResults={handleNoResults} // Pass a callback to handle no results
        />
        <div className="col-span-3 bg-gray-50 items-center">
          {/* Product Matches Section */}
          {isSpeechProcessed ? (
            <>
              {filteredData.length > 0 ? (
                <>
                  <h2 className="text-xl font-semibold mb-4">Product Matches</h2>
                  <ProductCards data={filteredData.slice(0, 3)} />
                </>
              ) : (
                <p>{noResultsMessage}</p>
              )}
            </>
          ) : (
            <p></p>
          )}

          {/* Recommended Products Section */}
          {isSpeechProcessed ? (
            <>
              {recommendedData.length > 0 ? (
                <>
                  <h2 className="text-xl font-semibold mt-8 mb-4">Recommended Products</h2>
                  <ProductCards data={recommendedData.slice(0, 3)} />
                </>
              ) : (
                <p>{}</p>
              )}
            </>
          ) : (
            <p></p>
          )}
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};

export default HomePage;
