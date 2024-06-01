import ReCAPTCHA from "react-google-recaptcha";

const RecaptchaComponent = () => {
  function onChange(value) {
    console.log("Captcha value:", value);
  }
  return (
    <div>
      <ReCAPTCHA
        sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
        onChange={onChange}
      />
      ,
    </div>
  );
};

export default RecaptchaComponent;
