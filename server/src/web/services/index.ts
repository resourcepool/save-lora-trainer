import teamRoutes from "./team/routes";
import challengesRoutes from "./challenges/routes";
import dateManagerRoutes from "./dateManager/routes";
export default [...teamRoutes, ...challengesRoutes, ...dateManagerRoutes];
