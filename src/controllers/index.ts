import { Router } from 'express';
import summaryRouter from './summary';

interface Route {
    path: string;
    router: Router;
}

const apiRouter = Router();

const routes: Route[] = [
    {
        path: '/summary',
        router: summaryRouter,
    },
];

routes.forEach((route) => {
    apiRouter.use(route.path, route.router);
});

export default apiRouter;
