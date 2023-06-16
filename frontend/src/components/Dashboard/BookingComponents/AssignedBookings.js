import React, { useEffect, useState } from "react";
import { db } from "../../../firebase/config";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import AssignedBookingsItem from "./AssignedBookingItem";

const AssignedBookings = () => {
  const [assignedBookings, setAssignedBookings] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getAssignedBookings();
  }, []);

  const getAssignedBookings = () => {
    setLoading(true);

    const q = query(
      collection(db, "bookings"),
      where("status", "==", {
        isAvailable: false,
        isCompleted: false,
        isCancelled: false,
        isDriverAssigned: true,
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
      console.log(bookings);
      setAssignedBookings(bookings);
      setLoading(false);
    });
  };

  return (
    <div className="flex flex-col gap-4 px-4 py-6 max-h-[500px] overflow-y-scroll">
      <h3 className="text-xl text-center underline font-semibold">
        Assigned Bookings
      </h3>
      <table className="recent-book-list w-full mt-8 flex flex-col gap-4">
        <tr className="gap-4 w-full text-left flex justify-between text-slate-600 font-semibold">
          <th className="font-semibold text-center w-12">#</th>
          <th className="font-semibold text-center flex-1 ">
            Customer Contact
          </th>
          <th className="font-semibold text-center flex-1 ">Driver Contact</th>
          <th className="font-semibold text-center flex-1 ">City</th>
          <th className="font-semibold text-center flex-1 ">Date</th>
          <th className="font-semibold text-center w-64">Destination</th>
          <th className="font-semibold text-center min-w-14 flex-1">Options</th>
        </tr>
        <hr></hr>
        {assignedBookings.map((booking, index) => (
          <AssignedBookingsItem
            index={index + 1}
            key={booking.id}
            booking={booking}
          />
        ))}
        <hr></hr>
      </table>
    </div>
  );
};

export default AssignedBookings;
