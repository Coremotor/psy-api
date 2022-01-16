import { Router } from "express";
import { signIn } from "./controllers/sign-in.controller";
import { signUp } from "./controllers/sign-up.controller";
import { getUsers } from "./controllers/users.controller";
import { authGuard, rolesGuard } from "./middlewaries/guards";
import { Roles } from "./models/role";
import { editProfile, getProfile } from "./controllers/profile.controller";
import {
  addPersons,
  addStories,
  findPersonStories,
} from "./controllers/example.controller";
import {
  addCategory,
  getCategories,
} from "./controllers/categories.controller";
import {
  addArticle,
  getArticle,
  getArticles,
  updateArticle,
} from "./controllers/articles.controller";
import { createOrder } from "./controllers/order.controller";

const router = Router();

router.post("/api/v1/sign-up", signUp);
router.post("/api/v1/sign-in", signIn);
router.get("/api/v1/users", authGuard, rolesGuard([Roles.ADMIN]), getUsers);

router.get("/api/v1/me", authGuard, getProfile);
router.put("/api/v1/edit-profile", authGuard, editProfile);
// router.post("/api/v1/add-roles", addRoles);

router.get("/api/v1/categories", getCategories);

router.post("/api/v1/add-person", addPersons);
router.post("/api/v1/add-story", addStories);
router.post("/api/v1/add-category", addCategory);
router.get("/api/v1/person-stories", findPersonStories);

router.post("/api/v1/add-article", addArticle);
router.put("/api/v1/articles/:id", updateArticle);
router.get("/api/v1/articles", getArticles);
router.get("/api/v1/articles/:id", getArticle);

router.post("/api/v1/order", createOrder);

export default router;
