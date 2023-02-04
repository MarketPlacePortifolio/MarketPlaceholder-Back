import { prisma } from "@/config";
import { Prisma, User } from "@prisma/client";

async function findByEmail(email: string, select?: Prisma.UserSelect) {
  const params: Prisma.UserFindUniqueArgs = {
    where: {
      email,
    },
  };

  if (select) {
    params.select = select;
  }

  return prisma.user.findUnique(params);
}

async function create(data: Prisma.UserUncheckedCreateInput) {
  return prisma.user.create({
    data,
  });
}

type UpdateParams = Omit<User, "password" | "createdAt" | "updatedAt">;

async function update({ id, image, name, email }: UpdateParams) {
  return prisma.user.update({
    where: {
      id,
    },
    data: {
      image,
      name,
      email,
    },
  });
}

const userRepository = {
  findByEmail,
  create,
  update,
};

export default userRepository;
