import * as Yup from "yup";

const changePasswordSchema = () => {
  let schema = Yup.object();

  schema = schema.shape({
    newpassword: Yup.string()
      .min(6, "Password should contain minimum 6 characters")
      .required("Please create a Password"),
    confirmpassword: Yup.string()
      .required("Please confirm your password")
      .oneOf([Yup.ref("newpassword"), null], "Confirm Password must be same"),
  });

  return schema;
};

export default changePasswordSchema;
