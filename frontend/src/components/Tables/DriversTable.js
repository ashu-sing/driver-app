import React from "react";
import { Avatar } from "@mui/material";
import AvailableIcon from "../../assets/dashboard/AvailableIcon.svg";
import DriverTableItem from "./DriverTableItem";

export const DriversTable = (props) => {
  return (
    <table className="recent-book-list w-full mt-8 flex flex-col gap-4">
      <tr className="gap-4 w-full text-left flex text-slate-600 font-semibold">
        <th className="font-semibold w-12">#</th>
        <th className="font-semibold flex-1">Driver</th>
        <th className="font-semibold flex-1">Contact</th>
        <th className="font-semibold flex-1">City</th>
        {/* <th className="font-semibold w-32">Earnings</th>
        <th className="font-semibold w-32">Trips</th> */}
        <th className="font-semibold w-32">Options</th>
      </tr>
      <hr></hr>
      {props?.data.map((driver, index) => {
        if (!driver) return <></>;
        return (
          <>
            <DriverTableItem
              driver={driver}
              index={index + 1}
              // name={driver?.name}
              // contact={driver?.phone}
              // // earnings={driver.earnings}
              // city={driver?.city}
              // id={driver?.id}
              key={driver?.id}
            />
            <hr></hr>
          </>
        );
      })}
    </table>
  );
};
