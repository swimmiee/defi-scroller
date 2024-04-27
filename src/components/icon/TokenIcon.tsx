import { BaseCoinIcon, CoinIconSize } from "./BaseCoinIcon";
import { ChainIcon } from "./ChainIcon";
import { CHAIN } from "configs/chain.config";

interface TokenIconProps {
  size: CoinIconSize;
  mobileSize?: CoinIconSize;
  withChain?: boolean;
  token: {
    logoURI: string;
    symbol?: string;
    chainId: number;
  };
  className?: string;
}
export const TokenIcon = ({
  size,
  mobileSize,
  token,
  className,
  withChain = false,
}: TokenIconProps) => {
  const chain = CHAIN;
  return (
    <div className="relative">
      <BaseCoinIcon
        size={size}
        mobileSize={mobileSize}
        imgSrc={token.logoURI}
        alt={token.symbol || "token"}
        className={className}
      />
      {withChain && (
        <ChainIcon
          className="absolute -right-1.5 -bottom-0.5"
          size={["xs", "sm", "md"].includes(size) ? "xs" : "sm"}
          chain={chain}
        />
      )}
    </div>
  );
};
