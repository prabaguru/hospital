import { RouteInfo } from "./sidebar.metadata";

export const ROUTES: RouteInfo[] = [
  {
    path: "",
    title: "MENU",
    moduleName: "",
    icon: "",
    class: "header",
    groupTitle: true,
    submenu: [],
    role: "",
  },

  // Hospital dashboard
  {
    path: "",
    title: "Home",
    moduleName: "hospital",
    icon: "monitor",
    class: "menu-toggle",
    groupTitle: false,
    role: "Hospital",
    submenu: [
      {
        path: "/hospital/Dashboard",
        title: "Dashboard",
        moduleName: "",
        icon: "",
        class: "ml-menu",
        groupTitle: false,
        submenu: [],
        role: "Hospital",
      },
      {
        path: "/hospital/doctors",
        title: "Manage Doctors",
        moduleName: "",
        icon: "",
        class: "ml-menu",
        groupTitle: false,
        submenu: [],
        role: "Hospital",
      },
      {
        path: "hospital/users",
        title: "Manage Users",
        moduleName: "",
        icon: "",
        class: "ml-menu",
        groupTitle: false,
        submenu: [],
        role: "Hospital",
      },
    ],
  },
];
