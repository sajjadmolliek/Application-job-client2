import { useEffect, useState } from "react";
import useAxiousPublic from "../../Hooks/useAxiousPublic/useAxiousPublic";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const ApplicationDetails = () => {
  const axiosPublic = useAxiousPublic();
  const navigate = useNavigate();
  const { id } = useParams();

  const [application, setApplication] = useState(null);

  useEffect(() => {
    const fetchApplication = async () => {
      try {
        const response = await axiosPublic.get(`/application/${id}`);
        setApplication(response.data);
      } catch (error) {
        toast.error("Failed to fetch application details");
        console.error("Error fetching application details:", error);
      }
    };
    fetchApplication();
  }, [axiosPublic, id]);

  const handleDeleteApplication = async () => {
    try {
      await axiosPublic.delete(`/deleteApplication/${id}`);
      toast.success("Application deleted successfully");
    //   Sending rejection Mail
      axiosPublic.get("/applicationReject");
      // Redirect to dashboard after deletion
      navigate("/admin/dashboard");
    } catch (error) {
      toast.error("Failed to delete application");
      console.error("Error deleting application:", error);
    }
  };

  return (
    <div className="contentpaneopen">
    <div className="flex gap-10 justify-end pr-20 pt-10">
        <div>
        <button >GO TO Home</button>
        </div>
        <div>
        <button >Print</button>
        </div>
        <div>
        <button onClick={handleDeleteApplication}>Delete Now</button>
        </div>
    </div>
      <div style={{ padding: "30px 20px" }} id="printableContentDiv">
        <table
          style={{ width: "100%", border: "1px solid #666", margin: "0 auto" }}
          cellSpacing="5"
          cellPadding="5"
          border="0"
        >
          <tbody >
            <tr>
              <td style={{ width: "45%" }}>1. Name of the student </td>
              <td>{application?.stdName}</td>
            </tr>
            <tr>
              <td>2. Date of birth </td>
              <td>{application?.dob}</td>
            </tr>
            <tr>
              <td>3. Gender </td>
              <td>{application?.gender}</td>
            </tr>
            <tr>
              <td>4. Community </td>
              <td>{application?.community}</td>
            </tr>
            <tr>
              <td>5. Physically challenged? </td>
              <td>{application?.PhysicallyChallenged}</td>
            </tr>
            <tr>
              <td>If Physically challenged Yes</td>
              <td>{application?.physicallyChallengedYes}</td>
            </tr>
            <tr>
              <td>6. Residential address </td>
              <td>{application?.residentialAddress}</td>
            </tr>
            <tr>
              <td>7. Mobile No. </td>
              <td>{application?.phone1}</td>
            </tr>
            <tr>
              <td>8. Email ID (If any) </td>
              <td>{application?.emailId}</td>
            </tr>

            <tr>9. Student’s educational details </tr>
          
             
                <tr>
                  <td width="30%">Board Exam</td>
                  <td width="100%">Name of the School</td>
                  <td width="100%">Marks Secured</td>
                  <td width="100%">Out Of</td>
                  <td width="100%">Year Of Passing</td>
                </tr>
                <tr>
                  <td>X std</td>
                  <td>{application?.xSchoolName}</td>
                  <td>{application?.xMarkSecured}</td>
                  <td>{application?.xOutOf}</td>
                  <td>{application?.xYearOfPassing}</td>
                </tr>
                <tr>
                  <td>XII std</td>
                  <td>{application?.xllSchoolName}</td>
                  <td>{application?.xllMarkSecured}</td>
                  <td>{application?.xllOutOf}</td>
                  <td>{application?.xllYearOfPassing}</td>
                </tr>
             
           

          
          </tbody>
        </table>
      </div>
      
    </div>
  );
};

export default ApplicationDetails;
