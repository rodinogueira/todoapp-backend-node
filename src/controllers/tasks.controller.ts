import { Router } from 'express';
import { TasksService } from '../services/tasks.service.js';
import { authMiddleware, RequestWithUser } from '../middleware/auth.middleware.js';

const router = Router();
const service = new TasksService();

router.use(authMiddleware); // protege todas as rotas abaixo

router.post('/', async (req: RequestWithUser, res) => {
  const dto = req.body;
  const userId = (req.user as any).sub;
  const task = await service.create(userId, dto);
  res.status(201).json(task);
});

router.get('/', async (req: RequestWithUser, res) => {
  const userId = (req.user as any).sub;
  const tasks = await service.findAll(userId);
  res.json(tasks);
});

router.get('/:id', async (req: RequestWithUser, res) => {
  const userId = (req.user as any).sub;
  const task = await service.findOne(userId, Number(req.params.id));
  if (!task) return res.status(404).json({ message: 'Not found' });
  res.json(task);
});

router.put('/:id', async (req: RequestWithUser, res) => {
  const userId = (req.user as any).sub;
  const result = await service.update(userId, Number(req.params.id), req.body);
  res.json(result);
});

router.delete('/:id', async (req: RequestWithUser, res) => {
  const userId = (req.user as any).sub;
  const result = await service.remove(userId, Number(req.params.id));
  res.status(204).send();
});

export default router;
