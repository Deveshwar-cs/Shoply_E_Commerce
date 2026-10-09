import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import cors from 'cors';
import { readdirSync } from 'fs';
import dotenv from 'dotenv';
dotenv.config();
console.log('[STARTUP] server.js loaded');
console.log('[STARTUP] Environment variables loaded');

// App
const app = express();

// Database
const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);
console.log('[STARTUP] Connecting to MongoDB');

mongoose
  .connect(DB)
  .then(() => {
    console.log('DB connected successfully');
  })
  .catch((error) => {
    console.error('DB connection error:', error);
  });

// Middlewares
app.use(morgan('dev'));
app.use(express.json({ limit: '2mb' }));
app.use(cors());
console.log('[STARTUP] Loading routes');

// Routes
readdirSync('./routes').forEach(async (route) => {
  const { default: router } = await import(`./routes/${route}`);

  app.use('/api', router);
});
console.log(
  'FIREBASE_AUTH_EMULATOR_HOST:',
  process.env.FIREBASE_AUTH_EMULATOR_HOST,
);

console.log('[STARTUP] All routes loaded');

// Server
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
