import React from "react";
import { WrapperFullscreenLayout } from "./Styles";
import { useDispatch, useSelector } from "react-redux";
const FullscreenLayout = (props) => {
  const theme = useSelector(({ design }) => design.theme);
  return (
    <WrapperFullscreenLayout
      theme={theme}
      className="full-screen-layout-container"
    >
      {props.children}
    </WrapperFullscreenLayout>
  );
};
export default FullscreenLayout;
