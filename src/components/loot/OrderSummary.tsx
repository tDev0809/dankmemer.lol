import clsx from "clsx";
import { useState } from "react";
import { Box, User } from "../../types";
import Link from "next/link";
import {
	getDiscount,
	getDiscountPercent,
	getSalesTax,
	getTotal,
} from "../../util/loot";
import { LOOT_MINIMUM_PURCHASE_VALUE } from "../../constants";
import PaypalButton from "../PayPalButton";

interface Props {
	boxCount: number;
	activeBox: Box;
	discount: number;
	user: User;
	setFinishState: ({
		finish,
	}: {
		finish: { success: boolean; data: any };
	}) => void;
}

export function OrderSummary({
	boxCount,
	activeBox,
	discount,
	user,
	setFinishState,
}: Props) {
	const [agreedTOS, setAgreedTOS] = useState(false);
	const [isGift, setIsGift] = useState(false);
	const [giftRecipient, setGiftRecipient] = useState("");

	const validGift = () => {
		return (
			parseFloat(giftRecipient) &&
			giftRecipient.length > 16 &&
			giftRecipient.length < 21
		);
	};

	return (
		<div className="flex flex-col space-y-10">
			<div>
				<div className="text-xl font-bold text-dark-400 dark:text-white">
					Order summary
				</div>
				<div className="text-gray-400">
					All orders are processed via PayPal and will operate using
					the United States Dollar. Each order has a minimum charge
					amount of $3 where you will need to fulfill this amount to
					continue. Orders over $20 will receive a 10% discount.
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
							(boxCount * activeBox.price + Number.EPSILON) * 100
						) / 100}
					</div>
				</div>
				<div className="flex justify-between">
					<div>Added sales tax</div>
					<div>${getSalesTax(boxCount, activeBox, discount)}</div>
				</div>
				<div className="flex justify-between mt-12 border-b-2 border-gray-800">
					<div>Discount</div>
					<div>
						{getDiscountPercent(boxCount, activeBox, discount)
							.discountPercent || 0}
						% ($
						{getDiscount(boxCount, activeBox, discount)})
					</div>
				</div>
				<div className="flex justify-end font-bold text-xl font-montserrat">
					Total: ${getTotal(boxCount, activeBox, discount)}
				</div>
				<div className="mt-2 flex flex-col space-y-2">
					<div
						className="flex space-x-2 text-sm items-center"
						onClick={() => setAgreedTOS(!agreedTOS)}
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
								<span className="material-icons">done</span>
							)}
						</div>
						<label htmlFor="tos-privacy">
							I agree to Dank Memer’s{" "}
							<Link href="/terms">
								<a target="_blank" className="text-dank-300">
									Terms of Service
								</a>
							</Link>{" "}
							and{" "}
							<Link href="/refunds">
								<a target="_blank" className="text-dank-300">
									Refund Policy
								</a>
							</Link>
							.
						</label>
					</div>
					<div
						className="flex space-x-2 text-sm items-center"
						onClick={() => setIsGift(!isGift)}
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
								<span className="material-icons">done</span>
							)}
						</div>
						<label htmlFor="gift-purchase">
							Th
							{boxCount === 1
								? "is box is"
								: "ese boxes are"}{" "}
							being purchased as a gift.
						</label>
						<br />
					</div>
					{isGift && (
						<div className="flex space-x-2 items-center">
							<textarea
								className="w-48 bg-gray-100 dark:bg-dank-500 px-2 py-1 outline-none text-black dark:text-light-300 text-sm h-8 overflow-hidden rounded-md placeholder-gray-500 resize-none"
								maxLength={26}
								onChange={(e) =>
									setGiftRecipient(e.target.value)
								}
								value={giftRecipient}
								placeholder={""}
							/>
							<div>Gift recipient's user ID.</div>
						</div>
					)}
					{Math.round(
						(boxCount * activeBox.price + Number.EPSILON) * 100
					) /
						100 <
					LOOT_MINIMUM_PURCHASE_VALUE ? (
						<div className="text-red-500">
							<div>Insufficient purchase amount.</div>
							<div>
								Your order does not meet the minimum required
								value of ${LOOT_MINIMUM_PURCHASE_VALUE}
							</div>
						</div>
					) : (
						""
					)}
					{Math.round(
						(boxCount * activeBox.price + Number.EPSILON) * 100
					) /
						100 >=
						LOOT_MINIMUM_PURCHASE_VALUE &&
					isGift &&
					!validGift() ? (
						<div className="text-red-500">
							<div>The ID provided is invalid.</div>
							<div>
								If you are unsure, you can find how to get an
								user ID{" "}
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
							(boxCount * activeBox.price + Number.EPSILON) * 100
						) /
							100 >=
							LOOT_MINIMUM_PURCHASE_VALUE ? (
							<div>
								<PaypalButton
									activeBox={activeBox}
									boxCount={boxCount}
									giftState={giftRecipient}
									user={user}
									discount={discount}
									setFinishState={setFinishState}
								/>
								<div>
									You are still able to use your credit/debit
									card without signing in through PayPal.
									Scroll down in the popup window.
								</div>
							</div>
						) : !user ? (
							<div id="store-summary-actions">
								<p id="store-summary-actions-message">
									Before you purchase your{" "}
									<span className="underline">shiny</span> new
									boxes you need to login to Discord.
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
						(boxCount * activeBox.price + Number.EPSILON) * 100
					) /
						100 >=
						LOOT_MINIMUM_PURCHASE_VALUE ? (
						<div id="store-summary-actions">
							<PaypalButton
								activeBox={activeBox}
								boxCount={boxCount}
								giftState={""}
								user={user}
								discount={discount}
								setFinishState={setFinishState}
							/>
							<p>
								You are still able to use your credit/debit card
								without signing in through PayPal. Scroll down
								in the popup window.
							</p>
						</div>
					) : !isGift && !user ? (
						<div id="store-summary-actions">
							<p id="store-summary-actions-message">
								Before you purchase your{" "}
								<span className="underline">shiny</span> new
								boxes you need to login to Discord.
							</p>
						</div>
					) : (
						""
					)}
				</div>
			</div>
		</div>
	);
}
