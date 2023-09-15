import React from "react";
import { useLocation } from "react-router-dom";

const EmailVerification = () => {
  const location = useLocation();
  console.log(location.state);
  return (
    <div>
      <h1>This is EmailVerification page</h1>
    </div>
  );
};

export default EmailVerification;
