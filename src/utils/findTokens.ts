import { TOKENS } from "configs/tokens.config";
import { ZeroAddress } from "ethers";

export const findTokens = (addrs: string[], autoUnwrap: boolean) => {
  return addrs.map((addr) => {
    const t = TOKENS.find((token) => token.address === addr)!;
    return autoUnwrap && t?.type === "wETH"
      ? TOKENS.find((token) => token.address === ZeroAddress)!
      : t;
  });
};
