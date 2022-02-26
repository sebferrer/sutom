import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IWord } from 'src/app/models';
import { WordsService } from 'src/app/infra';
import { ActivatedRoute } from '@angular/router';
import { decrypt, encrypt } from 'src/app/util/aes-util';

@Component({
	selector: 'app-custom',
	templateUrl: './custom.component.html',
	styleUrls: ['./custom.component.scss']
})
export class CustomComponent implements OnInit {

	constructor(
		private wordsService: WordsService,
		private route: ActivatedRoute
	) {
		// 953cfbb6c946
		const cypheredWord = this.route.snapshot.paramMap.get('aesword');

		console.log(decrypt(cypheredWord));
	}

	public sendLetter(event: any): void {
		console.log(event);
	}

	public ngOnInit(): void {
	}
}
