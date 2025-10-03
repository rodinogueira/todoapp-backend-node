import { prisma } from "../prisma/client.js";

export class TasksService {
  async create(userId: number, dto: { title: string; description?: string }) {
    return prisma.task.create({
      data: { userId, title: dto.title, description: dto.description ?? '' },
    });
  }

  async findAll(userId: number) {
    return prisma.task.findMany({ where: { userId } });
  }

  async findOne(userId: number, id: number) {
    return prisma.task.findFirst({ where: { id, userId } });
  }

  async update(userId: number, id: number, dto: Partial<{ title: string; description: string; status: string }>) {
    return prisma.task.updateMany({ where: { id, userId }, data: dto });
  }

  async remove(userId: number, id: number) {
    return prisma.task.deleteMany({ where: { id, userId } });
  }
}
