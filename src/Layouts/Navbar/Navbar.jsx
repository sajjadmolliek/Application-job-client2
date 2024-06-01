import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="bg-[#6E6950] lg:h-[41px]">
      <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 justify-start ">
        <li className="mx-auto -ml-[1px] mt-[1px] my-auto border-r-2 border-b-2 lg:border-b-0 hover:border-r-0 hover:bg-[#CEC9AB] hover:text-black px-[4.3rem] lg:px-11 py-2 font-bold text-white text-md">
          <NavLink
            to="/home"
            className={({ isActive, isPending }) =>
              isPending ? "pending" : isActive ? "active" : ""
            }
          >
            Home
          </NavLink>
        </li>
        <li className="mx-auto -ml-[1px] lg:-ml-[6px] mt-[1px] my-auto border-r-2 border-b-2 lg:border-b-0 hover:border-r-0 hover:bg-[#CEC9AB] hover:text-black px-[3.5rem] lg:px-8 py-2 font-bold text-white text-md">
          <NavLink
            to="/aboutUs"
            className={({ isActive, isPending }) =>
              isPending ? "pending" : isActive ? "active" : ""
            }
          >
            About Us
          </NavLink>
        </li>
        <li className="mx-auto -ml-[1px] lg:-ml-[12px] mt-[1px] my-auto lg:border-r-2 border-b-2 lg:border-b-0 hover:border-r-0 hover:bg-[#CEC9AB] hover:text-black px-[2.85rem] lg:px-5 py-2 font-bold text-white text-md">
          <NavLink
            to="/ourProjects"
            className={({ isActive, isPending }) =>
              isPending ? "pending" : isActive ? "active" : ""
            }
          >
            Our Projects
          </NavLink>
        </li>
        <li className="mx-auto -ml-[10px] lg:-ml-[20px] mt-[1px] my-auto border-r-2 hover:border-r-0 hover:bg-[#CEC9AB] hover:text-black col-span-2 px-10 py-2 font-bold text-white text-md">
          <NavLink
            to="/donation"
            className={({ isActive, isPending }) =>
              isPending ? "pending" : isActive ? "active" : ""
            }
          >
            Donation / Get Involved
          </NavLink>
        </li>
        <li className="mx-auto -ml-[7rem] lg:-ml-[35px] mt-[1px] my-auto border-r-2 hover:border-r-0 hover:bg-[#CEC9AB] hover:text-black px-6 py-2 font-bold text-white text-md">
          <NavLink
            to="/contactUs"
            className={({ isActive, isPending }) =>
              isPending ? "pending" : isActive ? "active" : ""
            }
          >
            Contact Us
          </NavLink>
        </li>
        <li className="mx-auto -ml-[4px] mt-[1px] my-auto   ">
          <NavLink
           
            className={({ isActive, isPending }) =>
              isPending ? "pending" : isActive ? "active" : ""
            }
          >
          </NavLink>
        </li>

      </ul>
    </div>
  );
};

export default Navbar;
