import React, { useState } from "react";
import AssignDriverBookingModal from "../Modal/AssignDriverBookingModal";
import { Modal } from "@mui/material";
import AssginedBookingModal from "../Modal/AssignedBookingModal";

const BookingTableComponentItem = (props) => {
  const [openAssignModal, setOpenAssignModal] = useState(false);
  const [openBookingModal, setOpenBookingModal] = useState(false);

  const bookingItem = props.booking;
  const BookingItemRef = React.useRef(null);
  return (
    <>
      <tr className="gap-4 w-full text-left flex justify-between">
        <td className="w-12 text-center">{props.index}.</td>
        <td className="flex-1 text-center">{bookingItem?.UserId}</td>
        <td className="flex-1 text-center">{bookingItem?.City}</td>
        {/* <td className="w-32">₹{props.earnings}</td>
        <td className="w-32">{props.trips}</td> */}
        <td className="flex-1 text-center">
          {new Date(bookingItem?.DateOfPickup.seconds * 1000).toDateString()}
        </td>
        <td className="text-center w-96">{bookingItem.DestinationAddress}</td>

        <td className="flex-1 text-center flex gap-2">
          <button
            onClick={() => setOpenAssignModal(true)}
            className="text-sm text-black hover:bg-[#f9d06a] bg-[#fad77e] rounded-lg px-2 py-1"
          >
            Assign Driver
          </button>
          <button onClick={() => setOpenBookingModal(true)} className="text-sm  hover:bg-lime-800 bg-lime-600 text-white rounded-lg px-2 py-1">
            View
          </button>
        </td>
      </tr>
      <hr />
      <Modal open={openBookingModal} onClose={() => setOpenBookingModal(false)}>
        <AssginedBookingModal
          ref={BookingItemRef}
          closeModal={() => setOpenBookingModal(false)}
          bookingItem={bookingItem}
          onClose={() => setOpenBookingModal(false)}
        />
      </Modal>
      <Modal open={openAssignModal} onClose={() => setOpenAssignModal(false)}>
        <AssignDriverBookingModal
          ref={BookingItemRef}
          closeModal={() => setOpenAssignModal(false)}
          bookingItem={bookingItem}
          onClose={() => setOpenAssignModal(false)}
        />
      </Modal>
    </>
  );
};

export default BookingTableComponentItem;
