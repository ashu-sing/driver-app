import React, { useEffect, useState } from "react";
import CancelIcon from "@mui/icons-material/Cancel";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { storageRef, auth, db } from "../../../firebase/config";
import { signInWithPhoneNumber, RecaptchaVerifier } from "firebase/auth";
import ResponseAlert from "../../Alerts/ResponseAlert";
import { hashPassword } from "../../../helpers/bcrypt";
import * as Yup from "yup";

const DriverUpdateModal = React.forwardRef((props, compoRef) => {
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
  const [errorValue, setErrorValue] = useState("");
  const [errorStatus, setErrorStatus] = useState("");
  const [openResponse, setOpenResponse] = useState(false);
  const [passwordInputChange, setPasswordInputChange] = useState(false);

  useEffect(() => {
    getDriverData();
  }, []);

  const getDriverData = async () => {
    const docRef = doc(db, "users", props.driver.id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      setName(data?.Name);
      setCity(data?.City);
      setAddress(data?.CurrentAddress);
      setDrivingLicense(data?.DrivingLicenseNo);
      setAadhaarNo(data?.AadhaarCardNo);
      setPhone(data?.PhoneNo);
      setPanNo(data?.Pancard?.No);
      setImageUrl(data?.Pancard?.imageUrl);
      setIsImage(data?.Pancard?.imageUrl ? true : false);
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  };

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
    if (passwordInputChange) {
      if (password === "" || password !== confirmPassword) {
        error = true;
        message = "Password and confirm password should be same";
        return;
      }
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
    };

    if (passwordInputChange) {
      const hashedPassword = await hashPassword(password);
      data.Password = hashedPassword;
    }

    await updateDoc(doc(db, "users", phone), data);
    setOpenResponse(true);
    setErrorValue("Account Updated successfully");
    setLoading(false);

    setTimeout(() => {
      setOpenResponse(false);
      props.onClose();
    }, 3000);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    uploadPanImgHandler();
  };

  const passwordInputChangeHandler = (e) => {
    setPasswordInputChange(e.target.checked ? true : false);
  };

  return (
    <>
      <div className="h-screen overflow-y-scroll absolute left-1/2 -translate-x-1/2 bg-white w-10/12 py-4 px-6">
        <div className="flex items-center justify-between mb-6 w-full">
          <h2 className="text-2xl w-full font-medium text-gray-900 dark:text-white text-center  underline">
            Update Driver
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
          <div className="flex gap-2 items-center mb-6">
            <input
              checked={passwordInputChange}
              onChange={passwordInputChangeHandler}
              type="checkbox"
              id="terms"
            />
            <label
              for="terms"
              className="block relative top-[2.5px] mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Change Password
            </label>
          </div>
          {passwordInputChange && (
            <>
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
                  placeholder="Change the password"
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
                  placeholder="Change the password"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                  required
                />
              </div>
            </>
          )}
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
            className="text-white mt-2 self-end bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Update Account
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

export default DriverUpdateModal;
