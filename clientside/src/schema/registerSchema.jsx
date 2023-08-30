import * as Yup from "yup";

const registerSchema = Yup.object({
  firstname: Yup.string().required("Please enter your Firstname"),
  lastname: Yup.string().required("Please enter your Lastname"),
  username: Yup.string().min(3).max(15).required("Please enter Username"),
  email: Yup.string().email("Please enter correct Email Id").required("Please enter your Email Id"),
  password: Yup.string().min(6).required("Please enter your password"),
  confirmpassword: Yup.string()
    .required("Please confirm your password")
    .oneOf([Yup.ref("password"), null], "Confirm password must match"),
});

export default registerSchema;
