import React from "react";
import "./App.css";
import Home from "./pages/Home/Home";
import Topbar from "./components/Topbar/TopBar";
import Sidebar from "./components/SideBar/SideBar";
import Login from "./pages/Login/Login";
import User from "./pages/User/User";
import NewUser from "./pages/newUser/NewUser";
import UserList from "./pages/UserList/UserList";
import Product from "./pages/Product/Product";
import NewProduct from "./pages/newProduct/NewProduct";
import ProductList from "./pages/ProductList/ProductList";
import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";


function App() {
  const admin = useSelector((state) => state.user.currentUser.isAdmin);
  //const admin = true


  return (
    <>
      {admin && (
        <>
            <Topbar />
          <div className="app-container">
            <Sidebar />
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route exact path="/" element={<Home />} />
              <Route path="/users" element={<UserList />} />
              <Route path="/user/:userId" element={<User />} />
              <Route path="/newuser" element={<NewUser />} />
              <Route path="/products" element={<ProductList />} />
              <Route path="/product/:productId" element={<Product />} />
              <Route path="/newproduct" element={<NewProduct />} />
            </Routes>
          </div>
        </>
      )}
    </>
  );
};

export default App