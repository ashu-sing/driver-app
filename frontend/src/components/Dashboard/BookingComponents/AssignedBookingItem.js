import React, { useState } from "react";
import AssignedBookingModal from "../Modal/AssignedBookingModal";
import { Modal } from "@mui/material";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase/config";
import ResponseAlert from "../../Alerts/ResponseAlert";

const AssignedBookingsItem = (props) => {
  const [openAssignModal, setOpenAssignModal] = useState(false);
  const [openResponse, setOpenResponse] = useState(false);
  const [errorStatus, setErrorStatus] = useState("");
  const [errorValue, setErrorValue] = useState("");
  const [loading, setLoading] = useState(false);

  const bookingItem = props.booking;
  const BookingItemRef = React.useRef(null);

  const deleteAssignHandler = async () => {
    setLoading(true);
    setOpenResponse(true);
    setErrorStatus("success");
    setErrorValue("Deleting assignment");
    try {
      await updateDoc(doc(db, "bookings", bookingItem.id), {
        isAvailableToday: true,
        status: {
          isDriverAssigned: false,
          isCompleted: false,
          isCancelled: false,
          isAvailable: true,
        },
      });
      setErrorValue("Deleted Successfully");

      setTimeout(() => {
        setOpenResponse(false);
      }, 3000);
      setLoading(false);
    } catch (err) {
      setErrorStatus("error");
      setErrorValue("Can't delete assignment");
      console.log(err);

      setTimeout(() => {
        setOpenResponse(false);
      }, 3000);
    }
  };

  return (
    <>
      <tr className="gap-4 w-full text-left flex justify-between items-center">
        <td className="w-12 text-center">{props.index}.</td>
        <td className="flex-1 text-center">{bookingItem?.UserId}</td>
        <td className="flex-1 text-center">{bookingItem?.DriverId}</td>
        <td className="flex-1 text-center">{bookingItem?.City}</td>
        {/* <td className="w-32">₹{props.earnings}</td>
        <td className="w-32">{props.trips}</td> */}
        <td className="flex-1 text-center">
          {new Date(bookingItem?.DateOfPickup.seconds * 1000).toDateString()}
        </td>
        <td className="text-center w-64">{bookingItem.DestinationAddress}</td>

        <td className="flex-1 text-center flex gap-2">
          <button
            onClick={deleteAssignHandler}
            className="text-sm hover:bg-red-500 bg-red-400 text-white rounded-lg px-2 py-1"
          >
            Del Assign
          </button>
          <button
            onClick={() => setOpenAssignModal(true)}
            className="text-sm px-2 hover:bg-lime-800 bg-lime-600 text-white rounded-lg px- 2 py-1"
          >
            View
          </button>
        </td>
      </tr>
      <hr />
      <Modal open={openAssignModal} onClose={() => setOpenAssignModal(false)}>
        <AssignedBookingModal bookingItem={bookingItem} />
      </Modal>
      <ResponseAlert
        errorValue={errorValue}
        openResponse={openResponse}
        setOpenResponse={setOpenResponse}
        errorStatus={errorStatus}
      />
    </>
  );
};

export default AssignedBookingsItem;
