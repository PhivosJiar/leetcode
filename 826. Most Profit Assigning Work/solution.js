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