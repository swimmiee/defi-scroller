import { cn } from "../utils/cn";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  value: string;
  setValue: (value: string) => void;
}

export const Input = ({ className, value, setValue }: InputProps) => {
  return (
    <input
      className={cn(
        "bg-white border-neutral-300 border rounded-lg p-2 outline-none",
        className
      )}
      value={value}
      placeholder="0x..."
      onChange={(e) => setValue(e.target.value)}
    />
  );
};
