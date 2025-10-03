import { Router } from 'express';
import { AuthService } from '../services/auth.service.js';

const router = Router();
const authService = new AuthService();

router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await authService.register(name, email, password);
    res.status(201).json(user);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const token = await authService.login(email, password);
    res.json(token);
  } catch (err: any) {
    res.status(401).json({ message: err.message });
  }
});

export default router;
