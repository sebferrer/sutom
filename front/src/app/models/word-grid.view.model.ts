import { WordGridComponent } from "../ui/word-grid";
import { AudioFile } from "../util/audio-util";
import { ILetter } from "./letter.model";

const SOUND_TIME_INTERVAL = 500;

export class WordGridViewModel {

    public readonly grid: Array<Array<ILetter>>;
    public readonly nbLetters: number;
    public readonly firstLetter: string;
    public currentRow: number;
    public currentColumn: number;
    public word: string;
    public nbRows: number;
    public locked: boolean;

    public history: Array<Array<number>>;

    public parentComponent: WordGridComponent;

    private timeCounter: number;
    private blue = new AudioFile("assets/sounds/blue.mp3");
    private yellow = new AudioFile("assets/sounds/yellow.mp3");
    private red = new AudioFile("assets/sounds/red.mp3");
    private spontz = new AudioFile("assets/sounds/spontz.mp3");

    constructor(word: string, nbRows: number) {
        this.word = word;
        this.nbRows = nbRows;
        this.timeCounter = 0;
        this.locked = false;

        this.history = [];

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
        if (this.currentRow === this.nbRows) {
            return;
        }

        this.currentRow++;
        this.currentColumn = 1;

        this.setPlaces();
        this.setColors();
    }

    public playSound(color: string): void {
        switch (color) {
            case 'yellow':
                this.yellow.play();
                break;
            case 'red':
                this.red.play();
                break;
            default:
                this.blue.play();
                break;
        }
    }

    public setColors(): void {
        setTimeout(() => {
            this.grid[this.currentRow - 1][this.timeCounter].color = this.grid[this.currentRow - 1][this.timeCounter].place;
            this.playSound(this.grid[this.currentRow - 1][this.timeCounter].color);
            this.timeCounter++;
            if (this.timeCounter < this.nbLetters) {
                this.setColors();
            } else {
                this.endRow();
            }
        }, SOUND_TIME_INTERVAL);
    }

    public addHistoryRow(): void {
        this.history.push(
            this.grid[this.currentRow - 1].map(
                e => {
                    switch (e.color) {
                        case 'red':
                            return 2;
                        case 'yellow':
                            return 1;
                        default:
                            return 0;

                    }
                }
            )
        );
    }

    public endRow(): void {
        this.addHistoryRow();
        if (this.previousWord() === this.word) {
            this.locked = true;
            this.parentComponent.statusChange.emit('win');
            return;
        } else if (this.currentRow === this.nbRows) {
            this.locked = true;
            this.parentComponent.statusChange.emit('lose');
            return;
        }
        this.grid[this.currentRow][0].letter = this.firstLetter;
        for (let i = 1; i < this.nbLetters; i++) {
            this.grid[this.currentRow][i].letter = '.';
        }
        this.timeCounter = 0;
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
            if (foundLetters.includes(i)) {
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
        if (this.locked) {
            return;
        }
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
