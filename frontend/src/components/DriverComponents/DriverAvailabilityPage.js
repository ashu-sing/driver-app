import React, { useEffect, useState } from "react";
import DriverAvailabilityBlock from "./DriverAvailabilityBlock";
import { getTomorrowDate, formatDate } from "../../helpers/dates";
import { Button } from "@mui/material";
import { Timestamp, or } from "firebase/firestore";
import {
  collection,
  doc,
  setDoc,
  where,
  getDoc,
  query,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase/config";
import { CircularProgress } from "@mui/material";
import ResponseAlert from "../Alerts/ResponseAlert";
import { useSelector } from "react-redux";
// 00:00:00 - 03:00:00
// 03:00:00 - 06:00:00
// 06:00:00 - 09:00:00
// 09:00:00 - 12:00:00
// 12:00:00 - 15:00:00
// 15:00:00 - 18:00:00
// 18:00:00 - 21:00:00
// 21:00:00 - 00:00:00

const defaultUid = "yORHZedYr0RP3Ha9g2CbQMQ0I163";

const DriverAvailabilityPage = () => {
  const [loading, setLoading] = useState(false);
  const [errorValue, setErrorValue] = useState("");
  const [errorStatus, setErrorStatus] = useState("");
  const [openResponse, setOpenResponse] = useState(false);
  const [availableToday, setAvailableToday] = useState(false);

  const { uid } = useSelector((state) => state.auth);

  const [todaySlots, setTodaySlots] = useState([
    {
      slot: "1",
      from: "00:00:00",
      to: "03:00:00",
      availability: false,
    },
    {
      slot: "2",
      from: "03:00:00",
      to: "06:00:00",
      availability: false,
    },
    {
      slot: "3",
      from: "06:00:00",
      to: "09:00:00",
      availability: false,
    },
    {
      slot: "4",
      from: "09:00:00",
      to: "12:00:00",
      availability: false,
    },
    {
      slot: "5",
      from: "12:00:00",
      to: "15:00:00",
      availability: false,
    },
    {
      slot: "6",
      from: "15:00:00",
      to: "18:00:00",
      availability: false,
    },
    {
      slot: "7",
      from: "18:00:00",
      to: "21:00:00",
      availability: false,
    },
    {
      slot: "8",
      from: "21:00:00",
      to: "00:00:00",
      availability: false,
    },
  ]);

  const [tomorrowSlots, setTomorrowSlots] = useState([
    {
      slot: "1",
      from: "00:00:00",
      to: "03:00:00",
      availability: true,
    },
    {
      slot: "2",
      from: "03:00:00",
      to: "06:00:00",
      availability: false,
    },
    {
      slot: "3",
      from: "06:00:00",
      to: "09:00:00",
      availability: false,
    },
    {
      slot: "4",
      from: "09:00:00",
      to: "12:00:00",
      availability: false,
    },
    {
      slot: "5",
      from: "12:00:00",
      to: "15:00:00",
      availability: false,
    },
    {
      slot: "6",
      from: "15:00:00",
      to: "18:00:00",
      availability: false,
    },
    {
      slot: "7",
      from: "18:00:00",
      to: "21:00:00",
      availability: false,
    },
    {
      slot: "8",
      from: "21:00:00",
      to: "00:00:00",
      availability: false,
    },
  ]);

  useEffect(() => {
    getAvailability();
  }, []);

  useEffect(() => {}, [todaySlots, tomorrowSlots]);

  const getAvailability = async () => {
    setLoading(true);
    const q = query(
      collection(db, "users"),
      where("authenticationUid", "==", uid)
    );

    let id = null;
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      id = doc.id;
    });

    const q2 = query(
      collection(db, "users", id, "AvailabilityDates"),
      where("date", "in", [
        formatDate(new Date()).replace("/", "-").replace("/", "-"),
        formatDate(getTomorrowDate()).replace("/", "-").replace("/", "-"),
      ])
    );

    const querySnapshot2 = await getDocs(q2);

    querySnapshot2.forEach((doc) => {
      if (
        doc.data().date ===
        formatDate(new Date()).replace("/", "-").replace("/", "-")
      ) {
        setTodaySlots(doc.data().slots);
        setAvailableToday(doc.data().isAvailableToday);
      } else {
        setTomorrowSlots(doc.data().slots);
      }
    });
    setLoading(false);
  };

  const setTomorrowAvailability = (slot, availability) => {
    setTomorrowSlots(
      tomorrowSlots.map((tomorrowSlot) =>
        tomorrowSlot.slot === slot
          ? { ...tomorrowSlot, availability: availability }
          : tomorrowSlot
      )
    );
  };
  const setTodayAvailability = (slot, availability) => {
    setTodaySlots(
      todaySlots.map((todaySlot) =>
        todaySlot.slot === slot
          ? { ...todaySlot, availability: availability }
          : todaySlot
      )
    );
  };

  const todayUpdateClickHandler = async () => {
    setLoading(true);

    const q = query(
      collection(db, "users"),
      where("authenticationUid", "==", uid)
    );

    let id = null;
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      id = doc.id;
    });
    
    await updateDoc(doc(db, "users", id), {
      isAvailableToday: availableToday,
    });

    setDoc(
      doc(
        db,
        "users",
        id,
        "AvailabilityDates",
        formatDate(new Date()).replace("/", "-").replace("/", "-")
      ),
      {
        isAvailableToday: availableToday,
        date: formatDate(new Date()).replace("/", "-").replace("/", "-"),
        slots: todaySlots,
      }
    )
      .then(() => {
        setLoading(false);
        setOpenResponse(true);
        setErrorValue("Availability Updated");
        setErrorStatus("success");

        setTimeout(() => {
          setOpenResponse(false);
        }, 3000);
      })
      .catch((error) => {
        setLoading(false);
        setOpenResponse(true);
        setErrorValue(error.message);
        setErrorStatus("error");

        setTimeout(() => {
          setOpenResponse(false);
        }, 3000);
      });
  };

  const tomorrowUpdateClickHandler = async () => {
    setLoading(true);

    const q = query(
      collection(db, "users"),
      where("authenticationUid", "==", uid)
    );

    let id = null;
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      id = doc.id;
    });

    setDoc(
      doc(
        db,
        "users",
        id,
        "AvailabilityDates",
        formatDate(getTomorrowDate()).replace("/", "-").replace("/", "-")
      ),
      {
        date: formatDate(getTomorrowDate()).replace("/", "-").replace("/", "-"),
        slots: tomorrowSlots,
      }
    )
      .then(() => {
        setLoading(false);
        setOpenResponse(true);
        setErrorValue("Availability Updated");
        setErrorStatus("success");

        setTimeout(() => {
          setOpenResponse(false);
        }, 3000);
      })
      .catch((error) => {
        setLoading(false);
        setOpenResponse(true);
        setErrorValue(error.message);
        setErrorStatus("error");

        setTimeout(() => {
          setOpenResponse(false);
        }, 3000);
      });
  };

  const handleChangeAvailabilityToday = (e) => {
    if (e.target.value === "false") {
      setTodaySlots(
        todaySlots.map((todaySlot) =>
          todaySlot.availability === false
            ? { ...todaySlot, availability: false }
            : todaySlot
        )
      );
      setAvailableToday(false);
    } else {
      setAvailableToday(true);
    }
  };

  return (
    <>
      <ResponseAlert
        errorValue={errorValue}
        openResponse={openResponse}
        setOpenResponse={setOpenResponse}
        errorStatus={errorStatus}
      />
      <div className="set-availabilityPage">
        <div className="flex flex-col gap-4 justify-center mt-6 mb-6">
          <h1 className="text-xl text-center font-semibold">
            Are you available for today?
          </h1>

          <select
            className="w-1/2 mx-auto"
            value={availableToday ? "true" : "false"}
            onChange={handleChangeAvailabilityToday}
          >
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>

        <h1 className="text-2xl text-center mt-4 font-semibold">
          Set Availability
        </h1>
        <div className="flex w-full my-12 justify-between">
          <p>Available: A</p>
          <p>Unavailable: U</p>
        </div>
        <div className="flex gap-8 flex-col w-full">
          <div className="flex flex-col gap-4 justify-center mt-4">
            <h1 className="text-xl text-center font-semibold">
              Today ({new Date().toDateString()})
            </h1>

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
                  ) : availableToday ? (
                    todaySlots.map((slot) => (
                      <DriverAvailabilityBlock
                        slot={slot.slot}
                        from={slot.from}
                        key={"today" + slot.slot}
                        allowInput={true}
                        allSlots={todaySlots}
                        to={slot.to}
                        handleAvailabilityChange={setTodayAvailability}
                        availability={slot.availability}
                      />
                    ))
                  ) : (
                    <>
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
              className="w-full mx-auto !mt-4 self-center !bg-blue-500 !text-white"
              color="primary"
              onClick={todayUpdateClickHandler}
              disabled={loading}
            >
              {loading ? (
                <CircularProgress color="inherit" size={20} />
              ) : (
                "Update for Today"
              )}
            </Button>
          </div>
          <hr />
          <div className="w-full flex flex-col gap-4 items-center justify-center mt-4">
            <h1 className="text-center text-xl font-semibold">
              Tomorrow ({getTomorrowDate().toDateString()})
            </h1>

            <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-4 w-full">
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
                <tbody className="w-full">
                  {loading ? (
                    <>
                      <tr>
                        <td></td>
                        <td></td>
                        <td className="flex justify-center my-14 mx-auto self-center  items-center">
                          <CircularProgress color="inherit" size={20} />
                        </td>
                        <td></td>
                      </tr>
                    </>
                  ) : (
                    tomorrowSlots.map((slot) => (
                      <DriverAvailabilityBlock
                        slot={slot.slot}
                        from={slot.from}
                        key={"tomporrow" + slot.slot}
                        allowInput={true}
                        to={slot.to}
                        allSlots={tomorrowSlots}
                        handleAvailabilityChange={setTomorrowAvailability}
                        availability={slot.availability}
                      />
                    ))
                  )}
                </tbody>
              </table>
            </div>

            <Button
              className="!mt-4 !w-full !bg-blue-500 !text-white"
              color="primary"
              onClick={tomorrowUpdateClickHandler}
              disabled={loading}
            >
              {loading ? (
                <CircularProgress color="inherit" size={20} />
              ) : (
                "Update for Tomorrow"
              )}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DriverAvailabilityPage;
