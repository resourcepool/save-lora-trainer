import teamRoutes from "./team/routes";
import challengesRoutes from "./challenges/routes";
import dateManagerRoutes from "./dateManager/routes";
import proxyRoutes from "./proxy/routes";

export default [...teamRoutes, ...challengesRoutes, ...dateManagerRoutes, ...proxyRoutes];
