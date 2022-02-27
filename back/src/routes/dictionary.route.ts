import { Express } from 'express';
import { DictionaryController } from '../controllers';

export function dictionaryRoute(app: Express): void {
	const controller = new DictionaryController();

	/*app.route('/api/dictionary')
		.get((_, response) => {
			controller.getWords(response);
		})*/

	app.route('/api/nbwords/:word')
		.get((request, response) => {
			controller.nbWords(request, response);
		})

	app.route('/api/words/:word')
		.get((request, response) => {
			controller.getSimilarWords(request, response);
		})

	app.route('/api/check/:word')
		.get((request, response) => {
			controller.checkWord(request, response);
		})
}
