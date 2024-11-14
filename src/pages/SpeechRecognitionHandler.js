import React, { useState, useEffect } from "react";
import { FaMicrophone, FaMicrophoneSlash } from "react-icons/fa";
import { GenAiMenu } from "./genAi";
import alasql from "alasql";
import { toast } from "react-toastify"; 
import ExcelJS from 'exceljs'; 

const SpeechRecognitionHandler = ({
  setFilteredData,
  setRecommendedData,
  setSnackbarMessage,
  setOpenSnackbar,
  status,
  setStatus,
  onSpeechProcessed, // Callback to notify when speech recognition has been processed
  onNoResults, // Callback to notify when no products are found
}) => {
  const [transcript, setTranscript] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState(null);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognitionInstance = new SpeechRecognition();
      recognitionInstance.continuous = true;
      recognitionInstance.interimResults = true;
      recognitionInstance.lang = "en-US";

      recognitionInstance.onresult = (event) => handleSpeechResult(event);
      recognitionInstance.onerror = (event) => handleError(event);
      recognitionInstance.onend = () => {
        if (isListening && status !== "processing") {
          recognitionInstance.start();
        }
      };

      setRecognition(recognitionInstance);
    } else {
      setSnackbarMessage("Speech Recognition not supported in this browser");
      setOpenSnackbar(true);
    }
  }, [isListening, status]);

  const handleSpeechResult = async (event) => {
    let currentTranscript = "";
    for (let i = event.resultIndex; i < event.results.length; i++) {
      if (event.results[i].isFinal) {
        currentTranscript += event.results[i][0].transcript;
      }
    }
    if (currentTranscript.trim()) {
      setTranscript(currentTranscript);
      processTranscript(currentTranscript);
    }
  };

  const handleError = (event) => {
    console.error("Speech recognition error", event.error);
    setSnackbarMessage(`Speech recognition error: ${event.error}. Retrying in 3 seconds...`);
    setTimeout(() => {
      startListening();
    }, 3000);
  };

  const processTranscript = async (currentTranscript) => {
    try {
      setStatus("processing");
      stopListening();

      const result = await GenAiMenu(currentTranscript);
      console.log("Generated SQL Queries:", result); 

      let foundProducts = false;

      
      if (result.exactQuery) {
        const exactProducts = alasql(result.exactQuery);
        console.log("ExactProducts",exactProducts);
        
        if (exactProducts.length > 0) {
          setFilteredData(exactProducts);
          foundProducts = true;
        }
      }

      
      if (result.recommendationQuery) {
        const recommendedProducts = alasql(result.recommendationQuery);
        console.log("recommendedProducts",recommendedProducts);
        
        if (recommendedProducts.length > 0) {
          setRecommendedData(recommendedProducts);
          foundProducts = true;
        }
      }

      if (!foundProducts) {
        toast.error("No products available for your request.");
        onNoResults(); 
      } else {
        toast.success("Search completed successfully!");
      }

      
      onSpeechProcessed();

      
      saveTranscriptToLocalStorage(currentTranscript);
    } catch (error) {
      console.error("Error processing transcript:", error);
      toast.error("Error processing your request. Please try again.");
      onNoResults(); 
    } finally {
      setStatus("idle");
    }
  };

  const startListening = () => {
    if (recognition) {
      setTranscript("");
      setStatus("listening");
      setIsListening(true);
      recognition.start();
    }
  };

  const stopListening = () => {
    if (recognition) {
      recognition.stop();
      setIsListening(false);
    }
  };

  const saveTranscriptToLocalStorage = (transcriptText) => {
    const timestamp = new Date().toISOString();
    const newTranscriptData = {
      timestamp,
      transcript: transcriptText,
      status: "completed",
    };

    const existingData = JSON.parse(localStorage.getItem("transcripts")) || [];
    existingData.push(newTranscriptData);
    localStorage.setItem("transcripts", JSON.stringify(existingData));
    console.log("Current transcripts data:", JSON.parse(localStorage.getItem("transcripts")));
  };

  // Function to convert localStorage data to Excel and download it
  const exportToExcel = () => {
    const transcriptData = JSON.parse(localStorage.getItem("transcripts")) || [];
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Transcripts');

    // Set up headers for Excel file
    worksheet.columns = [
      { header: 'Timestamp', key: 'timestamp', width: 30 },
      { header: 'Transcript', key: 'transcript', width: 50 },
      { header: 'Status', key: 'status', width: 20 },
    ];

    // Add rows from localStorage data
    transcriptData.forEach((item) => {
      worksheet.addRow(item);
    });

    // Save the file
    workbook.xlsx.writeBuffer().then((buffer) => {
      const blob = new Blob([buffer], { type: 'application/octet-stream' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'transcripts.xlsx';
      a.click();
      URL.revokeObjectURL(url);
    });
  };

  return (
    <div className="col-span-1 bg-white rounded-lg shadow-lg p-6 flex flex-col items-center">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Speech to Text</h1>
      <div className="w-full mb-6">
        <button
          onClick={isListening ? stopListening : startListening}
          className={`w-full flex justify-center items-center ${isListening ? "bg-red-500" : "bg-gradient-to-r from-[#0b73b7] to-[#ea8827]"} h-16 rounded-lg`}
          disabled={status === "processing"}
        >
          {isListening ? (
            <>
              <FaMicrophoneSlash className="mr-4 text-xl" />
              Stop Speaking
            </>
          ) : (
            <>
              <FaMicrophone className="mr-4 text-xl" />
              Start Speaking
            </>
          )}
        </button>
      </div>

      <div className="w-full mt-6 p-4 bg-gray-100 rounded-lg shadow-inner">
        <h3 className="text-lg font-semibold text-gray-700 mb-2">Transcript:</h3>
        <p className="text-lg text-gray-800">{transcript || "Your speech will appear here..."}</p>
      </div>

      {/* Button to export data to Excel */}
      <button
        onClick={exportToExcel}
        className="mt-6 px-6 py-2 bg-green-500 text-white rounded-lg"
      >
        Export to Excel
      </button>
    </div>
  );
};

export default SpeechRecognitionHandler;




