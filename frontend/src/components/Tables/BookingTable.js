import React from "react";
import { Avatar } from "@mui/material";
import AvailableIcon from "../../assets/dashboard/AvailableIcon.svg";
import BookingTableItem from "./BookingTableItem";

const BookingTable = () => {
  return (
    <table className="recent-book-list w-full mt-8 flex flex-col gap-4">
      <tr className="gap-4 w-full text-left flex text-slate-600 font-semibold">
        <th className="font-semibold w-12">#</th>
        <th className="font-semibold flex-1">Customer</th>
        <th className="font-semibold flex-1">Contact</th>
        <th className="font-semibold flex-1">City</th>
        <th className="font-semibold w-32">Earnings</th>
        <th className="font-semibold w-32">Trip To</th>
        <th className="font-semibold w-32">Status</th>
      </tr>
      <hr></hr>
      <BookingTableItem
        index="1"
        name="Parvinder Singh"
        contact="9876543210"
        earnings="10000"
        city="Chandigarh"
        trips="Guwahati"
        status="Available"
      />
      <hr></hr>
      <BookingTableItem
        index="2"
        name="Chadrakant Sethi"
        contact="9796543210"
        earnings="13500"
        city="Noida"
        trips="Noida, 13 sector"
        status="Available"
      />
      <hr></hr>
      <BookingTableItem
        index="3"
        name="Amritpal Singh"
        contact="9876543210"
        earnings="10000"
        city="Guwahati"
        trips="12"
        status="Available"
      />
      <hr></hr>
      <BookingTableItem
        index="4"
        name="Dhruv Sharma"
        contact="9876543210"
        earnings="12000"
        city="Delhi"
        trips="15"
        status="Cancelled"
      />
      <hr></hr>
      <BookingTableItem
        index="5"
        name="Chadrakant Sethi"
        contact="9796543210"
        earnings="13500"
        city="Noida"
        trips="25"
        status="Completed"
      />
      <hr></hr>
      <BookingTableItem
        index="6"
        name="Sahil Sharma"
        contact="9876543210"
        earnings="14000"
        city="New Delhi"
        trips="32"
        status="Completed"
      />
      <hr></hr>
    </table>
  );
};

export default BookingTable;
