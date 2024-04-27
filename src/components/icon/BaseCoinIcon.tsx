import { cn } from "utils/cn";

export type CoinIconSize = "3xl" | "xxl" | "xl" | "lg" | "md" | "sm" | "xs";
export const iconSizeOf: { [size in CoinIconSize]: string } = {
  "3xl": "w-[52px] h-[52px]",
  xxl: "w-11 h-11",
  xl: "w-9 h-9",
  lg: "w-7 h-7",
  md: "w-6 h-6",
  sm: "w-5 h-5",
  xs: "w-4 h-4",
};
export const mobileIconSizeOf: { [size in CoinIconSize]: string } = {
  "3xl": "max-md:w-[52px] max-md:h-[52px]",
  xxl: "max-md:w-11 max-md:h-11",
  xl: "max-md:w-9 max-md:h-9",
  lg: "max-md:w-7 max-md:h-7",
  md: "max-md:w-6 max-md:h-6",
  sm: "max-md:w-5 max-md:h-5",
  xs: "max-md:w-4 max-md:h-4",
};

interface BaseCoinIconProps {
  size: CoinIconSize;
  mobileSize?: CoinIconSize;
  imgSrc: string;
  alt: string;
  className?: string;
}
export const BaseCoinIcon = ({
  size,
  mobileSize,
  imgSrc,
  alt,
  className,
}: BaseCoinIconProps) => {
  mobileSize = mobileSize ?? size;
  return (
    <img
      src={imgSrc}
      alt={alt}
      className={cn(
        "rounded-full border bg-white",
        mobileIconSizeOf[mobileSize],
        iconSizeOf[size],
        className
      )}
    />
  );
};
