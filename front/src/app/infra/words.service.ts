import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { IWord } from '../models';

const MY_API = '/api';

@Injectable()
export class WordsService {

	constructor(private http: HttpClient) { }

	public getNbWords(word: string): Observable<any> {
		return this.http.get<any>(
			`${environment.backendUrl}${MY_API}${'/nbwords/'}${word}`
		);
	}

	public checkWord(word: string): Observable<boolean> {
		return this.http.get<any>(
			`${environment.backendUrl}${MY_API}${'/check/'}${word}`
		).pipe(
			map(
				check => check.exists
			)
		);
	}
}
