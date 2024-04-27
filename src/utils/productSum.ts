export const productSum = (amounts: number[], price: number[]) => {
  return amounts.reduce((acc, cur, idx) => acc + cur * price[idx], 0);
};