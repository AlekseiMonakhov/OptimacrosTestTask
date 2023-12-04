import { Request, Response } from 'express';
import AuthService from '../services/authService';

class AuthController {
  async register(req: Request, res: Response) {
    const { username, password } = req.body;
    const user = await AuthService.register(username, password);
    res.status(201).json({ id: user.id, username: user.username });
  }

  async login(req: Request, res: Response) {
    const { username, password } = req.body;
    const user = await AuthService.authenticate(username, password);
    res.json({ message: 'Успешный вход', userId: user.id });
  }
}

export default new AuthController();
