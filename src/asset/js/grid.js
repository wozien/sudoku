import { makeMatrix } from 'js/utils';

class Grid {
  constructor($container) {
    this._$container = $container;
  }

  generate() {
    const matrix = makeMatrix(0);

    const $cells = matrix.map(row =>
      row.map(cellVal => {
        return $('<span>')
                  .addClass('cell')
                  .text(cellVal);
      })
    );

    const $rows = $cells.map($row => {
      return $('<div>')
               .addClass('row')
               .append($row);
    });

    this._$container.append($rows);
    this.layout();
  }

  layout() {
    const width = this._$container.find('span:first-child').width();

    $('.cell', this._$container)
      .height(width)
      .css({
        'line-height': `${width}px`
      })
  }
}

export default Grid;
