import React from "react";
import BookingInfoBlock from "../BookingComponents/BookingInfoBlock";
import { convertTimeTo12Hour } from "../../../helpers/dates";

const AssginedBookingModal = (props) => {
  const bookingItem = props.bookingItem;
  return (
    <div className="assigned-booking-model w-2/3 absolute max-h-screen py-6 flexx flex-col gap-4 bg-white rounded overflow-y-scroll -translate-x-1/2 left-1/2">
      <h3 className="booking-details px-6 text-xl font-sans font-light">Booking Details</h3>
      <div className="flex flex-wrap booking info px-4">
        <BookingInfoBlock title="Booking ID" info={bookingItem?.id} />
        <BookingInfoBlock title="City" info={bookingItem.City} />

        <BookingInfoBlock
          title="Pickup Address"
          info={bookingItem.PickupAddress}
        />
        <BookingInfoBlock
          title="Destination Address"
          info={bookingItem.DestinationAddress}
        />
        <BookingInfoBlock
          title="Pickup Date"
          info={new Date(
            bookingItem?.DateOfPickup.seconds * 1000
          ).toDateString()}
        />
        <BookingInfoBlock
          title="Pickup Time"
          info={convertTimeTo12Hour(bookingItem.TimeOfPickup)}
        />

        <BookingInfoBlock
          title="Alternate Contact"
          info={bookingItem.UserAlternateContact}
        />
        <BookingInfoBlock
          title="Driver Id"
          info={bookingItem.DriverId}
        />
        <BookingInfoBlock title="User Id" info={bookingItem.UserId} />
        <BookingInfoBlock
          title="Fare"
          info={bookingItem.Fare || "Not Assigned"}
        />
        <BookingInfoBlock
          title="Booking Date"
          info={new Date(bookingItem?.Date.seconds * 1000).toDateString()}
        />

        <BookingInfoBlock title="Status" info={bookingItem.status.isDriverAssigned ? "Driver Assigned" : "Available"}/>
      </div>
      l
    </div>
  );
};

export default AssginedBookingModal;
