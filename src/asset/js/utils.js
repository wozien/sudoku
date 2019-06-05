function makeRow(v = 0) {
  const arr = Array(9);
  arr.fill(v);;
  return arr
}

export function makeMatrix(v = 0) {
  return Array.from({length: 9}, () => makeRow(v));
}

/**
 * Fisher-Yates 洗牌算法
 * @param {*} arr 
 */
export function shuffle(arr) {
  const len = arr.length;
  for(let i = 0; i < len - 1; i++) {
    let j = i + Math.floor(Math.random() * (len - i));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}
