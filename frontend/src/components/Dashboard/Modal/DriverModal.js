import React, { forwardRef, useEffect, useState } from "react";
import { Avatar } from "@mui/material";
import DriverInfoBlock from "../../DriverComponents/DriverInfoBlock";
import { doc, onSnapshot, query, getDoc } from "firebase/firestore";
import { formatDate } from "../../../helpers/dates";
import { db } from "../../../firebase/config";
import { CircularProgress } from "@mui/material";
import DriverAvailabilityBlock from "../../DriverComponents/DriverAvailabilityBlock";
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ResponseAlert from "../../Alerts/ResponseAlert";
import { Modal } from "@mui/material";
import { deleteDoc } from "firebase/firestore";
import EditIcon from "@mui/icons-material/Edit";
import DriverUpdateModal from "./DriverUpdateModal";

const DriverModal = forwardRef((props, ref) => {
  const [dateData, setDateData] = useState({});
  const [todayAvailability, setTodayAvailability] = useState(false);
  const [date, setDate] = useState(new Date());
  const [openDeleteConfirm, setOpenDeleteConfirm] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorValue, setErrorValue] = useState("");
  const [errorStatus, setErrorStatus] = useState("");
  const [openResponse, setOpenResponse] = useState(false);
  const driver = props.driver;

  useEffect(() => {
    getTodayData();
  }, []);

  const getTodayData = async () => {
    setLoading(true);
    const unsub = onSnapshot(
      doc(db, "users", driver.id, "AvailabilityDates", formatDate(new Date())),
      (doc) => {
        const source = doc.metadata.hasPendingWrites ? "Local" : "Server";
        console.log(source, " data: ", doc.data());
        setTodayAvailability(doc.data()?.isAvailableToday);
        setDateData(doc.data());
        setLoading(false);
      }
    );
  };

  const getDateData = async (targetDate) => {
    setLoading(true);
    const docRef = doc(
      db,
      "users",
      driver.id,
      "AvailabilityDates",
      formatDate(targetDate)
    );
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      setDateData(docSnap.data());
      setLoading(false);
    } else {
      // docSnap.data() will be undefined in this case
      setDateData({});
      setLoading(false);
    }
  };

  const handleDateChange = (e) => {
    setDate(e.target.valueAsDate);
    getDateData(e.target.valueAsDate);
  };

  const handleDeleteDriver = async () => {
    setOpenResponse(true);
    await deleteDoc(doc(db, "users", driver.id));
    setOpenDeleteConfirm(false);
    setErrorValue("Driver Deleted Successfully");
    setErrorStatus("success");
    setTimeout(() => {
      setOpenResponse(false);
    }, 2000);
  };

  return (
    <>
      <div className="driver-details absolute h-screen overflow-y-scroll left-1/2 -translate-x-1/2 rounded w-[90vw] bg-white px-8 py-4 min-w-96 min-h-96">
        <div className="flex flex-col gap-8">
          <div className="flex items-center justify-between   ">
            <h3 className="text-2xl font-sans font-light">Driver Details</h3>
            <button onClick={() => setOpenUpdateModal(true)} className="text-white bg-blue-500 px-4 text-xl py-2 rounded-md flex gap-1 items-center">
              <EditIcon className="!h-4" />
            </button>
          </div>
          <div className="flex flex-col items-center gap-4">
            <div className="flex flex-col justify-between items-center mt-4">
              <div className="flex flex-wrap -m-2">
                <DriverInfoBlock title="Name" info={driver.name} />
                <DriverInfoBlock title="Contact" info={driver.phone} />
                <DriverInfoBlock title="City" info={driver.city} />
                <DriverInfoBlock
                  title="Driving License No"
                  info={driver.drivingLicense}
                />
                <DriverInfoBlock title="Address" info={driver.address} />
                <DriverInfoBlock
                  title="Availability"
                  info={todayAvailability ? "Available" : "Not Available"}
                />
                <DriverInfoBlock title="Aadhar Card No" info={driver.aadhaar} />
                <DriverInfoBlock
                  title="Pancard Number"
                  info={driver?.pancard?.No ? driver.pancard.No : "Not Added"}
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4 ">
            <h3 className="text-2xl font-sans font-light">Available Timings</h3>
            <div className="flex flex-col gap-4 overflow-y-scroll py-4">
              <div className="relative max-w-sm">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5 text-gray-500 dark:text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </div>
                <input
                  datepicker
                  type="date"
                  onChange={handleDateChange}
                  valueAsDate={date}
                  value={new Date(date).toISOString().split("T")[0]}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Select date"
                />
              </div>
            </div>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase dark:text-gray-400">
                  <tr>
                    <th
                      scope="col"
                      className="px-4 text-center py-3 bg-gray-50 dark:bg-gray-800"
                    >
                      Slot
                    </th>
                    <th scope="col" className="px-4 text-center py-3">
                      From
                    </th>
                    <th
                      scope="col"
                      className="px-4 text-center py-3 bg-gray-50 dark:bg-gray-800"
                    >
                      To
                    </th>
                    <th scope="col" className="px-4 text-center py-3">
                      Availability
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <>
                      <td></td>
                      <td></td>
                      <td className="flex justify-center my-14 mx-auto self-center  items-center">
                        <CircularProgress color="inherit" size={20} />
                      </td>
                      <td></td>
                    </>
                  ) : dateData !== {} ? (
                    dateData?.slots?.map((slot) => (
                      <DriverAvailabilityBlock
                        slot={slot.slot}
                        from={slot.from}
                        key={"today" + slot.slot}
                        allSlots={dateData?.slots}
                        allowInput={false}
                        to={slot.to}
                        handleAvailabilityChange={setTodayAvailability}
                        availability={slot.availability}
                      />
                    ))
                  ) : (
                    <>
                      Not Available
                      <td></td>
                      <td></td>
                      <td className="flex justify-center my-14 mx-auto self-center  items-center">
                        Not Available
                      </td>
                      <td></td>
                    </>
                  )}
                </tbody>
              </table>
            </div>

            <Button
              color="error"
              onClick={() => setOpenDeleteConfirm(true)}
              className="flex gap-2"
            >
              <DeleteIcon />
              Delete Driver
            </Button>
          </div>
          <Modal open={openUpdateModal} onClose={() => setOpenUpdateModal(false)}>
            <DriverUpdateModal onClose={() => setOpenUpdateModal(false)} driver={driver} />
          </Modal>
          <Modal
            open={openDeleteConfirm}
            onClose={() => setOpenDeleteConfirm(false)}
          >
            <div className="flex flex-col gap-6 py-6 px-8 items-center bg-white p-8 rounded absolute -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 ">
              <h3 className="text-center text-lg">
                Are you sure you want to delete this Driver?
              </h3>
              <div className="flex gap-4">
                <button
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                  onClick={handleDeleteDriver}
                >
                  Delete
                </button>
                <button
                  className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
                  onClick={() => setOpenDeleteConfirm(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </Modal>
        </div>
      </div>
      <ResponseAlert
        errorValue={errorValue}
        openResponse={openResponse}
        setOpenResponse={setOpenResponse}
        errorStatus={errorStatus}
      />
    </>
  );
});

export default DriverModal;
