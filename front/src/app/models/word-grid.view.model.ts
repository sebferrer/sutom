export class WordGridViewModel {

    public readonly grid: Array<Array<string>>;
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

        this.grid = new Array<Array<string>>();
        for (let i = 0; i < this.nbRows; i++) {
            let row = new Array();
            for (let j = 0; j < this.nbLetters; j++) {
                if (i === 0 && j === 0) {
                    row.push(this.firstLetter);
                } else if (i === 0) {
                    row.push('.');
                } else {
                    row.push(' ');
                }
            }
            this.grid.push(row);
        }

        this.currentRow = 0;
        this.currentColumn = 1;
    }

    public nextRow(): void {
        console.log(this.currentWord());
        if (this.currentRow === this.nbRows - 1) {
            return;
        }
        this.currentRow++;
        this.currentColumn = 0;
        for (let i = 0; i < this.nbLetters; i++) {
            this.grid[this.currentRow][i] = '.';
        }
    }

    public nextColumn(): void {
        if (this.currentColumn === this.nbLetters - 1) {
            return;
        }
        this.currentColumn++;
    }

    public previousColumn(): void {
        if (this.currentColumn === 0) {
            return;
        }
        this.currentColumn--;
    }

    public sendKey(key: string): void {
        console.log('>> ' + key);
        if (key === 'back') {
            this.grid[this.currentRow][this.currentColumn] = '.';
            this.previousColumn();
        } else if (key === 'enter') {
            this.nextRow();
        } else {
            this.grid[this.currentRow][this.currentColumn] = key;
            console.log(this.grid);
            this.nextColumn();
        }
    }

    public currentWord(): string {
        return this.grid[this.currentRow].join('');
    }
}