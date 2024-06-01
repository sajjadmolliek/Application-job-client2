import { createBrowserRouter } from "react-router-dom";
import From from "../Home/From/From";
import ErrorPage from "../Layouts/Error/ErrorPage";
import MainLayouts from "../Layouts/MainLayouts";
import Home from "../Home/Home/Home";
import AboutUs from "../Home/AboutUs/AboutUs";
import OurProjects from "../Home/OurProjects/OurProjects";
import ContactUs from "../Home/ContactUs/ContactUs";
import Donation from "../Home/Donation/Donation";
import Admin from "../Layouts/Admin/AdminLogin";
import AdminLayout from "../Layouts/AdminLayout";
import Dashboard from "../Layouts/Admin/Dashboard";
import ApplicationDetails from "../Layouts/ApplicationDetails/ApplicationDetails";
import AdminReg from "../Layouts/Admin/AdminReg";

const Routes = createBrowserRouter([
  {
    path: "/",
    element: <MainLayouts />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <From />,
      },
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/aboutUs",
        element: <AboutUs />,
      },
      {
        path: "/ourProjects",
        element: <OurProjects />,
      },
      {
        path: "/donation",
        element: <Donation />,
      },
      {
        path: "/contactUs",
        element: <ContactUs />,
      },
    ],
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/admin",
        element: <Admin />,
      },
      {
        path: "/admin/adminreg",
        element: <AdminReg />,
      },
      {
        path: "/admin/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/admin/application/:id",
        element: <ApplicationDetails />,
      },
    ],
  },
]);

export default Routes;
