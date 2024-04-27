
import { TokenIcon } from "components/icon/TokenIcon";
import { Token } from "interfaces/token.interface";
import { dollar, toFixedCond } from "utils/formatter";

interface TokenAndAmountProps {
  token: Token;
  amount: number;
}
export const TokenAndAmount = ({ token, amount }: TokenAndAmountProps) => {
  return (
    <div className="flex items-center justify-between">
      <TokenIcon size="xl" mobileSize="lg" token={token} />
      <div className="flex items-end gap-1">
        <p className="text-xl">
          {toFixedCond(amount, 2)} {token.symbol}
        </p>
        <p className="mb-0.5 text-neutral-500">
          {dollar(amount * token.priceUSD)}
        </p>
      </div>
    </div>
  );
};
