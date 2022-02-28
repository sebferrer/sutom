import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { WordsService } from 'src/app/infra';
import { encrypt } from 'src/app/util/aes-util';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

	public word: string;
	public output: string;

	constructor(
		private wordsService: WordsService
	) { }

	public ngOnInit(): void {
	}

	public generate(): void {
		this.wordsService.getNbWords(this.word).subscribe(
			nb => {
				if (nb < 5) {
					this.output = "Vous ne pouvez pas choisir ce mot, il doit être possible à deviner (il doit y avoir au moins 5 autres mots commençants par la même lettre et contenant le même nombre de lettees dans le dictionnaire).";
				} else {
					const url = "http://sutom.io/custom/" + encrypt(this.word) + "/";
					this.output = "Voici votre sutom: <a href=\"" + url + "\">" + url + "</a>";
				}
			}
		)
	}
}
