import Profile from "../pages/Profile";
// import Trips from "../pages/Trips";
// import Reports from "../pages/Reports";
import Monitor from "../pages/Monitor";
import CreateBill from "~pages/CreateBill";
import Locate from "~pages/Locate/index";

const publicRoutes = [
  { path: "/", component: CreateBill },
  { path: "/monitor", component: Monitor },
  { path: "/profile", component: Profile },
  { path: "/locate", component: Locate },
  // { path: "/reports", component: Reports },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
