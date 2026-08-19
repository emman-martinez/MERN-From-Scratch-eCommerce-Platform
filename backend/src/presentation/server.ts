import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Router } from 'express';
import type { Server as HttpServer } from 'http';
import path from 'path';

import { env } from '../config/env.ts';
import { errorHandler, notFound } from '../middleware/errorMiddleware.ts';

interface Options {
  port: number;
  routes: Router;
}

export class Server {
  public readonly app = express();
  private serverListener?: HttpServer;
  private readonly port: number;
  private readonly routes: Router;

  constructor(options: Options) {
    const { port, routes } = options;
    this.port = port;
    this.routes = routes;
  }

  async start() {
    if (process.env.NODE_ENV === 'development') {
      this.app.disable('etag');
      this.app.use((_req, res, next) => {
        res.set('Cache-Control', 'no-store');
        next();
      });
    }

    //* Middlewares
    this.app.use(
      cors({
        origin: env.CLIENT_URL,
        credentials: true,
      }),
    ); // cors: Cross-Origin Resource Sharing
    this.app.use(express.json()); // raw
    this.app.use(express.urlencoded({ extended: true })); // x-www-form-urlencoded

    // Cooqkie parser middleware allows us to parse cookies from the request headers and populate the req.cookies object with key-value pairs representing the cookies sent by the client. This is useful for handling authentication, session management, and other scenarios where cookies are used to store information on the client side.
    this.app.use(cookieParser());

    //* Routes
    this.app.use(this.routes);

    const __dirname = path.resolve(); // Get the absolute path of the current directory
    if (process.env.NODE_ENV === 'production') {
      this.app.use(express.static(path.join(__dirname, '/frontend/build'))); // Serve static files from the 'frontend/build' directory

      this.app.get('*', (_req, res) => {
        res.sendFile(path.join(__dirname, '/frontend/build/index.html')); // Serve the index.html file for any unmatched routes (SPA routing)
      });
    } else {
      this.app.get('/', (_req, res) => {
        res.send('API is running...');
      });
    }

    //* Error handling middleware
    this.app.use(notFound); // 404 not found
    this.app.use(errorHandler); // error handler

    this.serverListener = this.app.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`);
    });
  }

  public close() {
    this.serverListener?.close();
  }
}
