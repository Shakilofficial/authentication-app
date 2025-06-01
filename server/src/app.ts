import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import { globalErrorHandler } from './middleware/globalErrorHandler';
import notFound from './middleware/notFound';
import sendResponse from './utils/sendResponse';

const app: Application = express();

// Middlewares
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow localhost:5173 and its subdomains
      if (
        !origin ||
        origin === 'http://localhost:5173' ||
        origin.includes('.localhost:5173')
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
//app.use('/api/auth', authRoutes);

// Health Check
app.get('/', (req: Request, res: Response) => {
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: '🌐 Server is live 🚀',
    data: null,
  });
});

// Not Found handler
app.use(notFound);

// Global error handler
app.use(globalErrorHandler);

export default app;
