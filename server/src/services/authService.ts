import { UserModel, IUser } from '../models/userModel';

class AuthService {
  async register(username: string, password: string) {
    const user = new UserModel({ username, password });
    return await user.save();
  }

  async authenticate(username: string, password: string) {
    const user = await UserModel.findOne({ username }) as IUser; 
    if (!user || !await user.comparePassword(password)) {
      throw new Error('Неверные учетные данные');
    }
    return user;
  }
}

export default new AuthService();
