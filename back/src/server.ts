import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as cors from 'cors'
import { Express } from 'express';
import { dictionaryRoute } from './routes';
import { Database } from './mariadb';

const app: Express = (express as any)();
const port = process.env.port || 3000;
export const database = new Database();

database.init();

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const routes: ((app: Express) => void)[] = [
	dictionaryRoute
];

routes.forEach(route => route(app));

app.listen(port);

app.use((request, result) => {
	result.status(404).send({ url: request.originalUrl + ' not found' })
});

console.log('MariaDB is ready to roll on port: ' + port);
