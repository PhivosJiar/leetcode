const judgeSquareSum = (c) => {
  const squareList = [];
  for (let i = 0; i * i <= c; i++) {
    const sqrt = i * i;
    if (sqrt > c) break;
    squareList.push(sqrt);
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
