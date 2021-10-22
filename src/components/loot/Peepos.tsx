import { ReactNode, useEffect, useState } from "react";
import randomPeepo from "../../util/randomPeepo";

interface Props {
	children: ReactNode;
}

export function Peepos({ children }: Props) {
	const [currentPeepo, setCurrentPeepo] = useState(0);
	const [show, setShow] = useState(false);
	const [audio, setAudio] = useState<HTMLAudioElement[]>([]);

	useEffect(() => {
		setAudio(
			Array(13)
				.fill(0)
				.map((_, i) => new Audio(`/audio/peepo${i}.mp3`))
		);
	}, []);

	useEffect(() => {
		if (show) {
			setTimeout(() => {
				if (show) setShow(false);
			}, 1000);
		}
	}, [show]);

	const getPeepoPositioning = () => {
		const direction = Math.floor(Math.random() * 360);

		return {
			"--direction": `${direction}deg`,
			"--delta-x": `${200 * Math.sin(direction)}px`,
			"--delta-y": `${150 * Math.cos(direction)}px`,
			"--offset-x":
				direction % 180 ? 0 : `${130 - Math.random() * 260}px`,
			"--offset-y": direction % 180 ? `${40 - Math.random() * 80}px` : 0,
		};
	};

	return (
		<div
			className="relative"
			onClick={() => {
				setShow(true);
				setCurrentPeepo(currentPeepo + 1);
				audio[currentPeepo % 12].play();
			}}
		>
			{children}
			{show && (
				<div className="absolute left-1/2 top-1/2">
					{[...Array(5)].map((_, i) => (
						<div
							className="absolute w-16 h-16"
							style={{
								...getPeepoPositioning(),
								backgroundImage: `url(/img/peepos/${randomPeepo()})`,
								animation: "peepo 1s forwards",
								top: "50%",
								left: "50%",
								zIndex: 2,
								backgroundRepeat: "no-repeat",
								backgroundSize: "contain",
							}}
						/>
					))}
				</div>
			)}
		</div>
	);
}
