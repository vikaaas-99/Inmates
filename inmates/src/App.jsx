import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/home";
import Collection from "./pages/Collection";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import PlaceOrder from "./pages/PlaceOrder";
import Orders from "./pages/Orders";
import Navbar from "./components/Navbar";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Footer from "./components/Footer";
import SearchBar from "./components/SearchBar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Verify from "./pages/Verify";

const App = () => {
  const location = useLocation(); // Get the current location
  return (
    <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
      <ToastContainer></ToastContainer>
      {location.pathname !== "/login" && <Navbar />}
      {location.pathname !== "/login" && <SearchBar />}

      {/* <Navbar></Navbar>
      <SearchBar></SearchBar> */}
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/collection" element={<Collection></Collection>}></Route>

        <Route path="/about" element={<About></About>}></Route>
        <Route path="/contact" element={<Contact></Contact>}></Route>
        <Route path="/product/:productId" element={<Product></Product>}></Route>
        <Route path="/cart" element={<Cart></Cart>}></Route>
        <Route path="/Login" element={<Login></Login>}></Route>
        <Route path="/place-order" element={<PlaceOrder></PlaceOrder>}></Route>
        <Route path="/orders" element={<Orders></Orders>}></Route>
        <Route path="/verify" element={<Verify></Verify>}></Route>
      </Routes>
      {/* <Footer></Footer> */}
      {location.pathname !== "/login" && <Footer />}
    </div>
  );
};

export default App;
