import { TasksService } from '../services/tasks.service';
import { prisma } from '../prisma/client';

jest.mock('../prisma/client', () => ({
  prisma: {
    task: {
      findMany: jest.fn(),
      create: jest.fn(),
      findFirst: jest.fn(),
      updateMany: jest.fn(),
      deleteMany: jest.fn(),
    },
  },
}));

describe('TasksService', () => {
  const svc = new TasksService();

  afterEach(() => jest.clearAllMocks());

  it('findAll calls prisma.task.findMany', async () => {
    (prisma.task.findMany as jest.Mock).mockResolvedValue([{ id: 1, title: 't' }]);
    const res = await svc.findAll(1);
    expect(prisma.task.findMany).toHaveBeenCalledWith({ where: { userId: 1 } });
    expect(res).toEqual([{ id: 1, title: 't' }]);
  });

  it('create calls prisma.task.create', async () => {
    const dto = { title: 'X' };
    (prisma.task.create as jest.Mock).mockResolvedValue({ id: 2, ...dto });
    const res = await svc.create(1, dto);
    expect(prisma.task.create).toHaveBeenCalled();
    expect(res).toEqual({ id: 2, title: 'X' });
  });
});
