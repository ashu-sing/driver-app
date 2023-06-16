import React, { useState } from "react";
import AvailableIcon from "../../assets/dashboard/AvailableIcon.svg";
import { Avatar } from "@mui/material";

const BookingTableItem = (props) => {

  const ref = React.useRef(null);
  return (
    <>
      <tr className="gap-4 flex justify-between w-full text-left">
        <td className="w-12">{props.index}.</td>
        <td className="flex-1 flex gap-2 items-center">
          <Avatar src={AvailableIcon} className="!h-6 !w-6 border" />
          <span className="driver-name">{props.name}</span>
        </td>
        <td className="flex-1 flex gap-2 items-center">{props.contact}</td>
        <td className="flex-1 flex gap-2 items-center">{props.city}</td>
        <td className="w-32">₹{props.earnings}</td>
        <td className="w-32">{props.trips}</td>
        <td className="w-32">
          {props.status}
        </td>
      </tr>
    </>
  );
};

export default BookingTableItem;
