import clsx from "clsx";
import { GetServerSideProps } from "next";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Title } from "../components/Title";
import Button from "../components/ui/Button";
import Container from "../components/ui/Container";
import { Item, PageProps } from "../types";
import createAd from "../util/createAd";
import { unauthenticatedRoute } from "../util/redirects";
import { withSession } from "../util/session";

const itemsData = require("../data/itemsData.json");

interface ItemBoxProps {
	side: string;
	trade: Trade;
	item: Item;
	update: (side: string, id: string, value: number) => void;
}

function ItemBox({ item, side, trade, update }: ItemBoxProps) {
	return (
		<div
			className={clsx(
				"bg-light-500 dark:bg-dark-100 w-32 h-24 flex items-center justify-center mb-4 p-2 rounded-md",
				trade[side].items[item.id] >= 1 && "border-2 border-dank-300"
			)}
		>
			<div className="flex flex-col items-center space-y-1">
				<img src={item.image} className="w-6 h-6" />
				<div className="text-xs text-center text-dark-400 dark:text-white">
					{item.name}
				</div>
				<div className="flex items-center justify-center text-dark-400 dark:text-white bg-gray-300 dark:bg-dark-300 text-sm">
					<div
						className="font-bold select-none px-1"
						onClick={(e) => {
							update(
								side,
								item.id,
								(trade[side].items[item.id] || 0) - 1
							);
							e.stopPropagation();
						}}
					>
						-
					</div>
					<input
						className="bg-transparent w-12 border-none text-center resize-none outline-none overflow-hidden"
						placeholder="Boxes"
						onChange={(e) =>
							update(side, item.id, parseFloat(e.target.value))
						}
						value={trade[side].items[item.id] || 0}
					/>
					<div
						className="font-bold select-none px-1"
						onClick={(e) => {
							update(
								side,
								item.id,
								(trade[side].items[item.id] || 0) + 1
							);
							e.stopPropagation();
						}}
					>
						+
					</div>
				</div>
			</div>
		</div>
	);
}

type Trade = Record<
	string,
	{
		coins: number;
		items: Record<Item["id"], number>;
	}
>;

export default function TradePage({ user }: PageProps) {
	const allItems = Object.values(itemsData as Record<Item["id"], Item>)
		.sort((a, z) => a.name.localeCompare(z.name))
		.filter((i) => !i.notSharable);
	const [items, setItems] = useState(allItems);
	const [trade, setTrade] = useState<Trade>({
		left: { coins: 0, items: {} },
		right: { coins: 0, items: {} },
	});
	const [command, setCommand] = useState("pls trade");
	const [error, setError] = useState("");

	const updateItem = (side: string, id: string, value: number) => {
		if (typeof value !== "number" || isNaN(value)) {
			value = 0;
		}
		value = Math.min(1e9, Math.max(0, value));

		const copy = { ...trade };

		copy[side].items[id] = value;

		Object.entries(copy).forEach(([side, trade]) =>
			Object.entries(trade.items).forEach(([id, number]) => {
				if (number == 0) {
					delete trade.items[id];
				}
			})
		);

		setTrade(copy);
	};

	const updateCoins = (side: string, coins: number) => {
		if (typeof coins !== "number" || isNaN(coins)) {
			coins = 0;
		}
		coins = Math.min(5e9, Math.max(0, coins));

		const copy = { ...trade };

		copy[side].coins = coins;

		setTrade(copy);
	};

	const resetTrade = () => {
		setTrade({
			left: { coins: 0, items: {} },
			right: { coins: 0, items: {} },
		});
	};

	useEffect(() => {
		let error = "";

		if (trade.left.coins > 0 && trade.right.coins > 0) {
			error = "Coins on both sides";
		}

		Object.entries(trade).forEach(([side, sideData]) => {
			if (
				(sideData.coins ? 1 : 0) + Object.keys(sideData.items).length >
				10
			) {
				error = `Too many values on the ${side} side.`;
			}

			Object.entries(sideData.items).forEach(([id, number]) => {
				if (
					Object.keys(
						trade[side == "left" ? "right" : "left"].items
					).find((i) => i == id)
				) {
					error = `'${itemsData[id].name}' item is on both sides.`;
				}
			});
		});

		const leftEmpty =
			!trade.left.coins && !Object.keys(trade.left.items).length;
		const righEmpty =
			!trade.right.coins && !Object.keys(trade.right.items).length;

		if (leftEmpty && righEmpty) {
			error = "Both sides are empty.";
		} else if (leftEmpty) {
			error = "Left side is empty.";
		} else if (righEmpty) {
			error = "Right side is empty.";
		}

		const generated = Object.values(trade)
			.map(
				(trade) =>
					Object.entries(trade.items)
						.map(([id, number]) => `${number} ${id}`)
						.join(" ") +
					(trade.coins > 0 ? ` ${trade.coins} coins` : "")
			)
			.join(", ");

		setCommand(`pls trade ${generated} @user`);
		setError(error);
	}, [trade]);

	useEffect(() => {
		createAd("nitropay-items-top", { sizes: [[728, 90]] }, "desktop");
		createAd(
			"nitropay-items-top",
			{
				sizes: [
					[320, 50],
					[300, 50],
					[300, 250],
				],
			},
			"mobile"
		);

		createAd(
			"nitropay-items-bottom",
			{
				sizes: [
					[728, 90],
					[970, 90],
					[970, 250],
				],
				renderVisibleOnly: true,
			},
			"desktop"
		);
		createAd(
			"nitropay-items-bottom",
			{
				sizes: [
					[320, 50],
					[300, 50],
					[300, 250],
				],
				renderVisibleOnly: true,
			},
			"mobile"
		);
	}, []);

	return (
		<Container title="Trade Generator" user={user}>
			<div id="nitropay-items-top" className="nitropay" />
			<div className="my-20 flex flex-col space-y-4">
				<div className="flex flex-col space-y-2">
					<Title size="big">Trade Generator</Title>
					<div className="flex flex-col space-y-8">
						<div>
							<div className="flex flex-col md:flex-row space-y-2 md:space-y-0 space-x-0 md:space-x-2 items-center">
								<div className="flex-1 w-full md:w-auto flex items-center pl-2 text-gray-900 dark:text-white bg-light-500 dark:bg-dark-100 h-9 rounded-md overflow-hidden whitespace-nowrap">
									{command}
								</div>
								<Button
									className=" w-full md:w-auto"
									variant="dark"
									onClick={() => {
										navigator.clipboard.writeText(
											command.replaceAll("@user", "@")
										);
										toast.dark("Copied!");
									}}
								>
									Copy
								</Button>
								<Button
									variant="dark"
									className=" w-full md:w-auto"
									onClick={() => resetTrade()}
								>
									Reset
								</Button>
							</div>
							{error.length > 0 ? (
								<div className="text-red-500">
									Invalid Trade: {error}
								</div>
							) : (
								<div className="block"></div>
							)}
						</div>

						<div className="flex space-x-12">
							{Object.keys(trade).map((side) => (
								<div className="flex flex-col space-y-4">
									<div className="-mb-4 text-lg font-bold font-montserrat text-dark-400 dark:text-white">
										{side == "left" ? "You" : "Someone"}
									</div>
									<textarea
										className={clsx(
											"w-full text-right bg-light-500 dark:bg-dark-100 px-2 py-1.5 outline-none text-black dark:text-light-300 text-sm h-8 overflow-hidden rounded-md placeholder-gray-500 resize-none",
											trade[side].coins > 0
												? "border-2 border-dank-300"
												: "border-2 border-white dark:border-dark-100 "
										)}
										maxLength={22}
										onChange={(e) =>
											updateCoins(
												side,
												parseInt(e.target.value)
											)
										}
										value={trade[side].coins}
										placeholder={""}
									/>

									<div className="flex flex-wrap items-center justify-between">
										{items.map((item) => (
											<ItemBox
												item={item}
												trade={trade}
												side={side}
												update={updateItem}
											/>
										))}
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
				<div id="nitropay-items-bottom" className="nitropay pt-8" />
			</div>
		</Container>
	);
}

export const getServerSideProps: GetServerSideProps =
	withSession(unauthenticatedRoute);
