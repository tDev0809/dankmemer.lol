import clsx from "clsx";

interface Props {
	id: string;
	className?: string;
}

export function Icon({ id, className = "" }: Props) {
	return <span className={clsx("material-icons", className)}>{id}</span>;
}
