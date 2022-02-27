import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IWord } from 'src/app/models';
import { WordsService } from 'src/app/infra';
import { ActivatedRoute } from '@angular/router';
import { decrypt, encrypt } from 'src/app/util/aes-util';
import { WordGridViewModel } from 'src/app/models/word-grid.view.model';

const DEFAULT_NB_ROWS = 6;

@Component({
	selector: 'app-custom',
	templateUrl: './custom.component.html',
	styleUrls: ['./custom.component.scss']
})
export class CustomComponent implements OnInit {

	public word: string;
	public nbRows: number;
	public wordGridViewModel: WordGridViewModel;

	constructor(
		private wordsService: WordsService,
		private route: ActivatedRoute
	) {
		// 953cfbb6c946
		const cypheredWord = this.route.snapshot.paramMap.get('aesword');

		console.log(decrypt(cypheredWord));

		this.word = decrypt(cypheredWord);
		this.nbRows = this.nbRows == null ? DEFAULT_NB_ROWS : this.nbRows;
		this.wordGridViewModel = new WordGridViewModel(this.word, this.nbRows);
	}

	public sendLetter(event: any): void {
		if (event === 'enter') {
			let checkWord = this.wordsService.checkWord(this.wordGridViewModel.currentWord());
			checkWord.subscribe(
				exists => {
					if (exists) {
						this.wordGridViewModel.sendKey(event);
					}
				}
			);
		}
		else {
			this.wordGridViewModel.sendKey(event);
		}
	}

	public ngOnInit(): void {
	}
}
