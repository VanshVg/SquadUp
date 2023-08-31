import * as Yup from "yup";

const registerSchema = () => {
  let schema = Yup.object();

  schema = schema.shape({
    firstname: Yup.string().required("Please enter your Firstname"),
    lastname: Yup.string().required("Please enter your Lastname"),
    username: Yup.string().min(3).max(15).required("Please enter Username"),
    email: Yup.string().email("Please enter valid Email Id").required("Please enter Email Id"),
    password: Yup.string().min(6).required("Please create a Password"),
    confirmpassword: Yup.string()
      .required("Please confirm your password")
      .oneOf([Yup.ref("password"), null], "Confirm Password must be same"),
  });

  return schema;
};

export default registerSchema;
