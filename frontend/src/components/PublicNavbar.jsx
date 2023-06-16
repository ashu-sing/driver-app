import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import axiosInstance from "../config/axiosInstance";
// import AuthContext from "../context/AuthContext";
// import { useEffect } from "react";
import LogoImg from "../assets/icons/logo.svg";

export default function Navbar() {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const navigate = useNavigate();
  const openNavbar = () => {
    setNavbarOpen(!navbarOpen);
  };

  return (
    <nav
      className={`bg-[#fda63a] z-[1000] border-gray-200 dark:bg-gray-900 fixed top-0 shadow-lg w-full`}
    >
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto py-4 px-8">
        <Link to="/" className="flex items-center">
          <img src={LogoImg} className="h-8 mr-3" alt="Logo" />
          <span className="self-center text-white text-2xl font-semibold whitespace-nowrap dark:text-white">
            Cruise Control
          </span>
        </Link>
        <button
          data-collapse-toggle="navbar-default"
          type="button"
          className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-default"
          aria-expanded="false"
          onClick={() => openNavbar()}
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-6 h-6"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>
        <div
          className={`${
            !navbarOpen && "hidden"
          } w-full duration-300 transition-all ease-in-out md:block md:w-auto`}
          id="navbar-default"
        >
          <ul className="font-medium flex gap-1 flex-col p-4 md:p-0 mt-4 border items-center  rounded-lg  md:flex-row md:space-x-8 md:mt-0 md:border-0 dark:bg-gray-800 dark:border-gray-700">
            <li>
              <Link
                to="/"
                className="block py-2 pl-3 pr-4 text-black md:hover:text-black md:text-black bg-[#ffdf00] rounded md:bg-transparent  md:p-0 dark:text-white md:dark:text-blue-500"
                aria-current="page"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="block py-2 pl-3 pr-4 md:hover:text-black md:text-white  rounded hover:bg-[#ffdf00] md:hover:bg-transparent md:border-0 md:hover:text-blue-[#ffdf00] md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/services"
                className="block py-2 pl-3 pr-4 md:hover:text-black md:text-white rounded hover:bg-[#ffdf00] md:hover:bg-transparent md:border-0  md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              >
                Services
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="block py-2 pl-3 pr-4 md:hover:text-black md:text-white rounded hover:bg-[#ffdf00] md:hover:bg-transparent md:border-0  md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              >
                Contact
              </Link>
            </li>

            <li className="my-4 md:my-auto">
              <button
                onClick={() => navigate("/auth")}
                className="px-6 py-2 my-2 md:my-auto bg-[#ffdf00] text-black rounded-full shadow cursor-pointer hover:bg-[#fad542] hover:shadow-lg transition duration-300 ease-in-out"
              >
                Login
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
