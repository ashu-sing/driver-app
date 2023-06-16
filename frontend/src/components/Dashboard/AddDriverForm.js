import React, { useState } from "react";
import CancelIcon from "@mui/icons-material/Cancel";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { storageRef, auth, db } from "../../firebase/config";
import { signInWithPhoneNumber, RecaptchaVerifier } from "firebase/auth";
import ResponseAlert from "../Alerts/ResponseAlert";
import { hashPassword } from "../../helpers/bcrypt";
import * as Yup from "yup";

const AddDriverForm = React.forwardRef((props, compoRef) => {
  const [isImage, setIsImage] = useState(false);
  const [file, setFile] = useState(null);
  const [imageSizeError, setImageSizeError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [drivingLicense, setDrivingLicense] = useState("");
  const [aadhaarNo, setAadhaarNo] = useState("");
  const [panNo, setPanNo] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [otpInput, setOtpInput] = useState("");
  const [otpLoading, setOtpLoading] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [recaptchaVerified, setRecaptchaVerified] = useState(false);
  const [errorValue, setErrorValue] = useState("");
  const [errorStatus, setErrorStatus] = useState("");
  const [openResponse, setOpenResponse] = useState(false);
  const [authenticationUid, setAuthenticationUid] = useState("");

  const handleChangeFileHandler = (e) => {
    setImageSizeError(false);
    setIsImage(true);
    setFile(e?.target?.files?.[0] ? e.target.files[0] : null);
    if (e?.target?.files?.[0].size / 1024 >= 2000) {
      setImageSizeError(true);
    }
  };

  const imageRemoveHandler = () => {
    setImageSizeError(false);
    setIsImage(false);
    setFile(null);
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

  const uploadPanImgHandler = async () => {
    if (file == null) {
      uploadDataHandler("");
      return;
    }

    setOpenResponse(true);
    setErrorStatus("success");
    setErrorValue("Uploading image...");

    const imageRef = ref(storageRef, `${phone}/pancard${file.name}`);
    const uploadTask = uploadBytesResumable(imageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
        // Handle unsuccessful uploads
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          uploadDataHandler(downloadURL);
        });
      }
    );
  };

  const uploadDataHandler = async (panUrl) => {
    setErrorValue("Making Account...");
    setLoading(true);
    let error = false;
    let message = "";
    if (password === "" || password !== confirmPassword) {
      error = true;
      message = "Password and confirm password should be same";
      return;
    }

    if (!recaptchaVerified) {
      error = true;
      message = "Please verify captcha";
      return;
    }

    if (!otpVerified) {
      error = true;
      message = "Please verify OTP";
      return;
    }

    if (
      city === "" ||
      address === ""
      // drivingLicense === "" ||
      // aadhaarNo === "" ||
      // panNo === ""
    ) {
      error = true;
      message = "Please fill all the fields";
      return;
    }

    if (error) {
      setErrorStatus(true);
      setErrorValue(message);
      setOpenResponse(true);

      setTimeout(() => {
        setOpenResponse(false);
      }, 3000);
      return;
    }

    const data = {
      Name: name,
      PhoneNo: phone,
      City: city,
      CurrentAddress: address,
      DrivingLicenseNo: drivingLicense,
      AadhaarCardNo: aadhaarNo,
      Pancard: {
        No: panNo,
        fileName: file?.name ? `pancard${file?.name}` : "",
        imageUrl: panUrl,
      },
      role: {
        isDriver: true,
        isAdmin: false,
        isCustomer: false,
      },
      authenticationUid: authenticationUid,
      password: await hashPassword(password),
    };

    await setDoc(doc(db, "users", phone), data);
    setErrorValue("Account created successfully");
    setLoading(false);
    window.confirmationResult = null;
    setTimeout(() => {
      setOpenResponse(false);
      props.onClose();
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    uploadPanImgHandler();
  };

  function sendOtpHandler(e) {
    e.preventDefault();

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
        const user = result.user;
        console.log(user);
        setOtpVerified(true);
        setShowOtpInput(false);
        setAuthenticationUid(user.uid);
        window.confirmationResult = null;
        // logging the user or driver in
        // onLoginHandler(user.uid);
        // ...
      })
      .catch((error) => {
        console.log(error);
        setErrorStatus(true);
        setErrorValue("Invalid OTP");
        setOpenResponse(true);
        window.confirmationResult = null;
        setTimeout(() => {
          setOpenResponse(false);
        }, 3000);
      });
  }

  let registerBtndisabled =
    !otpVerified ||
    otpLoading ||
    loading ||
    password !== confirmPassword;

  return (
    <>
      <div className="h-screen overflow-y-scroll absolute left-1/2 -translate-x-1/2 bg-white w-10/12 py-4 px-6">
        <div className="flex items-center justify-between mb-6 w-full">
          <h2 className="text-2xl w-full font-medium text-gray-900 dark:text-white text-center  underline">
            Add Driver
          </h2>
        </div>
        <form
          onSubmit={submitHandler}
          className="px-4 border border-[#dbdbdb] flex flex-col py-4 rounded"
        >
          <div className="mb-6">
            <label
              for="name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Driver's Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              placeholder="Driver Name here"
              required
            />
          </div>
          <div className="mb-6">
            <label
              for="phone"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Driver's Phone No
            </label>
            <input
              type="text"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              placeholder="Driver Phone No here"
              required
            />
          </div>
          <div
            id="recaptcha-container"
            className={`${showOtpInput && "hidden"} mb-4`}
          ></div>
          {showOtpInput && (
            <div className="mb-6">
              <label
                for="otp"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Enter OTP
              </label>
              <input
                type="text"
                id="phone"
                value={otpInput}
                onChange={(e) => setOtpInput(e.target.value)}
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                placeholder="Driver Phone No here"
                required
              />
            </div>
          )}
          {!showOtpInput && !otpVerified ? (
            <button
              type="submit"
              onClick={sendOtpHandler}
              className="text-white mt-2 self-end bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Send OTP
            </button>
          ) : showOtpInput && !otpVerified ? (
            <button
              type="submit"
              onClick={verifyOtpHandler}
              className="text-white mt-2 self-end bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Verify OTP
            </button>
          ) : (
            <p className="text-green-500">OTP Verified</p>
          )}
          <div className="mb-6">
            <label
              for="city"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Driver's City
            </label>
            <input
              type="text"
              id="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              placeholder="Driver City here"
              required
            />
          </div>
          <div className="mb-6">
            <label
              for="address"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Driver's Current Address
            </label>
            <input
              type="text"
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              placeholder="Driver Current Address here"
              required
            />
          </div>

          <div className="mb-6">
            <label
              for="drivingLicense"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Driver's Driving License No
            </label>
            <input
              type="text"
              value={drivingLicense}
              onChange={(e) => setDrivingLicense(e.target.value)}
              id="drivingLicense"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              placeholder="Driving License No here"
              required
            />
          </div>
          <div className="mb-6">
            <label
              for="aadhaarNo"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Driver's Aadhaar Card No
            </label>
            <input
              type="text"
              id="aadhaarNo"
              value={aadhaarNo}
              onChange={(e) => setAadhaarNo(e.target.value)}
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              placeholder="Driving License No here"
              required
            />
          </div>
          <div className="mb-6">
            <label
              for="panCardNo"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Driver's Pancard No
            </label>
            <input
              type="text"
              id="panCardNo"
              value={panNo}
              onChange={(e) => setPanNo(e.target.value)}
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              placeholder="Driving Pancard No here"
              required
            />
          </div>

          {!isImage ? (
            <div className="flex items-center justify-center w-full mb-4">
              <label
                for="dropzone-file"
                className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg
                    aria-hidden="true"
                    className="w-10 h-10 mb-3 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      strokeWidth="2"
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    ></path>
                  </svg>
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">Upload Pancard here</span>{" "}
                    or drag and drop
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    SVG, PNG, JPG or GIF (MAX. 800x400px)
                  </p>
                </div>
                <input
                  onChange={handleChangeFileHandler}
                  id="dropzone-file"
                  type="file"
                  className="hidden"
                />
              </label>
            </div>
          ) : (
            <div className="form-control flex flex-col flex-1 items-center justify-center gap-2 mt-2">
              {isImage && file && (
                <div className="flex relative mb-2">
                  <CancelIcon
                    className="absolute top-0 left-full -translate-x-1/2 -translate-y-1/2 !text-md text-red-500 cursor-pointer"
                    onClick={imageRemoveHandler}
                  />
                  <img
                    src={isImage && file ? URL.createObjectURL(file) : ""}
                    className="mx-auto max-w-32 max-h-[600px] object-cover"
                  />
                </div>
              )}
              {imageSizeError && (
                <p className="text-red-500 my-2">
                  Image size should be less than 2MB
                </p>
              )}
            </div>
          )}

          <div className="mb-6">
            <label
              for="password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              required
            />
          </div>
          <div className="mb-6">
            <label
              for="repeat-password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="repeat-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              required
            />
          </div>
          {/* <div className="flex items-start mb-6">
          <div className="flex items-center h-5">
            <input
              id="terms"
              type="checkbox"
              value=""
              className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
              required
            />
          </div>
          <label
            for="terms"
            className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            I agree with the{" "}
            <a
              href="#"
              className="text-blue-600 hover:underline dark:text-blue-500"
            >
              terms and conditions
            </a>
          </label>
        </div> */}
          <button
            type="submit"
            onClick={submitHandler}
            disabled={registerBtndisabled}
            className="text-white mt-2 self-end bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Register Account
          </button>
        </form>
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

export default AddDriverForm;
