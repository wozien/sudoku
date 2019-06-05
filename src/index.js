import {shuffle} from 'js/utils'

const a = Array.from({length: 9}, (v, i) => i)
console.log(a);
console.log(shuffle(a))