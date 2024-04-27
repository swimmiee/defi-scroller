import { CoinIconSize } from "./BaseCoinIcon";
import { TokenIcon } from "./TokenIcon";

interface ProjectIconProps {
  size: CoinIconSize;
  mobileSize?: CoinIconSize;
  project: {
    logoURI: string;
    chainId: number;
    name?: string;
  };
  className?: string;
  withChain?: boolean;
}

export const ProjectIcon = (props: ProjectIconProps) => {
  return (
    <TokenIcon
      size={props.size}
      mobileSize={props.mobileSize}
      token={props.project}
      className={props.className}
      withChain={props.withChain}
    />
  );
};
