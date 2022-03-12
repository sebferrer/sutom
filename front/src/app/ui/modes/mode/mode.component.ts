import { Component, HostListener, OnInit } from '@angular/core';
import { WordsService } from 'src/app/infra';
import { ActivatedRoute } from '@angular/router';
import { decrypt } from 'src/app/util/aes-util';
import { WordGridViewModel } from 'src/app/models/word-grid.view.model';
import { MatDialog } from '@angular/material/dialog';
import { DialogInfoComponent } from '../../dialog/dialog-info';
import { DialogWinComponent } from '../../dialog/dialog-win';
import { IKey } from 'src/app/models';

const DEFAULT_NB_ROWS = 6;
const NO_WORD_FOUND_ERROR_MSG = 'Ce mot n\'existe pas dans le dictionnaire de Wordus';
const WORD_TOO_SHORT_MSG = 'Veuillez saisir un mot de {} lettres';

@Component({
	selector: 'app-mode',
	templateUrl: './mode.component.html',
	styleUrls: ['./mode.component.scss']
})
export class AModeComponent implements OnInit {

	public word: string;
	public nbRows: number;
	public wordGridViewModel: WordGridViewModel;
	public keys: Array<Array<IKey>>;
	public displayErrorMsg: boolean;
	public errorMsg: string;
	public noWordFoundMsg: string;
	public wordTooShortMsg: string;

	constructor(
		protected wordsService: WordsService,
		protected route: ActivatedRoute,
		protected dialog: MatDialog,
	) {
		const cypheredWord = this.route.snapshot.paramMap.get('aesword');

		this.word = decrypt(cypheredWord);
		this.nbRows = this.nbRows == null ? DEFAULT_NB_ROWS : this.nbRows;

		this.keys = new Array<Array<IKey>>();
		this.keys.push('azertyuiop'.split('').map(e => { return { letter: e, color: 'blue' } }));
		this.keys.push('qsdfghjklm'.split('').map(e => { return { letter: e, color: 'blue' } }));
		this.keys.push('back,w,x,c,v,b,n,enter'.split(',').map(e => { return { letter: e, color: 'blue' } }));

		this.displayErrorMsg = false;
		this.errorMsg = '';
	}

	public ngOnInit(): void {
	}

	public sendLetter(event: any): void {
		if (event === 'enter') {
			if (this.wordGridViewModel.currentWord() === this.word) {
				this.wordGridViewModel.sendKey(event);
			} else {
				if (this.wordGridViewModel.currentWord().split('.').join('').length !== this.word.length) {
					this.showErrorMsg(WORD_TOO_SHORT_MSG.replace('{}', this.word.length.toString()));
				} else {
					let checkWord = this.wordsService.checkWord(this.wordGridViewModel.currentWord());
					checkWord.subscribe(
						exists => {
							if (exists) {
								this.wordGridViewModel.sendKey(event);
							} else {
								this.showErrorMsg(NO_WORD_FOUND_ERROR_MSG);
							}
						}
					);
				}
			}
		} else if (event === 'backspace') {
			this.wordGridViewModel.sendKey('back');
		}
		else {
			this.wordGridViewModel.sendKey(event);
		}
	}

	public showErrorMsg(errorMsg: string) {
		this.errorMsg = errorMsg;
		this.displayErrorMsg = true;
		setTimeout(() => {
			this.displayErrorMsg = false;
			this.errorMsg = '';
		}, 2000);
	}

	public statusChange(event: any): void {
		if (event === 'lose') {
			this.openLoseDialog();
		} else if (event === 'win') {
			this.openWinDialog();
		}
	}

	public openWinDialog(): void {
		this.dialog.open(DialogWinComponent, {
			autoFocus: false,
			width: '20rem',
			panelClass: 'custom-modalbox',
			data: {
				word: this.word,
				history: this.wordGridViewModel.history
			}
		}).afterClosed().subscribe(response => {
			if (response == null || response.answer !== 'close') {
				return;
			}
		});
	}

	public openLoseDialog(): void {
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

	public endRow(colorMap: any): void {
		for (let i = 0; i < this.keys.length; i++) {
			for (let j = 0; j < this.keys[i].length; j++) {
				if (this.keys[i][j].letter !== 'enter' && this.keys[i][j].letter !== 'back') {
					if (colorMap.get('red').includes(this.keys[i][j].letter)) {
						this.keys[i][j].color = 'red';
					} else if (colorMap.get('yellow').includes(this.keys[i][j].letter)) {
						this.keys[i][j].color = 'yellow';
					} else if (colorMap.get('grey').includes(this.keys[i][j].letter)) {
						this.keys[i][j].color = 'grey';
					} else {
						this.keys[i][j].color = 'blue';
					}
				}
			}
		}
	}

	@HostListener('document:keydown', ['$event'])
	handleKeyboardEvent(event: KeyboardEvent): void {
		const key = event.key;
		if (!/^([a-zA-Z])$/.test(key) && key !== 'Enter' && key !== 'Backspace') {
			return;
		}
		this.sendLetter(key.toLowerCase());
	}
}
