import { ILetter } from "./letter.model";

export class WordGridViewModel {

    public readonly grid: Array<Array<ILetter>>;
    public readonly nbLetters: number;
    public readonly firstLetter: string;
    public currentRow: number;
    public currentColumn: number;
    public word: string;
    public nbRows: number;

    constructor(word: string, nbRows: number) {
        this.word = word;
        this.nbRows = nbRows;

        this.nbLetters = this.word.length;
        this.firstLetter = this.word[0];

        this.grid = new Array<Array<ILetter>>();
        for (let i = 0; i < this.nbRows; i++) {
            let row = new Array<ILetter>();
            for (let j = 0; j < this.nbLetters; j++) {
                if (i === 0 && j === 0) {
                    row.push({ letter: this.firstLetter, color: 'blue', place: 'blue' });
                } else if (i === 0) {
                    row.push({ letter: '.', color: 'blue', place: 'blue' });
                } else {
                    row.push({ letter: ' ', color: 'blue', place: 'blue' });
                }
            }
            this.grid.push(row);
        }

        this.currentRow = 0;
        this.currentColumn = 1;
    }

    public nextRow(): void {
        if (this.currentRow === this.nbRows - 1) {
            return;
        }

        this.currentRow++;
        this.currentColumn = 1;
        this.grid[this.currentRow][0].letter = this.firstLetter;
        for (let i = 1; i < this.nbLetters; i++) {
            this.grid[this.currentRow][i].letter = '.';
        }

        this.setPlaces();
        this.setColors();
    }

    public setColors(): void {
        for (let i = 0; i < this.nbLetters; i++) {
            this.grid[this.currentRow - 1][i].color = this.grid[this.currentRow - 1][i].place;
        }
    }

    public setPlaces(): void {
        let wordArray = this.word.split('');
        const foundLetters = [];
        for (let i = 0; i < this.nbLetters; i++) {
            if (this.word[i] === this.grid[this.currentRow - 1][i].letter) {
                let index = wordArray.indexOf(this.word[i]);
                if (index > -1) {
                    wordArray.splice(index, 1);
                    this.grid[this.currentRow - 1][i].place = 'red';
                    foundLetters.push(i);
                }
            }
        }
        for (let i = 0; i < this.nbLetters; i++) {
            if(foundLetters.includes(i)) {
                continue;
            }
            if (wordArray.includes(this.previousWord()[i])) {
                let index = wordArray.indexOf(this.previousWord()[i]);
                if (index > -1) {
                    wordArray.splice(index, 1);
                    this.grid[this.currentRow - 1][i].place = 'yellow';
                }
            }
        }
    }

    public nextColumn(): void {
        if (this.currentColumn === this.nbLetters) {
            return;
        }
        this.currentColumn++;
    }

    public previousColumn(): void {
        if (this.currentColumn === 1) {
            return;
        }
        this.grid[this.currentRow][this.currentColumn - 1].letter = '.';
        this.currentColumn--;
    }

    public sendKey(key: string): void {
        if (key === 'back') {
            this.previousColumn();
        } else if (key === 'enter') {
            this.nextRow();
        } else {
            if (this.currentColumn < this.nbLetters) {
                this.grid[this.currentRow][this.currentColumn].letter = key;
                this.nextColumn();
            }
        }
    }

    public currentWord(): string {
        return this.grid[this.currentRow].map(e => e.letter).join('');
    }

    public previousWord(): string {
        if (this.currentRow === 0) {
            return this.currentWord();
        }
        return this.grid[this.currentRow - 1].map(e => e.letter).join('');
    }
}