import { Component, OnInit } from '@angular/core';
import { WordsService } from 'src/app/infra';
import { ActivatedRoute } from '@angular/router';
import { WordGridViewModel } from 'src/app/models/word-grid.view.model';
import { MatDialog } from '@angular/material/dialog';
import { AModeComponent } from '../mode';

@Component({
	selector: 'app-custom',
	templateUrl: './custom.component.html',
	styleUrls: ['./custom.component.scss']
})
export class CustomComponent extends AModeComponent implements OnInit {

	constructor(
		protected wordsService: WordsService,
		protected route: ActivatedRoute,
		protected dialog: MatDialog
	) {
		super(wordsService, route, dialog);
		this.wordGridViewModel = new WordGridViewModel(this.word, this.nbRows);
	}
}
