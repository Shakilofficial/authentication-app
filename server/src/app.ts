import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Application, Request, Response } from 'express';

const app: Application = express();

// Middlewares
app.use(
  cors({
    origin: ['http://localhost:3000', 'http://localhost:5173'],
    credentials: true,
  }),
);
app.use(cookieParser());
app.use(express.json());

// Routes
//app.use('/api/auth', authRoutes);

// Health Check

app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    status: 'ok',
    message: 'Server is running',
  });
});

/* app.get('/', (req: Request, res: Response) => {
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: '🌐 Server is live 🚀',
    data: null,
  });
}); */

// Global error handler
//app.use(globalErrorHandler);

// Not Found handler
//app.use(notFound);

export default app;
