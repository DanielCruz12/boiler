import React, { useState } from "react";
import { Link, navigate } from "@reach/router";
import { WrapperForm } from "./Styles";
import * as actionTypes from "../../redux/action_types";
import { authenticate, socket } from "../../services";
import { Button, Input, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { SimpleForm } from "../form";

const SignInForm = (props) => {
  const dispatch = useDispatch();
  const theme = useSelector(({ design }) => design.theme);
  const fields = [
    {
      name: "email",
      fullWidth: true,
      label: "Email",
      placeholder: "Email",
    },
    {
      name: "password",
      fullWidth: true,
      type: "password",
      label: "Password",
      placeholder: "Password",
    },
    /*  {
       xtype: "moneyfield",
       name: "price",
       fullWidth: true,
       label: "Price",
       placeholder: "Price",
     },
     {
       xtype: "codefield",
       name: "code",
       fullWidth: true,
       label: "Code",
       placeholder: "Code",
     }, */
    {
      name: "strategy",
      type: "hidden",
    },
  ];
  const connect = ({ strategy = "jwt", accessToken, ...rest }) => {
    return socket.authenticate({
      strategy,
      accessToken,
      ...rest
    });
  };
  const handleSubmit = (data, form) => {
    authenticate(data)
      .then((res) => {
        let { user, authentication, accessToken, settings = {} } = res;
        let { theme, logo } = settings;
        /* Socket Authentication */
        connect({
          accessToken
        });
        if (theme)
          dispatch({
            type: actionTypes.CHANGE_THEME,
            theme,
          });
        if (logo)
          dispatch({
            type: actionTypes.CHANGE_LOGO,
            logo,
          });
        dispatch({
          type: actionTypes.AUTHENTICATION,
          user,
          accessToken,
        });
        if (props.onSubmit) props.onSubmit(data);
        navigate("/dashboard");
      })
      .catch(err => message.error("Email or Password Invalid!"));

  };

  return (
    <WrapperForm theme={theme}>
      <h2>SignIn Form</h2>
      <SimpleForm
        onChange={(field, value, record) => console.log(field, value, record)}
        //source="authentication"
        onSubmit={handleSubmit}
        displayMessage={false}
        initialValues={{
          strategy: "local",
        }}
        buttonTextSubmit="LogIn"
        fields={fields}
      />
    </WrapperForm>
  );
};
export default SignInForm;
