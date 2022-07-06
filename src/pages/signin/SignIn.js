import React, { useEffect } from "react";
import { SignInForm } from "../../components";
import { FullscreenLayout } from "../../layouts";
const SignIn = (props) => {
  useEffect(() => {
    console.log("SignIn", props)
  }, [props.store])
  return (
    <FullscreenLayout>
      <SignInForm />
    </FullscreenLayout>
  );
};
export default SignIn;
