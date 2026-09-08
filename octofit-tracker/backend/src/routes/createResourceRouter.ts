import { Router } from 'express';
import type { Model } from 'mongoose';
import mongoose from 'mongoose';

export function createResourceRouter<T>(model: Model<T>): Router {
  const router = Router();

  router.get('/', async (_request, response) => {
    if (mongoose.connection.readyState !== 1) {
      response.json([]);
      return;
    }

    response.json(await model.find().lean());
  });

  router.get('/:id', async (request, response) => {
    if (!mongoose.isValidObjectId(request.params.id)) {
      response.status(400).json({ error: 'Invalid resource id' });
      return;
    }

    const resource = await model.findById(request.params.id).lean();
    if (!resource) {
      response.status(404).json({ error: 'Resource not found' });
      return;
    }

    response.json(resource);
  });

  router.post('/', async (request, response) => {
    if (mongoose.connection.readyState !== 1) {
      response.status(503).json({ error: 'Database unavailable' });
      return;
    }

    const resource = await model.create(request.body);
    response.status(201).json(resource);
  });

  return router;
}