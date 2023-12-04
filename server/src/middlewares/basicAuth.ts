import { Request, Response, NextFunction } from 'express';
import auth from 'basic-auth';
import compare from 'tsscmp';
import dotenv from 'dotenv';

dotenv.config();

const validUsername = process.env.USERNAME || 'defaultUsername';
const validPassword = process.env.PASSWORD || 'defaultPassword';

export const basicAuthMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const credentials = auth(req);

  if (!credentials || !check(credentials.name, credentials.pass)) {
    res.setHeader('WWW-Authenticate', 'Basic realm="example"');
    return res.status(401).send('Access denied');
  }

  next();
};

function check(name: string, pass: string): boolean {
  return compare(name, validUsername) && compare(pass, validPassword);
}
