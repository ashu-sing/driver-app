import React, { useEffect, useContext } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";

import PublicRoute from "./components/Routes/PublicRoutes";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import DriverRoute from "./components/Routes/DriverRoute";
import DriverLandingPage from "./components/DriverComponents/DriverProfilePage";
import DriverAvailabilityPage from "./components/DriverComponents/DriverAvailabilityPage";
import DriverOngoingPage from "./components/DriverComponents/DriverOngoingPage";
import DriverBookingsPage from "./components/DriverComponents/DriverBookingsPage";
import Drivers from "./components/Dashboard/Drivers";
import Dashboard from "./components/Dashboard/Dashboard";
import Customers from "./components/Dashboard/Customers";
import AdminRoute from "./components/Routes/AdminRoute";
import CustomerRoute from "./components/Routes/CustomerRoute";
import CustomerProfile from "./components/CustomerComponents/CustomerProfile";
import CustomerBookings from "./components/CustomerComponents/CustomerBookings";
import CustomerOngoing from "./components/CustomerComponents/CustomerOngoing";
import CustomerBookride from "./components/CustomerComponents/CustomerBookride";
import Bookings from "./components/Dashboard/Bookings";
import { useSelector, useDispatch } from "react-redux";
import { login } from "./store/authSlice";
import DriverProfilePage from "./components/DriverComponents/DriverProfilePage";

const App = () => {
  // let { isAuthenticated } = useContext(AuthContext);
  const dispatch = useDispatch();


  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <PublicRoute>
              <Home />
            </PublicRoute>
          }
        />
        <Route
          path="/auth"
          element={
            <PublicRoute>
              <Auth />
            </PublicRoute>
          }
        />

        <Route
          path="/driver"
          element={
            <DriverRoute>
              <DriverProfilePage />
            </DriverRoute>
          }
        />
        <Route
          path="/driver/availability"
          element={
            <DriverRoute>
              <DriverAvailabilityPage />
            </DriverRoute>
          }
        />
        <Route
          path="/driver/bookings"
          element={
            <DriverRoute>
              <DriverBookingsPage />
            </DriverRoute>
          }
        />
        <Route
          path="/driver/ongoing"
          element={
            <DriverRoute>
              <DriverOngoingPage />
            </DriverRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <AdminRoute>
              <Dashboard />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/drivers"
          element={
            <AdminRoute>
              <Drivers />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/bookings"
          element={
            <AdminRoute>
              <Bookings />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/customers"
          element={
            <AdminRoute>
              <Customers />
            </AdminRoute>
          }
        />

        <Route
          path="/customer"
          element={
            <CustomerRoute>
              <CustomerProfile />
            </CustomerRoute>
          }
        />
        <Route
          path="/customer/bookings"
          element={
            <CustomerRoute>
              <CustomerBookings />
            </CustomerRoute>
          }
        />
        <Route
          path="/customer/ongoing"
          element={
            <CustomerRoute>
              <CustomerOngoing />
            </CustomerRoute>
          }
        />
        <Route
          path="/customer/bookride"
          element={
            <CustomerRoute>
              <CustomerBookride />
            </CustomerRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
