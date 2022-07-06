import { Home, Dashboard, NotFound, Profile, Users, Contacts, Properties } from "../pages/";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import UserDetail from "../pages/users/UserDetail";
const ShowDash = () => (<>SHOOW</>)
let routes = [
  {
    path: "/",
    default: true,
    name: "dashboard",
    primaryText: "Dashboard",
    component: Dashboard,
    form: () => (<>EDIT OR CREATE</>),

  },
  {
    path: "/profile",
    primaryText: "Profile",
    component: Profile,
  },

  {
    path: "/properties",
    name: "properties",
    primaryText: "Propiedades",
    component: Properties,
    type: "crud",
    icon: <UserOutlined />
  },
  {
    path: "/contacts",
    name: "contacts",
    primaryText: "Contáctos",
    component: Contacts,
    type: "crud",
    icon: <UserOutlined />
  },



  {
    path: "/",
    primaryText: "Settings",
    component: Home,
    icon: <HomeOutlined />,
    children: [
      {
        path: "/users",
        name: "users",
        primaryText: "Users",
        component: Users,
        type: "crud",
        icon: <UserOutlined />,
        /*  show: {
           path: "/users/show/:id",
           name: "users-show",
           primaryText: "Show User",
           component: UserDetail
         } */

        /* edit: {
          path: "/users/:id",
          name: "users-edit",
          primaryText: "Edit User",
          component: () => <>Users Edit</>
        } */
      },
      {
        path: "/plans",
        name: "plans",
        primaryText: "Plans",
        component: () => <>Plans</>,
        icon: <UserOutlined />,
      },
    ],
  },
  {
    default: true,
    primaryText: "Page Not found",
    component: NotFound,
  },
];
export default routes;
