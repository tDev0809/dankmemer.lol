import React from "react";
import createPayment from "./createPayment";
import { PayPalButton } from "react-paypal-button-v2";
import { Box, User } from "../../types";

const paypalKeys = require("../../data/paypal.json");

interface Props {
	constants: Record<string, number>;
	activeBox: Box;
	boxCount: number;
	giftState: string;
	discount: number;
	user: User;
	setFinishState: ({}: any) => void;
}

export default function PaypalButton({
	constants,
	activeBox,
	boxCount,
	giftState,
	discount,
	user,
	setFinishState,
}: Props) {
	const getSubtotal = (returnRaw: boolean) => {
		const raw = boxCount * activeBox.price;
		return returnRaw ? raw : raw.toFixed(2);
	};

	const getDiscountPercent = () => {
		const res: any = {}; // TODO
		const subtotal = getSubtotal(true) as number;
		let discountPercent = discount;
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

	const onApprove = (actions: any) => {
		return actions.order
			.capture()
			.then((data: any) => {
				setFinishState({
					finish: {
						success: true,
						data,
					},
				});
			})
			.catch((err: any) => {
				setFinishState({
					finish: {
						success: false,
						data: err,
					},
				});
			});
	};

	return (
		<PayPalButton
			options={{ clientId: paypalKeys[process.env.NODE_ENV] }}
			style={{
				height: 50,
				fontFamily: "'Inter', sans-serif",
				layout: "horizontal",
			}}
			createOrder={(_: any, actions: any) => {
				const p = createPayment({
					total: getDiscountedSubtotal(true) as number,
					subtotal: getSubtotal(true) as number,
					discount: getDiscount(true) as number,
					token: user.token,
					activeBox: activeBox,
					boxCount: boxCount,
					salesTax: (getDiscountedSubtotal(true) * 0.0675).toFixed(2),
					...(giftState === ""
						? {}
						: {
								giftUserID: giftState,
						  }),
				});

				return actions.order.create(p);
			}}
			onApprove={(_: any, actions: any) => onApprove(actions)}
		/>
	);
}
