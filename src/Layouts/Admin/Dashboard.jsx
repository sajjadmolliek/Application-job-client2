import { GrDocumentUser } from "react-icons/gr";
import { MdDelete } from "react-icons/md";
import useAxiousPublic from "../../Hooks/useAxiousPublic/useAxiousPublic";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const axiosPublic = useAxiousPublic();
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axiosPublic
      .get("/allApplication")
      .then((res) => {
        setData(res.data);
      })
      .catch((error) => {
        toast.error("Failed to fetch data");
        console.error("Error fetching data:", error);
      });
  }, [axiosPublic]);

  const handleDelete = async (id) => {
    try {
      await axiosPublic.delete(`/deleteApplication/${id}`);
      setData(data.filter((item) => item._id !== id));
      axiosPublic.get("/applicationReject");
      toast.success("Application deleted successfully");
    } catch (error) {
      toast.error("Failed to delete application");
      console.error("Error deleting application:", error);
    }
  };

  const handleView = (id) => {
    navigate(`/admin/application/${id}`);
  };

  return (
    <div className="shadow-lg">
      <div className="p-4 ">
        <h1 className="text-3xl mb-[2rem]">Welcome Admin</h1>
        <h1 className=" mb-[2rem]">Below is the list of applications.</h1>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr className="bg-[#98D1F5] text-black">
                <th></th>
                <th></th>
                <th>Name</th>
                <th>Mobile</th>
                <th>Email</th>
                <th>Submitted On</th>
              </tr>
            </thead>
            <tbody>
              {data.map((datas, i) => (
                <tr key={i} className="bg-base-200">
                  <th>
                    <GrDocumentUser
                      title="See Application"
                      className="text-xl cursor-pointer"
                      onClick={() => handleView(datas._id)}
                    />
                  </th>
                  <th>
                    <MdDelete
                      title="Delete"
                      onClick={() => handleDelete(datas._id)}
                      className="text-xl cursor-pointer"
                    />
                  </th>
                  <td>{datas.stdName}</td>
                  <td>{datas.phone1}</td>
                  <td>{datas.emailId}</td>
                  <td>{datas.submittedOn}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
