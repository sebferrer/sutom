import { Component, HostListener, OnInit } from '@angular/core';
import { WordsService } from 'src/app/infra';
import { ActivatedRoute } from '@angular/router';
import { decrypt } from 'src/app/util/aes-util';
import { WordGridViewModel } from 'src/app/models/word-grid.view.model';
import { MatDialog } from '@angular/material/dialog';
import { DialogInfoComponent } from '../../dialog/dialog-info';
import { DialogWinComponent } from '../../dialog/dialog-win';

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
		private route: ActivatedRoute,
		private dialog: MatDialog,
	) {
		// 953cfbb6c946
		// 873ce1b8d24ddc
		const cypheredWord = this.route.snapshot.paramMap.get('aesword');

		console.log(decrypt(cypheredWord));

		this.word = decrypt(cypheredWord);
		this.nbRows = this.nbRows == null ? DEFAULT_NB_ROWS : this.nbRows;
		this.wordGridViewModel = new WordGridViewModel(this.word, this.nbRows);
	}

	public ngOnInit(): void {
	}

	public sendLetter(event: any): void {
		if (event === 'enter') {
			if (this.wordGridViewModel.currentWord() === this.word) {
				this.wordGridViewModel.sendKey(event);
			} else {
				let checkWord = this.wordsService.checkWord(this.wordGridViewModel.currentWord());
				checkWord.subscribe(
					exists => {
						if (exists) {
							this.wordGridViewModel.sendKey(event);
						}
					}
				);
			}
		} else if (event === 'backspace') {
			this.wordGridViewModel.sendKey('back');
		}
		else {
			this.wordGridViewModel.sendKey(event);
		}
	}

	public statusChange(event: any): void {
		if (event === 'lose') {
			this.openLoseDialog();
		} else if (event === 'win') {
			this.openWinDialog();
		}
	}

	public openWinDialog() {
		this.dialog.open(DialogWinComponent, {
			autoFocus: false,
			width: '20rem',
			panelClass: 'custom-modalbox',
			data: {
				history: this.wordGridViewModel.history
			}
		}).afterClosed().subscribe(response => {
			if (response == null || response.answer !== 'close') {
				return;
			}
		});
	}

	public openLoseDialog() {
		this.dialog.open(DialogInfoComponent, {
			autoFocus: false,
			width: '20rem',
			panelClass: 'custom-modalbox',
			data: {
				title: 'Vous avez perdu !',
				content: ['Le mot secret était ' + this.word.toUpperCase()]
			}
		}).afterClosed().subscribe(response => {
			if (response == null || response.answer !== 'close') {
				return;
			}
		});
	}

	@HostListener('document:keydown', ['$event'])
	handleKeyboardEvent(event: KeyboardEvent) {
		const key = event.key;
		if (!/^([a-zA-Z])$/.test(key) && key !== 'Enter' && key !== 'Backspace') {
			return;
		}
		this.sendLetter(key.toLowerCase());
	}
}
