import React from "react";
import Header from "./header";
import Navbar from "../Navbar/navbar";

const AppLayout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      {/* <Navbar /> */}
      <main className=" ">
        <div className="">{children}</div>
      </main>
    </div>
  );
};

export default AppLayout;
