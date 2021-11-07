import clsx from "clsx";
import { GetServerSideProps } from "next";
import { useEffect, useState } from "react";
import Container from "../components/ui/Container";
import Dropdown from "../components/ui/Dropdown";
import Searchbox from "../components/ui/Searchbox";
import { Item, PageProps } from "../types";
import { unauthenticatedRoute } from "../util/redirects";
import { withSession } from "../util/session";
import MarkdownIt from "markdown-it";
import createAd from "../util/createAd";

const itemsData = require("../data/itemsData.json");

export default function ItemsPage({ user }: PageProps) {
	const [search, setSearch] = useState("");
	const [item, setItem] = useState<Item["id"]>("aplus");
	const [itemData, setItemData] = useState<Item>(itemsData[item]);
	const [category, setCategory] = useState("");

	const mdParser = new MarkdownIt();

	const categories = [
		...new Set(
			Object.values(itemsData as Record<Item["id"], Item>).map(
				({ type }) => type
			)
		),
	];
	const allItems = Object.values(itemsData as Record<Item["id"], Item>).sort(
		(a, z) => a.name.localeCompare(z.name)
	);
	const [items, setItems] = useState(allItems);

	const buyPrice = () =>
		!itemData.showInShop
			? "Not Buyable"
			: "⏣ " + Math.ceil(itemData.cost).toLocaleString();

	const sellPrice = () =>
		itemData.type.toLowerCase() === "collectable"
			? "Not Sellable"
			: itemData.type.toLowerCase() === "loot box"
			? "⏣ " + itemData.cost.toLocaleString()
			: itemData.type.toLowerCase() === "tool" ||
			  itemData.type.toLowerCase() === "power-up" ||
			  itemData.type.toLowerCase() === "item pack"
			? "⏣ " + Math.ceil(itemData.cost / 10).toLocaleString()
			: "⏣ " + Math.ceil(itemData.cost).toLocaleString();

	useEffect(() => {
		setItemData(itemsData[item]);
		window.scrollTo({
			top: 0,
			left: 0,
			behavior: "smooth",
		});
	}, [item]);

	useEffect(() => {
		if (category === "") {
			setItems([...allItems]);
		} else {
			setItems([...allItems].filter((i) => i.type === category));
		}
	}, [category]);

	useEffect(() => {
		setCategory("");
		setItems(
			[...allItems].filter((i) =>
				i.name.toLowerCase().includes(search.toLowerCase())
			)
		);
	}, [search]);

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
		<Container title="Items" user={user}>
			<div id="nitropay-items-top" className="nitropay" />
			<div className="my-20 flex flex-col space-y-4">
				<div className="flex flex-col space-y-2">
					<div className="text-4xl font-bold font-montserrat text-dank-200 dark:text-white">
						Items directory
					</div>
					<div className="flex xl:space-x-2 items-center">
						<div className="text-md hidden xl:flex space-x-2 text-light-600 dark:text-light-300 ">
							{categories.map((ccategory) => (
								<div
									className={clsx(
										"bg-light-500 dark:bg-dark-100 px-4 py-1 rounded-md border-2 cursor-pointer text-dark-400 dark:text-white",
										ccategory === category
											? "border-dank-300"
											: "border-light-500 dark:border-dark-100"
									)}
									onClick={() =>
										setCategory(
											ccategory === category
												? ""
												: ccategory
										)
									}
								>
									{ccategory}
								</div>
							))}
						</div>
						<div className="inline-block xl:hidden">
							<Dropdown
								content={
									<div className="flex justify-between w-full px-4 text-dark-100 dark:text-white">
										<span>
											{category == "" ? "All" : category}
										</span>
										<span className="material-icons">
											expand_more
										</span>
									</div>
								}
								variant="wide"
							>
								<div className="mt-2 rounded-md bg-light-500 dark:bg-dark-100 text-dark-100 dark:text-white">
									{categories.map((ccategory) => (
										<div
											className={clsx(
												"cursor-pointer py-1 px-2 hover:bg-light-200 dark:hover:bg-dark-200"
											)}
											onClick={() => {
												setCategory(ccategory);
											}}
										>
											{ccategory}
										</div>
									))}
								</div>
							</Dropdown>
						</div>
						<div className="ml-2 xl:ml-0">
							<Searchbox
								placeholder="Search for an item"
								setSearch={setSearch}
							/>
						</div>
					</div>
				</div>
				<div className="flex justify-between space-x-0 lg:space-x-8 relative flex-col-reverse lg:flex-row">
					<div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-7 gap-4 content-start mt-4 lg:mt-0">
						{items.map((citem) => (
							<div
								className={clsx(
									"max-h-24 w-24 h-24 flex items-center justify-center rounded-md cursor-pointer bg-light-500  dark:bg-dark-100 border-4",
									item == citem.id
										? "border-dank-300"
										: "border-light-500 dark:border-dark-100"
								)}
								onClick={() => setItem(citem.id as Item["id"])}
							>
								<img src={citem.image} className="w-12" />
							</div>
						))}
					</div>
					<div className="flex-1 h-full rounded-md p-8 lg:max-w-xl sticky top-0 align-top bg-light-500 dark:bg-dark-100">
						<div className="flex flex-col items-center space-y-20">
							<div className="flex flex-col items-center space-y-2">
								<img src={itemData.image} className="w-20" />
								<div className="text-3xl text-center font-bold font-montserrat text-dark-400 dark:text-white">
									{itemData.name}
								</div>
								<div className="text-gray-600 dark:text-gray-400">
									Type: {itemData.type}
								</div>
								<div
									className="text-center leading-5 text-dark-400 dark:text-gray-200"
									dangerouslySetInnerHTML={{
										__html: mdParser.renderInline(
											itemData.longdescription ||
												itemData.description
										),
									}}
								></div>
							</div>
							{itemData.effects && (
								<div className="flex flex-col items-center text-dark-400 dark:text-white">
									<div className="text-lg font-bold ">
										Effects
									</div>
									<div className="text-center">
										{itemData.effects}
									</div>
								</div>
							)}
							{itemData.items && (
								<div className="flex flex-col items-center">
									<div className="text-lg font-bold text-dark-400 dark:text-white">
										Items Inside
									</div>
									<div className="grid gap-2 grid-cols-6">
										{itemData.items.map((i) => (
											<div
												className="flex items-center justify-center p-2 bg-gray-300 dark:bg-dank-400 rounded-md cursor-pointer"
												onClick={() => setItem(i)}
											>
												<img
													src={itemsData[i].image}
													className="w-6"
												/>
											</div>
										))}
									</div>
								</div>
							)}
							{itemData.reward?.items && (
								<div className="flex flex-col items-center">
									<div className="text-lg font-bold text-dark-400 dark:text-white">
										Possible Items
									</div>
									<div className="grid gap-2 grid-cols-6">
										{itemData.reward.items
											.map((a) => Object.keys(a)[0])
											.map((i) => (
												<div
													className="flex items-center justify-center p-2 bg-gray-300 dark:bg-dank-400 rounded-md cursor-pointer"
													onClick={() => setItem(i)}
												>
													<img
														src={itemsData[i].image}
														className="w-6"
													/>
												</div>
											))}
									</div>
								</div>
							)}
							<div className="flex justify-between w-2/3 flex-col sm:flex-row">
								<div className="flex flex-col items-center">
									<div className="text-lg font-bold font-montserrat text-dark-400 dark:text-white">
										Buy Price
									</div>
									<div className="text-sm text-dank-300">
										{buyPrice()}
									</div>
								</div>
								<div className="flex flex-col items-center">
									<div className="text-lg font-bold font-montserrat text-dark-400 dark:text-white">
										Sell Price
									</div>
									<div className="text-sm text-dank-300">
										{sellPrice()}
									</div>
								</div>
							</div>
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
