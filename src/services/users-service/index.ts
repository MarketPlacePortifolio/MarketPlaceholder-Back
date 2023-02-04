import userRepository from "@/repositories/user-repository";
import { User } from "@prisma/client";
import bcrypt from "bcrypt";
import { duplicatedEmailError } from "./errors";

export async function createUser({ name, email, password }: CreateUserParams): Promise<User> {
  await validateUniqueEmailOrFail(email, 0);

  const hashedPassword = await bcrypt.hash(password, 12);
  return userRepository.create({
    name,
    email,
    password: hashedPassword,
  });
}

export async function updateUser({ id, name, email, image }: UpdateUserParams): Promise<User> {
  await validateUniqueEmailOrFail(email, id);
  
  return userRepository.update({
    id,
    name,
    email,
    image,
  });
}

async function validateUniqueEmailOrFail(email: string, id: number) {
  const userWithSameEmail = await userRepository.findByEmail(email);
  if (userWithSameEmail && userWithSameEmail.id !== id) {
    throw duplicatedEmailError();
  }
}

export type CreateUserParams = Pick<User, "email" | "password" | "name">;
export type UpdateUserParams = Partial<User>;

const userService = {
  createUser,
  updateUser,
};

export * from "./errors";
export default userService;
