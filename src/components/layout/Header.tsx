import { ROUTES } from "Router";
import { Search } from "components/features/Search";
import { Link } from "react-router-dom";
import { cn } from "utils/cn";

interface HeaderProps {
  address: string;
  short?: boolean;
}
export const Header = ({ short, address }: HeaderProps) => {
  return (
    <header
      className={cn(
        short ? "h-48 mb-4" : "h-64 mb-16",
        "bg-primary flex flex-col items-center justify-center border-b border-neutral-300"
      )}
    >
      <Link to={ROUTES.MAIN} className="flex justify-center items-end mb-2">
        <p className={cn(short ? "text-4xl mr-3" : "text-6xl mr-6", "font-medium leading-none")}>
          Best DeFi Tracker Ever on
        </p>
        <img className={short?"h-7 mb-0.5":"h-10 mb-1"} src="/img/ScrollLogo.png" />
      </Link>

      <Search address={address} />
    </header>
  );
};
