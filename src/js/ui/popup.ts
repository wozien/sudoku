import $ from 'jquery';

class Popup {
  public $panel: JQuery;
  private $targetCell: JQuery;

  constructor($panel: JQuery) {
    this.$panel = $panel;
    this.$targetCell = $('');
    this.bindClick();
  }

  /**
   * 弹框点击事件
   */
  bindClick() {
    this.$panel.on('click', 'span', e => {
      const $span = $(e.target);
      const $cell = this.$targetCell;

      if ($span.hasClass('mark1')) {
        if ($cell.text() === '0') return;
        if ($cell.hasClass('mark1')) {
          $cell.removeClass('mark1');
        } else {
          $cell.removeClass('mark2').addClass('mark1');
        }
      } else if ($span.hasClass('mark2')) {
        if ($cell.text() === '0') return;
        if ($cell.hasClass('mark2')) {
          $cell.removeClass('mark2');
        } else {
          $cell.removeClass('mark1').addClass('mark2');
        }
      } else if ($span.hasClass('empty')) {
        $cell
          .removeClass('mark1 mark2')
          .addClass('empty')
          .text(0);
      } else {
        $cell.removeClass('empty').text($span.text());
      }

      this.hide();
    });
  }

  /**
   * 显示弹框
   */
  popup($cell: JQuery, innerWidth: number) {
    this.$targetCell = $cell;

    let { left, top } = $cell.position();
    if (innerWidth - left < 130) {
      left = left - 80;
    }

    this.$panel.css({
      top: `${top}px`,
      left: `${left}px`
    });

    this.show();
  }

  show() {
    this.$panel.show();
  }

  hide() {
    this.$panel.hide();
  }
}

export default Popup;
