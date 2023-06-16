import React, { useState } from "react";
import AvailableIcon from "../../assets/dashboard/AvailableIcon.svg";
import { Avatar } from "@mui/material";
import { Modal } from "@mui/material";
import DriverModal from "../Dashboard/Modal/DriverModal";

const DriverTableItem = (props) => {
  const [openViewModal, setOpenViewModal] = useState(false);

  const ref = React.useRef(null);
  return (
    <>
      <tr className="gap-4 flex justify-between w-full text-left">
        <td className="w-12">{props.index}.</td>
        <td className="flex-1 flex gap-2 items-center">
          <Avatar src={AvailableIcon} className="!h-6 !w-6 border" />
          <span className="driver-name">{props.driver?.name}</span>
        </td>
        <td className="flex-1 flex gap-2 items-center">
          {props.driver?.phone}
        </td>
        <td className="flex-1 flex gap-2 items-center">{props.driver?.city}</td>
        {/* <td className="w-32">₹{props.earnings}</td>
        <td className="w-32">{props.trips}</td> */}
        <td className="w-32">
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

export default DriverTableItem;
