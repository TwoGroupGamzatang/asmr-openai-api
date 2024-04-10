import { Router } from 'express';
import { OpenAiRequestFailedException } from '../../errors/exceptions/summary/open-ai-request-failed.exception';
import { Logger } from '../../libs/logger';

const summaryRouter = Router();
const logger = new Logger(__filename);

summaryRouter.get('/', (req, res) => {
    logger.info(`Summarize API called by ${req.ip}`);
    throw new OpenAiRequestFailedException();
    res.send('Summarize');
});

export default summaryRouter;
