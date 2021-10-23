import {
	LOOT_FLAT_DISCOUNT_PERCENTAGE,
	LOOT_MINIMUM_DISCOUNT_VALUE,
} from "../constants";
import { Box } from "../types";

export const getSubtotal = (
	boxCount: number,
	activeBox: Box,
	returnRaw: boolean
) => {
	const raw = boxCount * activeBox.price;
	return returnRaw ? raw : raw.toFixed(2);
};

export const getDiscountPercent = (
	boxCount: number,
	activeBox: Box,
	discount: number
) => {
	const res: any = {}; // TODO
	const subtotal = getSubtotal(boxCount, activeBox, true) as number;
	let discountPercent = discount;
	const hypothetical =
		subtotal *
		((100 - (discountPercent + LOOT_FLAT_DISCOUNT_PERCENTAGE)) / 100);
	if (hypothetical >= LOOT_MINIMUM_DISCOUNT_VALUE) {
		discountPercent += LOOT_FLAT_DISCOUNT_PERCENTAGE;
		res.flat = true;
	} else {
		res.neededUntilFlat = LOOT_MINIMUM_DISCOUNT_VALUE - hypothetical;
	}
	res.discountPercent = discountPercent;
	return res;
};

export const getDiscount = (
	boxCount: number,
	activeBox: Box,
	discount: number,
	returnRaw: boolean = false
) => {
	const subtotal = getSubtotal(boxCount, activeBox, true) as number;
	const discountPercent = getDiscountPercent(boxCount, activeBox, discount);
	const raw =
		activeBox.id !== 0
			? subtotal * (discountPercent.discountPercent / 100)
			: 0;
	return returnRaw ? raw : raw.toFixed(2);
};

export const getDiscountedSubtotal = (
	boxCount: number,
	activeBox: Box,
	discount: number,
	returnRaw: boolean
) => {
	const raw =
		(getSubtotal(boxCount, activeBox, true) as number) -
		Number(getDiscount(boxCount, activeBox, discount));
	return returnRaw ? raw : parseFloat(raw.toFixed(2));
};

export const getSalesTax = (
	boxCount: number,
	activeBox: Box,
	discount: number
) => {
	return (
		(getDiscountedSubtotal(boxCount, activeBox, discount, true) as number) *
		0.0675
	).toFixed(2);
};

export const getTotal = (
	boxCount: number,
	activeBox: Box,
	discount: number
) => {
	return Math.round((boxCount * activeBox.price + Number.EPSILON) * 100) /
		100 <
		20
		? Math.round(
				(parseFloat(
					(
						getDiscountedSubtotal(
							boxCount,
							activeBox,
							discount,
							true
						) * 0.0675
					).toFixed(2)
				) +
					boxCount * activeBox.price +
					Number.EPSILON) *
					100
		  ) / 100
		: (
				Math.round(
					(parseFloat(
						(
							getDiscountedSubtotal(
								boxCount,
								activeBox,
								discount,
								true
							) * 0.0675
						).toFixed(2)
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
							getDiscountPercent(boxCount, activeBox, discount)
								.discountPercent / 100
						).toFixed(2)
					)
		  ).toFixed(2);
};
