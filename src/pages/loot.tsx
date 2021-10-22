import axios from "axios";
import clsx from "clsx";
import { GetServerSideProps } from "next";
import { useEffect, useState } from "react";
import Container from "../components/ui/Container";
import { Box, PageProps } from "../types";
import { unauthenticatedRoute } from "../util/redirects";
import { withSession } from "../util/session";
import Link from "next/link";
import { Peepos } from "../components/loot/Peepos";
import PaypalButton from "../components/PayPalButton";
import { Success } from "../components/loot/Success";
import { ItemsTable } from "../components/loot/ItemsTable";
import { BoxOption } from "../components/loot/BoxOption";

const lootData = require("../data/boxes.json");
const boxes: Box[] = lootData.boxes;

export default function ItemsPage({ user }: PageProps) {
	const [activeBox, setActiveBox] = useState<Box>(boxes[0]);
	const [constants, setConstants] = useState(lootData.Constants);
	const [country, setCountry] = useState("");
	const [bannedUser, setBannedUser] = useState(false);
	const [checkAge, setCheckAge] = useState(false);
	const [boxCount, setBoxCount] = useState(1);
	const [agreedTOS, setAgreedTOS] = useState(false);
	const [isGift, setIsGift] = useState(false);
	const [giftRecipient, setGiftRecipient] = useState("");
	const [finishedPayment, setFinishedPayment] = useState(false);
	const [paymentData, setPaymentData] = useState<{ id: string } | null>(null);

	const getSubtotal = (returnRaw: boolean) => {
		const raw = boxCount * activeBox.price;
		return returnRaw ? raw : raw.toFixed(2);
	};

	const getDiscountPercent = () => {
		const res: any = {}; // TODO
		const subtotal = getSubtotal(true) as number;
		let discountPercent = 0; //props.discount && props.discount.percent * 100; TODO
		const hypothetical =
			subtotal *
			((100 - (discountPercent + constants.FLAT_DISCOUNT_PERCENTAGE)) /
				100);
		if (hypothetical >= constants.MINIMUM_DISCOUNT_VALUE) {
			discountPercent += constants.FLAT_DISCOUNT_PERCENTAGE;
			res.flat = true;
		} else {
			res.neededUntilFlat =
				constants.MINIMUM_DISCOUNT_VALUE - hypothetical;
		}

		res.discountPercent = discountPercent;
		return res;
	};

	const getDiscount = (returnRaw: boolean = false) => {
		const subtotal = getSubtotal(true) as number;
		const discountPercent = getDiscountPercent();
		const raw =
			activeBox.id !== 0
				? subtotal * (discountPercent.discountPercent / 100)
				: 0;
		return returnRaw ? raw : raw.toFixed(2);
	};

	const getDiscountedSubtotal = (returnRaw: boolean) => {
		const raw = (getSubtotal(true) as number) - Number(getDiscount());
		return returnRaw ? raw : parseFloat(raw.toFixed(2));
	};

	const calculateTotal = () => {
		return Math.round((boxCount * activeBox.price + Number.EPSILON) * 100) /
			100 <
			20
			? Math.round(
					(parseFloat(
						(getDiscountedSubtotal(true) * 0.0675).toFixed(2)
					) +
						boxCount * activeBox.price +
						Number.EPSILON) *
						100
			  ) / 100
			: (
					Math.round(
						(parseFloat(
							(getDiscountedSubtotal(true) * 0.0675).toFixed(2)
						) +
							boxCount * activeBox.price +
							Number.EPSILON) *
							100
					) /
						100 -
					boxCount *
						activeBox.price *
						parseFloat(
							(
								getDiscountPercent().discountPercent / 100
							).toFixed(2)
						)
			  ).toFixed(2);
	};

	const validGift = () => {
		return (
			parseFloat(giftRecipient) &&
			giftRecipient.length > 16 &&
			giftRecipient.length < 21
		);
	};

	const finishState = ({
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
			["ES", "BE", "NL"].includes(country) &&
			!localStorage.getItem("verified_age")
		) {
			if (localStorage.getItem("verified_age") !== "verified") {
				setCheckAge(true);
				localStorage.setItem("verified_age", "unverified");
			}
		}
	}, [country]);

	return (
		<Container title="Items" user={user}>
			<div className="max-w-4xl xl:max-w-6xl 2xl:max-w-7xl mx-8 lg:mx-auto relative">
				<div className="my-40 flex flex-col space-y-16">
					{finishedPayment ? (
						<Success id={paymentData?.id} />
					) : (
						<>
							<div className="flex flex-col space-y-2">
								<div className="text-6xl font-bold font-montserrat text-dank-200 dark:text-white">
									Dank Memer Store
								</div>
								<div className="text-gray-400 max-w-4xl">
									Dank Memer Store Welcome to the lootbox
									shop! Here you can find a variety of
									different purchasable items that grant you a
									chance of winning something special!
								</div>
							</div>
							{/* discount */}
							<div className="flex justify-between">
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
							<div className="flex">
								<div className="w-1/2">
									<div className="flex flex-col space-y-10">
										<div>
											<div className="text-xl font-bold text-dark-400 dark:text-white">
												Possible items
											</div>
											<div className="text-gray-400">
												Below includes a list of all the
												goodies and the maximum amount
												of items you could receive from
												the purchase of a{" "}
												<span className="text-dank-300">
													{activeBox.name}
												</span>
												! Along with these items, you
												have the chance of getting
												anywhere in the range of{" "}
												<span className="text-dank-300">
													⏣ {activeBox.yield}
												</span>
												.
											</div>
										</div>
										<ItemsTable activeBox={activeBox} />
									</div>
								</div>
								<div className="flex-1 pl-20">
									<div className="flex flex-col space-y-10">
										<div>
											<div className="text-xl font-bold text-dark-400 dark:text-white">
												Order summary
											</div>
											<div className="text-gray-400">
												All orders are processed via
												PayPal and will operate using
												the United States Dollar. Each
												order has a minimum charge
												amount of $3 where you will need
												to fulfill this amount to
												continue. Orders over $20 will
												receive a 10% discount.
											</div>
										</div>
										<div className="text-dark-400 dark:text-white">
											<div className="flex justify-between">
												<div>
													{boxCount}x {activeBox.name}
												</div>
												<div>
													$
													{Math.round(
														(boxCount *
															activeBox.price +
															Number.EPSILON) *
															100
													) / 100}
												</div>
											</div>
											<div className="flex justify-between">
												<div>Added sales tax</div>
												<div>
													$
													{constants
														? (
																(getDiscountedSubtotal(
																	true
																) as number) *
																0.0675
														  ).toFixed(2)
														: ""}
												</div>
											</div>
											<div className="flex justify-between mt-12 border-b-2 border-gray-800">
												<div>Discount</div>
												<div>
													{getDiscountPercent()
														.discountPercent || 0}
													% (${getDiscount()})
												</div>
											</div>
											<div className="flex justify-end font-bold text-xl font-montserrat">
												Total: ${calculateTotal()}
											</div>
											<div className="mt-2 flex flex-col space-y-2">
												<div
													className="flex space-x-2 text-sm items-center"
													onClick={() =>
														setAgreedTOS(!agreedTOS)
													}
												>
													<div
														className={clsx(
															"w-6 h-6 flex items-center justify-center rounded-md cursor-pointer",
															agreedTOS
																? "bg-dank-300"
																: "bg-gray-300 dark:bg-dank-500"
														)}
													>
														{agreedTOS && (
															<span className="material-icons">
																done
															</span>
														)}
													</div>
													<label htmlFor="tos-privacy">
														I agree to Dank Memer’s{" "}
														<Link href="/terms">
															<a
																target="_blank"
																className="text-dank-300"
															>
																Terms of Service
															</a>
														</Link>{" "}
														and{" "}
														<Link href="/refunds">
															<a
																target="_blank"
																className="text-dank-300"
															>
																Refund Policy
															</a>
														</Link>
														.
													</label>
												</div>
												<div
													className="flex space-x-2 text-sm items-center"
													onClick={() =>
														setIsGift(!isGift)
													}
												>
													<div
														className={clsx(
															"w-6 h-6 flex items-center justify-center rounded-md cursor-pointer",
															isGift
																? "bg-dank-300"
																: "bg-gray-300 dark:bg-dank-500"
														)}
													>
														{isGift && (
															<span className="material-icons">
																done
															</span>
														)}
													</div>
													<label htmlFor="gift-purchase">
														Th
														{boxCount === 1
															? "is box is"
															: "ese boxes are"}{" "}
														being purchased as a
														gift.
													</label>
													<br />
												</div>
												{isGift && (
													<div className="flex space-x-2 items-center">
														<textarea
															className="w-48 bg-gray-100 dark:bg-dank-500 px-2 py-1 outline-none text-black dark:text-light-300 text-sm h-8 overflow-hidden rounded-md placeholder-gray-500 resize-none"
															maxLength={26}
															onChange={(e) =>
																setGiftRecipient(
																	e.target
																		.value
																)
															}
															value={
																giftRecipient
															}
															placeholder={""}
														/>
														<div>
															Gift recipient's
															user ID.
														</div>
													</div>
												)}
												{Math.round(
													(boxCount *
														activeBox.price +
														Number.EPSILON) *
														100
												) /
													100 <
												constants.MINIMUM_PURCHASE_VALUE ? (
													<div className="text-red-500">
														<div>
															Insufficient
															purchase amount.
														</div>
														<div>
															Your order does not
															meet the minimum
															required value of $
															{
																constants.MINIMUM_PURCHASE_VALUE
															}
														</div>
													</div>
												) : (
													""
												)}
												{Math.round(
													(boxCount *
														activeBox.price +
														Number.EPSILON) *
														100
												) /
													100 >=
													constants.MINIMUM_PURCHASE_VALUE &&
												isGift &&
												!validGift() ? (
													<div className="text-red-500">
														<div>
															The ID provided is
															invalid.
														</div>
														<div>
															If you are unsure,
															you can find how to
															get an user ID{" "}
															<a
																href="https://support.discord.com/hc/en-us/articles/206346498-Where-can-I-find-my-User-Server-Message-ID"
																rel="noreferrer noopener"
																className="underline"
																target="_blank"
															>
																here
															</a>
															.
														</div>
													</div>
												) : (
													""
												)}
												{isGift ? (
													validGift() &&
													agreedTOS &&
													user &&
													activeBox.price !== 0 &&
													Math.round(
														(boxCount *
															activeBox.price +
															Number.EPSILON) *
															100
													) /
														100 >=
														constants.MINIMUM_PURCHASE_VALUE ? (
														<div>
															<PaypalButton
																constants={
																	constants
																}
																activeBox={
																	activeBox
																}
																boxCount={
																	boxCount
																}
																giftState={
																	giftRecipient
																}
																user={user}
																discount={
																	// (props.discount &&
																	// 	props.discount
																	// 		.percent *
																	// 		100) ||
																	// 0
																	0
																}
																setFinishState={
																	finishState
																}
															/>
															<div>
																You are still
																able to use your
																credit/debit
																card without
																signing in
																through PayPal.
																Scroll down in
																the popup
																window.
															</div>
														</div>
													) : !user ? (
														<div id="store-summary-actions">
															<p id="store-summary-actions-message">
																Before you
																purchase your{" "}
																<span className="underline">
																	shiny
																</span>{" "}
																new boxes you
																need to login to
																Discord.
															</p>
														</div>
													) : (
														""
													)
												) : (
													""
												)}
												{!isGift &&
												agreedTOS &&
												user &&
												activeBox.price !== 0 &&
												Math.round(
													(boxCount *
														activeBox.price +
														Number.EPSILON) *
														100
												) /
													100 >=
													constants.MINIMUM_PURCHASE_VALUE ? (
													<div id="store-summary-actions">
														<PaypalButton
															constants={
																constants
															}
															activeBox={
																activeBox
															}
															boxCount={boxCount}
															giftState={""}
															user={user}
															discount={
																// (props.discount &&
																// 	props.discount
																// 		.percent *
																// 		100) ||
																0
															}
															setFinishState={
																finishState
															}
														/>
														<p>
															You are still able
															to use your
															credit/debit card
															without signing in
															through PayPal.
															Scroll down in the
															popup window.
														</p>
													</div>
												) : !isGift && !user ? (
													<div id="store-summary-actions">
														<p id="store-summary-actions-message">
															Before you purchase
															your{" "}
															<span className="underline">
																shiny
															</span>{" "}
															new boxes you need
															to login to Discord.
														</p>
													</div>
												) : (
													""
												)}
											</div>
										</div>
									</div>
								</div>
							</div>
						</>
					)}
				</div>
			</div>
		</Container>
	);
}

export const getServerSideProps: GetServerSideProps =
	withSession(unauthenticatedRoute);
