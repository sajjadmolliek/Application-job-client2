import { useForm } from "react-hook-form";
import useAxiousPublic from "../../Hooks/useAxiousPublic/useAxiousPublic";
import { toast } from "react-toastify";
import { NavLink, useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const axiosPublic = useAxiousPublic();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    axiosPublic.post("/verifyAdmin", data).then((res) => {
      if (res.data) {
        toast("Login Successfully");
        navigate("/admin/dashboard");
      } else {
        toast("Something Happening wrong");
      }
    });
  };

  return (
    <div id="layout">
      <div className="total-cont">
        <div className="shadow-md p-4 flex justify-center items-center">
          <div className=" border p-10  w-[30rem] rounded-xl my-10">
            <form onSubmit={handleSubmit(onSubmit)}>
              <table style={{ width: "100%" }}>
                <tbody>
                  <tr>
                    <td
                      style={{
                        fontFamily: "25px",
                        fontWeight: 400,
                        textAlign: "center",
                      }}
                    >
                      LOGIN
                    </td>
                  </tr>
                  <tr>
                    <td style={{ height: "40px" }}></td>
                  </tr>
                  <tr>
                    <td>Username</td>
                  </tr>
                  <tr>
                    <td>
                      <input
                        {...register("userName", { required: true })}
                        className="textBox border-b-[1px] border-black w-full"
                        type="text"
                        id="userName"
                        name="userName"
                      />
                      {errors.userName && (
                        <span className="text-red-600 ml-6">
                          This field is required !
                        </span>
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td style={{ height: "30px" }}></td>
                  </tr>
                  <tr>
                    <td>Password</td>
                  </tr>
                  <tr>
                    <td>
                      <input
                        {...register("password", { required: true })}
                        className="textBox border-b-[1px] border-black w-full"
                        type="password"
                        id="password"
                        name="password"
                      />
                      {errors.password && (
                        <span className="text-red-600 ml-6">
                          This field is required !
                        </span>
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td style={{ height: "30px" }}></td>
                  </tr>
                  <tr>
                    <td style={{ textAlign: "center" }}>
                      <input
                        type="submit"
                        className="btn btn-outline"
                        value="Login Now"
                      />
                    </td>
                  </tr>
                  <tr style={{ textAlign: "center" }}>
                    <NavLink to="/admin/adminreg">
                      <p className="text-blue-600 mt-6">Go to Registration</p>
                    </NavLink>
                  </tr>
                </tbody>
              </table>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
