import express from "express";
import {
  createRoleController,
  deleteRoleController,
  getAllRoleController,
  getRoleByIdController,
  updateRoleController,
} from "../controller/role/role.controller";
import { authentication, isAdmin } from "../middleware/authentication";
import { validateData } from "../middleware/validateZod";
import { RoleSchema } from "../schemas/role";

const roleRouter = express.Router();
roleRouter.get("", getAllRoleController);
roleRouter.get("/:id", getRoleByIdController);

roleRouter.use(authentication, isAdmin);
roleRouter.post("/create", validateData(RoleSchema), createRoleController);
roleRouter.patch("/:id", validateData(RoleSchema), updateRoleController);
roleRouter.delete("/:id", deleteRoleController);

export default roleRouter;
