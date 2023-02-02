import { prisma } from "@/config";
import { Registration } from "@prisma/client";

async function findActivities(day: string) {
  return prisma.activity.findMany({
    where: { day: day },
    include: {
      Registration: true,
      _count: true
    },
  });
}

async function postRegistration(activitiesIds: Array<number>, userId: number) {
  return prisma.registration.createMany({
    data: activitiesIds.map((id) => {
      return { activityId: id, userId: userId } as unknown as CreateRegistrationParams;
    }),
  });
}

type CreateRegistrationParams = Omit<Registration, "id" | "createdAt" | "updatedAt">;

const activityRepository = {
  findActivities,
  postRegistration,
};

export default activityRepository;
