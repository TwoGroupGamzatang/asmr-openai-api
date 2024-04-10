import { Router } from 'express';

const chatSyncRouter = Router();

chatSyncRouter.get('/', (req, res) => {
    res.send('Chat Sync');
});

export default chatSyncRouter;
