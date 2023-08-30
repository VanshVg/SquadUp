import * as Yup from "yup";

const loginSchema = Yup.object({
  email: Yup.string().email("Please enter correct Email Id").required("Please enter your Email Id"),
  username: Yup.string().min(3).max(15).required("Please enter Username"),
  password: Yup.string().min(6).required("Please enter your password"),
});

export default loginSchema;
