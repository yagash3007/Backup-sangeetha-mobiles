import React, { useState, useEffect } from "react";
import SpeechRecognitionHandler from "./SpeechRecognitionHandler";
import ProductCards from "./ProductCards";
import { mobile_data } from "../helpers/data";
import AlertSnackbar from "./AlertSnackbar";
import alasql from "alasql";
import { ToastContainer } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css"; 
import { headphones } from "../helpers/headphones";

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
      alasql(
        "CREATE TABLE IF NOT EXISTS mobile_data (brand STRING, ram INT, screen_size INT, storage INT, battery INT, camera INT, price INT, product_name STRING, product_img STRING)"
      );
      alasql(
        "CREATE TABLE IF NOT EXISTS headphone_data (product_img STRING, product_name STRING, price INT, brand STRING)"
      );
      alasql("DELETE FROM mobile_data");
      alasql("DELETE FROM headphone_data");
  
     
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
      const allmobiledata = alasql("SELECT * FROM mobile_data");
      console.log('allmobiledata',allmobiledata);
      
  
      
      headphones.forEach((item) => {
       
        alasql("INSERT INTO headphone_data VALUES (?, ?, ?, ?)", [
          item.product_img,
          item.product_name,
          item.price,
          item.brand
        ]);
      });
  
    
      const allHeadphones = alasql("SELECT * FROM headphone_data");
      console.log("All Headphones Data:", allHeadphones); 
  
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
          onSpeechProcessed={handleSpeechProcessed} 
          onNoResults={handleNoResults}
        />
        <div className="col-span-3 bg-gray-50 items-center">
          
          {isSpeechProcessed ? (
            <>
              {filteredData.length > 0 ? (
                <>
                  <h2 className="text-xl font-semibold mb-4">Product Matches</h2>
                  <ProductCards data={filteredData.slice(0,3)} />
                </>
              ) : (
                <p>{noResultsMessage}</p>
              )}
            </>
          ) : (
            <p></p>
          )}

         
          {isSpeechProcessed ? (
            <>
              {recommendedData.length > 0 ? (
                <>
                  <h2 className="text-xl font-semibold mt-8 mb-4">Recommended Products</h2>
                  <ProductCards data={recommendedData.slice(0,3)} />
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
