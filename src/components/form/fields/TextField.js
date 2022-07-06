import React, { useEffect, useState } from "react";
import { Input, Skeleton } from "antd";

const TextField = ({ onChange, source, name, ...props }) => {
  const handleOnChange = (e) => {
    let { value } = e.target;
    if (onChange) onChange(value);
  };
  if (props.type === "password")
    return <Input.Password {...props} onChange={handleOnChange} />;
  return <Input
    {...props}
    //defaultValue="XXX"
    onChange={handleOnChange} />;
};
export default TextField;
