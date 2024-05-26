import { Router } from 'express';
import { Logger } from '../../libs/logger';
import { getAIResponse } from '../../libs/openai';
import { StatusCodes } from 'http-status-codes';
import validate from '../../middlewares/validate';
import {
    SummaryRequest,
    summaryRequestSchema,
} from './request/summary.request';
import catchAsync from '../../utils/catchAsync';
import { Summary } from '../../models/summary';

const summaryRouter = Router();
const logger = new Logger(__filename);

summaryRouter.post(
    '/',
    validate(summaryRequestSchema),
    catchAsync(async (req, res) => {
        const userId = req.header('X-ASMR-User-Id');
        const { url, originalText, readTime } = req.body as SummaryRequest;
        logger.info(`${userId} request summarize for ${url}`);

        const existSummary = await Summary.findOne({
            url: url,
            readTime: readTime,
        });

        if (existSummary) {
            const copiedSummary = new Summary({
                userId,
                url,
                originalText,
                readTime,
                summarizedText: existSummary.summarizedText,
            });

            await copiedSummary.save();

            res.status(StatusCodes.OK).json({
                summary: existSummary.summarizedText,
            });
        }

        const prompt = `
            You are an expert in article summarization.
            When you receive the article content, you can analyze the article content, summarize it, and show it to the user.
            Now, take the article as input from me and perform the following. Please answer in Korean.
            1) Title
            Article Title
            2) Tag extraction
            Extract up to 3 tags to determine which category the article falls into
            3) Overall summary
            Summarize it into a length that takes about ${readTime} minutes to read.
    
            Original Text: ${originalText}`;

        const result = await getAIResponse(prompt);

        const summary = new Summary({
            userId,
            url,
            originalText,
            readTime,
            summarizedText: result,
        });

        await summary.save();

        res.status(StatusCodes.OK).json({ summary: result });
    })
);

export default summaryRouter;
