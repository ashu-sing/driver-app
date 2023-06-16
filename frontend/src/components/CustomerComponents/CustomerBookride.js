import React from "react";
import BookingForm from "./BookingForm";

const CustomerBookride = () => {
  return (
    <div className="flex flex-col">
      <h3 className="text-2xl font-bold text-center">Book a Ride</h3>
      <BookingForm />
    </div>
  );
};

export default CustomerBookride;
