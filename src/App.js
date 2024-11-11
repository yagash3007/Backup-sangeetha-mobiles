import React, { useState } from "react";
import "./App.css";
import { HashRouter, Routes, Route } from "react-router-dom";
import AppLayout from "./components/layouts/applayout";
import { UserProvider } from "./context/currenUserContext";
import HomePage from "./pages/blank-page";

function App() {
  return (
    <HashRouter>
      <UserProvider>
        <div className="App">
          <AppLayout>
            <Routes>
              <Route path="/" element={<HomePage />} />
            </Routes>
          </AppLayout>
        </div>
      </UserProvider>
    </HashRouter>
  );
}

export default App;
