import React, { useState } from "react";
import { Avatar } from "@mui/material";
import { Modal } from "@mui/material";
import DriverModal from "../Modal/DriverModal";

const DriverSelectItem = (props) => {
  const [openViewModal, setOpenViewModal] = useState(false);

  const ref = React.useRef(null);
  const selectDriver = (e) => {
    if (e.target.checked) {
      props.handleDriverSelect(props.driver?.id);
    }
  };
  return (
    <>
      <tr className="gap-4 flex justify-between w-full text-left">
        <td className="w-12 text-center">
          <input
            type="checkbox"
            name="driver"
            value={props.driver?.id}
            onChange={selectDriver}
            checked={props.driver?.id === props.selectedDriver}
          />
        </td>
        <td className="flex-1 flex gap-2 justify-center items-center">
          <span className="driver-name">{props.driver?.name}</span>
        </td>
        <td className="flex-1 flex gap-2 justify-center items-center">
          {props.driver?.phone}
        </td>
        <td className="flex-1 flex gap-2 justify-center items-center">
          {props.driver?.city}
        </td>
        {/* <td className="w-32">₹{props.earnings}</td>
        <td className="w-32">{props.trips}</td> */}
        <td className="w-32 text-center">
          {props.driver?.isAvailableToday ? "Available" : "Not Available"}
        </td>
        <td className="w-32 text-center">
          <button
            onClick={() => setOpenViewModal(true)}
            className="text-sm text-white bg-lime-700 rounded-lg px-2 py-1"
          >
            View
          </button>
        </td>
      </tr>
      <Modal
        ref={ref}
        open={openViewModal}
        onClose={() => setOpenViewModal(false)}
      >
        <DriverModal driver={props.driver} />
      </Modal>
    </>
  );
};

export default DriverSelectItem;
