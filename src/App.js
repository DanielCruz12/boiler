import { useEffect, useRef } from "react";
import "./App.less";
import "codemirror/lib/codemirror.css";


/* import Loadeable from "react-loadable";
import { Loader } from "./components/"; */
import { Router, createHistory, navigate } from "@reach/router";
import { DashboardLayout } from "./layouts";
import {
  NotFound,
  SignIn,
  SignUp,
  ResetPassword,
  ChangePassword,
} from "./pages/";
/* Redux Store */
import { store } from "./redux/";
import { Provider, useDispatch, useSelector } from "react-redux";
import * as actionTypes from "./redux/action_types";
import styled from "styled-components";
import { message } from "antd";
import { reAuthenticate } from "./services";
/*
const DashboardLayout = Loadeable({
  loader: () => import("./layouts/dashboard_layout"),
  loading: Loader,
});
 const SignIn = Loadeable({
  loader: () => import("./pages/signin/SignIn"),
  loading: Loader,
});
const SignUp = Loadeable({
  loader: () => import("./pages/signup/SignUp"),
  loading: Loader,
});
const ResetPassword = Loadeable({
  loader: () => import("./pages/reset-password/ResetPassword"),
  loading: Loader,
});
const ChangePassword = Loadeable({
  loader: () => import("./pages/change-password/ChangePassword"),
  loading: Loader,
}); */

const WrapperApp = styled.div``;

store.subscribe(() => {
  console.log("store: ", store.getState());
});
let history = createHistory(window);
function App() {
  const myRef = useRef(null);
  const dispatch = useDispatch();
  const base = useSelector(({ base }) => base);
  const ScrollToTop = ({ children, location }) => {
    useEffect(
      () => window.scrollTo(0, myRef.current ? myRef.current.offsetTop : 0),
      [location.pathname]
    );
    return children;
  };
  useEffect(() => {
    reAuthenticate()
      .then(
        ({
          user,
          settings = {
            /* theme: {
              primaryColor: "#6f42c1",
              secundaryColor: "var(--secundary-color)",
              menuItemColor: "var(--menu-item-color)",
              menuItemIconColor: "var(--menu-item-icon-color)",
            }, */
          },
          accessToken,
        }) => {
          let { theme, logo } = settings;
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
        }
      )
      .catch((error) => {
        navigate("/");
        message.error(error.message);
      });
  }, []);
  useEffect(() => {
    if (base) console.log("Base:", base);
  }, [base]);
  return (
    <Provider store={store} history={history}>
      <WrapperApp className="App">
        <Router primary={false}>
          <ScrollToTop path="/">
            <DashboardLayout path="/dashboard/*" />
            <SignIn path="/" />
            <SignIn path="/signin" />
            <SignUp path="/signup" />
            <ResetPassword path="/reset-password" />
            <ChangePassword path="/change-password/:token" />
            <NotFound default />
          </ScrollToTop>
        </Router>
      </WrapperApp>
    </Provider>
  );
}
export default App;
