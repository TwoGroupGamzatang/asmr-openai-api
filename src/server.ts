import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import helmet from 'helmet';
import apiRouter from './api';
import { env } from './env';

const app = express();

app.use(helmet());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('short'));

// Health Check
app.get('/api/openai/health', async (req, res) => {
    res.send('OK');
});

app.use('/api/openai', apiRouter);

// Handling 404
app.use((req, res, next) => {
    res.status(404).send('Not Found');
});

// Handling custom error
app.use((err: any, req: any, res: any, next: any) => {
    console.error(err.stack);

    res.status(500).send('Internal Server Error');
});

app.listen(env.app.port, async () => {
    console.log(
        `server started on port ${env.app.port}, env: ${process.env.NODE_ENV}`
    );
});

process.on('SIGINT', async () => {
    console.log('Shutting down openai streaming service...');

    process.exit(0);
});
