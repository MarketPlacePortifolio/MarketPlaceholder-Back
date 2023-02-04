import { AuthenticatedRequest } from "@/middlewares";
import userService from "@/services/users-service";
import { Request, Response } from "express";
import httpStatus from "http-status";

export async function usersPost(req: Request, res: Response) {
  const { email, password, name } = req.body;

  try {
    const user = await userService.createUser({ email, password, name });
    return res.status(httpStatus.CREATED).json({
      id: user.id,
      image: undefined,
      email: user.email,
      name: user.name,
    });
  } catch (error) {
    if (error.name === "DuplicatedEmailError") {
      return res.status(httpStatus.CONFLICT).send(error);
    }
    return res.status(httpStatus.BAD_REQUEST).send(error);
  }
}

export async function usersPut(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const { email, name, image } = req.body;

  if (!email && !name && !image) {
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }

  try {
    const user = await userService.updateUser({ id: userId, email, image, name });
    return res.status(httpStatus.OK).json({
      id: user.id,
      image: user.image,
      email: user.email,
      name: user.name,
    });
  } catch (error) {
    if (error.name === "DuplicatedEmailError") {
      return res.status(httpStatus.CONFLICT).send(error);
    }
    return res.status(httpStatus.BAD_REQUEST).send(error);
  }
}
