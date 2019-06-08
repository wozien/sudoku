function makeRow(v = 0) {
  const arr = Array(9);
  arr.fill(v);
  return arr;
}

export function makeMatrix(v = 0) {
  return Array.from({ length: 9 }, () => makeRow(v));
}

/**
 * Fisher-Yates 洗牌算法
 * @param {*} arr
 */
export function shuffle(arr) {
  const len = arr.length;
  for (let i = 0; i < len - 1; i++) {
    let j = i + Math.floor(Math.random() * (len - i));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// 根据矩阵坐标获取宫索引
function getBoxIndex(rowIndex, colIndex) {
  return Math.floor(rowIndex / 3) * 3 + Math.floor(colIndex / 3);
}

// 获取宫的数据
function getBoxArr(matrix, rowIndex, colIndex) {
  const boxIndex = getBoxIndex(rowIndex, colIndex);
  const startBoxRowIndex = Math.floor(boxIndex / 3) * 3;
  const startBoxColIndex = Math.floor(boxIndex % 3) * 3;
  const boxArr = [];
  for (let i = 0; i < 9; i++) {
    let boxRow = startBoxRowIndex + Math.floor(i / 3);
    let boxCol = startBoxColIndex + Math.floor(i % 3);
    boxArr[i] = matrix[boxRow][boxCol];
  }
  return boxArr;
}

export function checkFillNumber(matrix, val, rowIndex, colIndex) {
  const rowArr = matrix[rowIndex];
  const colArr = Array.from({ length: 9 }, (v, i) => matrix[i][colIndex]);
  const boxArr = getBoxArr(matrix, rowIndex, colIndex);

  for (let i = 0; i < 9; i++) {
    if (rowArr[i] === val || colArr[i] === val || boxArr[i] === val) return false;
  }
  return true;
}
