import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { encrypt } from 'src/app/util/aes-util';

const EMOJI_MAP = new Map<number, string>([[0, '🟦'], [1, '🟡'], [2, '🟥']]);

export interface IDialogData {
	word: string;
	history: Array<Array<number>>;
}

@Component({
	selector: 'app-dialog-win',
	templateUrl: 'dialog-win.component.html'
})
export class DialogWinComponent {
	@ViewChild('result')
	public result: ElementRef<HTMLTextAreaElement>;
	public showCopySuccessMessage = false;
	public emojiMap = EMOJI_MAP;

	constructor(
		public dialogRef: MatDialogRef<DialogWinComponent>,
		@Inject(MAT_DIALOG_DATA) public data: IDialogData
	) { }

	public onCloseClick(): void {
		this.dialogRef.close({ 'answer': 'close' });
	}

	public copyToClipboard(): void {
		let output = 'Wordus ' + this.data.history.length + '/6\n\n';
		for (let i = 0; i < this.data.history.length; i++) {
			for (let j = 0; j < this.data.history[i].length; j++) {
				output += EMOJI_MAP.get(this.data.history[i][j])
			}
			output += '\n';
		}
		output += '\nhttp://wordus.fr/#/' + encrypt(this.data.word);
		navigator.clipboard.writeText(output);
	}

}
