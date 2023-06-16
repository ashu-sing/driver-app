import React from "react";
import { Link } from "react-router-dom";

export default function HeadingCard(props) {
  return (
    <Link
      to="/"
      className={`${props.className} block max-w-sm border border-gray-200 transition-all duration-150 p-6 rounded-lg shadow-sm hover:shadow-lg dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700`}
    >
      <h5 className="mb-2 text-2xl font-semibold tracking-tight dark:text-white">
        {props.head}
      </h5>
      <p className="font-normal dark:text-gray-400">
        {props.description}
      </p>
    </Link>
  );
}
