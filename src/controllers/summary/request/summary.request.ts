import Joi from 'joi';

export interface SummaryRequest {
    url: string;
    originalText: string;
    readTime: string;
}

export const summaryRequestSchema = Joi.object({
    body: Joi.object({
        url: Joi.string().required(),
        originalText: Joi.string().required(),
        readTime: Joi.string().required(),
    }),
});
