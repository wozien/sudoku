import $ from 'jquery';
import Grid from 'js/ui/grid';
import Generator from 'js/core/generator';
import 'styles/main.scss';

window.$ = $;

const grid = new Grid($('#app>.container'));

grid.build();

const generator = new Generator();  
generator.generate();
console.log(generator.matrix);
