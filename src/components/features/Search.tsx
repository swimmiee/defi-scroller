import { useState } from "react";
import { Input } from "../Input";
import { useNavigate } from "react-router-dom";
import { isAddress } from "ethers";
import { HotPositions } from "components/features/hotPositions";

interface SearchProps {
  address: string;
}

export const Search = ({ address }: SearchProps) => {
  const [value, setValue] = useState<string>(address);
  const nav = useNavigate();
  const toPage = () => {
    if (!isAddress(value)) alert("Invalid address!");
    nav(`/${value}`);
  };
  return (
    <div className="flex gap-2 mt-4">
      <Input className="flex-1 w-[480px]" value={value} setValue={setValue} />
      <button onClick={toPage} className="btn px-4">
        Go!
      </button>
    </div>
  );
};
