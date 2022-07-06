import React, { useEffect, useState } from "react";
import { Avatar, Layout, Menu, Dropdown, Button, message } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { navigate, Router } from "@reach/router";
import routes from "../routes/";
import { WrapperDashboardLayout, WrapperMenuRight } from "./Styles";
import { Loader } from "../components/";
import { useDispatch, useSelector } from "react-redux";
import { COLLAPSED_MENU, LOGOUT } from "../redux/action_types";
import { DEFAULT_AVATAR, URL_S3 } from "../constants/";
import { Logout } from "../services/";
const views = ["edit", "remove", "show"];
const { SubMenu } = Menu;
const { Header, Sider, Content, Footer } = Layout;
const DashboardLayout = (props) => {
  const [collapsed, setCollapsed] = useState();
  const [resources, setResources] = useState();
  const [logout, setLogOut] = useState(false);
  const [menu_items, setMenuItems] = useState([]);
  const dispatch = useDispatch();
  const base = useSelector(({ base }) => base);
  const user = useSelector(({ auth }) => auth.user);
  const theme = useSelector(({ design }) => design.theme);
  const logo = useSelector(({ design }) => design.logo);
  /* const [initialized, setInitialized] = useState(false); */
  const toggle = () => {
    dispatch({
      type: COLLAPSED_MENU,
      collapsed: !collapsed,
    });
  };
  const renderItems = ({ primaryText, ...item }, index) => {
    if (item.children) {
      return (
        <SubMenu
          key={item.name || index + 1}
          icon={item.icon || item.leftIcon}
          title={primaryText}
        >
          {item.children.map(renderItems)}
        </SubMenu>
      );
    }
    return (
      <Menu.Item
        {...item}
        key={item.name || index + 1}
        icon={item.icon || item.leftIcon}
      >
        {primaryText}
      </Menu.Item>
    );
  };
  const getRoutes = async (routes) => {
    let resources = [];
    await Promise.all(
      routes.map(async (route) => {
        if (!route.path && !route.children) return null;
        if (route.type == "crud") {
          if (!route.edit)
            resources.push({
              path: `/${route.name}/:id`,
              name: route.name,
              component: route.edit || route.create || route.component,
            });
         /*  if (!route.create)
            resources.push({
              path: `/${route.name}/create`,
              name: route.name,
              component: route.create || route.component,
            }); */
          if (!route.show)
            resources.push({
              path: `/${route.name}/show/:_id`,
              name: route.name,
              component: route.show || route.component,
            });
        }
        if (route.edit) resources.push(route.edit || route.create);
        if (route.show) resources.push(route.show);
        if (route.create) resources.push(route.create || route.edit);

        if (route.children) {
          let children = await getRoutes(route.children);
          resources = [...resources, ...children];
        } else {
          resources.push(route);
        }
        return route;
      })
    );
    return resources;
  };
  const handleClick = ({ key, item }) => {
    let { path } = item.props;
    if (path) navigate(`/dashboard${path}`);
  };
  const handleMenuClick = ({ key, item }) => {
    switch (key) {
      case "logout":
        setLogOut(true);
        Logout()
          .then((res) => {
            setLogOut(false);
            dispatch({
              type: LOGOUT,
            });
          })
          .catch((err) => {
            message.error(err.message);
          });
        break;
      default:
        navigate(`/dashboard/${key}`);
        break;
    }
  };
  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="profile">
        <Button block icon={<UserOutlined />} type="link">
          Profile
        </Button>
      </Menu.Item>
      <Menu.Item key="logout">
        <Button block icon={<LogoutOutlined />} type="link" loading={logout}>
          SignOut
        </Button>
      </Menu.Item>
    </Menu>
  );
  useEffect(() => {
    if (!user) navigate("/");
    if (user)
      getRoutes(routes).then((resources) => {
        setResources(resources);
        setMenuItems(
          routes.filter((route) => (route.path && route.name) || route.children)
          /*  routes.filter((route) => {
          return allowAccess(route.permissions);
        }) */
        );
      });
  }, [user]);
  useEffect(() => {
    setCollapsed(base.collapsed);
  }, [base.collapsed]);
  if (!resources) return <Loader />;
  return (
    <WrapperDashboardLayout theme={theme}>
      <Layout style={{ minHeight: "100vh" }}>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div
            className="logo-container"
            style={{
              background: `url(${logo})`,
            }}
          />
          <Menu
            onClick={handleClick}
            theme="dark"
            mode="inline"
          /* defaultSelectedKeys={["1"]} */
          >
            {menu_items.map(renderItems)}
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="top-bar" style={{ padding: 0 }}>
            {React.createElement(
              collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
              {
                className: "trigger",
                onClick: toggle,
              }
            )}
            <WrapperMenuRight>
              <Dropdown overlay={menu}>
                <Avatar
                  size="large"
                  src={
                    user && user.picture
                      ? `${URL_S3}/${user.picture}`
                      : DEFAULT_AVATAR
                  }
                />
              </Dropdown>
            </WrapperMenuRight>
          </Header>
          <Content
            className="site-layout-background"
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: 280,
            }}
          >
            <Router>
              {resources.map((route, index) => (
                <route.component
                  key={index}
                  path={route.path}
                  default={route.default}
                />
              ))}
            </Router>
          </Content>
          <Footer style={{ textAlign: "center" }}>
            Ant Design ©2018 Created by Ant UED
          </Footer>
        </Layout>
      </Layout>
    </WrapperDashboardLayout>
  );
};
export default DashboardLayout;
