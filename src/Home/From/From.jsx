import { useState } from "react";
import { useForm } from "react-hook-form";
import useAxiousPublic from "../../Hooks/useAxiousPublic/useAxiousPublic";
import { toast } from "react-toastify";
import axios from "axios";
import ReCAPTCHA from "react-google-recaptcha";

// import Hosting image URL
const image_hosting = import.meta.env.VITE_IMAGE_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?expiration=600&key=${image_hosting}`;

const From = () => {
  const [level, setLevel] = useState(" ");
  const [level2, setLevel2] = useState(" ");
  const [level3, setLevel3] = useState(" ");
  const [verify, setVerify] = useState(false);
  const axiosPublic = useAxiousPublic();
  function onChange(value) {
    console.log("Captcha value:", value);
    setVerify(true);
  }
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const handleChangePage = (e) => {
    setLevel(e.target.value);
  };
  const handleChangePage2 = (e) => {
    setLevel2(e.target.value);
  };
  const handleChangePage3 = (e) => {
    setLevel3(e.target.value);
  };

  const onSubmit = async (data) => {
    // image Hosting start
    const formData = new FormData();
    formData.append("image", data?.photo[0]);
    const res = await axios.post(image_hosting_api, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    const image = res.data.data.display_url;

    // image Hosting end
    const CommunitySelectDropDown = level;
    const CommunitySelectDropDown2 = level2;
    const CommunitySelectDropDown3 = level3;

    // Application Form Data

    const applicationFormData = {
      stdName: data.NameTextBox,
      dob: data.DateOfBirthTextBox,
      gender: data.GenderRadioBox,
      community: CommunitySelectDropDown,
      PhysicallyChallenged: data.PhysicallyChallengedRadioBox,
      physicallyChallengedYes: data.PhysicallyChallengedYesDetailTextBox,
      residentialAddress: data.ResidentialAddress1TextBox,
      phone1: data.ContactMobileTextBox,
      emailId: data.ContactEmailTextBox,
      xSchoolName: data.EducationDetailXSchoolNameTextbox,
      xMarkSecured: data.EducationDetailXMarkSecuredTextbox,
      xOutOf: data.EducationDetailXOutOfTextbox,
      xYearOfPassing: data.EducationDetailXYearOfPassingTextbox,
      xllSchoolName: data.EducationDetailXIISchoolNameTextbox,
      xllMarkSecured: data.EducationDetailXIIMarkSecuredTextbox,
      xllOutOf: data.EducationDetailXIIOutOfTextbox,
      xllYearOfPassing: data.EducationDetailXIIYearOfPassingTextbox,
      stdParentOccupation: CommunitySelectDropDown2,
      stdFName: data.ParentGuardianDetailFatherNameTextBox,
      stdMName: data.ParentGuardianDetailMotherNameTextBox,
      stdGuardianName: data.ParentGuardianDetailGuardianNameTextBox,
      institutionCategory: CommunitySelectDropDown3,
      image: image,
    };
    console.log(applicationFormData);
    axiosPublic.post("/application", applicationFormData).then((res) => {
      console.log(res);
      if (res.data.insertedId) {
        toast(
          "Your Application Submitted Successfully. Please Check Your Email."
        );

        // e.target.reset();
        axiosPublic.get("/application", {
          params: {
            mail: data.ContactEmailTextBox,
          },
        });
      }
    });
  };

  return (
    <div className="shadow-md">
      <h1 className="text-3xl mt-4 ml-4 font-bold">
        APPLICATION FOR FINANCIAL AID FOR EDUCATION
      </h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        id="ApplicationForm"
        action="application_submit.php"
        method="post"
      >
        <table width="95%" className="applicationTable ml-4">
          <tbody>
            {/* table Start */}

            <tr>
              <td style={{ width: "45%" }}>
                1. Name of the student / ছাত্র/ছাত্রীর নাম
              </td>
              <td>
                <input
                  required
                  {...register("NameTextBox", { required: true })}
                  className="textBox border-b-[1px] border-black w-[90%] m-5 focus:0"
                  type="text"
                  id="NameTextBox"
                  name="NameTextBox"
                />
                {errors.NameTextBox && (
                  <span className="text-red-600 ml-6">
                    This field is required !
                  </span>
                )}
              </td>
            </tr>

            <tr>
              <td>2. Date of birth / জন্ম তারিখ</td>
              <td>
                <input
                  required
                  {...register("DateOfBirthTextBox", { required: true })}
                  className="textBox border-b-[1px] border-black w-[90%] m-5"
                  type="date"
                  id="DateOfBirthTextBox"
                  name="DateOfBirthTextBox"
                />
                {errors.DateOfBirthTextBox && (
                  <span className="text-red-600 ml-6">
                    This field is required !
                  </span>
                )}
              </td>
            </tr>

            <tr>
              <td>3. Gender / লিঙ্গ</td>
              <td>
                <table>
                  <tbody>
                    <tr>
                      <td>
                        <input
                          required
                          {...register("GenderRadioBox", { required: true })}
                          type="radio"
                          name="GenderRadioBox"
                          value="Male"
                        />
                      </td>
                      <td> Male / পুরুষ</td>
                      <td>
                        <input
                          required
                          {...register("GenderRadioBox", { required: true })}
                          type="radio"
                          name="GenderRadioBox"
                          value="Female"
                        />
                      </td>
                      <td> Female / মহিলা </td>
                      <td>
                        <input
                          required
                          {...register("GenderRadioBox", { required: true })}
                          type="radio"
                          name="GenderRadioBox"
                          value="3rdGender"
                        />
                      </td>
                      <td> 3rd Gender / তৃতীয় লিঙ্গ </td>
                    </tr>
                  </tbody>
                </table>
                {errors.GenderRadioBox && (
                  <span className="text-red-600 ml-6">
                    This field is required !
                  </span>
                )}
              </td>
            </tr>

            <tr>
              <td>4. Community / সম্প্রদায়</td>
              <td>
                <select
                  className="textBox border-b-[1px] border-black w-[90%] m-5"
                  id="CommunitySelectDropDown"
                  name="CommunitySelectDropDown"
                  onChange={handleChangePage}
                  required
                >
                  <option value="">Please select</option>
                  <option value="OC">OC</option>
                  <option value="BC">BC</option>
                  <option value="MBC">MBC</option>
                  <option value="SC">SC</option>
                  <option value="ST">ST</option>
                </select>
              </td>
            </tr>

            <tr>
              <td>5. Physically challenged? / শারীরিক প্রতিবন্ধী ?</td>
              <td>
                <table>
                  <tbody>
                    <tr>
                      <td>
                        <input
                          required
                          {...register("PhysicallyChallengedRadioBox")}
                          type="radio"
                          name="PhysicallyChallengedRadioBox"
                          value="Yes"
                        />
                      </td>
                      <td>Yes</td>
                      <td>
                        <input
                          required
                          {...register("PhysicallyChallengedRadioBox")}
                          type="radio"
                          name="PhysicallyChallengedRadioBox"
                          value="No"
                        />
                      </td>
                      <td className="w-4">No</td>
                      {errors.PhysicallyChallengedRadioBox && (
                        <span className="text-red-600 ml-6">
                          This field is required !
                        </span>
                      )}
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>

            <tr>
              <td></td>
              <td>
                <table style={{ width: "100%" }}>
                  <tbody>
                    <tr>
                      <td>If yes, furnish details</td>
                      <td>
                        <input
                          {...register("PhysicallyChallengedYesDetailTextBox")}
                          className="textBox border-b-[1px] border-black w-[90%] m-5"
                          type="text"
                          id="PhysicallyChallengedYesDetailTextBox"
                          name="PhysicallyChallengedYesDetailTextBox"
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>

            {/* 2nd */}
            <tr>
              <td>6. Residential address / ঠিকানা</td>
              <td>
                <input
                  required
                  {...register("ResidentialAddress1TextBox", {
                    required: true,
                  })}
                  className="textBox border-b-[1px] border-black w-[90%] m-5"
                  type="text"
                  id="ResidentialAddress1TextBox"
                  name="ResidentialAddress1TextBox"
                />
                {errors.ResidentialAddress1TextBox && (
                  <span className="text-red-600 ml-6">
                    This field is required !
                  </span>
                )}
              </td>
            </tr>

            <tr>
              <td></td>
              <td>
                <input
                  className="textBox border-b-[1px] border-black w-[90%] m-5"
                  type="text"
                  id="ResidentialAddress2TextBox"
                  name="ResidentialAddress2TextBox"
                />
              </td>
            </tr>

            <tr>
              <td>7. Mobile No. / মোবাইল নম্বর</td>
              <td>
                <input
                  required
                  {...register("ContactMobileTextBox", { required: true })}
                  className="textBox border-b-[1px] border-black w-[90%] m-5"
                  type="number"
                  id="ContactMobileTextBox"
                  name="ContactMobileTextBox"
                />
                {errors.ContactMobileTextBox && (
                  <span className="text-red-600 ml-6">
                    This field is required !
                  </span>
                )}
              </td>
            </tr>

            <tr>
              <td>8. Email ID (If any) / ইমেইল আইডি (যদি থাকে)</td>
              <td>
                <input
                  required
                  {...register("ContactEmailTextBox", { required: true })}
                  className="textBox border-b-[1px] border-black w-[90%] m-5"
                  type="text"
                  id="ContactEmailTextBox"
                  name="ContactEmailTextBox"
                />
              </td>
            </tr>

            <tr>
              <td colSpan="2">
                9. Student’s educational details / শিক্ষার্থীর শিক্ষাগত বিবরণ
              </td>
            </tr>

            <tr>
              <td colSpan="2">
                <table style={{ width: "100%" }}>
                  <tbody>
                    <tr>
                      <td width="10%" style={{ textAlign: "center" }}>
                        Board Exam
                      </td>
                      <td width="53%" style={{ textAlign: "center" }}>
                        Name of the School
                      </td>
                      <td style={{ textAlign: "center" }}>Marks Secured</td>
                      <td style={{ textAlign: "center" }}>Out Of</td>
                      <td style={{ textAlign: "center" }}>Year Of Passing</td>
                    </tr>

                    <tr>
                      <td>X std</td>
                      <td>
                        <input
                          required
                          {...register("EducationDetailXSchoolNameTextbox")}
                          className="textBox border-b-[1px] border-black w-[90%] m-5"
                          type="text"
                          id="EducationDetailXSchoolNameTextbox"
                          name="EducationDetailXSchoolNameTextbox"
                        />
                        {errors.EducationDetailXSchoolNameTextbox && (
                          <span className="text-red-600 ml-6">
                            This field is required !
                          </span>
                        )}
                      </td>
                      <td>
                        <input
                          required
                          {...register("EducationDetailXMarkSecuredTextbox")}
                          className="textBox border-b-[1px] border-black w-[90%] m-5"
                          type="number"
                          id="EducationDetailXMarkSecuredTextbox"
                          name="EducationDetailXMarkSecuredTextbox"
                        />
                        {errors.EducationDetailXMarkSecuredTextbox && (
                          <span className="text-red-600 ml-6">
                            This field is required !
                          </span>
                        )}
                      </td>
                      <td>
                        <input
                          required
                          {...register("EducationDetailXOutOfTextbox")}
                          className="textBox border-b-[1px] border-black w-[90%] m-5"
                          type="number"
                          id="EducationDetailXOutOfTextbox"
                          name="EducationDetailXOutOfTextbox"
                        />
                        {errors.EducationDetailXOutOfTextbox && (
                          <span className="text-red-600 ml-6">
                            This field is required !
                          </span>
                        )}
                      </td>
                      <td>
                        <input
                          required
                          {...register("EducationDetailXYearOfPassingTextbox")}
                          className="textBox border-b-[1px] border-black w-[90%] m-5"
                          type="number"
                          id="EducationDetailXYearOfPassingTextbox"
                          name="EducationDetailXYearOfPassingTextbox"
                        />
                        {errors.EducationDetailXYearOfPassingTextbox && (
                          <span className="text-red-600 ml-6">
                            This field is required !
                          </span>
                        )}
                      </td>
                    </tr>

                    <tr>
                      <td>XII std</td>
                      <td>
                        <input
                          required
                          {...register("EducationDetailXIISchoolNameTextbox")}
                          className="textBox border-b-[1px] border-black w-[90%] m-5"
                          type="text"
                          id="EducationDetailXIISchoolNameTextbox"
                          name="EducationDetailXIISchoolNameTextbox"
                        />
                        {errors.EducationDetailXIISchoolNameTextbox && (
                          <span className="text-red-600 ml-6">
                            This field is required !
                          </span>
                        )}
                      </td>
                      <td>
                        <input
                          required
                          {...register("EducationDetailXIIMarkSecuredTextbox")}
                          className="textBox border-b-[1px] border-black w-[90%] m-5"
                          type="number"
                          id="EducationDetailXIIMarkSecuredTextbox"
                          name="EducationDetailXIIMarkSecuredTextbox"
                        />
                        {errors.EducationDetailXIIMarkSecuredTextbox && (
                          <span className="text-red-600 ml-6">
                            This field is required !
                          </span>
                        )}
                      </td>
                      <td>
                        <input
                          required
                          {...register("EducationDetailXIIOutOfTextbox")}
                          className="textBox border-b-[1px] border-black w-[90%] m-5"
                          type="number"
                          id="EducationDetailXIIOutOfTextbox"
                          name="EducationDetailXIIOutOfTextbox"
                        />
                        {errors.EducationDetailXIIOutOfTextbox && (
                          <span className="text-red-600 ml-6">
                            This field is required !
                          </span>
                        )}
                      </td>
                      <td>
                        <input
                          required
                          {...register(
                            "EducationDetailXIIYearOfPassingTextbox",
                            { required: true }
                          )}
                          className="textBox border-b-[1px] border-black w-[90%] m-5"
                          type="number"
                          id="EducationDetailXIIYearOfPassingTextbox"
                          name="EducationDetailXIIYearOfPassingTextbox"
                        />
                        {errors.EducationDetailXIIYearOfPassingTextbox && (
                          <span className="text-red-600 ml-6">
                            This field is required !
                          </span>
                        )}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>

            <tr>
              <td colSpan="2">
                <hr />
                <br />
                <b>Student’s Family Details</b>
              </td>
            </tr>

            <tr>
              <td>
                10. Student’s parents status / শিক্ষার্থীর পিতা-মাতার পেশা
              </td>
              <td>
                <select
                  onChange={handleChangePage2}
                  required
                  className="textBox border-b-[1px] border-black w-[90%] m-5"
                  id="StudentParentStatusSelectDropDown"
                  name="StudentParentStatusSelectDropDown"
                >
                  <option value="">Please select</option>
                  <option value="Employed">Employed</option>
                  <option value="SelfEmployment">Self Employment</option>
                  <option value="Dependent">Dependent</option>
                </select>
              </td>
            </tr>

            <tr>
              <td colSpan="2">11. Parent/Guardian Details / অভিভাবকের তথ্য</td>
            </tr>

            <tr>
              <td colSpan="2">
                <table style={{ width: "100%" }}>
                  <tbody>
                    <tr>
                      <td width="10%" style={{ textAlign: "center" }}>
                        Relationship to Student
                      </td>
                      <td width="53%" style={{ textAlign: "center" }}>
                        Name
                      </td>
                      <td style={{ textAlign: "center" }}>Age</td>
                      <td style={{ textAlign: "center" }}>Education</td>
                      <td style={{ textAlign: "center" }}>Occupation</td>
                      <td style={{ textAlign: "center" }}>Monthly Salary</td>
                    </tr>

                    <tr>
                      <td>Father</td>
                      <td>
                        <input
                          required
                          {...register(
                            "ParentGuardianDetailFatherNameTextBox",
                            { required: true }
                          )}
                          className="textBox border-b-[1px] border-black w-[90%] m-5"
                          type="text"
                          id="ParentGuardianDetailFatherNameTextBox"
                          name="ParentGuardianDetailFatherNameTextBox"
                        />
                      </td>
                      <td>
                        <input
                          required
                          {...register("ParentGuardianDetailFatherAgeTextBox")}
                          className="textBox border-b-[1px] border-black w-[90%] m-5"
                          type="text"
                          id="ParentGuardianDetailFatherAgeTextBox"
                          name="ParentGuardianDetailFatherAgeTextBox"
                        />
                      </td>
                      <td>
                        <input
                          required
                          {...register(
                            "ParentGuardianDetailFatherEducationTextBox",
                            { required: true }
                          )}
                          className="textBox border-b-[1px] border-black w-[90%] m-5"
                          type="text"
                          id="ParentGuardianDetailFatherEducationTextBox"
                          name="ParentGuardianDetailFatherEducationTextBox"
                        />
                      </td>
                      <td>
                        <input
                          required
                          {...register(
                            "ParentGuardianDetailFatherOccupationTextBox",
                            { required: true }
                          )}
                          className="textBox border-b-[1px] border-black w-[90%] m-5"
                          type="text"
                          id="ParentGuardianDetailFatherOccupationTextBox"
                          name="ParentGuardianDetailFatherOccupationTextBox"
                        />
                      </td>
                      <td>
                        <input
                          required
                          {...register(
                            "ParentGuardianDetailFatherMonthlySalaryTextBox",
                            { required: true }
                          )}
                          className="textBox border-b-[1px] border-black w-[90%] m-5"
                          type="text"
                          id="ParentGuardianDetailFatherMonthlySalaryTextBox"
                          name="ParentGuardianDetailFatherMonthlySalaryTextBox"
                        />
                      </td>
                    </tr>

                    <tr>
                      <td>Mother</td>
                      <td>
                        <input
                          required
                          {...register(
                            "ParentGuardianDetailMotherNameTextBox",
                            { required: true }
                          )}
                          className="textBox border-b-[1px] border-black w-[90%] m-5"
                          type="text"
                          id="ParentGuardianDetailMotherNameTextBox"
                          name="ParentGuardianDetailMotherNameTextBox"
                        />
                      </td>
                      <td>
                        <input
                          required
                          {...register("ParentGuardianDetailMotherAgeTextBox")}
                          className="textBox border-b-[1px] border-black w-[90%] m-5"
                          type="text"
                          id="ParentGuardianDetailMotherAgeTextBox"
                          name="ParentGuardianDetailMotherAgeTextBox"
                        />
                      </td>
                      <td>
                        <input
                          required
                          {...register(
                            "ParentGuardianDetailMotherEducationTextBox",
                            { required: true }
                          )}
                          className="textBox border-b-[1px] border-black w-[90%] m-5"
                          type="text"
                          id="ParentGuardianDetailMotherEducationTextBox"
                        />
                      </td>
                      <td>
                        <input
                          required
                          {...register(
                            "ParentGuardianDetailMotherOccupationTextBox",
                            { required: true }
                          )}
                          className="textBox border-b-[1px] border-black w-[90%] m-5"
                          type="text"
                          id="ParentGuardianDetailMotherOccupationTextBox"
                          name="ParentGuardianDetailMotherOccupationTextBox"
                        />
                      </td>
                      <td>
                        <input
                          required
                          {...register(
                            "ParentGuardianDetailMotherMonthlySalaryTextBox",
                            { required: true }
                          )}
                          className="textBox border-b-[1px] border-black w-[90%] m-5"
                          type="text"
                          id="ParentGuardianDetailMotherMonthlySalaryTextBox"
                          name="ParentGuardianDetailMotherMonthlySalaryTextBox"
                        />
                      </td>
                    </tr>

                    <tr>
                      <td>Guardian</td>
                      <td>
                        <input
                          required
                          {...register(
                            "ParentGuardianDetailGuardianNameTextBox",
                            { required: true }
                          )}
                          className="textBox border-b-[1px] border-black w-[90%] m-5"
                          type="text"
                          id="ParentGuardianDetailGuardianNameTextBox"
                          name="ParentGuardianDetailGuardianNameTextBox"
                        />
                      </td>
                      <td>
                        <input
                          required
                          {...register(
                            "ParentGuardianDetailGuardianAgeTextBox",
                            { required: true }
                          )}
                          className="textBox border-b-[1px] border-black w-[90%] m-5"
                          type="text"
                          id="ParentGuardianDetailGuardianAgeTextBox"
                          name="ParentGuardianDetailGuardianAgeTextBox"
                        />
                      </td>
                      <td>
                        <input
                          required
                          {...register(
                            "ParentGuardianDetailGuardianEducationTextBox",
                            { required: true }
                          )}
                          className="textBox border-b-[1px] border-black w-[90%] m-5"
                          type="text"
                          id="ParentGuardianDetailGuardianEducationTextBox"
                          name="ParentGuardianDetailGuardianEducationTextBox"
                        />
                      </td>
                      <td>
                        <input
                          required
                          {...register(
                            "ParentGuardianDetailGuardianOccupationTextBox",
                            { required: true }
                          )}
                          className="textBox border-b-[1px] border-black w-[90%] m-5"
                          type="text"
                          id="ParentGuardianDetailGuardianOccupationTextBox"
                          name="ParentGuardianDetailGuardianOccupationTextBox"
                        />
                      </td>
                      <td>
                        <input
                          required
                          {...register(
                            "ParentGuardianDetailGuardianMonthlySalaryTextBox",
                            { required: true }
                          )}
                          className="textBox border-b-[1px] border-black w-[90%] m-5"
                          type="text"
                          id="ParentGuardianDetailGuardianMonthlySalaryTextBox"
                          name="ParentGuardianDetailGuardianMonthlySalaryTextBox"
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>

            <tr>
              <td colSpan="2">
                12. Student’s sibling details (Sister / brother if any) /
                শিক্ষার্থীর ভাই বোনের তথ্য (বোন / ভাই যদি থাকে)
              </td>
            </tr>

            <tr>
              <td colSpan="2">
                <table style={{ width: "100%" }}>
                  <tbody>
                    <tr>
                      <td width="10%" style={{ textAlign: "center" }}>
                        Relationship
                      </td>
                      <td width="53%" style={{ textAlign: "center" }}>
                        Name
                      </td>
                      <td style={{ textAlign: "center" }}>Age</td>
                      <td style={{ textAlign: "center" }}>Education</td>
                      <td style={{ textAlign: "center" }}>Occupation</td>
                      <td style={{ textAlign: "center" }}>Monthly Salary</td>
                    </tr>

                    <tr>
                      <td>Brother/s</td>
                      <td>
                        <input
                          {...register("SiblingDetailBrotherNameTextBox")}
                          className="textBox border-b-[1px] border-black w-[90%] m-5"
                          type="text"
                          id="SiblingDetailBrotherNameTextBox"
                          name="SiblingDetailBrotherNameTextBox"
                        />
                      </td>
                      <td>
                        <input
                          {...register("SiblingDetailBrotherAgeTextBox")}
                          className="textBox border-b-[1px] border-black w-[90%] m-5"
                          type="number"
                          id="SiblingDetailBrotherAgeTextBox"
                          name="SiblingDetailBrotherAgeTextBox"
                        />
                      </td>
                      <td>
                        <input
                          {...register("SiblingDetailBrotherEducationTextBox")}
                          className="textBox border-b-[1px] border-black w-[90%] m-5"
                          type="text"
                          id="SiblingDetailBrotherEducationTextBox"
                          name="SiblingDetailBrotherEducationTextBox"
                        />
                      </td>
                      <td>
                        <input
                          {...register("SiblingDetailBrotherOccupationTextBox")}
                          className="textBox border-b-[1px] border-black w-[90%] m-5"
                          type="text"
                          id="SiblingDetailBrotherOccupationTextBox"
                          name="SiblingDetailBrotherOccupationTextBox"
                        />
                      </td>
                      <td>
                        <input
                          {...register("SiblingDetailBrotherSalaryTextBox")}
                          className="textBox border-b-[1px] border-black w-[90%] m-5"
                          type="text"
                          id="SiblingDetailBrotherSalaryTextBox"
                          name="SiblingDetailBrotherSalaryTextBox"
                        />
                      </td>
                    </tr>

                    <tr>
                      <td>Sister/s</td>
                      <td>
                        <input
                          {...register("SiblingDetailSisterNameTextBox")}
                          className="textBox border-b-[1px] border-black w-[90%] m-5"
                          type="text"
                          id="SiblingDetailSisterNameTextBox"
                          name="SiblingDetailSisterNameTextBox"
                        />
                      </td>
                      <td>
                        <input
                          {...register("SiblingDetailSisterAgeTextBox")}
                          className="textBox border-b-[1px] border-black w-[90%] m-5"
                          type="number"
                          id="SiblingDetailSisterAgeTextBox"
                          name="SiblingDetailSisterAgeTextBox"
                        />
                      </td>
                      <td>
                        <input
                          {...register("SiblingDetailSisterEducationTextBox")}
                          className="textBox border-b-[1px] border-black w-[90%] m-5"
                          type="text"
                          id="SiblingDetailSisterEducationTextBox"
                          name="SiblingDetailSisterEducationTextBox"
                        />
                      </td>
                      <td>
                        <input
                          {...register("SiblingDetailSisterOccupationTextBox")}
                          className="textBox border-b-[1px] border-black w-[90%] m-5"
                          type="text"
                          id="SiblingDetailSisterOccupationTextBox"
                          name="SiblingDetailSisterOccupationTextBox"
                        />
                      </td>
                      <td>
                        <input
                          {...register("SiblingDetailSisterSalaryTextBox")}
                          className="textBox border-b-[1px] border-black w-[90%] m-5"
                          type="text"
                          id="SiblingDetailSisterSalaryTextBox"
                          name="SiblingDetailSisterSalaryTextBox"
                        />
                      </td>
                    </tr>

                    <tr>
                      <td></td>
                      <td>
                        <input
                          {...register("SiblingDetailOtherNameTextBox")}
                          className="textBox border-b-[1px] border-black w-[90%] m-5"
                          type="text"
                          id="SiblingDetailOtherNameTextBox"
                          name="SiblingDetailOtherNameTextBox"
                        />
                      </td>
                      <td>
                        <input
                          {...register("SiblingDetailOtherAgeTextBox")}
                          className="textBox border-b-[1px] border-black w-[90%] m-5"
                          type="number"
                          id="SiblingDetailOtherAgeTextBox"
                          name="SiblingDetailOtherAgeTextBox"
                        />
                      </td>
                      <td>
                        <input
                          {...register("SiblingDetailOtherEducationTextBox")}
                          className="textBox border-b-[1px] border-black w-[90%] m-5"
                          type="text"
                          id="SiblingDetailOtherEducationTextBox"
                          name="SiblingDetailOtherEducationTextBox"
                        />
                      </td>
                      <td>
                        <input
                          {...register("SiblingDetailOtherOccupationTextBox")}
                          className="textBox border-b-[1px] border-black w-[90%] m-5"
                          type="text"
                          id="SiblingDetailOtherOccupationTextBox"
                          name="SiblingDetailOtherOccupationTextBox"
                        />
                      </td>
                      <td>
                        <input
                          {...register("SiblingDetailOtherSalaryTextBox")}
                          className="textBox border-b-[1px] border-black w-[90%] m-5"
                          type="text"
                          id="SiblingDetailOtherSalaryTextBox"
                          name="SiblingDetailOtherSalaryTextBox"
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>

            <tr>
              <td>13. Residing house / আবাসিক বাড়ি</td>
              <td>
                <table>
                  <tbody>
                    <tr>
                      <td>
                        <input
                          {...register("ResidingHouseRadioBox")}
                          type="radio"
                          value="Own"
                          name="ResidingHouseRadioBox"
                        />
                      </td>
                      <td>Own</td>
                      <td>
                        <input
                          {...register("ResidingHouseRadioBox")}
                          type="radio"
                          value="Rental"
                          name="ResidingHouseRadioBox"
                        />
                      </td>
                      <td>Rental</td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>

            <tr>
              <td></td>
              <td>
                <table style={{ width: "100%" }}>
                  <tbody>
                    <tr>
                      <td>a. If rental house rent per month</td>
                      <td>
                        <input
                          {...register("ResidingHouseRentalPerMonthTextBox")}
                          className="textBox border-b-[1px] border-black w-[90%] m-5"
                          type="text"
                          id="ResidingHouseRentalPerMonthTextBox"
                          name="ResidingHouseRentalPerMonthTextBox"
                        />
                      </td>
                    </tr>

                    <tr>
                      <td>b. Contact number of the house owner</td>
                      <td>
                        <input
                          {...register(
                            "ResidingHouseRentalOwnerContactDetailTextBox"
                          )}
                          className="textBox border-b-[1px] border-black w-[90%] m-5"
                          type="text"
                          id="ResidingHouseRentalOwnerContactDetailTextBox"
                          name="ResidingHouseRentalOwnerContactDetailTextBox"
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>

            <tr>
              <td colSpan="2">
                <hr />
                <br />
                <b>Educational Details</b>
              </td>
            </tr>

            <tr>
              <td>
                14. Are you a first graduate / আপনি কি নতুন স্নাতক পাস করেছেন?
              </td>
              <td>
                <table>
                  <tbody>
                    <tr>
                      <td>
                        <input
                          {...register("FirstGraduateRadioBox")}
                          type="radio"
                          name="FirstGraduateRadioBox"
                          value="Yes"
                        />
                      </td>
                      <td>Yes</td>
                      <td>
                        <input
                          {...register("FirstGraduateRadioBox")}
                          type="radio"
                          name="FirstGraduateRadioBox"
                          value="No"
                        />
                      </td>
                      <td>No</td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>

            <tr>
              <td>15. Type of the institution / শিক্ষা প্রতিষ্ঠানের ধরন</td>
              <td>
                <table>
                  <tbody>
                    <tr>
                      <td>
                        <input
                          {...register("InstitutionTypeRadioBox")}
                          type="radio"
                          name="InstitutionTypeRadioBox"
                          value="School"
                        />
                      </td>
                      <td>School</td>
                      <td>
                        <input
                          {...register("InstitutionTypeRadioBox")}
                          type="radio"
                          name="InstitutionTypeRadioBox"
                          value="College"
                        />
                      </td>
                      <td>College</td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>

            <tr>
              <td>16. Institution category / শিক্ষা প্রতিষ্ঠানের ধরন</td>
              <td>
                <select
                  onChange={handleChangePage3}
                  className="textBox border-b-[1px] border-black w-[90%] m-5"
                  id="InstitutionCategorySelectDropDown"
                  name="InstitutionCategorySelectDropDown"
                >
                  <option value="">Please select</option>
                  <option value="Govt">Govt.</option>
                  <option value="GovtAided">Govt. Aided</option>
                  <option value="Private">Private</option>
                </select>
              </td>
            </tr>

            <tr>
              <td>
                17. Name of the degree / Class (if school) / ডিগ্রীর নাম / ক্লাস
                (যদি স্কুল হয়)
              </td>
              <td>
                <input
                  {...register("DegreeNameTextBox")}
                  className="textBox border-b-[1px] border-black w-[90%] m-5"
                  type="text"
                  id="DegreeNameTextBox"
                  name="DegreeNameTextBox"
                />
              </td>
            </tr>

            <tr>
              <td>18. Specialization (if Degree) / বিশেষীকরণ (যদি ডিগ্রি)</td>
              <td>
                <input
                  {...register("DegreeSpecializationTextBox")}
                  className="textBox border-b-[1px] border-black w-[90%] m-5"
                  type="text"
                  id="DegreeSpecializationTextBox"
                  name="DegreeSpecializationTextBox"
                />
              </td>
            </tr>

            <tr>
              <td>
                19. Studying year &amp; semester / অধ্যয়নের বছর এবং সেমিস্টার
              </td>
              <td>
                <input
                  {...register("StudyingYearSemesterTextBox")}
                  className="textBox border-b-[1px] border-black w-[90%] m-5"
                  type="text"
                  id="StudyingYearSemesterTextBox"
                  name="StudyingYearSemesterTextBox"
                />
              </td>
            </tr>

            <tr>
              <td>
                20. Applied for any scholarship in your institution / আপনার
                প্রতিষ্ঠানে কোনো ধরনের বৃত্তির জন্য আবেদন করা হয়েছে?
              </td>
              <td>
                <table>
                  <tbody>
                    <tr>
                      <td>
                        <input
                          {...register("ScholarshipAppliedRadioBox")}
                          type="radio"
                          name="ScholarshipAppliedRadioBox"
                          value="Yes"
                        />
                      </td>
                      <td>Yes</td>
                      <td>
                        <input
                          {...register("ScholarshipAppliedRadioBox")}
                          type="radio"
                          name="ScholarshipAppliedRadioBox"
                          value="No"
                        />
                      </td>
                      <td>No</td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
            {/* 5th */}
            <tr>
              <td></td>
              <td>
                <table style={{ width: "100%" }}>
                  <tbody>
                    <tr>
                      <td>If yes furnish details </td>
                      <td>
                        <input
                          {...register("ScholarshipAppliedYesDetailTextBox")}
                          className="textBox border-b-[1px] border-black w-[90%] m-5"
                          type="text"
                          id="ScholarshipAppliedYesDetailTextBox"
                          name="ScholarshipAppliedYesDetailTextBox"
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>

            <tr>
              <td colSpan="2">
                21. Details of the school / college / স্কুল / কলেজের বিবরণ
              </td>
            </tr>

            <tr>
              <td colSpan="2">
                <table style={{ width: "100%" }}>
                  <tbody>
                    <tr>
                      <td width="30%" style={{ textAlign: "center" }}>
                        Name
                      </td>
                      <td width="30%" style={{ textAlign: "center" }}>
                        Address
                      </td>
                      <td style={{ textAlign: "center" }}>Contact</td>
                      <td style={{ textAlign: "center" }}>Email</td>
                      <td style={{ textAlign: "center" }}>Website</td>
                    </tr>

                    <tr>
                      <td>
                        <input
                          {...register("EducationDetailNameTextBoxLine1")}
                          className="textBox border-b-[1px] border-black w-[90%] m-5"
                          type="text"
                          id="EducationDetailNameTextBoxLine1"
                          name="EducationDetailNameTextBoxLine1"
                        />
                      </td>
                      <td>
                        <input
                          {...register("EducationDetailAddressTextBoxLine1")}
                          className="textBox border-b-[1px] border-black w-[90%] m-5"
                          type="text"
                          id="EducationDetailAddressTextBoxLine1"
                          name="EducationDetailAddressTextBoxLine1"
                        />
                      </td>
                      <td>
                        <input
                          {...register("EducationDetailContactTextBoxLine1")}
                          className="textBox border-b-[1px] border-black w-[90%] m-5"
                          type="text"
                          id="EducationDetailContactTextBoxLine1"
                          name="EducationDetailContactTextBoxLine1"
                        />
                      </td>
                      <td>
                        <input
                          {...register("EducationDetailEmailTextBoxLine1")}
                          className="textBox border-b-[1px] border-black w-[90%] m-5"
                          type="text"
                          id="EducationDetailEmailTextBoxLine1"
                          name="EducationDetailEmailTextBoxLine1"
                        />
                      </td>
                      <td>
                        <input
                          {...register("EducationDetailWebsiteTextBoxLine1")}
                          className="textBox border-b-[1px] border-black w-[90%] m-5"
                          type="text"
                          id="EducationDetailWebsiteTextBoxLine1"
                          name="EducationDetailWebsiteTextBoxLine1"
                        />
                      </td>
                    </tr>

                    <tr>
                      <td>
                        <input
                          {...register("EducationDetailNameTextBoxLine2")}
                          className="textBox border-b-[1px] border-black w-[90%] m-5"
                          type="text"
                          id="EducationDetailNameTextBoxLine2"
                        />
                      </td>
                      <td>
                        <input
                          {...register("EducationDetailAddressTextBoxLine2")}
                          className="textBox border-b-[1px] border-black w-[90%] m-5"
                          type="text"
                          id="EducationDetailAddressTextBoxLine2"
                        />
                      </td>
                      <td>
                        <input
                          {...register("EducationDetailContactTextBoxLine2")}
                          className="textBox border-b-[1px] border-black w-[90%] m-5"
                          type="text"
                          id="EducationDetailContactTextBoxLine2"
                        />
                      </td>
                      <td>
                        <input
                          {...register("EducationDetailEmailTextBoxLine2")}
                          className="textBox border-b-[1px] border-black w-[90%] m-5"
                          type="text"
                          id="EducationDetailEmailTextBoxLine2"
                        />
                      </td>
                      <td>
                        <input
                          {...register("EducationDetailWebsiteTextBoxLine2")}
                          className="textBox border-b-[1px] border-black w-[90%] m-5"
                          type="text"
                          id="EducationDetailWebsiteTextBoxLine2"
                        />
                      </td>
                    </tr>

                    <tr>
                      <td>
                        <input
                          {...register("EducationDetailNameTextBoxLine3")}
                          className="textBox border-b-[1px] border-black w-[90%] m-5"
                          type="text"
                          id="EducationDetailNameTextBoxLine3"
                        />
                      </td>
                      <td>
                        <input
                          {...register("EducationDetailAddressTextBoxLine3")}
                          className="textBox border-b-[1px] border-black w-[90%] m-5"
                          type="text"
                          id="EducationDetailAddressTextBoxLine3"
                        />
                      </td>
                      <td>
                        <input
                          {...register("EducationDetailContactTextBoxLine3")}
                          className="textBox border-b-[1px] border-black w-[90%] m-5"
                          type="text"
                          id="EducationDetailContactTextBoxLine3"
                        />
                      </td>
                      <td>
                        <input
                          {...register("EducationDetailEmailTextBoxLine3")}
                          className="textBox border-b-[1px] border-black w-[90%] m-5"
                          type="text"
                          id="EducationDetailEmailTextBoxLine3"
                        />
                      </td>
                      <td>
                        <input
                          {...register("EducationDetailWebsiteTextBoxLine3")}
                          className="textBox border-b-[1px] border-black w-[90%] m-5"
                          type="text"
                          id="EducationDetailWebsiteTextBoxLine3"
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
            {/* 6th */}
            <tr>
              <td style={{ verticalAlign: "top" }}>
                22. Current academic year fees (Excluding hostel &amp; mess fees
                if applicable) / বর্তমান শিক্ষাবর্ষের ফি (হোস্টেল ও মেস ফি
                ব্যতীত যদি গ্রহণযোগ্য হয়)
              </td>
              <td>
                <table style={{ width: "100%" }}>
                  <tbody>
                    <tr>
                      <td style={{ width: "25px" }}>Rs .</td>
                      <td>
                        <input
                          {...register("CurrentAcademicYearFeesTextBox")}
                          className="textBox border-b-[1px] border-black w-[90%] m-5"
                          type="text"
                          id="CurrentAcademicYearFeesTextBox"
                          name="CurrentAcademicYearFeesTextBox"
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>

                <table style={{ width: "100%" }}>
                  <tbody>
                    <tr>
                      <td>
                        a. How much amount is needed from the total amount
                        mentioned above?
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <table style={{ width: "100%" }}>
                          <tbody>
                            <tr>
                              <td style={{ width: "25px" }}>Rs .</td>
                              <td>
                                <input
                                  {...register(
                                    "CurrentAcademicYearFeesExpectedTextBox"
                                  )}
                                  className="textBox border-b-[1px] border-black w-[90%] m-5"
                                  type="text"
                                  id="CurrentAcademicYearFeesExpectedTextBox"
                                  name="CurrentAcademicYearFeesExpectedTextBox"
                                />
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <table style={{ width: "100%" }}>
                          <tbody>
                            <tr>
                              <td style={{ width: "50%" }}>
                                b. Semester Fees:
                              </td>
                              <td>
                                <input
                                  {...register(
                                    "CurrentAcademicYearSemesterFeesTextBox"
                                  )}
                                  className="textBox border-b-[1px] border-black w-[90%] m-5"
                                  type="text"
                                  id="CurrentAcademicYearSemesterFeesTextBox"
                                  name="CurrentAcademicYearSemesterFeesTextBox"
                                />
                              </td>
                            </tr>
                            <tr>
                              <td>
                                c. Last Date for paying Tuition fees for the
                                current Semester:
                              </td>
                              <td>
                                <input
                                  {...register(
                                    "CurrentAcademicYearLastDateForTutionFeesTextBox"
                                  )}
                                  className="textBox border-b-[1px] border-black w-[90%] m-5"
                                  type="text"
                                  id="CurrentAcademicYearLastDateForTutionFeesTextBox"
                                  name="CurrentAcademicYearLastDateForTutionFeesTextBox"
                                />
                              </td>
                            </tr>
                            <tr>
                              <td>d. Institution’s Bank Details:</td>
                              <td>
                                <input
                                  {...register("InstitutionBankDetailTextBox")}
                                  className="textBox border-b-[1px] border-black w-[90%] m-5"
                                  type="text"
                                  id="InstitutionBankDetailTextBox"
                                  name="InstitutionBankDetailTextBox"
                                />
                              </td>
                            </tr>
                            <tr>
                              <td>e. Account No:</td>
                              <td>
                                <input
                                  {...register("InstitutionBankAccountTextBox")}
                                  className="textBox border-b-[1px] border-black w-[90%] m-5"
                                  type="text"
                                  id="InstitutionBankAccountTextBox"
                                  name="InstitutionBankAccountTextBox"
                                />
                              </td>
                            </tr>
                            <tr>
                              <td>IFSC Code:</td>
                              <td>
                                <input
                                  {...register("InstitutionBankIFSCTextBox")}
                                  className="textBox border-b-[1px] border-black w-[90%] m-5"
                                  type="text"
                                  id="InstitutionBankIFSCTextBox"
                                  name="InstitutionBankIFSCTextBox"
                                />
                              </td>
                            </tr>
                            <tr>
                              <td>f. Bank Name:</td>
                              <td>
                                <input
                                  {...register("InstitutionBankNameTextBox")}
                                  className="textBox border-b-[1px] border-black w-[90%] m-5"
                                  type="text"
                                  id="InstitutionBankNameTextBox"
                                  name="InstitutionBankNameTextBox"
                                />
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>

            <tr>
              <td colSpan="2">
                23. To know more about you furnish two References (One Reference
                must be a teacher / Professor in which the student is studying)
                / আপনার সম্পর্কে আরও জানতে দুটি রেফারেন্স প্রদান করুন (একটি
                রেফারেন্স একজন শিক্ষক/অধ্যাপক হতে হবে যেখানে শিক্ষার্থী অধ্যয়ন
                করছে)
              </td>
            </tr>

            <tr>
              <td colSpan="2">
                <table style={{ width: "100%" }}>
                  <tbody>
                    <tr>
                      <td width="10%" style={{ textAlign: "center" }}></td>
                      <td width="30%" style={{ textAlign: "center" }}>
                        Name
                      </td>
                      <td style={{ textAlign: "center" }}>Destination</td>
                      <td style={{ textAlign: "center" }}>Mobile No</td>
                      <td style={{ textAlign: "center" }}>Email ID</td>
                    </tr>
                    <tr>
                      <td>Reference 1</td>
                      <td>
                        <input
                          {...register("ReferenceDetailNameTextBoxLine1")}
                          className="textBox border-b-[1px] border-black w-[90%] m-5"
                          type="text"
                          id="ReferenceDetailNameTextBoxLine1"
                          name="ReferenceDetailNameTextBoxLine1"
                        />
                      </td>
                      <td>
                        <input
                          {...register(
                            "ReferenceDetailDestinationTextBoxLine1"
                          )}
                          className="textBox border-b-[1px] border-black w-[90%] m-5"
                          type="text"
                          id="ReferenceDetailDestinationTextBoxLine1"
                          name="ReferenceDetailDestinationTextBoxLine1"
                        />
                      </td>
                      <td>
                        <input
                          {...register("ReferenceDetailMobileTextBoxLine1")}
                          className="textBox border-b-[1px] border-black w-[90%] m-5"
                          type="text"
                          id="ReferenceDetailMobileTextBoxLine1"
                          name="ReferenceDetailMobileTextBoxLine1"
                        />
                      </td>
                      <td>
                        <input
                          {...register("ReferenceDetailEmailTextBoxLine1")}
                          className="textBox border-b-[1px] border-black w-[90%] m-5"
                          type="text"
                          id="ReferenceDetailEmailTextBoxLine1"
                          name="ReferenceDetailEmailTextBoxLine1"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>Reference 2</td>
                      <td>
                        <input
                          {...register("ReferenceDetailNameTextBoxLine2")}
                          className="textBox border-b-[1px] border-black w-[90%] m-5"
                          type="text"
                          id="ReferenceDetailNameTextBoxLine2"
                          name="ReferenceDetailNameTextBoxLine2"
                        />
                      </td>
                      <td>
                        <input
                          {...register(
                            "ReferenceDetailDestinationTextBoxLine2"
                          )}
                          className="textBox border-b-[1px] border-black w-[90%] m-5"
                          type="text"
                          id="ReferenceDetailDestinationTextBoxLine2"
                          name="ReferenceDetailDestinationTextBoxLine2"
                        />
                      </td>
                      <td>
                        <input
                          {...register("ReferenceDetailMobileTextBoxLine2")}
                          className="textBox border-b-[1px] border-black w-[90%] m-5"
                          type="text"
                          id="ReferenceDetailMobileTextBoxLine2"
                          name="ReferenceDetailMobileTextBoxLine2"
                        />
                      </td>
                      <td>
                        <input
                          {...register("ReferenceDetailEmailTextBoxLine2")}
                          className="textBox border-b-[1px] border-black w-[90%] m-5"
                          type="text"
                          id="ReferenceDetailEmailTextBoxLine2"
                          name="ReferenceDetailEmailTextBoxLine2"
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>

            <tr>
              <td colSpan="2">24. Who introduced you to Vizhuthugal?</td>
            </tr>
            <tr>
              <td>Name / নাম</td>
              <td>
                <input
                  {...register("IntroducerNameTextBox")}
                  className="textBox border-b-[1px] border-black w-[90%] m-5"
                  type="text"
                  id="IntroducerNameTextBox"
                  name="IntroducerNameTextBox"
                />
              </td>
            </tr>
            {/* 7th */}

            <tr>
              <td>Mobile No / মোবাইল নাম্বার</td>
              <td>
                <input
                  {...register("IntroducerMobileTextBox")}
                  className="textBox border-b-[1px] border-black w-[90%] m-5"
                  type="text"
                  id="IntroducerMobileTextBox"
                  name="IntroducerMobileTextBox"
                />
              </td>
            </tr>

            <tr style={{ borderBottom: "0px" }}>
              <td colSpan="2">
                <hr />
              </td>
            </tr>

            <tr>
              <td colSpan="2">
                <table width="100%">
                  <tbody>
                    <tr>
                      <td style={{ width: "25px", verticalAlign: "top" }}>
                        <input
                          required
                          {...register("DeclarationCheckBox")}
                          type="checkbox"
                          name="DeclarationCheckBox"
                          id="DeclarationCheckBox"
                        />
                      </td>
                      <td>
                        Hereby, I declare that all the above-mentioned
                        information is true to the best of my knowledge and I
                        will help poor students after I join any job upon
                        graduation. / এতদ্বারা, আমি সজ্ঞানে বলতেছি যে উপরে
                        উল্লেখিত সকল তথ্য সত্য এবং আমি আমার স্নাতক শেষ করার পরে
                        চাকরিতে যোগদান করে গরিবদের সাহায্য করব |
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
            {/* Image Uploading */}
            <tr>
              <div className="my-6">
                <label className="label">
                  <span className="label-text ">Choose your Photo *</span>
                </label>
                <input
                  type="file"
                  {...register("photo", { required: true })}
                  placeholder="Choose a file"
                  className="file-input file-input-bordered w-full"
                />{" "}
                {errors.photo && <span>This field is required</span>}
              </div>
              {/* <div className="my-6">
                <label className="label">
                  <span className="label-text ">
                    Choose your Photo1 *
                  </span>
                </label>
                <input
                  type="file"
                  {...register("photo1", { required: true })}
                  placeholder="Choose a file"
                  className="file-input file-input-bordered w-full"
                />{" "}
                {errors.photo1 && <span>This field is required</span>}
              </div>
              <div className="my-6">
                <label className="label">
                  <span className="label-text ">
                    Choose your Photo2 *
                  </span>
                </label>
                <input
                  type="file"
                  {...register("photo2", { required: true })}
                  placeholder="Choose a file"
                  className="file-input file-input-bordered w-full"
                />{" "}
                {errors.photo && <span>This field is required</span>}
              </div> */}
            </tr>

            {/* Robot Security Section Start*/}

            <tr>
              <td colSpan="2">
                <ReCAPTCHA
                  sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
                  onChange={onChange}
                />
              </td>
            </tr>

            {/* Robot Security Section End */}

            <tr>
              <td colSpan="2" style={{ textAlign: "center" }}>
                <table style={{ margin: "0px auto" }}>
                  <tbody>
                    <tr className="flex gap-10">
                      <td className="my-10">
                        {verify ? (
                          <input
                            type="submit"
                            name="SubmitFormButton"
                            className="px-4 py-1 border hover:border-[#c2c2c2] border-[#555454] hover:bg-[#b8b7b7] bg-[#E5E5E5]"
                            value="SUBMIT"
                          />
                        ) : (
                          <input
                            type="button"
                            name="SubmitFormButton"
                            className="px-4 py-1 border  border-[#555454] bg-[#E5E5E5]"
                            value="SUBMIT"
                            title="Firstly Verify that, you are not robot"
                          />
                        )}
                      </td>
                      <td className="my-10">
                        <input
                          type="reset"
                          className="px-4 py-1 border hover:border-[#c2c2c2] border-[#555454] hover:bg-[#b8b7b7] bg-[#E5E5E5]"
                          name="ResetFormButton"
                          value="RESET"
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
  );
};

export default From;
