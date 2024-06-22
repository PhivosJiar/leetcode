# 633. Sum of Square Numbers

## 題目

[link](https://leetcode.com/problems/minimum-number-of-days-to-make-m-bouquets/description/?envType=daily-question&envId=2024-06-19)

You are given an integer array bloomDay, an integer m and an integer k.

You want to make m bouquets. To make a bouquet, you need to use k adjacent flowers from the garden.

The garden consists of n flowers, the ith flower will bloom in the bloomDay[i] and then can be used in exactly one bouquet.

Return the minimum number of days you need to wait to be able to make m bouquets from the garden. If it is impossible to make m bouquets return -1.

Example 1:

```
Input: bloomDay = [1,10,3,10,2], m = 3, k = 1
Output: 3
Explanation: Let us see what happened in the first three days. x means flower bloomed and _ means flower did not bloom in the garden.
We need 3 bouquets each should contain 1 flower.
After day 1: [x, _, _, _, _] // we can only make one bouquet.
After day 2: [x, _, _, _, x] // we can only make two bouquets.
After day 3: [x, _, x, _, x] // we can make 3 bouquets. The answer is 3.
```

Example 2:

```
Input: bloomDay = [1,10,3,10,2], m = 3, k = 2
Output: -1
Explanation: We need 3 bouquets each has 2 flowers, that means we need 6 flowers. We only have 5 flowers so it is impossible to get the needed bouquets and we return -1.
```

Example 3:

```
Input: bloomDay = [7,7,7,7,12,7,7], m = 2, k = 3
Output: 12
Explanation: We need 2 bouquets each should have 3 flowers.
Here is the garden after the 7 and 12 days:
After day 7: [x, x, x, x, _, x, x]
We can make one bouquet of the first three flowers that bloomed. We cannot make another bouquet from the last three flowers that bloomed because they are not adjacent.
After day 12: [x, x, x, x, x, x, x]
It is obvious that we can make two bouquets in different ways.
```

Constraints:

bloomDay.length == n
1 <= n <= 105
1 <= bloomDay[i] <= 109
1 <= m <= 106
1 <= k <= n

## 解題思路

這題主要想問最小在哪一天可以製作 m 朵花束，每一個花束必須是相鄰的 k 朵花

bloomDay 陣列長度就是總花量，要製作 m 朵花束至少要 m\*k 朵花，所以長度不符合就直接 return -1

接著我們建立 canMakeMOfBouquets，判斷目標天數是否可以完成Ｍ朵花

最後就透過 binary search 找到最小的那天就可以了

```js
const minDays = (bloomDay, m, k) => {
  if (bloomDay.length < m * k) return -1;

  const canMakeMOfBouquets = (days) => {
    let bouquets = 0;
    let flowers = 0;

    for (const bloom of bloomDay) {
      if (bloom > days) {
        flowers = 0;
        continue;
      }
      flowers++;
      if (flowers !== k) continue;

      bouquets++;
      flowers = 0;
      if (bouquets >= m) return true;
    }
    return false;
  };

  let min = Math.min(...bloomDay);
  let max = Math.max(...bloomDay);
  while (min < max) {
    const mid = Math.floor((min + max) / 2);
    if (canMakeMOfBouquets(mid)) {
      max = mid;
      continue;
    }
    min = mid + 1;
  }

  return min;
};
```

時間複雜度: 大約(O(n log(max-min)))

- binary search 大約 O(log (max-min))
- canMakeMOfBouquets 大約 O(n)
