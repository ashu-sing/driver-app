import React, { useEffect, useState } from "react";

const DriverAvailabilityBlock = (props) => {
  const [availability, setAvailability] = useState(props.availability);

  const handleAvailabilityChange = (e) => {
    setAvailability(e.target.value === "A" ? true : false);
    props.handleAvailabilityChange(
      props.slot,
      e.target.value === "Available" ? true : false
    );
  };

  useEffect(() => {}, [props.allSlots, props.availability]);

  return (
    <tr class="border-b border-gray-200 dark:border-gray-700">
      <th
        scope="row"
        class="px-4 py-4 font-medium text-center text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800"
      >
        {props.slot}
      </th>
      <td class="px-4 text-center py-4">{props.from}</td>
      <td class="px-4 py-4 text-center bg-gray-50 dark:bg-gray-800">
        {props.to}
      </td>
      <td class="px-4 py-4 text-center">
        {props.allowInput === true ? (
          <select
            id="availability"
            name="availability"
            onChange={handleAvailabilityChange}
            defaultValue={props.availability ? "Available" : "Unavailable"}
            class="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="Available">A</option>
            <option value="Unavailable">U</option>
          </select>
        ) : props.availability ? (
          "Available"
        ) : (
          "Unavailable"
        )}
      </td>
    </tr>
  );
};

export default DriverAvailabilityBlock;
