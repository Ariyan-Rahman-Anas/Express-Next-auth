import Link from "next/link";
import Image from "next/image";

interface PrimaryButtonProps {
  bType?: "button" | "submit" | "reset";
  title: string;
  to?: string;
  icon?: React.ReactNode;
  imgIcon?: string;
  isNewTab?: boolean;
  style?: React.CSSProperties;
  disabled?: boolean
  onClick?: () => void
}
const PrimaryButton = ({
  bType = "button",
  title,
  to = "",
  icon,
  imgIcon,
  isNewTab = false,
  style,
disabled = false,
  onClick
}: PrimaryButtonProps) => {

  return (
    <Link href={to} target={isNewTab ? "_blank" : "_self"} className={`w-full ${disabled ? "cursor-not-allowed opacity-50" : ""} `} >
      <button
        type={bType}
        style={style}
        className="rounded text-sm font-medium w-full px-4 bg-black text-white py-1.5 transition-all duration-500 flex items-center justify-center gap-2 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
        onClick={onClick}
      >
        {icon && icon}
        {imgIcon && <Image src={imgIcon} alt={title} />}
        {title}
      </button>
    </Link>
  );
};
export default PrimaryButton;