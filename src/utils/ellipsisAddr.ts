export const ellipsisAddr = (
  address: string,
  head: number = 6,
  tail: number = 4
) => {
  return address.slice(0, head) + '...' + address.slice(-tail);
};
