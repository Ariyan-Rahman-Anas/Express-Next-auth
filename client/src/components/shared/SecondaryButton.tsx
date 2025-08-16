import Image from "next/image";

interface SecondaryButtonProps {
    bType?: "button" | "submit" | "reset";
    title: string | React.ReactNode;
    style?: React.CSSProperties;
    onClick?: () => void;
    disabled?: boolean;
    icon?: any;
}
const SecondaryButton = ({
    bType = "button",
    title,
    style,
    onClick,
    disabled,
    icon }: SecondaryButtonProps) => {

    return (
        <button
            type={bType}
            onClick={onClick}
            disabled={disabled}
            style={style}
            className="rounded text-sm font-medium w-full px-4 bg-black text-white py-1.5 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
        >
            {typeof icon === "string" ? <Image src={icon} alt={title as string} className="w-6 h-6" width={24} height={24} /> : icon || null}
            {typeof title === "string" ? <span>{title}</span> : title}
        </button>
    );
};
export default SecondaryButton;