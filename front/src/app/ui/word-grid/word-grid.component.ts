import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

const DEFAULT_NB_ROWS = 6;

@Component({
	selector: 'app-word-grid',
	templateUrl: './word-grid.component.html',
	styleUrls: ['./word-grid.component.scss']
})
export class WordGridComponent implements OnInit {

	@Input()
	public word: string;

	@Input()
	public nbRows: number;

	public nbLetters: number;
	public firstLetter: string;

	public grid: Array<Array<string>>;

	constructor(
	) {
	}

	public ngOnInit(): void {
		this.nbRows = this.nbRows == null ? DEFAULT_NB_ROWS : this.nbRows;
		this.nbLetters = this.word.length;
		this.firstLetter = this.word[0];

		this.initGrid();
	}

	public initGrid() {
		this.grid = new Array<Array<string>>();
		for (let i = 0; i < this.nbRows; i++) {
			let row = new Array();
			for (let j = 0; j < this.nbLetters; j++) {
				if (i === 0 && j === 0) {
					row.push(this.firstLetter);
				} else if (i === 0) {
					row.push(".");
				} else {
					row.push(" ");
				}
			}
			this.grid.push(row);
		}
	}
}
