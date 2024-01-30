import {
  createBrowserRouter,
} from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/Home/Home/Home";
import SignUp from "../pages/SignUp/SignUp";
import Login from "../pages/Login/Login";
import Menu from "../pages/Menu/Menu";
import OrderFood from "../pages/OrderFood/OrderFood";
import PrivateRoute from "./PrivateRoute";
import DashBoard from "../layout/DashBoard";
import MyCart from "../pages/Dashboard/MyCart/MyCart";
import AllUsers from "../assets/dashboard/AllUsers/AllUsers";
import AdminRoute from "./AdminRoute";
import AddItem from "../pages/Dashboard/AddItem/AddItem";
import UserHome from "../pages/Dashboard/UserHome/UserHome";
import ManageItems from "../assets/dashboard/ManageItems/ManageItems";
import AdminHome from "../pages/Dashboard/AdminHome/AdminHome";
import Booking from "../pages/Dashboard/Booking/Booking";
import PaymentHistory from "../pages/Dashboard/PaymentHistory/PaymentHistory";
import ManageBooking from "../pages/Dashboard/ManageBooking/ManageBooking";
import AllBooking from "../pages/Dashboard/AllBooking/AllBooking";
import AddReview from "../assets/dashboard/AddReview/AddReview";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [{
      path: '/',
      element: <Home></Home>
    },
    {
      path: '/signup',
      element: <SignUp></SignUp>
    },
    {
      path: '/login',
      element: <Login></Login>
    },
    {
      path: '/menu',
      element: <Menu></Menu>
    },
    {
      path: '/order-food/:category',
      element:<PrivateRoute> <OrderFood></OrderFood></PrivateRoute>
    }
    ]
  },
  {
    path: '/dashboard',
    element: <PrivateRoute><DashBoard></DashBoard></PrivateRoute>,
    children: [
      {
        path: '/dashboard/my-cart',
        element: <MyCart></MyCart>
      },
      {
        path: '/dashboard/reservation',
        element: <Booking></Booking>
      },
      {
        path: '/dashboard/user-home',
        element: <UserHome></UserHome>
      },
      {
        path: '/dashboard/booking',
        element: <Booking></Booking>
      },
      {
        path: '/dashboard/all-booking',
        element: <AllBooking></AllBooking>
      },
      {
        path: '/dashboard/payment-history',
        element: <PaymentHistory></PaymentHistory>
      },
      {
        path: '/dashboard/review',
        element: <AddReview></AddReview>
      },
      {
        path: '/dashboard/payment-history',
        element: <PaymentHistory></PaymentHistory>
      },
      //admin routes
      {
        path: '/dashboard/allusers',
        element: <AdminRoute><AllUsers></AllUsers></AdminRoute>
      },
      {
        path: '/dashboard/add-item',
        element: <AdminRoute><AddItem></AddItem></AdminRoute>
      },
      {
        path: '/dashboard/manage-items',
        element: <AdminRoute><ManageItems></ManageItems></AdminRoute>
      },
      {
        path: '/dashboard/manage-bookings',
        element: <AdminRoute><ManageBooking></ManageBooking></AdminRoute>
      },
      {
        path: 'admin-home',
        element: <AdminRoute><AdminHome></AdminHome></AdminRoute>
      },
    ]
  }
]);


export default router