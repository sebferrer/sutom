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

	constructor(
		protected wordsService: WordsService,
		protected route: ActivatedRoute,
		protected dialog: MatDialog,
	) {
		const cypheredWord = this.route.snapshot.paramMap.get('aesword');

		console.log(decrypt(cypheredWord));

		this.word = decrypt(cypheredWord);
		this.nbRows = this.nbRows == null ? DEFAULT_NB_ROWS : this.nbRows;

		this.keys = new Array<Array<IKey>>();
		this.keys.push('azertyuiop'.split('').map(e => { return { letter: e, color: 'blue' } }));
		this.keys.push('qsdfghjklm'.split('').map(e => { return { letter: e, color: 'blue' } }));
		this.keys.push('back,w,x,c,v,b,n,enter'.split(',').map(e => { return { letter: e, color: 'blue' } }));
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
				word: this.word,
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

	public endRow(colorMap: any) {
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
		console.log(this.keys);
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