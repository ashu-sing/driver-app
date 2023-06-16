import Layout from "../components/Layout";
import HeadingCard from "../components/HeadingCard";
import SpecialitiesCards from "../components/SpecialitiesCards";
import HireCards from "../components/HireCards";
import BookingForm from "../components/BookingForm";
import { useDispatch } from "react-redux";
import { login } from "../store/authSlice";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function Home() {
  const navigate = useNavigate();
  // const { role } = useContext(AuthContext);

  // useEffect(() => {
  //   if (role === "admin") {
  //     navigate("/admin/dashboard");
  //   }
  // }, []);

  const dispatch = useDispatch();

  useEffect(() => {
    let user = localStorage.getItem("user");
    if (user) {
      dispatch(login(JSON.parse(user)));
      navigate("/" + JSON.parse(user).role);
    }
  }, []);

  return (
    <Layout>
      <div className="flex flex-col gap-6 w-full h-full">
        <h3 className="text-2xl text-center md:text-left font-semibold text-gray-800 ">
          Book your Ride with Us
        </h3>
        <div className="flex items-center flex-col md:flex-row gap-4 w-full h-full">
          <HeadingCard
            head="Hourly Driver"
            description="Wanna reach at right time? Book your ride now at cheap price"
            className="bg-white text-lime-500 hover:bg-lime-500 hover:text-white border-lime-500"
          />
          <HeadingCard
            head="Plan your Trip"
            description="Make your trip memorable with our best services"
            className="bg-white text-yellow-500 border-yellow-500 hover:bg-yellow-500 hover:text-white"
          />
        </div>
      </div>

      <div className="flex flex-col gap-6 w-full h-full mt-8">
        <h3 className="text-2xl text-center md:text-left font-semibold text-gray-800">
          Plan your day now
        </h3>
        <div className="mx-aut w-full h-full flex justify-center md:justify-between gap-6">
          <BookingForm />
          <img
            src="/image/bgImage.jpg"
            alt="bgImage"
            className="w-1/2 hidden md:block bg-transparent"
          />
        </div>
      </div>
      {/* <Map /> */}
      <div className="flex flex-col gap-6 w-full h-full mt-8">
        <h3 className="text-4xl w-full text-center mt-20 my-10 r font-bold text-gray-800">
          Our Specialities
        </h3>

        <div className="flex flex-col flex-wrap justify-center md:flex-row gap-6 items-center w-full h-full">
          <SpecialitiesCards
            head="Stay safe with Cruisecontrol"
            description="We ensure the following verifications before deployment of the driver. Court Record Verification, License Verification"
          />
          <SpecialitiesCards
            head="On Time, Everytime"
            description="Our backend team assigns and tracks nearby drivers to ensure they arrive at the customer's door on time."
          />
          <SpecialitiesCards
            head="Expert Driving Experience"
            description="We provide drivers with 5+ Years of experience, who drive automatic & Manual cars in Local, Highway & Hills stations."
          />
          <SpecialitiesCards
            head="Your Safety Matters"
            description="We provided masks & sanitizer to our drivers to ensure the safety of drivers & customers from Covid-19."
          />
          <SpecialitiesCards
            head="Driver in 90 Minutes"
            description="We offer one-way and round-trip driver services for local and out-of-town travel. Our drivers will reach at your doorstep."
          />
          <SpecialitiesCards
            head="Go anywhere at anytime"
            description="Services available 24*7.  Our customer care number is 9999160322 available between 06:00 AM to 06:00 PM (Monday To Saturday)"
          />
        </div>
      </div>

      <div className="flex flex-col gap-6 w-full h-full mt-8">
        <h3 className="text-4xl w-full text-center mt-20 my-10 r font-bold text-gray-800">
          Hire Us For
        </h3>
        <div className="flex  flex-wrap justify-center md:flex-row gap-6 items-center w-full h-full">
          <HireCards head="Night Out" img="/icons/nightOut.svg" />
          <HireCards head="Personal Driver" img="/icons/driver.svg" />
          <HireCards head="Occasion" img="/icons/occasion.svg" />
          <HireCards head="Office" img="/icons/office.svg" />
          <HireCards head="School" img="/icons/school.svg" />
          <HireCards head="Travel" img="/icons/travel.svg" />
          <HireCards head="Pick Up" img="/icons/friends.svg" />
          <HireCards head="Shopping" img="/icons/shopping.svg" />
        </div>
      </div>
    </Layout>
  );
}
