import { Router } from 'express';
import chatSyncRouter from './chat-sync';

const apiRouter = Router();

apiRouter.use('/chat-sync', chatSyncRouter);

export default apiRouter;
