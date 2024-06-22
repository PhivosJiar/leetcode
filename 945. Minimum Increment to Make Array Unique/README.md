# 945. Minimum Increment to Make Array Unique

## 題目

[link](https://leetcode.com/problems/minimum-increment-to-make-array-unique/description/?envType=daily-question&envId=2024-06-14)

You are given an integer array nums. In one move, you can pick an index i where 0 <= i < nums.length and increment nums[i] by 1.

Return the minimum number of moves to make every value in nums unique.

The test cases are generated so that the answer fits in a 32-bit integer.

Example 1:

```
Input: nums = [1,2,2]
Output: 1
Explanation: After 1 move, the array could be [1, 2, 3].
```

```
Example 2:

Input: nums = [3,2,1,2,1,7]
Output: 6
Explanation: After 6 moves, the array could be [3, 4, 1, 2, 5, 7].
It can be shown with 5 or less moves that it is impossible for the array to have all unique values.
```

Constraints:

1 <= nums.length <= 105
0 <= nums[i] <= 105

## 解題思路

以 Example2 來舉例:
input:[3,2,1,2,1,7]

先將數組遞增排序，會得到[1,1,2,2,3,7]，我們可以發現第一次出現重複的是第二個 1，下一個未出現的數字是 4。

現在有兩種方式

1. 將 1 直接移動到 4，這方法 step 等於 3，但這方法要再做一個 loop 去找下一個空缺，
2. 將 1 移動到 2，2 再移動到 4 step 也是 3

可以觀察到第 2 個方法可以省下不少效能，那以這個思路完成這個題目

```js
const minIncrementForUnique = (nums) => {
  nums.sort((a, b) => a - b);
  let step = 0;
  let next = nums[0] + 1;

  for (let i = 1; i < nums.length; i++) {
    if (nums[i] <= next) {
      step += next - nums[i];
      next++;
      continue;
    }
    next = nums[i] + 1;
  }
  return step;
};
```

設定 next = nums[0]+1 來指定下一個位置
因為第一個元素不會是重複的，我們從 index:1 開始遍歷，如果當下 item<=next 代表他是需要移動的，而移動步數就是 next 與當下 item 的差距

時間複雜度: O(n log n)，複雜度最高的為排序的部分

- sort: js v8 排序是 O(n log n)
- 遍歷: O(n)
