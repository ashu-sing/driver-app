import React, { useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useNavigate } from "react-router-dom";
import { signInWithPhoneNumber, RecaptchaVerifier } from "firebase/auth";
import { auth, db } from "../../firebase/config.js";
import * as Yup from "yup";
import ResponseAlert from "../Alerts/ResponseAlert.js";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../../store/authSlice.js";
import { hashPassword } from "../../helpers/bcrypt.js";
import {
  doc,
  setDoc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function SignUp(props) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [otpInput, setOtpInput] = useState("");
  const [otpLoading, setOtpLoading] = useState(false);
  const [recaptchaVerified, setRecaptchaVerified] = useState(false);
  const [errorValue, setErrorValue] = useState("");
  const [errorStatus, setErrorStatus] = useState("");
  const [openResponse, setOpenResponse] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onCaptchVerify = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        "recaptcha-container",
        {
          size: "normal",
          callback: (response) => {
            // reCAPTCHA solved, allow signInWithPhoneNumber.
            // ...
            setRecaptchaVerified(true);
          },
          "expired-callback": () => {
            // Response expired. Ask user to solve reCAPTCHA again.
            // ...
            setRecaptchaVerified(false);
          },
        },
        auth
      );
    }
  };

  function sendOtpHandler(e) {
    e.preventDefault();
    if (isButtonDisabled) {
      return;
    }
    setOtpLoading(true);
    onCaptchVerify();

    const appVerifier = window.recaptchaVerifier;
    signInWithPhoneNumber(auth, "+91" + phone, appVerifier)
      .then((confirmationResult) => {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        window.confirmationResult = confirmationResult;
        setShowOtpInput(true);
        setOtpLoading(false);
        setErrorStatus(false);
        setErrorValue("OTP sent successfully");
        setOpenResponse(true);

        console.log(confirmationResult);
        setTimeout(() => {
          setOpenResponse(false);
        }, 3000);
        // ...
      })
      .catch((error) => {
        // Error; SMS not sent
        // ...
        setErrorStatus(true);
        setErrorValue("Invalid Phone No");
        setOpenResponse(true);

        setTimeout(() => {
          setOpenResponse(false);
        }, 3000);
      });
  }

  function verifyOtpHandler(e) {
    e.preventDefault();
    window.confirmationResult
      .confirm(otpInput)
      .then((result) => {
        // User signed in successfully.
        const user = result.user;
        console.log(user);

        // logging the user or driver in
        onSignInHandler(user.uid);
        // ...
      })
      .catch((error) => {
        console.log(error);
        setErrorStatus(true);
        setErrorValue("Invalid OTP");
        setOpenResponse(true);

        setTimeout(() => {
          setOpenResponse(false);
        }, 3000);
      });
  }

  const isButtonDisabled =
    password === "" ||
    phone === "" ||
    confirmPassword === "" ||
    otpLoading ||
    password !== confirmPassword ||
    name === "";

  const onSignInHandler = async (authenticationUid) => {
    const q = query(
      collection(db, "users"),
      where("authenticationUid", "==", authenticationUid)
    );

    let user = null;
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      user = doc.data();
    });

    if (user) {
      setErrorStatus(true);
      setErrorValue("User already exists");
      setOpenResponse(true);

      setTimeout(() => {
        setOpenResponse(false);
      }, 3000);
    } else {
      const hashedPassword = await hashPassword(password);

      const newUser = {
        Name: name,
        PhoneNo: phone,
        authenticationUid: authenticationUid,
        password: hashedPassword,
        TotalBookings: [],
        AvailableBookings: [],
        City: "",
        role: {
          isAdmin: false,
          isDriver: false,
          isCustomer: true,
        },
      };

      await setDoc(doc(db, "users", phone), newUser);

      dispatch(
        login({
          uid: newUser.authenticationUid,
          name: newUser.Name,
          role: "customer",
          city: newUser.City,
        })
      );

      navigate("/customer");
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
      <form>
        <div className="mb-6">
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Name
          </label>
          <input
            type="text"
            onChange={(e) => setName(e.target.value)}
            value={name}
            id="name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="John Doe"
            required
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="phone"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Phone
          </label>
          <input
            type="tel"
            id="phone"
            onChange={(e) => setPhone(e.target.value)}
            value={phone}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="9876543210"
            required
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="confirmPassword"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            onChange={(e) => setConfirmPassword(e.target.value)}
            value={confirmPassword}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
        </div>
        {showOtpInput && (
          <div className="mb-6 flex flex-col">
            <label
              htmlFor="otp"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              OTP
            </label>
            <input
              value={otpInput}
              onChange={(e) => setOtpInput(e.target.value)}
              type="text"
              id="otp"
              maxLength="6"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Your OTP here"
              required
            />
          </div>
        )}
        <div
          id="recaptcha-container"
          className={`${showOtpInput && "hidden"} mb-4`}
        ></div>
        {!showOtpInput ? (
          <button
            type="button"
            className={`${
              isButtonDisabled
                ? "bg-gray-100 text-gray-400"
                : "bg-blue-700  hover:bg-blue-800  dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800  text-white"
            } cursor-pointer  focus:ring-4 w-full self-center focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center`}
            onClick={sendOtpHandler}
            disabled={isButtonDisabled}
          >
            Send OTP
          </button>
        ) : (
          <button
            type="submit"
            className="text-white bg-blue-700  hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-32 sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={verifyOtpHandler}
            // verifyOtpHandler will be called here
          >
            Submit
          </button>
        )}
      </form>
    </>
  );
}
