# 633. Sum of Square Numbers

## 題目

[link](https://leetcode.com/problems/sum-of-square-numbers/description/?envType=daily-question&envId=2024-06-17)

Given a non-negative integer c, decide whether there're two integers a and b such that a2 + b2 = c.

Example 1:

```
Input: c = 5
Output: true
Explanation: 1 _ 1 + 2 _ 2 = 5
```

Example 2:

```
Input: c = 3
Output: false
```

Constraints:

0 <= c <= 231 - 1


## 解題思路

先將範圍在 c 之間的平方值找出來，剩下其實就是 two sum 的做法了，只是這題可以兩個一樣的平方值相加，所以左右指針要是<=

```js
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
```

時間複雜度:O(根號 n)
