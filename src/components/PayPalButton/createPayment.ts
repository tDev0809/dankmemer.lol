import { Box } from "../../types";

export default function createPayment({
	total,
	subtotal,
	discount,
	token,
	activeBox,
	boxCount,
	giftUserID,
	salesTax,
}: {
	total: number;
	subtotal: number;
	discount: number;
	token: string;
	activeBox: Box;
	boxCount: number;
	salesTax: string;
	giftUserID?: string;
}) {
	return {
		intent: "CAPTURE",
		purchase_units: [
			{
				amount: {
					value: (Number(total) + Number(salesTax)).toFixed(2),
					currency_code: "USD",
					breakdown: {
						item_total: {
							currency_code: "USD",
							value: (
								Number(subtotal) + Number(salesTax)
							).toFixed(2),
						},
						shipping_discount: {
							currency_code: "USD",
							value: discount.toFixed(2),
						},
					},
				},
				description: "Dank Memer Lootbox Purchase",
				custom_id: `${token}${giftUserID ? `:${giftUserID}` : ""}`,
				soft_descriptor: "Dank Memer's Box Shop",
				items: [
					{
						name: activeBox.name,
						unit_amount: {
							currency_code: "USD",
							value: activeBox.price.toFixed(2),
						},
						quantity: boxCount.toString(),
						category: "DIGITAL_GOODS",
					},
					{
						name: "Sales tax",
						unit_amount: {
							currency_code: "USD",
							value: salesTax,
						},
						quantity: "1",
						category: "DIGITAL_GOODS",
					},
				],
			},
		],
		application_context: {
			brand_name: "Dank Memer's Box Shop",
			shipping_preference: "NO_SHIPPING",
			user_action: "PAY_NOW",
		},
	};
}
