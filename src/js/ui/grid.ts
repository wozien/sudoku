import $ from 'jquery';
import Sudoku from 'js/core/sudoku';
import Checker from 'js/core/checker';

class Grid {
  _$container: JQuery;

  constructor($container: JQuery) {
    this._$container = $container;
  }

  /**
   * 生成数独网格dom
   */
  build() {
    const sudoku = new Sudoku();
    sudoku.make();
    const matrix = sudoku.puzzleMatrix;

    const $cells = matrix.map(row =>
      row.map((cellVal: number) => {
        return $('<span>')
          .addClass('cell')
          .addClass(cellVal ? 'fixed' : 'empty')
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

  /**
   * 设置每个单元格的高
   */
  layout() {
    const width = this._$container.find('span:first-child').width() || 30;

    $('.cell', this._$container)
      .height(width)
      .css({
        'line-height': `${width}px`
      });
  }

  /**
   * 绑定弹框事件
   * @param {} popupObj
   */
  bindPopup(popupObj: any) {
    this._$container.on('click', 'span', e => {
      const $cell = $(e.target);

      if ($cell.hasClass('fixed')) {
        return;
      }

      const width = this._$container.innerWidth();
      popupObj.popup($cell, width);
    });
  }

  /**
   * 重置迷盘数据
   */
  reset() {
    this._$container
      .find('span:not(.fixed)')
      .removeClass('error mark1 mark2')
      .addClass('empty');
  }

  /**
   * 清理错误校验
   */
  clear() {
    this._$container.find('span.error').removeClass('error');
  }

  /**
   * 重建数独迷盘
   */
  rebuild() {
    this._$container.empty();
    this.build();
    this.layout();
  }

  /**
   * 检查用户的数据
   */
  check() {
    const data = this._getData();
    const checker = new Checker(data);
    if (checker.check()) {
      return;
    }
    // console.log(data);

    const marks = checker.matrixMasks;
    this._$container.children().each((rowIndex, div) => {
      $(div)
        .children()
        .each((colIndex, span) => {
          const $span = $(span);
          if ($span.is('.fixed') || marks[rowIndex][colIndex]) {
            $span.removeClass('error');
          } else {
            $span.addClass('error');
          }
        });
    });
  }

  /**
   * 获取用户的输入的数据
   */
  _getData() {
    return this._$container
      .children()
      .map((rowIndex, div) => {
        return $(div)
          .children()
          .map((colIndex, span) => parseInt($(span).text()) || 0);
      })
      .toArray()
      .map($data => $data.toArray());
  }
}

export default Grid;
