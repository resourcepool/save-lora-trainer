import publicRoutes from "./public-routes";
import proxyRoutes from "./proxy-routes";
import adminRoutes from "./admin-routes";

export default [...adminRoutes, ...publicRoutes, ...proxyRoutes];
