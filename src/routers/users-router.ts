import { Router } from "express";

import { createUserSchema, updateUserSchema } from "@/schemas";
import { authenticateToken, validateBody } from "@/middlewares";
import { usersPost, usersPut } from "@/controllers";

const usersRouter = Router();

usersRouter.post("/", validateBody(createUserSchema), usersPost);
usersRouter.put("/", authenticateToken, validateBody(updateUserSchema), usersPut);

export { usersRouter };
