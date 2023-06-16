import React, { useEffect, useState } from "react";
import DriverBg from "../../assets/dashboard/DriverBg.jpg";
import CarIcon from "../../assets/dashboard/CarIcon.svg";
import AvailableIcon from "../../assets/dashboard/AvailableIcon.svg";
import RidesIcon from "../../assets/dashboard/RidesIcon.svg";
import DriveridIcon from "../../assets/dashboard/DriveridIcon.svg";
import BookingIcon2 from "../../assets/dashboard/BookingIcon2.svg";
import TripIcon from "../../assets/dashboard/TripIcon.svg";
import AddDriverForm from "./AddDriverForm";
import { DriversTable } from "../Tables/DriversTable";
import { Modal } from "@mui/material";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/config";
import { CircularProgress } from "@mui/material";

const Drivers = () => {
  const [openAddForm, setOpenAddForm] = useState(false);
  const [driversData, setDriversData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [unsubscribeFn, setUnsubscribeFn] = useState(null);

  useEffect(() => {
    getAllDrivers();
  }, []);

  const getAllDrivers = async () => {
    setLoading(true);
    const q = query(
      collection(db, "users"),
      where("role", "==", {
        isDriver: true,
        isCustomer: false,
        isAdmin: false,
      })
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const users = [];
      querySnapshot.forEach((doc) => {
        const user = doc.data();

        if (user !== undefined) {
          users.push({
            id: doc.id,
            name: user.Name,
            city: user.City,
            phone: user.PhoneNo,
            pancard: user.Pancard,
            aadhaar: user.AadhaarCardNo,
            address: user.CurrentAddress,
            drivingLicense: user.DrivingLicenseNo,
          });
        }
      });

      setUnsubscribeFn(unsubscribe);
      setLoading(false);
      setDriversData(users);
    });
  };

  return (
    <div className="driver-panel pt-8 px-8 h-[100vh] flex flex-col overflow-y-scroll">
      <div className="flex flex-col">
        <h3 className="text-3xl font-sans font-light">Drivers</h3>
        <div className="flex justify-between items-center">
          <div className="order-info flex gap-14">
            <div className="order-field flex gap-2 flex-col ">
              <img src={DriveridIcon} alt="car-field" className="h-6 w-fit" />
              <h2 className="font-semibold text-lg">Total Drivers</h2>
              <span className="text-xl text-slate-500">
                {driversData.length}
              </span>
            </div>
            <div className="order-field flex gap-2 flex-col ">
              <img src={BookingIcon2} alt="car-field" className="h-6 w-fit" />
              <h2 className="font-semibold text-lg">Total Bookings</h2>
              <span className="text-xl text-slate-500">0</span>
            </div>
            <div className="order-field flex gap-2 flex-col ">
              <img
                src={TripIcon}
                alt="car-field"
                className="h-6 w-fit text-blue-100"
              />
              <h2 className="font-semibold text-lg">Total Trips</h2>
              <span className="text-xl text-slate-500">0</span>
            </div>
            <div className="order-field flex gap-2 flex-col ">
              <img src={RidesIcon} alt="car-field" className="h-6 w-fit" />
              <h2 className="font-semibold text-lg">Bookings Per Driver</h2>
              <span className="text-xl text-slate-500">0</span>
            </div>
          </div>
          <img src={DriverBg} className="h-64" />
        </div>
      </div>
      <div className="drivers-section">
        <h3 className="text-3xl font-sans font-light">Manage Drivers</h3>
        <div className="drivers-table mt-6">
          {!loading ? (
            <DriversTable data={driversData} />
          ) : (
            <div className="flex justify-center items-center h-96">
              <CircularProgress />
            </div>
          )}
        </div>
      </div>

      <button
        onClick={() => setOpenAddForm(true)}
        className="add-driver-btn my-8 mx-auto hover:bg-lime-600 transition-all duration-300 self-center hover:text-white px-4 py-2 border border-lime-600 text-lime-600"
      >
        Add Driver
      </button>

      <Modal
        open={openAddForm}
        onClose={() => setOpenAddForm(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <AddDriverForm
          onClose={() => setOpenAddForm(false)}
          ref={React.createRef()}
        />
      </Modal>
    </div>
  );
};

export default Drivers;
