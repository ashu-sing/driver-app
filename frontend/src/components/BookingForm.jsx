import React from "react";

export default function BookingForm(props) {
  return (
    <form className="bg-white border border-gray-200 px-4 flex flex-col gap-3 py-4 w-full sm:w-[70vw] md:w-[50vw] rounded-md shadow-lg">
      <div className="form-control">
        <label
          htmlFor="website-admin"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Username
        </label>
        <div className="flex">
          <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
            @
          </span>
          <input
            type="text"
            id="website-admin"
            className="rounded-none rounded-r-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Username"
          />
        </div>
      </div>
      <div className="form-control">
        <label
          htmlFor="website-admin"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Enter Pickup Address
        </label>
        <div className="flex">
          <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
            @
          </span>
          <input
            type="text"
            id="website-admin"
            className="rounded-none rounded-r-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Enter your exact pickup location"
          />
        </div>
      </div>
      <div className="form-control">
        <label
          htmlFor="zone"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Choose Available Area
        </label>
        <select
          id="zone"
          className="bg-gray-50 border px-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          defaultValue={"Choose a zone"}    
        >
          <option>Choose a zone</option>
          <option value="US">Central Delhi</option>
          <option value="CA">Gurgaon</option>
          <option value="FR">Noida</option>
          <option value="DE">Delhi NCR</option>
        </select>
      </div>
      <div className="form-control">
        <label
          htmlFor="website-admin"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Phone No
        </label>
        <div className="flex">
          <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
            @
          </span>
          <input
            type="text"
            id="website-admin"
            className="rounded-none rounded-r-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Phone Number"
          />
        </div>
      </div>
      <div className="form-control">
        <label
          htmlFor="website-admin"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Date of Pickup
        </label>
        <div className="flex">
          <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
            @
          </span>
          <input
            type="date"
            id="website-admin"
            className="rounded-none rounded-r-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Date of Pickup"
          />
        </div>
      </div>
      <span className="text-sm ml-auto text-blue-500 font-semibold cursor-pointer hover:underline">
        Don&apos;t have a Username? <span>Signup</span>
      </span>
      <button className="mt-4 bg-[#ffdf00] text-gray-700 py-2 font-semibold w-full sm:w-72 mx-auto mb-2 rounded-full text-lg hover:bg-[#f3db3d]">
        Book Now
      </button>
    </form>
  );
}
