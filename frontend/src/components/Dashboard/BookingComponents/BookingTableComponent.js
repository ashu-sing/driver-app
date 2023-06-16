import React from "react";
import { Avatar } from "@mui/material";
import BookingTableComponentItem from "./BookingTableComponentItem";

const BookingTableComponent = (props) => {
  return (
    <table className="recent-book-list w-full mt-8 flex flex-col gap-4">
      <tr className="gap-4 w-full text-left flex justify-between text-slate-600 font-semibold">
        <th className="font-semibold text-center w-12">#</th>
        <th className="font-semibold text-center flex-1 ">Customer Contact</th>
        <th className="font-semibold text-center flex-1 ">City</th>
        <th className="font-semibold text-center flex-1 ">Date</th>
        <th className="font-semibold text-center w-96 ">Destination</th>
        <th className="font-semibold text-center min-w-14 flex-1">Options</th>
      </tr>
      <hr></hr>
      {props?.bookings?.map((booking, index) => {
        return (
          <BookingTableComponentItem
            index={index + 1}
            key={booking.id}
            booking={booking}
          />
        );
      })}
      <hr></hr>
    </table>
  );
};

export default BookingTableComponent;
