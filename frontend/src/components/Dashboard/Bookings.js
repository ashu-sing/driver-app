import React, { useEffect, useState } from "react";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import BookingTableComponent from "./BookingComponents/BookingTableComponent";
import { db } from "../../firebase/config";
import { CircularProgress } from "@mui/material";
import AssignedBookings from "./BookingComponents/AssignedBookings";
import AssignedBookingModal from "./Modal/AssignedBookingModal";

const Bookings = () => {
  const [availableBookings, setAvailableBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openAvailableModal, setOpenAvailableModal] = useState(false);

  useEffect(() => {
    getAvailableBookings();
  }, []);

  const getAvailableBookings = () => {
    setLoading(true);

    const q = query(
      collection(db, "bookings"),
      where("status", "==", {
        isAvailable: true,
        isCompleted: false,
        isCancelled: false,
        isDriverAssigned: false,
      })
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let bookings = [];
      querySnapshot.forEach((doc) => {
        bookings.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setAvailableBookings(bookings);
      setLoading(false);
    });
  };

  return (
    <>
      <div className="py-8 flex flex-col gap-4 h-screen overflow-y-scroll">
        <h3 className="text-3xl px-6 font-sans font-light">Manage Bookings</h3>
        <hr />
        <div className="flex flex-col gap-4 px-4 py-6 max-h-[500px] overflow-y-scroll">
          <h3 className="text-xl text-center underline font-semibold">
            Available Bookings
          </h3>
          {loading && <CircularProgress className="self-center" />}
          {!loading && <BookingTableComponent bookings={availableBookings} />}
        </div>

        <AssignedBookings />
      </div>
    </>
  );
};

export default Bookings;
