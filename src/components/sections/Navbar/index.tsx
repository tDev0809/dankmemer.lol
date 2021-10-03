import styles from "./index.module.scss";
import Link from "next/link";

interface Props {}

export default function Navbar({}: Props) {
	return (
		<div className={styles["container"]}>
			<nav className={styles["desktop"]}>
				<div className={styles["desktop-left"]}>
					<Link href="/">
						<img src={"/img/memer.png"} alt="Logo" width="42" />
					</Link>
					<ul className={styles["desktop-left-links"]}>
						<li className={styles["desktop-left-links-link"]}>
							<Link href="/commands">Commands</Link>
						</li>
						<li className={styles["desktop-left-links-link"]}>
							<Link href="/faq">FAQ</Link>
						</li>
						<li className={styles["desktop-left-links-link"]}>
							<Link href="/blogs">Blog</Link>
						</li>
						{/* <li className={discount ? "desktop-nav-link discount" : "desktop-nav-link"}>
                                <Link href="/loot">Store</Link> {discount ? <span id="discount-countdown">SALE {discountCountdown}</span> : ''}
                            </li> */}
						<li className={styles["desktop-left-links-link"]}>
							<Link href="/items">Items</Link>
						</li>
						<li className={styles["desktop-left-links-link"]}>
							<Link href="/feedback">Feedback</Link>
						</li>
					</ul>
				</div>

				<div className={styles["desktop-right"]}>
					<Link href="https://discord.gg/meme">
						<a
							className={styles["desktop-right-link"]}
							rel="noreferrer noopener"
						>
							Support
						</a>
					</Link>
					{/* {!loggedIn ? (
						<a
							href={`/oauth/login?redirect=${window.location.pathname}`}
							rel="noreferrer noopener"
							className="desktop-nav-link highlight"
						>
							Login
						</a>
					) : (
						<div
							id="user-account"
							onClick={() => setDropdown(!dropdown)}
						>
							<img
								id="user-account-avatar"
								src={`https://cdn.discordapp.com/avatars/${id}/${avatar}`}
								alt="?"
								width="32"
							/>
							<p id="user-account-name">
								<span>{username}</span>
								<span className="material-icons">
									expand_more
								</span>
							</p>
							{dropdown ? (
								<div id="user-account-dropdown">
									<ul id="user-account-dropdown-content">
										{isModerator || isAdmin ? (
											<li className="dropdown-item">
												<Link
													to="/control"
													className="dropdown-link"
												>
													Control panel
												</Link>
											</li>
										) : (
											""
										)}
										<li className="dropdown-item">
											<Link
												to="/appeals"
												className="dropdown-link"
											>
												Appeal a ban
											</Link>
										</li>
										<li className="dropdown-item">
											<Link
												to="/reports"
												className="dropdown-link"
											>
												Report a user
											</Link>
										</li>
										<li className="dropdown-item">
											<a
												href="/oauth/logout"
												rel="noreferrer noopener"
												className="dropdown-link red"
											>
												Logout
											</a>
										</li>
									</ul>
								</div>
							) : (
								""
							)}
						</div>
					)} */}
				</div>
			</nav>
		</div>
	);
}
