import axios from "axios";
import { GetServerSideProps } from "next";
import { useEffect, useState } from "react";
import Container from "../components/ui/Container";
import { Box, PageProps } from "../types";
import { unauthenticatedRoute } from "../util/redirects";
import { withSession } from "../util/session";
import { Peepos } from "../components/loot/Peepos";
import { Success } from "../components/loot/Success";
import { PossibleItems } from "../components/loot/PossibleItems";
import { BoxOption } from "../components/loot/BoxOption";
import { OrderSummary } from "../components/loot/OrderSummary";
import { AgeCheck } from "../components/loot/AgeCheck";
import { LOOT_AGE_VERIFICATION, LOOT_BLOCKED_COUNTRIES } from "../constants";
import { BlockedCountry } from "../components/loot/BlockedCountry";
import { BannedUser } from "../components/loot/BannedUser";

const boxes: Box[] = require("../data/boxes.json");

export default function ItemsPage({ user }: PageProps) {
	const [activeBox, setActiveBox] = useState<Box>(boxes[0]);
	const [country, setCountry] = useState("");
	const [bannedUser, setBannedUser] = useState(false);
	const [checkAge, setCheckAge] = useState(false);
	const [boxCount, setBoxCount] = useState(1);

	const [finishedPayment, setFinishedPayment] = useState(false);
	const [paymentData, setPaymentData] = useState<{ id: string } | null>(null);
	const [discount, setDiscount] = useState(0); //props.discount && props.discount.percent * 100; TODO

	const setFinishState = ({
		finish,
	}: {
		finish: { success: boolean; data: any };
	}) => {
		setFinishedPayment(finish.success);
		setPaymentData(finish.data);
	};

	useEffect(() => {
		if (!boxCount) {
			setBoxCount(1);
		} else if (boxCount < 1) {
			setBoxCount(1);
		} else if (boxCount > 100) {
			setBoxCount(100);
		}
	}, [boxCount]);

	useEffect(() => {
		axios
			.all([axios("/api/country"), axios("/api/user/banned")])
			.then(
				axios.spread(async ({ data: { country } }, req3) => {
					setCountry(country);
					setBannedUser(req3.status === 403);
				})
			)
			.catch((e) => {
				console.error(e);
			});
	}, []);

	useEffect(() => {
		setBoxCount(1);
	}, [activeBox]);

	useEffect(() => {
		if (
			LOOT_AGE_VERIFICATION.includes(country) &&
			localStorage.getItem("verified_age") !== "verified"
		) {
			setCheckAge(true);
			localStorage.setItem("verified_age", "unverified");
		}
	}, [country]);

	const verifiedAge = () => {
		localStorage.setItem("verified_age", "verified");
		setCheckAge(false);
	};

	return (
		<Container title="Items" user={user}>
			<div className="my-40 flex flex-col space-y-16">
				{finishedPayment ? (
					<Success id={paymentData?.id} />
				) : checkAge ? (
					<AgeCheck checkAge={verifiedAge} />
				) : LOOT_BLOCKED_COUNTRIES.includes(country) ? (
					<BlockedCountry />
				) : !bannedUser ? (
					<BannedUser />
				) : (
					<>
						<div className="flex flex-col space-y-2">
							<div className="text-6xl font-bold font-montserrat text-dank-200 dark:text-white">
								Dank Memer Store
							</div>
							<div className="text-gray-400 max-w-4xl">
								Dank Memer Store Welcome to the lootbox shop!
								Here you can find a variety of different
								purchasable items that grant you a chance of
								winning something special!
							</div>
						</div>

						{/* TODO discount */}

						<div className="flex flex-col xl:flex-row justify-start xl:justify-between space-y-8 xl:space-y-0">
							{boxes.map((box, i) => (
								<Peepos key={i}>
									<BoxOption
										active={activeBox.id === i}
										data={box}
										setBoxCount={setBoxCount}
										boxCount={boxCount}
										setActiveBox={setActiveBox}
									/>
								</Peepos>
							))}
						</div>

						<div className="flex flex-col xl:flex-row space-y-8 xl:space-y-0">
							<div className="w-full xl:w-1/2">
								<PossibleItems activeBox={activeBox} />
							</div>
							<div className="flex-1 pl-0 xl:pl-20">
								<OrderSummary
									activeBox={activeBox}
									boxCount={boxCount}
									discount={discount}
									setFinishState={setFinishState}
									user={user!}
								/>
							</div>
						</div>
					</>
				)}
			</div>
		</Container>
	);
}

export const getServerSideProps: GetServerSideProps =
	withSession(unauthenticatedRoute);
