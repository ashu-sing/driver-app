import React, { useEffect, useState } from "react";
import BookingInfoBlock from "../BookingComponents/BookingInfoBlock";
import { DriversTable } from "../../Tables/DriversTable";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../../firebase/config";
import DriverSelectItem from "../BookingComponents/DriverSelectItem";
import { CircularProgress } from "@mui/material";

const convertTimeTo12Hour = (time) => {
  let [hours, minutes] = time.split(":");
  let meridian = "AM";
  if (Number(hours) > 12) {
    hours -= 12;
    meridian = "PM";
  }
  if (hours < 10) hours = `0${hours}`;
  if (minutes < 10) minutes = `0${minutes}`;
  return `${hours}:${minutes} ${meridian}`;
};

const AssignDriverBookingModal = (props) => {
  const bookingItem = props.bookingItem;
  const [driversData, setDriversData] = useState([]);
  const [selectedDriver, setSelectedDriver] = useState(null);
  const [loading, setLoading] = useState(false);
  const [assignLoading, setAssignLoading] = useState(false);

  useEffect(() => {
    getAllCityDrivers();
  }, []);

  const getAllCityDrivers = async () => {
    setLoading(true);
    const q = query(
      collection(db, "users"),
      where("role", "==", {
        isDriver: true,
        isCustomer: false,
        isAdmin: false,
      }),
      where("City", "==", bookingItem.City)
    );

    const querySnapshot = await getDocs(q);
    let drivers = [];
    querySnapshot.forEach((doc) => {
      drivers.push({
        id: doc.id,
        name: doc.data().Name,
        phone: doc.data().PhoneNo,
        city: doc.data().City,
        isAvailableToday: doc.data().isAvailableToday,
      });
    });
    setDriversData(drivers);
    setLoading(false);
  };

  const assignDriverHandler = async () => {
    if (selectedDriver) {
      setAssignLoading(true);
      const driverRef = doc(db, "users", selectedDriver);

      await updateDoc(driverRef, {
        isAvailableToday: false,
      });

      const bookingRef = doc(db, "bookings", bookingItem.id);
      await updateDoc(bookingRef, {
        DriverId: selectedDriver,
        status: {
          isAvailable: false,
          isCompleted: false,
          isCancelled: false,
          isDriverAssigned: true,
        },
      });

      props.closeModal();
      setAssignLoading(false);
    }
  };

  const handleDriverSelect = (id) => {
    setSelectedDriver(id);
  };

  return (
    <div className="absolute left-1/2 h-screen w-2/3 py-4 overflow-y-scroll flex flex-col gap-4 -translate-x-1/2 bg-white rounded-lg">
      <h3 className="text-xl font-sans font-light px-4">Booking Info</h3>
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
        <BookingInfoBlock title="User Id" info={bookingItem.UserId} />
        <BookingInfoBlock
          title="Fare"
          info={bookingItem.Fare || "Not Assigned"}
        />
        <BookingInfoBlock
          title="Booking Date"
          info={new Date(bookingItem?.Date.seconds * 1000).toDateString()}
        />

        <BookingInfoBlock title="Status" info="Available" />
      </div>

      <div className="assign-driver mb-12">
        <h3 className="text-xl font-sans font-light px-4">City Drivers</h3>
        <div className="flex flex-wrap px-6 py-2 gap-2">
          <table className="recent-book-list w-full mt-8 flex flex-col gap-4">
            <tr className="gap-4 w-full text-left flex text-slate-600 font-semibold">
              <th className="font-semibold text-center w-12">Select</th>
              <th className="font-semibold text-center flex-1">Driver</th>
              <th className="font-semibold text-center flex-1">Contact</th>
              <th className="font-semibold text-center flex-1">City</th>

              {/* <th className="font-semibold text-center w-32">Earnings</th>
            <th className="font-semibold text-center w-32">Trips</th> */}
              <th className="font-semibold text-center w-32">Availability</th>

              <th className="font-semibold text-center w-32">Options</th>
            </tr>
            <hr></hr>
            {loading && (
              <div className="flex justify-center items-center">
                <CircularProgress className="!h-3 !w-3" />
              </div>
            )}
            {!loading &&
              driversData?.map((driver) => (
                <DriverSelectItem
                  driver={driver}
                  selectedDriver={selectedDriver}
                  handleDriverSelect={handleDriverSelect}
                />
              ))}
          </table>
          <button
            onClick={assignDriverHandler}
            disabled={!selectedDriver || assignLoading}
            className="bg-blue-500 hover:bg-blue-600 self-center mt-8 mx-auto text-white px-4 py-2 rounded-lg"
          >
            {assignLoading ? (
              <CircularProgress className="!h-3 !w-3" />
            ) : (
              "Assign Driver"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AssignDriverBookingModal;
