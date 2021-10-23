import React from "react";
import createPayment from "./createPayment";
import { PayPalButton } from "react-paypal-button-v2";
import { Box, User } from "../../types";
import {
	getDiscount,
	getDiscountedSubtotal,
	getSubtotal,
} from "../../util/loot";

const paypalKeys = require("../../data/paypal.json");

interface Props {
	activeBox: Box;
	boxCount: number;
	giftState: string;
	discount: number;
	user: User;
	setFinishState: ({}: any) => void;
}

export default function PaypalButton({
	activeBox,
	boxCount,
	giftState,
	discount,
	user,
	setFinishState,
}: Props) {
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
					total: getDiscountedSubtotal(
						boxCount,
						activeBox,
						discount,
						true
					) as number,
					subtotal: getSubtotal(boxCount, activeBox, true) as number,
					discount: getDiscount(
						boxCount,
						activeBox,
						discount,
						true
					) as number,
					token: user.token,
					activeBox: activeBox,
					boxCount: boxCount,
					salesTax: (
						getDiscountedSubtotal(
							boxCount,
							activeBox,
							discount,
							true
						) * 0.0675
					).toFixed(2),
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
