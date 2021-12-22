import { Router } from "express";
import { signIn } from "./controllers/sign-in.controller";
import { signUp } from "./controllers/sign-up.controller";
import { getUsers } from "./controllers/users.controller";
import { authGuard, rolesGuard } from "./middlewaries/guards";
import { Roles } from "./models/role";
import { editProfile, getProfile } from "./controllers/profile.controller";

const router = Router();

router.post("/api/v1/sign-up", signUp);
router.post("/api/v1/sign-in", signIn);
router.get("/api/v1/users", rolesGuard([Roles.ADMIN]), getUsers);

router.get("/api/v1/me", authGuard, getProfile);
router.put("/api/v1/edit-profile", authGuard, editProfile);
// router.post("/api/v1/add-roles", addRoles);

export default router;
