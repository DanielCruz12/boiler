import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { CRUD } from "../../components";
import { CHANGE_THEME } from "../../redux/action_types";
const ShowDash = (props) => <>Dashboard {props.id}</>
const Dashboard = ({ id, ...props }) => {
  const user = useSelector(({ auth }) => auth.user);
  const dispatch = useDispatch();
  useEffect(() => {
    /* dispatch({
      type: CHANGE_THEME,
      theme: {
        primaryColor: "red",
      },
    }); */
    console.log("Dashboard Render.");
  }, []);
  return (
    <div>
      Dashboard
    </div>
  );
};
export default Dashboard;
