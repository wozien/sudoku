import $ from 'jquery';
import Grid from 'ts/ui/grid';
import Popup from 'ts/ui/popup';
import 'styles/main.scss';

const grid = new Grid($('#app>.container'));
const popupObj = new Popup($('.popup'));

grid.build();
grid.bindPopup(popupObj);

// 绑定按钮事件
$('.rebuild').on('click', e => {
  grid.rebuild();
});

$('.check').on('click', e => {
  grid.check();
});

$('.reset').on('click', e => {
  grid.reset();
});

$('.clear').on('click', e => {
  grid.clear();
});
