import $ from 'jquery';
import Grid from 'js/grid';
import 'styles/main.scss';

window.$ = $;

const grid = new Grid($('#app>.container'));

grid.generate();
