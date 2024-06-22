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
