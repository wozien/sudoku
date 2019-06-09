import Generator from 'js/core/generator';

class Sudoku {
  constructor() {
    const generator = new Generator();
    generator.generate();
    this.solutionMatrix = generator.matrix;
  }

  make(level = 5) {
    this.puzzleMatrix = this.solutionMatrix.map(row => {
      return row.map(val => (Math.random() * 9 < level ? 0 : val));
    });
  }
}

export default Sudoku;
