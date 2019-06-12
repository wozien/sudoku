function makeRow(v: number | boolean) {
  const arr = Array(9);
  arr.fill(v);
  return arr;
}

export function makeMatrix(v: number | boolean) {
  return Array.from({ length: 9 }, () => makeRow(v));
}

/**
 * Fisher-Yates 洗牌算法
 * @param {*} arr
 */
export function shuffle(arr: number[]) {
  const len = arr.length;
  for (let i = 0; i < len - 1; i++) {
    let j = i + Math.floor(Math.random() * (len - i));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// 根据矩阵坐标获取宫索引
function getBoxIndex(rowIndex: number, colIndex: number) {
  return Math.floor(rowIndex / 3) * 3 + Math.floor(colIndex / 3);
}

/**
 * 获取宫的数据
 * @param {*} matrix
 * @param {*} boxIndex  宫索引
 */
export function getBoxArr(matrix: number[][], boxIndex: number) {
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

/**
 * 根据宫索引和偏移获取矩阵索引
 * @param {*} boxIndex
 * @param {*} index
 */
export function convertToRowCol(boxIndex: number, index: number) {
  const startBoxRowIndex = Math.floor(boxIndex / 3) * 3;
  const startBoxColIndex = Math.floor(boxIndex % 3) * 3;
  return {
    rowIndex: startBoxRowIndex + Math.floor(index / 3),
    colIndex: startBoxColIndex + Math.floor(index % 3)
  };
}

/**
 * 检查值val能否放到指定位置
 * @param {*} matrix
 * @param {*} val
 * @param {*} rowIndex
 * @param {*} colIndex
 */
export function checkFillNumber(
  matrix: number[][],
  val: number,
  rowIndex: number,
  colIndex: number
) {
  const rowArr = matrix[rowIndex];
  const colArr = Array.from({ length: 9 }, (v, i) => matrix[i][colIndex]);
  const boxIndex = getBoxIndex(rowIndex, colIndex);
  const boxArr = getBoxArr(matrix, boxIndex);

  for (let i = 0; i < 9; i++) {
    if (rowArr[i] === val || colArr[i] === val || boxArr[i] === val) return false;
  }
  return true;
}
