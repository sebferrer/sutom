import { Component, Input, OnInit } from '@angular/core';
import { WordGridViewModel } from 'src/app/models/word-grid.view.model';

@Component({
	selector: 'app-word-grid',
	templateUrl: './word-grid.component.html',
	styleUrls: ['./word-grid.component.scss']
})
export class WordGridComponent implements OnInit {

	@Input()
	public wordGridViewModel: WordGridViewModel;

	constructor(
	) {
	}

	public ngOnInit(): void {
		console.log('load wordgrid');
		console.log(this.wordGridViewModel);
	}

	public sendKey(key: string): void {
		this.wordGridViewModel.sendKey(key);
	}
}
