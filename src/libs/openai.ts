import OpenAI from 'openai';
import { env } from '../env';
import { Logger } from './logger';
import { OpenAiRequestFailedException } from '../errors/exceptions/summary/open-ai-request-failed.exception';

const logger = new Logger(__filename);

const openai = new OpenAI({
    apiKey: env.openAI.apiKey,
});

export const getAIResponse = async (prompt: string): Promise<string> => {
    try {
        const chatCompletion = await openai.chat.completions.create({
            messages: [{ role: 'user', content: prompt }],
            model: 'gpt-3.5-turbo',
        });

        return chatCompletion.choices[0].message.content || '';
    } catch (error: any) {
        logger.error(error);

        throw new OpenAiRequestFailedException();
    }
};
