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
            res.status(StatusCodes.OK).json({
                summary: existSummary.summarizedText,
            });

            return;
        }

        const prompt = `
            You are an expert in article summarization.
            When you receive the article content, you can analyze the article content, summarize it, and show it to the user.
            Now, take the article as input from me and perform the following. Please answer in Korean.
            1) Title
            Article Title
            2) Tag extraction
            Extract up to 3 tags to determine which category the article falls into. 
            categories: 웹 개발, 모바일 앱 개발, UI/UX 디자인, 서버 개발, DB 관리, 아키텍쳐, 보안, 운영배포, 머신러닝, 데이터과학, 생성형 AI, 추천시스템, 프로젝트 계획, 프로젝트 방법론, 프로젝트 관리 도구/기술, 품질관리
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
