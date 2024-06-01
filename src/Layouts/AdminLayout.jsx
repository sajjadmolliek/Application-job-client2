import Header from "./Header/Header";
import { Outlet } from "react-router-dom";
import AdminFooter from "./Footer/AdminFooter";

const AdminLayout = () => {
  return (
    <div>
      <div className="bg-[#6E6950] w-full h-[1.2rem]"></div>
      <div className="w-[72%] mx-auto">
        <Header />
        <Outlet></Outlet>
        <AdminFooter />
      </div>
    </div>
  );
};

export default AdminLayout;
