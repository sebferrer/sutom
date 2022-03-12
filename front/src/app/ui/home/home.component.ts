import { Component, OnInit } from '@angular/core';
import { WordsService } from 'src/app/infra';
import { encrypt } from 'src/app/util/aes-util';
import * as replaceSpecialCharacters from 'replace-special-characters';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

	public word: string;
	public output: string;
	public outputRandom: string;
	public showDailyWord: boolean;

	constructor(
		private wordsService: WordsService
	) {
		this.showDailyWord = false;
	}

	public ngOnInit(): void {
	}

	public generate(): void {
		if (this.word == null || this.word === '') {
			return;
		}
		this.word = replaceSpecialCharacters(this.word).replace(/[^a-zA-Z ]/g, "").toLowerCase();
		this.wordsService.getNbWords(this.word).subscribe(
			nb => {
				if (nb < 5) {
					this.output = "Vous ne pouvez pas choisir ce mot, il doit être possible à deviner (il doit y avoir au moins 5 autres mots commençants par la même lettre et contenant le même nombre de lettres dans le dictionnaire).";
				} else {
					const url = "http://localhost:4200/#/" + encrypt(this.word) + "/";
					this.output = "Voici votre Wordus: <a href=\"" + url + "\">" + url + "</a>";
				}
			}
		)
	}

	public generateRandom(): void {
		this.wordsService.getRandomWord().subscribe(
			word => {
				word = replaceSpecialCharacters(word).replace(/[^a-zA-Z ]/g, "").toLowerCase();
				const url = "https://wordus.fr/#/" + encrypt(word) + "/";
				this.outputRandom = "Voici votre Wordus: <a href=\"" + url + "\">" + url + "</a>";
			}
		);
	}

	public dailyWord(): void {
		this.showDailyWord = true;
	}
}
