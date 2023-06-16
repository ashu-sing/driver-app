import React, { useEffect, useState } from "react";
import DriverInfoBlock from "./DriverInfoBlock";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../firebase/config";
import { CircularProgress } from "@mui/material";
import { useSelector } from "react-redux";

const defaultUid = "yORHZedYr0RP3Ha9g2CbQMQ0I163";

const DriverProfilePage = () => {
  const [driver, setDriver] = useState({});
  const [loading, setLoading] = useState(true);

  const uid = useSelector((state) => state.auth.uid);
  const getDriver = async () => {
    const q = query(
      collection(db, "users"),
      where("authenticationUid", "==", uid)
    );

    let user = null;
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      user = doc.data();
    });

    setLoading(false);

    setDriver({
      name: user.Name,
      contact: user.PhoneNo,
      city: user.City,
      address: user.CurrentAddress,
      drivingLicenseNo: user.DrivingLicenseNo,
      availability: user.isAvailable ? "Available" : "Not Available",
      aadharCardNo: user.AadhaarCardNo,
      panCardNo: user.Pancard?.No,
    });
  };

  useEffect(() => {
    getDriver();
  }, []);

  return (
    <section className="text-gray-600 body-font -mt-4">
      <div className="container px-5 py-14 mx-auto">
        {loading ? (
          <div className="flex justify-center items-center h-96">
            <CircularProgress />
          </div>
        ) : (
          <>
            <div className="flex flex-col text-center w-full mb-10">
              <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
                Welcome, Pulkit Gupta
              </h1>
            </div>
            <div className="flex flex-wrap -m-2">
              <DriverInfoBlock title="Name" info={driver.name} />
              <DriverInfoBlock title="Contact" info={driver.contact} />
              <DriverInfoBlock title="City" info={driver.city} />
              <DriverInfoBlock
                title="Driving License No"
                info={driver.drivingLicenseNo}
              />
              <DriverInfoBlock title="Address" info={driver.address} />
              <DriverInfoBlock
                title="Availability"
                info={driver.availability}
              />
              <DriverInfoBlock
                title="Aadhar Card No"
                info={driver.aadharCardNo}
              />
              <DriverInfoBlock title="Pancard Number" info={driver.panCardNo} />
            </div>
          </>
        )}

        <button
          onClick={getDriver}
          disabled={loading}
          className={`flex mx-auto mt-8 text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-l ${
            loading && "bg-slate-200 text-gray-300"
          }`}
        >
          Refresh
        </button>
      </div>
    </section>
  );
};

export default DriverProfilePage;
