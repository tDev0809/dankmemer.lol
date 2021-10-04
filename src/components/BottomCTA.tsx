import FancyButton from "./ui/FancyButton";

export default function BottomCTA() {
	return (
		<div className="flex flex-col items-center font-montserrat space-y-2">
			<h1 className="text-3xl font-bold">Join the family!</h1>
			<p className="">Add Dank Memer to your Discord server.</p>
			<FancyButton
				link="https://invite.dankmemer.lol"
				text="INVITE NOW"
			/>
		</div>
	);
}
