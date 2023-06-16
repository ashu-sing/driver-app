import React, { useState } from "react";
import { Timestamp, collection } from "firebase/firestore";
import { formatTime } from "../../helpers/dates";
import { doc, addDoc } from "firebase/firestore";
import { db } from "../../firebase/config";
import ResponseAlert from "../Alerts/ResponseAlert";
import { CircularProgress } from "@mui/material";

export default function BookingForm(props) {
  const [zone, setZone] = useState("");
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [contact, setContact] = useState("");
  const [dateOfPickup, setDateOfPickup] = useState(new Date());
  const [timeOfPickup, setTimeOfPickup] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorValue, setErrorValue] = useState("");
  const [errorStatus, setErrorStatus] = useState("");
  const [openResponse, setOpenResponse] = useState(false);

  const bookingSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    let error = false;
    let message = "";

    if (zone === "") {
      error = true;
      message = "Please select a zone";
    } else if (pickup === "") {
      error = true;
      message = "Please enter pickup address";
    } else if (destination === "") {
      error = true;
      message = "Please enter destination address";
    } else if (contact === "") {
      error = true;
      message = "Please enter contact number";
    } else if (dateOfPickup === "") {
      error = true;
      message = "Please select date of pickup";
    } else if (timeOfPickup === "") {
      error = true;
      message = "Please select time of pickup";
    }

    if (error) {
      setLoading(false);
      setErrorStatus(true);
      setErrorValue(message);
      setOpenResponse(true);
      setTimeout(() => {
        setOpenResponse(false);
      }, 3000);
      return;
    }

    const bookingData = {
      City: zone,
      PickupAddress: pickup,
      DestinationAddress: destination,
      UserAlternateContact: contact,
      DateOfPickup: Timestamp.fromDate(dateOfPickup),
      TimeOfPickup: formatTime(timeOfPickup),
      Date: Timestamp.fromDate(new Date()),
      UserId: "9336339270", // to be removed and replaced with user id
      status: {
        isAvailable: true,
        isCancelled: false,
        isCompleted: false,
        isDriverAssigned: false,
      },
    };

    try {
      const bookingRef = collection(db, "bookings");
      await addDoc(bookingRef, bookingData);
      setLoading(false);
      setErrorStatus(false);
      setErrorValue("Booking Successful");
      setOpenResponse(true);
      setTimeout(() => {
        setOpenResponse(false);
      }, 3000);

      setZone("");
      setPickup("");
      setDestination("");
      setContact("");
      setDateOfPickup(new Date());
      setTimeOfPickup("");
    } catch (err) {
      setLoading(false);
      setErrorStatus(true);
      setErrorValue("Booking Failed");
      setOpenResponse(true);
      setTimeout(() => {
        setOpenResponse(false);
      }, 3000);
    }
  };

  return (
    <>
      <form className="bg-white border self-center mt-4 border-gray-200 px-4 flex flex-col gap-3 py-4 w-full sm:w-[70vw] md:w-[50vw] rounded-md shadow-lg">
        <div className="form-control">
          <label
            htmlFor="website-admin"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Enter Pickup Address
          </label>
          <div className="flex">
            <input
              type="text"
              value={pickup}
              onChange={(e) => setPickup(e.target.value)}
              id="website-admin"
              className=" rounded-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Enter your exact pickup location"
            />
          </div>
        </div>
        <div className="form-control">
          <label
            htmlFor="website-admin"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Enter Destination Address
          </label>
          <div className="flex">
            <input
              type="text"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              id="website-admin"
              className=" rounded-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
            name="zone"
            value={zone}
            onChange={(e) => setZone(e.target.value)}
            className="bg-gray-50 border px-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            defaultValue={"Choose a zone"}
          >
            <option>Choose a zone</option>
            <option value="Central Delhi">Central Delhi</option>
            <option value="Gurgaon">Gurgaon</option>
            <option value="Noida">Noida</option>
            <option value="Delhi NCR">Delhi NCR</option>
          </select>
        </div>
        <div className="form-control">
          <label
            htmlFor="website-admin"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Enter Any Contact Number
          </label>
          <div className="flex">
            <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
              @
            </span>
            <input
              type="text"
              id="website-admin"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
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
              valueAsDate={dateOfPickup}
              value={dateOfPickup.toISOString().split("T")[0]}
              onChange={(e) => setDateOfPickup(e.target.valueAsDate)}
              id="website-admin"
              className="rounded-none rounded-r-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Date of Pickup"
            />
          </div>
        </div>

        <div className="form-control">
          <label
            htmlFor="website-admin"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Time of Pickup
          </label>
          <div className="flex">
            <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
              @
            </span>
            <input
              type="time"
              onChange={(e) => setTimeOfPickup(e.target.valueAsDate)}
              id="website-admin"
              className="rounded-none rounded-r-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Date of Pickup"
            />
          </div>
        </div>

        <button
          onClick={bookingSubmitHandler}
          disabled={loading}
          className="mt-4 bg-[#ffdf00] text-gray-700 py-2 font-semibold w-full sm:w-72 mx-auto mb-2 rounded-full text-lg hover:bg-[#f3db3d]"
        >
          {loading ? (
            <CircularProgress className="!h-4 !w-4 !text-white" />
          ) : (
            "Book Now"
          )}
        </button>
      </form>
      <ResponseAlert
        errorValue={errorValue}
        openResponse={openResponse}
        setOpenResponse={setOpenResponse}
        errorStatus={errorStatus}
      />
    </>
  );
}
