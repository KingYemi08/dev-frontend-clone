import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/nav";
import Sidebar from "./components/side";
import Login from "./pages/login";
import Landing from "./pages/landing";
import Register from "./pages/register";
import { useGlobal } from "./context/globalContext";
import Blog from "./pages/blog";
import AddPost from "./pages/addPost";
import Dashboard from "./pages/dashboard";
import SingleUser from "./pages/singleUser";
import SingleComment from "./pages/singleComment";
import Settings from "./pages/settings";
import CustomSelect2 from "./components/test2";

function App() {
  const { path } = useGlobal();
  const fruitOptions = [
    { value: "apple", label: "Apple" },
    { value: "banana", label: "Banana" },
    { value: "orange", label: "Orange" },
  ];
  const handleFruitChange = (value) => {
    console.log("Selected fruit:", value);
  };

  return (
    <>
      <div className="bg-[#f6f6f6] min-h-screen">
        <div className="lg:flex">
          <div className="z-50">
            <Sidebar />
          </div>
          <Navbar />
          <div
            className={`  ${
              path === "/register" || path === "/login" || path === "/new"
                ? "lg:mt-0"
                : "mt-16"
            } ${
              path === "/new"
                ? "lg:ml-0 lg:w-full"
                : path.includes("user")
                ? "lg:ml-[4%] lg:w-[96%] ml-0"
                : "lg:ml-[4%] lg:w-[96%] lg:py-2.5 lg:px-3.5"
            }`}
          >
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/:id" element={<Blog />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/new" element={<AddPost />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/user/:id" element={<SingleUser />} />
              <Route path="/comment/:id" element={<SingleComment />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
