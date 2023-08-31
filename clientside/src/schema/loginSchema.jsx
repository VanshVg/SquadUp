import * as Yup from "yup";

const loginSchema = (loginType) => {
  let schema = Yup.object();

  if (loginType === "username") {
    schema = schema.shape({
      username: Yup.string().min(3).max(15).required("Please enter your username"),
    });
  } else {
    schema = schema.shape({
      email: Yup.string()
        .email("Please enter valid Email Id")
        .required("Please enter your Email Id"),
    });
  }

  schema = schema.shape({
    password: Yup.string().min(6).required("Please enter your password"),
  });

  return schema;
};

export default loginSchema;
