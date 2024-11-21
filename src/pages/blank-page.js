import React, { useState, useEffect } from "react";
import SpeechRecognitionHandler from "./SpeechRecognitionHandler";
import ProductCards from "./ProductCards";
import { mobile_data } from "../helpers/data"; 
import AlertSnackbar from "./AlertSnackbar";
import alasql from "alasql";
import { ToastContainer } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css"; 
import { headphones } from "../helpers/headphones"; 
import { laptop_data } from "../helpers/laptop"; 
import { smartwatch_data } from "../helpers/smartwatch"; 

const HomePage = () => {
  const [filteredData, setFilteredData] = useState([]);
  const [recommendedData, setRecommendedData] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [status, setStatus] = useState("idle");
  const [isSpeechProcessed, setIsSpeechProcessed] = useState(false); 
  const [noResultsMessage, setNoResultsMessage] = useState("");

  useEffect(() => {
    try {
      // Log the data to check if it's correctly imported
      console.log("Mobile Data:", mobile_data);
      console.log("Headphones Data:", headphones);
      console.log("Laptop Data:", laptop_data);
      console.log("Smartwatch Data:", smartwatch_data);
  
      // Initialize tables
      alasql(
        "CREATE TABLE IF NOT EXISTS mobile_data (brand STRING, ram INT, screen_size INT, storage INT, battery INT, camera INT, price INT, product_name STRING, product_img STRING, description STRING, operating_system STRING, processor STRING)"
      );
      alasql(
        "CREATE TABLE IF NOT EXISTS headphone_data (product_img STRING, product_name STRING, price INT, brand STRING, description STRING ,battery INT,connectivity STRING)"
      );
      alasql(
        "CREATE TABLE IF NOT EXISTS laptop_data (brand STRING, ram INT, price INT, product_name STRING, product_img STRING, description STRING, battery INT, storage INT, screen_size INT,operating_system STRING, processor STRING)"
      );
      alasql(
        "CREATE TABLE IF NOT EXISTS smartwatch_data (product_img STRING, product_name STRING, price INT, brand STRING, description STRING ,battery INT,connectivity STRING )"
      );
  
      // Clear existing data
      alasql("DELETE FROM mobile_data");
      alasql("DELETE FROM headphone_data");
      alasql("DELETE FROM laptop_data");
      alasql("DELETE FROM smartwatch_data");
  
      // Insert data with safeguards
      if (mobile_data && mobile_data.length > 0) {
        mobile_data.forEach((item) => {
          alasql("INSERT INTO mobile_data VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?,?)", [
            item.brand || "",
            item.ram || 0,
            item.screen_size || 0,
            item.storage || 0,
            item.battery || 0,
            item.camera || 0,
            item.Price || 0,
            item.product_name || "",
            item.product_img || "",
            item.description || "",
            item.operating_system || "",
            item.processor || "",
          ]);
        });
      }
  
      if (headphones && headphones.length > 0) {
        headphones.forEach((item) => {
          alasql("INSERT INTO headphone_data VALUES (?, ?, ?, ?, ?,?,?)", [
            item.product_img || "",
            item.product_name || "",
            item.price || 0,
            item.brand || "",
            item.description || "",
            item.battery || 0,
            item.connectivity || "",
          ]);
        });
      }
  
      if (laptop_data && laptop_data.length > 0) {
        laptop_data.forEach((item) => {
          alasql("INSERT INTO laptop_data VALUES (?, ?, ?, ?, ?, ?, ?, ?,?,?,?)", [
            item.brand || "",
            item.ram || 0,
            item.Price || 0,
            item.product_name || "",
            item.product_img || "",
            item.description || "",
            item.battery || 0,
            item.storage || 0,
            item.screen_size || 0,
            item.operating_system || "",
            item.processor || "",
          ]);
        });
      }
  
      if (smartwatch_data && smartwatch_data.length > 0) {
        smartwatch_data.forEach((item) => {
          alasql("INSERT INTO smartwatch_data VALUES (?, ?, ?, ?, ?,?,?)", [
            item.product_img || "",
            item.product_name || "",
            item.Price || 0,
            item.brand || "",
            item.description || "",
            item.battery || 0,
            item.connectivity || "",
            
          ]);
        });
      }
    } catch (error) {
      console.error("Error initializing database:", error);
      setSnackbarMessage("Error initializing database. Please refresh the page.");
      setOpenSnackbar(true);
    }
  }, []);
  
  

  const handleSpeechProcessed = () => {
    setIsSpeechProcessed(true);
  };

  const handleNoResults = () => {
    setNoResultsMessage(filteredData.length === 0 ? "No products found" : "Currently not available");
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
          onSpeechProcessed={handleSpeechProcessed} 
          onNoResults={handleNoResults}
        />
        <div className="col-span-3 bg-gray-50 items-center">
          {isSpeechProcessed && filteredData.length > 0 ? (
            <>
              <h2 className="text-xl font-semibold mb-4">Product Matches</h2>
              <ProductCards data={filteredData.slice(0, 3)} />
            </>
          ) : isSpeechProcessed ? (
            <p>{noResultsMessage}</p>
          ) : null}

          {isSpeechProcessed && recommendedData.length > 0 ? (
            <>
              <h2 className="text-xl font-semibold mt-8 mb-4">Recommended Products</h2>
              <ProductCards data={recommendedData.slice(0, 3)} />
            </>
          ) : isSpeechProcessed ? (
            <p>No recommendations available at the moment</p>
          ) : null}
        </div>
      </div>

      {openSnackbar && (
        <AlertSnackbar message={snackbarMessage} onClose={() => setOpenSnackbar(false)} />
      )}

      <ToastContainer />
    </div>
  );
};

export default HomePage;
