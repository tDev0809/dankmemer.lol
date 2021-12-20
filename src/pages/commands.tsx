import clsx from "clsx";
import { GetServerSideProps } from "next";
import { useEffect, useState } from "react";
import { Ad } from "../components/Ad";
import Expandable from "../components/Expandable";
import Container from "../components/ui/Container";
import Dropdown from "../components/ui/Dropdown";
import Searchbox from "../components/ui/Searchbox";
import commandsData from "../data/commands.json";
import { PageProps } from "../types";
import { unauthenticatedRoute } from "../util/redirects";
import { withSession } from "../util/session";

interface Command {
	t: string[];
	u: string;
	d: string;
	p: string[];
	pS?: boolean;
	dO?: boolean;
}

export default function CommandsPage({ user }: PageProps) {
	const categories = Object.keys(commandsData);
	const [currentCategory, setCurrentCategory] = useState<string>(
		categories[0]
	);
	const [commands, setCommands] = useState<Command[]>();
	const [expandedIds, setExpandedIds] = useState<string[]>([]);
	const [search, setSearch] = useState("");

	const allCommands: Command[] = [];
	Object.values(commandsData).forEach((commands) =>
		allCommands.push(...commands)
	);

	useEffect(() => {
		setExpandedIds([]);
		setCommands(
			currentCategory.startsWith("all")
				? allCommands.filter(
						(command) =>
							command.t.some((x) =>
								x.includes(search.toLowerCase())
							) ||
							command.u.includes(search.toLowerCase()) ||
							command.d.includes(search.toLowerCase())
				  )
				: (commandsData as Record<string, Command[]>)[currentCategory]
		);
	}, [currentCategory]);

	useEffect(() => {
		setCurrentCategory(search.length > 0 ? `all-${search}` : categories[0]);
	}, [search]);

	return (
		<Container title="Commands" user={user}>
			<div className="mt-20">
				<Ad
					id="top"
					platform="mobile"
					sizes={[
						[320, 50],
						[300, 50],
						[300, 250],
					]}
				/>
				<Ad id="top" platform="desktop" sizes={[[728, 90]]} />
			</div>
			<div className="my-20 flex flex-col space-y-8 relative">
				<div>
					<div className="text-4xl font-bold font-montserrat text-dank-200 dark:text-white">
						COMMANDS
					</div>
					<svg
						className="absolute -top-8 -left-5 z-[-1] w-[130px]"
						viewBox="0 0 52 24"
						fill="#16c458"
					>
						<defs>
							<pattern
								id="dots"
								x="0"
								y="0"
								width=".15"
								height=".28"
							>
								<circle cx="1" cy="1" r="1"></circle>
							</pattern>
						</defs>
						<rect fill="url(#dots)" width="42" height="20"></rect>
					</svg>
					<div className="max-w-3xl text-lg  text-light-600 dark:text-light-300">
						Find all the information, including required
						permissions, regarding the extensive list of commands
						available to you with Dank Memer.
					</div>
				</div>
				<div className="flex items-center space-x-0 lg:space-x-4">
					<div className="hidden lg:flex space-x-6">
						{categories.map((category) => (
							<div
								className={clsx(
									"text-lg cursor-pointer",
									currentCategory == category
										? "text-dank-300"
										: "text-light-600 dark:text-light-300"
								)}
								onClick={() => setCurrentCategory(category)}
							>
								{category}
							</div>
						))}
					</div>
					<div className="visible lg:hidden">
						<Dropdown
							content={
								<div className="flex justify-between px-4 text-dark-100 dark:text-white p-2 w-40">
									<span>
										{currentCategory.startsWith("all")
											? "Search Results"
											: currentCategory}
									</span>
									<span className="material-icons">
										expand_more
									</span>
								</div>
							}
							options={categories.map((category) => ({
								label: category,
								onClick: () => {
									setCurrentCategory(category);
								},
							}))}
						/>
					</div>
					<div className="pl-4 lg:pl-0">
						<Searchbox
							placeholder="Search for a command"
							setSearch={setSearch}
						/>
					</div>
				</div>
				<div className="flex flex-col space-y-4 cursor-pointer">
					{commands?.map((command) => (
						<Expandable
							name={`${command.t[0]}${
								command.pS || command.dO ? " ⭐" : ""
							}`}
							description={command.d}
							fields={{
								Usage: command.u,
								Permissions: command.p
									.map((p) =>
										p
											.replace(/([A-Z])/g, " $1")
											.split(" ")
											.map(
												(a) =>
													a[0].toUpperCase() +
													a.substring(1).toLowerCase()
											)
											.join(" ")
									)
									.join(", "),
							}}
							setExpandedIds={setExpandedIds}
							expandedIds={expandedIds}
						/>
					))}
				</div>
				<Ad
					id="bottom"
					platform="mobile"
					sizes={[
						[320, 50],
						[300, 50],
						[300, 250],
					]}
				/>
				<Ad
					id="bottom"
					platform="desktop"
					sizes={[
						[728, 90],
						[970, 90],
						[970, 250],
					]}
				/>
			</div>
		</Container>
	);
}

export const getServerSideProps: GetServerSideProps =
	withSession(unauthenticatedRoute);
