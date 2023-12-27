import { envs } from './config/env';
import { AppRoutes } from './presentation/routes';
import { Server } from './presentation/server';

(() => {
    main();
})();

function main() {
    const server = new Server({
        port: envs.PORT,
        public_path: envs.PUBLIC_PATH,
        routes: AppRoutes.routes,
    });
    server.start();
}
