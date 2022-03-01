import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface IDialogData {
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

	constructor(
		public dialogRef: MatDialogRef<DialogWinComponent>,
		@Inject(MAT_DIALOG_DATA) public data: IDialogData
	) { }

	public onCloseClick(): void {
		this.dialogRef.close({ 'answer': 'close' });
	}

	public copyToClipboard(): void {
		let output = 'SUTOM ' + this.data.history.length + '/6\n\n';
		for (let i = 0; i < this.data.history.length; i++) {
			for (let j = 0; j <this.data. history[i].length; j++) {
				switch (this.data.history[i][j]) {
					case 0:
						output += "🟦";
						break;
					case 1:
						output += "🟡";
						break;
					case 2:
						output += "🟥";
						break;
				}
			}
			output += '\n';
		}
		output += '\nhttp://sutom.io/';
		navigator.clipboard.writeText(output);
	}

}
