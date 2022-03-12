import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { IKey } from 'src/app/models';

@Component({
	selector: 'app-keyboard',
	templateUrl: './keyboard.component.html',
	styleUrls: ['./keyboard.component.scss']
})
export class KeyboardComponent implements OnInit {

	@Input()
	public keys: Array<Array<IKey>>;

	@Output()
	public keyPressed = new EventEmitter();

	constructor(
	) {
	}

	public ngOnInit(): void {
		
	}

	public sendKey(key: string) {
		this.keyPressed.emit(key);
	}

}
