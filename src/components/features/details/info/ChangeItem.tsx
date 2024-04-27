import { createElement, useMemo } from "react";
import {
  CiSaveUp1,
  CiSaveDown1,
  CiCoinInsert,
  CiBadgeDollar,
  CiBag1,
  CiCircleRemove,
  CiSaveDown2,
  CiSaveUp2,
  CiLock,
  CiUnlock,
} from "react-icons/ci";
import { RiLink } from "react-icons/ri";
import { dateFormat, dollar } from "utils/formatter";
import { actionColorMap } from "configs/action.color";
import { CHAIN } from "configs/chain.config";
import { ParsedPositionChange, PositionChangeAction } from "interfaces/parsed-position.interface";

interface ChangeTransactionItemProps {
  change: ParsedPositionChange;
}

export const ChangeTransactionItem = ({
  change,
}: ChangeTransactionItemProps) => {
  const explorer = `${CHAIN.explorer}tx/${change.transactionHash}`;
  const comp = useMemo(() => {
    switch (change.action) {
      case PositionChangeAction.Deposit:
        return CiSaveUp1;
      case PositionChangeAction.Withdraw:
        return CiSaveDown1;
      case PositionChangeAction.Harvest:
        return CiCoinInsert;
      case PositionChangeAction.Borrow:
        return CiBag1;
      case PositionChangeAction.Repay:
        return CiBadgeDollar;
      case PositionChangeAction.Liquidate:
        return CiCircleRemove;
      case PositionChangeAction.Send:
        return CiSaveUp2;
      case PositionChangeAction.Receive:
        return CiSaveDown2;
      case PositionChangeAction.Stake:
        return CiLock;
      case PositionChangeAction.Unstake:
        return CiUnlock;
    }
  }, [change.action]);

  const color = actionColorMap[change.action];
  return (
    <a
      target="_blank"
      href={explorer}
      className="hover:bg-neutral-50 flex items-center gap-3 px-6 py-4"
    >
      {createElement(comp, { color, size: 36 })}

      <div className="flex-[2]">
        <p className="text-xl">{change.action}</p>
        <p className="text-sm text-neutral-700">
          {dateFormat(change.timestamp, { date: true, time: true })}
        </p>
      </div>
      <p className="flex-1 text-xl text-right">
        {dollar(change.dValueUSD, true)}
      </p>
      <RiLink size={20} className="cursor-pointer" />
    </a>
  );
};
