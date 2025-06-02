import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Application, Request, Response } from 'express';
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

// Health Check
app.get('/', (req: Request, res: Response) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

// Not Found handler
app.use(notFound);

// Global error handler
app.use(globalErrorHandler);

export default app;
