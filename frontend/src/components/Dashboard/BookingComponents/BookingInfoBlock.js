import React from "react";

const BookingInfoBlock = (props) => {
  return (
    <div className="p-2 lg:w-1/3 md:w-1/2 w-full">
      <div className="h-full flex items-center border-gray-200 border p-4 rounded-lg">
        <div className="flex-grow">
          <h2 className="text-gray-900 title-font font-medium">
            {props.title}
          </h2>
          <p className="text-gray-500">{props.info}</p>
        </div>
      </div>
    </div>
  );
};

export default BookingInfoBlock;
