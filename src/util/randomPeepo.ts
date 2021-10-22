export default function randomPeepo() {
	const images: string[] = [
		// TODO: read it somehow from the folder
		"bigWOW.png",
		"FeelsRareMan.gif",
		"FeelsWowMan.png",
		"iLoveYou.gif",
		"peepoClap.gif",
		"peepoGiggles.gif",
		"peepoHappy.png",
		"PeepoJuice.gif",
		"peepolove.png",
		"peepoPat.gif",
		"pepeDS.gif",
		"PepegaCredit.gif",
		"pepoCheer.gif",
		"pepoCheer.gif",
		"poggies.png",
		"pogSlide.gif",
		"widepeepohappy.png",
		"YEP.png",
	];

	return images[Math.floor(Math.random() * images.length)];
}
