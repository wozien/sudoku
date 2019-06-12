import Generator from 'ts/core/generator';

class Sudoku {
  public solutionMatrix: number[][];
  public puzzleMatrix: number[][];

  constructor() {
    const generator = new Generator();
    generator.generate();

    this.solutionMatrix = generator.matrix;
    this.puzzleMatrix = [];
  }

  make(level = 5) {
    this.puzzleMatrix = this.solutionMatrix.map((row: number[]) => {
      return row.map((val: number) => (Math.random() * 9 < level ? 0 : val));
    });
  }
}

export default Sudoku;
