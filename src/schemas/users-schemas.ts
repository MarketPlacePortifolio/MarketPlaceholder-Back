import { CreateUserParams, UpdateUserParams } from "@/services/users-service";
import Joi from "joi";

export const createUserSchema = Joi.object<CreateUserParams>({
  name: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

export const updateUserSchema = Joi.object<UpdateUserParams>({
  image: Joi.string().uri(),
  name: Joi.string().min(3),
  email: Joi.string().email(),
});
