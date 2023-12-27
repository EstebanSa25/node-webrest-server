import express, { Router } from 'express';
import path from 'path';
import { AppRoutes } from './routes';

interface Options {
    port: number;
    public_path?: string;
    routes: Router;
}

export class Server {
    private app = express();
    private readonly port: number;
    private readonly publicPath: string;
    private readonly routes: Router;
    constructor(options: Options) {
        const { routes, port, public_path = 'public' } = options;
        this.port = port;
        this.publicPath = public_path;
        this.routes = routes;
    }
    async start() {
        //*Middlewares
        this.app.use(express.json()); //raw
        this.app.use(express.urlencoded({ extended: true })); //x-www-form-urlencoded
        //*Public Folder
        this.app.use(express.static(this.publicPath));
        //*Routes
        this.app.use(this.routes);
        this.app.get('/api/todos', (req, res) => {
            res.json([
                { id: 1, text: 'Todo 1', creadedAt: new Date() },
                { id: 2, text: 'Todo 2', creadedAt: null },
                { id: 3, text: 'Todo 3', creadedAt: new Date() },
            ]);
        });
        //SPA
        this.app.get('*', (req, res) => {
            const indexPath = path.join(
                __dirname,
                `../../../public/${this.publicPath}/index.html`
            );
            res.sendFile(indexPath);
            console.log(req.url);
            res.send('Hello World');
        });
        this.app.listen(this.port, () =>
            console.log(`Server runnings on port ${this.port}`)
        );
    }
}
