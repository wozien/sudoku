import Generator from 'js/core/generator';

class Sudoku {
  public solutionMatrix: any;
  public puzzleMatrix: any;

  constructor() {
    const generator = new Generator();
    generator.generate();
    this.solutionMatrix = generator.matrix;
  }

  make(level = 5) {
    this.puzzleMatrix = this.solutionMatrix.map((row: any) => {
      return row.map((val: any) => (Math.random() * 9 < level ? 0 : val));
    });
  }
}

export default Sudoku;
