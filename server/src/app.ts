import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import os from 'os';
import { globalErrorHandler } from './middleware/globalErrorHandler';
import notFound from './middleware/notFound';
import { authRoute } from './modules/auth/auth.route';

const app: Application = express();

// Middlewares
app.use(
  cors({
    origin: (origin, callback) => {
      if (
        !origin ||
        origin === 'http://localhost:3000' ||
        origin.includes('.localhost:3000')
      ) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  }),
);
app.use(cookieParser());
app.use(express.json());

// Routes
app.use('/api/auth', authRoute);

// 🚀 API Health Check & Metadata Route
app.get('/', (req: Request, res: Response) => {
  const currentDateTime = new Date().toISOString();
  const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  const serverHostname = os.hostname();
  const serverPlatform = os.platform();
  const serverUptime = os.uptime();

  res.status(StatusCodes.OK).json({
    success: true,
    message: 'Welcome to the Authentication Api 🎉',
    apiInfo: API_METADATA,
    clientDetails: {
      ipAddress: clientIp,
      accessedAt: currentDateTime,
    },
    serverDetails: {
      hostname: serverHostname,
      platform: serverPlatform,
      uptime: `${Math.floor(serverUptime / 60 / 60)} hours ${Math.floor((serverUptime / 60) % 60)} minutes`,
    },
  });
});
const API_METADATA = {
  name: 'Authentication Api',
  version: '1.0.0',
  description:
    'This is the API for the Authentication App. It is used to authenticate users and manage their accounts.',
  author: {
    name: 'Md Shakil Hossain',
    email: 'mrshakilhossain@outlook.com',
    portfolio: 'https://shakil-tawny.vercel.app',
  },
};

// Not Found handler
app.use(notFound);

// Global error handler
app.use(globalErrorHandler);

export default app;
