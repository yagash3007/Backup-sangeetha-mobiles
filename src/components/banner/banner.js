import React from "react";
import { FaPlus, FaRegFileExcel, FaTrash } from "react-icons/fa";
import { Button } from "../ui/button";

const Banner = ({
  title = "Media Plans",
  addNewPlanText,
  Component,
  onAddNewPlan,
  onExport,
  extraText,
  showExportButton,
  showAddNew,
  showExtra,
  onExtra,
  deletetext,
  showDelete,
  onDelete
}) => {
  return (
    <div className=" w-full h-screen flex flex-col bg-gradient-to-r from-purple-600 via-blue-500 to-indigo-500">
      <div className="py-5 flex justify-between items-center px-8">
        <h1 className="text-3xl font-extrabold text-white drop-shadow-lg tracking-wide">
          {title}
        </h1>
        {showExportButton && (
          <button
            onClick={() => {
              console.log("Export button clicked");
              onExport && onExport();
            }}
            className="bg-white text-indigo-600 px-3 py-1 ml-auto mr-3 rounded-full font-semibold shadow-lg hover:bg-gray-100 hover:text-indigo-700 transition duration-300 flex items-center space-x-2"
          >
            <FaRegFileExcel />
            <span>Export</span>
          </button>
        )}

        <div className="flex gap-2">
          {showAddNew && (
            <button
              onClick={onAddNewPlan}
              className="bg-white text-indigo-600 px-3 py-1 rounded-full font-semibold shadow-lg hover:bg-gray-100 hover:text-indigo-700 transition duration-300 flex items-center space-x-2"
            >
              <FaPlus />
              <span>{addNewPlanText}</span>
            </button>
          )}
          {showExtra && (
            <button
              onClick={onExtra}
              className="bg-white text-indigo-600 px-3 py-1 rounded-full font-semibold shadow-lg hover:bg-gray-100 hover:text-indigo-700 transition duration-300 flex items-center space-x-2"
            >
              <FaPlus />
              <span>{extraText}</span>
            </button>
          )}
          {showDelete && (
            <button
              onClick={onDelete}
              className="bg-white text-red-600 px-3 py-1 rounded-full font-semibold shadow-lg hover:bg-gray-100 hover:text-red-700 transition duration-300 flex items-center space-x-2"
            >
              <FaTrash />
              <span>{deletetext}</span>
            </button>
          )}
        </div>
      </div>

      <div className="flex-grow bg-white rounded-t-3xl shadow-2xl p-4 mt-3 min-h-full">
        <div className="bg-gray-100 rounded-lg shadow-md">
          {typeof Component === "function" ? <Component /> : Component}
        </div>
      </div>
    </div>
  );
};

export default Banner;
