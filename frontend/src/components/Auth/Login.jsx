import React, { useState, useContext } from "react";
// import axios from "axios";
import { useNavigate } from "react-router-dom";
// import AuthContext from "../../context/AuthContext";
import { signInWithPhoneNumber, RecaptchaVerifier } from "firebase/auth";
import { auth, db } from "../../firebase/config.js";
import * as Yup from "yup";
import ResponseAlert from "../Alerts/ResponseAlert.js";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../../store/authSlice.js";
import { comparePassword } from "../../helpers/bcrypt.js";

const loginSchema = Yup.object().shape({
  phone: Yup.string().max(10).required("Phone is required"),
  password: Yup.string().required("Password is required"),
});

// to be removed
const defaultUid = "yORHZedYr0RP3Ha9g2CbQMQ0I163";

export default function Login(props) {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [otpInput, setOtpInput] = useState("");
  const [otpLoading, setOtpLoading] = useState(false);
  const [recaptchaVerified, setRecaptchaVerified] = useState(false);
  const [errorValue, setErrorValue] = useState("");
  const [errorStatus, setErrorStatus] = useState("");
  const [openResponse, setOpenResponse] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // authenticationuid to be provided here as an argument and e to be removed
  const onLoginHandler = async (authenticationUid) => {
    const q = query(
      collection(db, "users"),
      where("authenticationUid", "==", authenticationUid)
    );

    let user = null;
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      user = doc.data();
    });

    const isPasswordMatched = await comparePassword(password, user.password);
    if (!isPasswordMatched) {
      setErrorStatus(true);
      setErrorValue("Invalid Password");
      setOpenResponse(true);

      setTimeout(() => {
        setOpenResponse(false);
      }, 3000);
      return;
    } else {
      const role = user?.role?.isAdmin
        ? "admin"
        : user?.role?.isDriver
        ? "driver"
        : "customer";

      dispatch(
        login({
          uid: user.authenticationUid,
          name: user.name,
          role: role,
          city: user.city,
          phone: user.PhoneNo,
        })
      );
      navigate("/" + role);
    }
  };

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
        window.recaptchaVerifier = null;
        const user = result.user;
      

        // logging the user or driver in
        onLoginHandler(user.uid);
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

  const isButtonDisabled = password === "" || phone === "" || otpLoading;

  return (
    <>
      <ResponseAlert
        errorValue={errorValue}
        openResponse={openResponse}
        setOpenResponse={setOpenResponse}
        errorStatus={errorStatus}
      />
      {/* verifyOtpHandler to be here */}
      <form className="flex flex-col" onSubmit={verifyOtpHandler}>
        <div className="mb-6 flex flex-col">
          <label
            htmlFor="phone"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Phone
          </label>
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            type="tel"
            id="phone"
            maxLength="10"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Your Mobile Number"
            required
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id="password"
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
