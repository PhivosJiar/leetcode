const judgeSquareSum = (c) => {
  const squareList = [];
  for (let i = 0; i * i <= c; i++) {
    const square = i * i;
    if (square > c) break;
    squareList.push(square);
  }

  let left = 0;
  let right = squareList.length - 1;

  while (left <= right) {
    const sum = squareList[left] + squareList[right];

    if (sum < c) {
      left++;
      continue;
    }

    if (sum > c) {
      right--;
      continue;
    }

    return true;
  }
  return false;
};