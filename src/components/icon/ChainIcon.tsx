import { BaseCoinIcon, CoinIconSize } from "./BaseCoinIcon";

interface ChainIconProps {
  size: CoinIconSize;
  mobileSize?: CoinIconSize;
  chain: {
    logoURI: string;
    name?: string;
  };
  className?: string;
}

export const ChainIcon = ({
  size,
  mobileSize,
  chain,
  className,
}: ChainIconProps) => {
  return (
    <BaseCoinIcon
      size={size}
      mobileSize={mobileSize}
      imgSrc={chain.logoURI}
      alt={chain.name || "chain"}
      className={className}
    />
  );
};
