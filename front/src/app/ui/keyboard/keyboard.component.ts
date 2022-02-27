import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
	selector: 'app-keyboard',
	templateUrl: './keyboard.component.html',
	styleUrls: ['./keyboard.component.scss']
})
export class KeyboardComponent implements OnInit {

	public keys: Array<Array<string>>;

	@Output()
	public keyPressed = new EventEmitter();

	constructor(
	) {
	}

	public ngOnInit(): void {
		this.keys = [];
		this.keys.push(['a', 'z', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p']);
		this.keys.push(['q', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm']);
		this.keys.push(['back', 'w', 'x', 'c', 'v', 'b', 'n', 'enter']);
	}

	public sendKey(key: string) {
		this.keyPressed.emit(key);
	}

}
