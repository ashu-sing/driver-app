import React from "react";
import Logo from "../../assets/icons/logo.svg";
import { NavLink } from "react-router-dom";
import DashboardIcon from "../../assets/dashboard/DashboardIcon.svg";
import DriverIcon from "../../assets/dashboard/DriverIcon.svg";
import BookingIcon from "../../assets/dashboard/BookingIcon.svg";
import CustomerIcon from "../../assets/dashboard/CustomerIcon.svg";
import FeedbackIcon from "../../assets/dashboard/FeedbackIcon.svg";
import TransactionIcon from "../../assets/dashboard/TransactionIcon.svg";
import ReportsIcon from "../../assets/dashboard/ReportsIcon.svg";

const Sidebar = () => {
  return (
    <div className="w-[300px] bg-[#02150e] h-[100vh] py-4 px-6 ">
      <div className="items-center mt-4 flex w-full justify-between">
        <span className="self-center items-center flex text-white text-xl  font-semibold whitespace-nowrap dark:text-white">
          <img src={Logo} className="h-6 mr-3" alt="Logo" />
          Cruise Control
        </span>
        <span className="px-2 py-1 text-xs text-black bg-[#fad77e]">Admin</span>
      </div>

      <div className="mt-16 px-2 flex flex-col gap-2">
        <p className="ml-2 text-sm font-semibold text-lime-700">Park</p>
        <ul className="space-y-2">
          <li>
            <NavLink
              to="/admin"
              className={({ isActive }) =>
                isActive
                  ? "text-[#fad77e] flex items-center gap-2 space-x-2 text-sm font-semibold p-2 rounded-lg"
                  : "flex items-center gap-2 space-x-2 text-white text-sm font-semibold p-2 rounded-lg"
              }
            >
              <img src={DashboardIcon} className="h-4" alt="Dashboard Icon" />
              <span className="text-[1.01rem]">Dashboard</span>
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/admin/drivers"
              className={({ isActive }) =>
                isActive
                  ? "text-[#fad77e] flex items-center gap-2 space-x-2 text-sm font-semibold p-2 rounded-lg"
                  : "flex items-center gap-2 space-x-2 text-white text-sm font-semibold p-2 rounded-lg"
              }
            >
              <img src={DriverIcon} className="h-4" alt="Dashboard Icon" />
              <span className="text-[1.01rem]">Drivers</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/bookings"
              className={({ isActive }) =>
                isActive
                  ? "text-[#fad77e] flex items-center gap-2 space-x-2 text-sm font-semibold p-2 rounded-lg"
                  : "flex items-center gap-2 space-x-2 text-white text-sm font-semibold p-2 rounded-lg"
              }
            >
              <img src={BookingIcon} className="h-4" alt="Dashboard Icon" />
              <span className="text-[1.01rem]">Booking</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/customers"
              className={({ isActive }) =>
                isActive
                  ? "text-[#fad77e] flex items-center gap-2 space-x-2 text-sm font-semibold p-2 rounded-lg"
                  : "flex items-center gap-2 space-x-2 text-white text-sm font-semibold p-2 rounded-lg"
              }
            >
              <img src={CustomerIcon} className="h-4" alt="Dashboard Icon" />
              <span className="text-[1.01rem]">Customers</span>
            </NavLink>
          </li>
        </ul>
      </div>
      {/* <div className="mt-14 px-2 flex flex-col gap-2">
        <p className="ml-2 text-sm font-semibold text-lime-700">Reports</p>
        <ul className="space-y-2">
          <li>
            <NavLink
              to="/admin/reviews"
              className={({ isActive }) =>
                isActive
                  ? "text-[#fad77e] flex items-center gap-2 space-x-2 text-sm font-semibold p-2 rounded-lg"
                  : "flex items-center gap-2 space-x-2 text-white text-sm font-semibold p-2 rounded-lg"
              }
            >
              <img src={FeedbackIcon} className="h-4" alt="Dashboard Icon" />
              <span className="text-[1.01rem]">Feedback</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/transactions"
              className={({ isActive }) =>
                isActive
                  ? "text-[#fad77e] flex items-center gap-2 space-x-2 text-sm font-semibold p-2 rounded-lg"
                  : "flex items-center gap-2 space-x-2 text-white text-sm font-semibold p-2 rounded-lg"
              }
            >
              <img src={TransactionIcon} className="h-4" alt="Dashboard Icon" />
              <span className="text-[1.01rem]">Transactions</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/reports"
              className={({ isActive }) =>
                isActive
                  ? "text-[#fad77e] flex items-center gap-2 space-x-2 text-sm font-semibold p-2 rounded-lg"
                  : "flex items-center gap-2 space-x-2 text-white text-sm font-semibold p-2 rounded-lg"
              }
            >
              <img src={ReportsIcon} className="h-4" alt="Dashboard Icon" />
              <span className="text-[1.01rem]">Report</span>
            </NavLink>
          </li>
        </ul>
      </div> */}

      <div className="mt-14 px-2 flex flex-col gap-2">{/* <hr></hr> */}</div>
    </div>
  );
};

export default Sidebar;
