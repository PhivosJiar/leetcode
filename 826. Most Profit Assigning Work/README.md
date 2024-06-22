# 826. Most Profit Assigning Work

## 題目

[link](https://leetcode.com/problems/most-profit-assigning-work/description/?envType=daily-question&envId=2024-06-18)

You have n jobs and m workers. You are given three arrays: difficulty, profit, and worker where:

difficulty[i] and profit[i] are the difficulty and the profit of the ith job, and
worker[j] is the ability of jth worker (i.e., the jth worker can only complete a job with difficulty at most worker[j]).
Every worker can be assigned at most one job, but one job can be completed multiple times.

For example, if three workers attempt the same job that pays $1, then the total profit will be $3. If a worker cannot complete any job, their profit is $0.
Return the maximum profit we can achieve after assigning the workers to the jobs.

Example 1:

```
Input: difficulty = [2,4,6,8,10], profit = [10,20,30,40,50], worker = [4,5,6,7]
Output: 100
Explanation: Workers are assigned jobs of difficulty [4,4,6,6] and they get a profit of [20,20,30,30] separately.
```

Example 2:

```
Input: difficulty = [85,47,57], profit = [24,66,99], worker = [40,25,25]
Output: 0
```

Constraints:

n == difficulty.length
n == profit.length
m == worker.length
1 <= n, m <= 104
1 <= difficulty[i], profit[i], worker[i] <= 105

## 解題思路

題目要求最大利潤，而每個工作都有相應的難度跟利潤，一個工作可以被多次完成，但一個工人只能完成一個工作，我們需要求一個工人的最大利潤，所以我們透過 Greedy Algorithm 來解

首先我們建立 workList 利用 map 函式將每個工作的 profit 和 difficulty 組成一個陣列，並根據 profit 進行排序。這樣做是為了後續能夠從 profit 最高的工作開始選擇。

接著將 worker 的能力做降冪排序並遍歷，接著從最高利潤的工作開始比對，最後將利潤相加即可

```js
const maxProfitAssignment = (difficulty, profit, worker) => {
  const workList = profit
    .map((profit, index) => [profit, difficulty[index]])
    .sort((a, b) => a[0] - b[0]);
  let currentWork = workList.pop();

  const getCurrentWorkerProfit = (ability) => {
    const [profit, difficulty] = currentWork;
    if (ability >= difficulty) return profit;

    if (!workList.length) return 0;
    currentWork = workList.pop();
    return getCurrentWorkerProfit(ability);
  };

  return worker
    .sort((a, b) => b - a)
    .reduce((maxProfit, ability) => {
      maxProfit += getCurrentWorkerProfit(ability);
      return maxProfit;
    }, 0);
};
```

時間複雜度：遍歷 worker 並呼叫 getCurrentWorkerProfit 最差的情況複雜度為 O(nm)
