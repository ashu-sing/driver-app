import React from "react";
import { Link } from "react-router-dom";
import LogoImg from "../assets/icons/logo.svg";


export default function Layout({ children, className }) {
  return (
    <div className="flex flex-col mt-8 md:mt-16 min-h-screen">
      <main
        className={`flex-1 w-full max-w-6xl px-4 py-8 mt-4 mx-auto md:px-8 md:py-16 ${className}`}
      >
        {children}
      </main>
      <footer className="w-full px-4 mx-auto md:px-8 dark:bg-gray-900 mt-4 bg-slate-100">
        <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
          <div className="sm:flex flex flex-col sm:flex-row items-center sm:items-center sm:justify-between">
            <Link to="/" className="flex items-center mb-4 sm:mb-0">
              <img
                height={32}
                width={45}
                src={LogoImg}
                className="h-8 mr-3"
                alt="Logo"
              />

              <span className="self-center text-2xl font-semibold whitespace-nowrap text-[#fda63a]">
                Cruise Control
              </span>
            </Link>
            <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
              <li>
                <Link to="/about" className="mr-4 hover:underline md:mr-6 ">
                  About
                </Link>
              </li>
              <li>
                <Link to="/services" className="mr-4 hover:underline md:mr-6">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="mr-4 hover:underline md:mr-6 ">
                  Pricing
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:underline">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
          <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
            © 2023{" "}
            <Link to="/" className="hover:underline">
              Cruise Control™
            </Link>
            . All Rights Reserved.
          </span>
        </div>
      </footer>
    </div>
  );
}
