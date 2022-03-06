export interface IProgression {
    letters: Array<IProgressionLetter>;
}

export interface IProgressionLetter {
    letter: string;
    found: boolean;
}