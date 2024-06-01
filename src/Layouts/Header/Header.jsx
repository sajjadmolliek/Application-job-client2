import { NavLink } from "react-router-dom";
import banner from "../../assets/banner.avif";
import { IoMdLogIn } from "react-icons/io";
import { RiLogoutCircleLine } from "react-icons/ri";

const Header = () => {
  return (
    <div>
      <img className="w-full h-[11rem]" src={banner} alt="banner" />
      <div className="flex justify-between -mt-[1.8rem] px-2">
        <NavLink to={"/"}>
          <RiLogoutCircleLine  className="text-3xl text-white" />
        </NavLink>
        <NavLink to={"/admin"}>
          <IoMdLogIn className="text-3xl text-white" />
        </NavLink>
      </div>
      <NavLink to={"/"}>
        <div className="text-4xl text-red-600 -mt-40 mb-[7.4rem] ml-16">
          IT Technology
        </div>
      </NavLink>
    </div>
  );
};

export default Header;
