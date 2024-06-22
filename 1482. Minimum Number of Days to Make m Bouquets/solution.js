const minDays = (bloomDay, m, k) => {
  if (bloomDay.length < m * k) return -1;

  const canMakeMOfBouquets = (days) => {
      let bouquets = 0
      let flowers = 0;

      for (const bloom of bloomDay) {
          if (bloom > days) {
              flowers = 0;
              continue;
          }
          flowers++;
          if (flowers !== k) continue

          bouquets++;
          flowers = 0;
          if (bouquets >= m) return true;
      }
      return false;
  };

  let min = Math.min(...bloomDay)
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

