import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { Route, Routes } from "react-router-dom";
import Add from "./pages/Add";
import List from "./pages/List";
import Orders from "./pages/Orders";
import Login from "./components/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const currency = "$";

const App = () => {
  const [token, setToken] = useState(
    localStorage.getItem("token") ? localStorage.getItem("token") : ""
  );

  useEffect(() => {
    localStorage.setItem("token", token);
  }, [token]);

  return (
    <div className="bg-gray-50 min-h-screen">
      <ToastContainer></ToastContainer>
      {token === "" ? (
        <Login setToken={setToken}></Login>
      ) : (
        <>
          <Navbar setToken={setToken}></Navbar>
          <hr />
          <div className="flex w-full">
            <Sidebar></Sidebar>
            <div className="w-[70%] mx-auto ml-[max(5vw,25px)] my-8 text-gray-600 text-base">
              <Routes>
                <Route path="/" element={<Add token={token}></Add>}></Route>
                <Route path="/add" element={<Add token={token}></Add>}></Route>
                <Route
                  path="/list"
                  element={<List token={token}></List>}
                ></Route>
                <Route
                  path="/orders"
                  element={<Orders token={token}></Orders>}
                ></Route>
              </Routes>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default App;
