import { HttpStatus } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const authorization = req.headers.authorization;
  if (!authorization) {
    return res.status(HttpStatus.UNAUTHORIZED).json({
      message: 'Unauthorized',
    });
  }
  next();
}
