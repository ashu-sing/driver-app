import React from "react";
import ScaleupIcon from "../../assets/dashboard/ScaleupIcon.svg";
import TaxiAdminImg from "../../assets/dashboard/taxi-admin.jpg";
import CarIcon from "../../assets/dashboard/CarIcon.svg";
import AvailableIcon from "../../assets/dashboard/AvailableIcon.svg";
import RidesIcon from "../../assets/dashboard/RidesIcon.svg";
import { Avatar } from "@mui/material";

const Dashboard = () => {
  return (
    <div className="dashboard-panel  h-[100vh] flex">
      <div className="statistics bg-[#f9f7f2] pt-8 h-full flex flex-col w-96">
        <div className="statistics-top flex flex-col gap-2 px-8">
          <h3 className="text-3xl font-sans font-light">Statistics</h3>
          <p className="today text-sm">Today: {new Date().toDateString()}</p>

          <span className="better-performance text-xs  mt-4 flex gap-2 items-center justify-center bg-white px-4 py-2">
            <img className="h-3" src={ScaleupIcon} alt="scale-up-icon" />
            Better performance
          </span>
        </div>

        <div className="stats-meta mt-12 flex flex-col gap-12 px-8">
          <div className="row flex justify-between">
            <div className="stats-meta__box flex flex-col gap-4 w-1/2">
              <h3 className="text-sm font-semibold">Bookings</h3>
              <div className="stats-meta__info flex flex-col gap-1">
                <p className="stats-label text-xs text-slate-300">
                  Total bookings
                </p>
                <span className="stats-data font-semibold">1000</span>
              </div>
            </div>
            <div className="stats-meta__box flex flex-col gap-4 w-1/2">
              <h3 className="text-sm font-semibold">Income</h3>
              <div className="stats-meta__info flex flex-col gap-1">
                <p className="stats-label text-xs text-slate-300">
                  Total price
                </p>
                <span className="stats-data font-semibold">₹12560.00</span>
              </div>
            </div>
          </div>
          <div className="row flex justify-between">
            <div className="stats-meta__box flex flex-col gap-4 w-1/2">
              <h3 className="text-sm font-semibold">Middle Price</h3>
              <div className="stats-meta__info flex flex-col gap-1">
                <p className="stats-label text-xs text-slate-300">
                  Amount per mile
                </p>
                <span className="stats-data font-semibold">₹24.00</span>
              </div>
            </div>
            <div className="stats-meta__box flex flex-col gap-4 w-1/2">
              <h3 className="text-sm font-semibold">Park Load</h3>
              <div className="stats-meta__info flex flex-col gap-1">
                <p className="stats-label text-xs text-slate-300">
                  Number of Drivers
                </p>
                <span className="stats-data font-semibold">78</span>
              </div>
            </div>
          </div>
        </div>

        <hr className="mt-12"></hr>

        <div className="mt-4 ">
          <div className="row flex flex-col gap-4 px-8">
            <div className="flex flex-col gap-2 text-center">
              <h3 className="bottom-head text-xl font-semibold">
                Total Customers
              </h3>
              <span className="bottom-info text-lg">3000</span>
            </div>
            <div className="flex flex-col gap-2 text-center">
              <h3 className="bottom-head text-xl font-semibold">
                Customers per day
              </h3>
              <span className="bottom-info text-lg">100/day</span>
            </div>
          </div>
        </div>
        <div className="statistics-total-income mt-9 flex px-8 flex-1 bg-[#f1eee3] font-semibold text-xl justify-center py-8 gap-8">
          <span className="">Total Income:</span>
          <span>₹15000.00</span>
        </div>
      </div>
      <div className="order-profits pt-8 h-full flex flex-col flex-1 overflow-y-scroll">
        <div className="orders-profits-top px-8">
          <h3 className="text-3xl font-sans font-light">
            Bookings and profits
          </h3>
          <div className="cars-order flex gap-8 mt-4 items-center">
            <img src={TaxiAdminImg} className="h-48" />
            <div className="order-info flex gap-14">
              <div className="order-field flex gap-2 flex-col ">
                <img src={CarIcon} alt="car-field" className="h-6 w-fit" />
                <h2 className="font-semibold text-lg">Total Cars</h2>
                <span className="text-xl text-slate-500">48</span>
              </div>
              <div className="order-field flex gap-2 flex-col ">
                <img
                  src={AvailableIcon}
                  alt="car-field"
                  className="h-6 w-fit"
                />
                <h2 className="font-semibold text-lg">Available Bookings</h2>
                <span className="text-xl text-slate-500">25</span>
              </div>
              <div className="order-field flex gap-2 flex-col ">
                <img src={RidesIcon} alt="car-field" className="h-6 w-fit" />
                <h2 className="font-semibold text-lg">Total Rides</h2>
                <span className="text-xl text-slate-500">200</span>
              </div>
            </div>
          </div>
        </div>

        <div className="recent-bookings px-8 mt-6">
          <h3 className="text-3xl font-sans font-light">Recent Bookings</h3>
          <table className="recent-book-list w-full mt-8 flex flex-col gap-4">
            <tr className="gap-4 w-full text-left flex text-slate-600 font-semibold">
              <th className="font-semibold w-12">#</th>
              <th className="font-semibold flex-1">Driver</th>
              <th className="font-semibold flex-1">Customer</th>
              <th className="font-semibold w-32">Status</th>
              <th className="font-semibold w-32">Cost</th>
            </tr>
            <hr></hr>
            <tr className="gap-4 flex justify-between w-full text-left">
              <td className="w-12">1.</td>
              <td className="flex-1 flex gap-2 items-center">
                <Avatar src={AvailableIcon} className="!h-6 !w-6 border" />
                <span className="driver-name">Gurvinder Singh</span>
              </td>
              <td className="flex-1 flex gap-2 items-center">
                <Avatar src={AvailableIcon} className="!h-6 !w-6 border" />
                <span className="customer-name">Kirti Thakur</span>
              </td>
              <td className="w-32">Completed</td>
              <td className="w-32">₹19.00</td>
            </tr>
            <hr></hr>
            <tr className="gap-4 flex justify-between w-full text-left">
              <td className="w-12">2.</td>
              <td className="flex-1 flex gap-2 items-center">
                <Avatar src={AvailableIcon} className="!h-6 !w-6 border" />
                <span className="driver-name">Ravi Kumar</span>
              </td>
              <td className="flex-1 flex gap-2 items-center">
                <Avatar src={AvailableIcon} className="!h-6 !w-6 border" />
                <span className="customer-name">Siraj Sen</span>
              </td>
              <td className="w-32">Completed</td>
              <td className="w-32">₹35.00</td>
            </tr>
            <hr></hr>
          </table>
        </div>
        <div className="recent-feedbacks px-8 mt-8">
          <h3 className="text-3xl font-sans font-light">Customer Feedbacks</h3>
          <table className="recent-book-list w-full mt-8 flex flex-col gap-4">
            <tr className="gap-4 w-full text-left flex text-slate-600 font-semibold">
              <th className="font-semibold w-12">#</th>
              <th className="font-semibold flex-1">Driver</th>
              <th className="font-semibold flex-1">Customer</th>
              <th className="font-semibold w-64">Feedback</th>
            </tr>
            <hr></hr>
            <tr className="gap-4 flex justify-between w-full text-left items-center">
              <td className="w-12">1.</td>
              <td className="flex-1 flex gap-2 items-center">
                <Avatar src={AvailableIcon} className="!h-6 !w-6 border" />
                <span className="driver-name">Ravi Kumar</span>
              </td>
              <td className="flex-1 flex gap-2 items-center">
                <Avatar src={AvailableIcon} className="!h-6 !w-6 border" />
                <span className="customer-name">Kirti Thakur</span>
              </td>
              <td className="w-64">Wow! That was an Awesome...</td>
            </tr>
            <hr></hr>
            <tr className="gap-4 flex justify-between w-full text-left items-center">
              <td className="w-12">2.</td>
              <td className="flex-1 flex gap-2 items-center">
                <Avatar src={AvailableIcon} className="!h-6 !w-6 border" />
                <span className="driver-name">Gurvinder Singh</span>
              </td>
              <td className="flex-1 flex gap-2 items-center">
                <Avatar src={AvailableIcon} className="!h-6 !w-6 border" />
                <span className="customer-name">Siraj Sen</span>
              </td>
              <td className="w-64">Well determined prices</td>
            </tr>
            <hr></hr>

          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
