import { Link } from "react-router-dom";
import React from "react";

export default function HireCards(props) {
  return (
    <div className="w-52 gap-4 justify-center flex flex-col p-6 hover:shadow-lg cursor-pointer text-center bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
    {/* <svg
      className="w-10 h-10 mb-2 mx-auto text-gray-500 dark:text-gray-400"
      aria-hidden="true"
      fill="currentColor"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        d="M5 5a3 3 0 015-2.236A3 3 0 0114.83 6H16a2 2 0 110 4h-5V9a1 1 0 10-2 0v1H4a2 2 0 110-4h1.17C5.06 5.687 5 5.35 5 5zm4 1V5a1 1 0 10-1 1h1zm3 0a1 1 0 10-1-1v1h1z"
        clip-rule="evenodd"
      ></path>
      <path d="M9 11H3v5a2 2 0 002 2h4v-7zM11 18h4a2 2 0 002-2v-5h-6v7z"></path>
    </svg> */}
    <img src={props.img} alt="img" className="w-10 h-10 mb-2 mx-auto text-gray-500 dark:text-gray-400"/>
    <Link to="/services">
      <h5 className=" text-lg font-semibold tracking-tight text-gray-900 dark:text-white">
        {props.head}
      </h5>
    </Link>
  </div>
  );
}
