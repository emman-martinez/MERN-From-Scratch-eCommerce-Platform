import cors from 'cors';
import express, { Router } from 'express';
import type { Server as HttpServer } from 'http';
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
    //* Middlewares
    this.app.use(cors()); // cors: Cross-Origin Resource Sharing
    this.app.use(express.json()); // raw
    this.app.use(express.urlencoded({ extended: true })); // x-www-form-urlencoded

    //* Routes
    this.app.use(this.routes);

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
