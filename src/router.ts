import { Router } from "express";
import { signIn } from "./controllers/sign-in.controller";
import { signUp } from "./controllers/sign-up.controller";
import { getUsers } from "./controllers/users.controller";
import { rolesGuard } from "../middlewaries/guards";
import { Roles } from "./models/role";

const router = Router();

router.post("/api/v1/sign-up", signUp);
router.post("/api/v1/sign-in", signIn);
router.get("/api/v1/users", rolesGuard([Roles.ADMIN]), getUsers);
// router.post("/api/v1/add-roles", addRoles);

export default router;
