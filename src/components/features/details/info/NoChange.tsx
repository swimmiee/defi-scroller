import { IoCloseOutline } from "react-icons/io5";

export const NoChange = () => {
  return (
    <div className="p-4 flex items-center gap-3">
      <IoCloseOutline size={36} color="#737373" />
      <p className="text-t-xl text-neutral-500"> No Transaction</p>
    </div>
  );
};
