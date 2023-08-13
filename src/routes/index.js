import Profile from "../pages/Profile";
import Trips from "../pages/Trips";
import Reports from "../pages/Reports";
import HomePage from "../pages/Home";
import CreateBill from "~pages/CreateBill";

const publicRoutes = [
  { path: "/", component: HomePage },
  { path: "/profile", component: Profile },
  { path: "/trips", component: Trips },
  { path: "/reports", component: Reports },
  { path: "/create-bill", component: CreateBill },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
