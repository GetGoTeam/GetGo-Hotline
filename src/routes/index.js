import Accounts from "../pages/Accounts";
import Statistics from "../pages/Statistics";
import Trips from "../pages/Trips";
import Reports from "../pages/Reports";
import HomePage from "../pages/Home";

const publicRoutes = [
  { path: "/", component: HomePage },
  { path: "/accounts", component: Accounts },
  { path: "/trips", component: Trips },
  { path: "/reports", component: Reports },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
