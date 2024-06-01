import { Outlet } from "react-router-dom";
import Navbar from "./Navbar/Navbar";
import Footer from "./Footer/Footer";
import Header from "./Header/Header";

const MainLayouts = () => {
  return (
    <div>
    <div className="bg-[#6E6950] w-full h-[1.2rem]"></div>
      <div className="w-[72%] mx-auto">
      <Header />
      <Navbar />
      <Outlet></Outlet>
      <Footer />
      </div>
    </div>
  );
};

export default MainLayouts;
