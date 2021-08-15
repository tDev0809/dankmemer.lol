import React, { useEffect, useState, useRef } from 'react';
import itemsFile from './data/items.json';
import createAd from '../../util/createAd';
import MarkdownIt from 'markdown-it';

import 'assets/styles/pages/info/items.scss';

export default function Items() {
	// Set the categories variable as an array of the type field from items.json,
	// uses a set to ensure that it they're unique categories
	const categories = useRef([...new Set(Object.values(itemsFile).map(({ type }) => type))]);
	const items = useRef(Object.values(itemsFile).sort((a, b) => a.name.localeCompare(b.name)));
	const [category, setCategory] = useState(null);
	const [viewable, setViewable] = useState(items.current);
	const [selectedItem, setSelectedItem] = useState(items.current[0]);
	const [rewards, setRewards] = useState([]);
	const [search, setSearch] = useState('');

	const [filterDropdown, setFilterDropdown] = useState(document.documentElement.clientWidth <= 1053);
	const [dropdownActive, setDropdownActive] = useState(false);

	const [mobileInfo, setMobileInfo] = useState(document.documentElement.clientWidth <= 575);
	const [mobileInfoPos, setMobileInfoPos] = useState(0);

	const mdParser = new MarkdownIt();

	useEffect(() => {
		if(document.documentElement.clientWidth <= 575) setSelectedItem({ name: "Odd eye" });
		window.addEventListener('resize', () => {
			if(document.documentElement.clientWidth <= 1053) {
				setFilterDropdown(true);
			} else {
				setFilterDropdown(false);
			}
			if(document.documentElement.clientWidth <= 575) {
				setMobileInfo(true);
			} else {
				setMobileInfo(false);
			}
		});

		createAd('nitropay-items-top', { sizes: [ [728, 90] ] }, 'desktop');
		createAd('nitropay-items-top', { sizes: [
			[320, 50],
			[300, 50],
			[300, 250]
		] }, 'mobile');

		createAd('nitropay-items-bottom', {
			sizes: [
				[728, 90],
				[970, 90],
				[970, 250]
			],
			renderVisibleOnly: true
		}, 'desktop');
		createAd('nitropay-items-bottom', {
			sizes: [
				[320, 50],
				[300, 50],
				[300, 250]
			],
			renderVisibleOnly: true
		}, 'mobile');
		
		return () => {
			window.removeEventListener('resize', (e) => {
				if(document.documentElement.clientWidth <= 1053) {
					setFilterDropdown(true);
				} else {
					setFilterDropdown(false);
				}
				if(document.documentElement.clientWidth <= 575) {
					setMobileInfo(true);
				} else {
					setMobileInfo(false);
				}
			});
		}
	}, []);

	useEffect(() => {
		if(document.querySelectorAll(".item-container.active")[0]) setMobileInfoPos(Math.floor(document.querySelectorAll(".item-container.active")[0].getBoundingClientRect().top + document.documentElement.scrollTop));
		if(selectedItem.reward) {
			const _rewards = [];
			selectedItem.reward.items.forEach(reward => {
				reward = Object.keys(reward)[0];
				items.current.map((item) => {
					if(item.id === reward) return _rewards.push(item);
				})
			});
			setRewards(_rewards);
		} else if(selectedItem.items) {
			const _rewards = [];
			selectedItem.items.forEach(reward => {
				items.current.map((item) => {
					if(item.id === reward) return _rewards.push(item);
				})
			});
			setRewards(_rewards);
		}
		return () => {
			setRewards([]);
		}
	}, [selectedItem]);

	useEffect(() => {
		if(!category) return setViewable(items.current);
		const _catItems = [];
		items.current.forEach(item => {
			if(item.type !== category) return;
			else _catItems.push(item);
		});
		setViewable(_catItems)
	}, [category]);

	useEffect(() => {
		if(search.length >= 1) {
			setCategory(null);
			Object.values(itemsFile).flat().filter(item => {
				if(item.name.toLowerCase().includes(search.toLowerCase())) {
					setViewable(_items => [..._items, item])
				}
			})
		} else {
			setViewable(items.current);
			setCategory(null);
		}
		return () => {
			setViewable([]);
		}
	}, [search]);

	// useEffect(() => {
	// 	if(!categoryDropdown && hasEventListener) {
	// 		document.getElementById('items').removeEventListener('click', () => {
	// 			setHasEventListener(false);
	// 			return;
	// 		});
	// 	} else if(categoryDropdown && !hasEventListener) {
	// 		setHasEventListener(true);
	// 		document.getElementById('items').addEventListener('click', (e) => {
	// 			if(e.target !== document.getElementById('items-top-dropdown') && e.target.parentNode !== document.getElementById('items-top-dropdown-options')) {
	// 				setCategoryDropdown(false);
	// 			}
	// 		});
	// 	}
	// }, [categoryDropdown])
	
	const changeCategory = (index) => {
		setSearch("");
		document.getElementById('items-filters-search-input').value="";
		if(categories.current[index] === category) return setCategory(null)
		setCategory(categories.current[index]);
	}

	const buyPrice = (selectedItem) => 
		selectedItem.type.toLowerCase() === "box"
		|| selectedItem.type.toLowerCase() === "sellable"
		|| selectedItem.type.toLowerCase() === "collectable"
		|| selectedItem.type.toLowerCase() === "loot box"
		|| (selectedItem.type.toLowerCase() === "power-up" && !selectedItem.showInShop)
		|| (selectedItem.type.toLowerCase() === "collectable" && !selectedItem.name.toLowerCase().includes("phallic"))
		? 'Not Buyable'
		: "⏣ " + Math.ceil(selectedItem.cost).toLocaleString();
	
	const sellPrice = (selectedItem) =>
		selectedItem.type.toLowerCase() === "collectable" 
			? 'Not Sellable'
			: selectedItem.type.toLowerCase() === "loot box" ? "⏣ " + selectedItem.cost.toLocaleString() 
			: selectedItem.type.toLowerCase() === "tool"
			|| selectedItem.type.toLowerCase() === "power-up"
			|| selectedItem.type.toLowerCase() === "item pack"
			? "⏣ " + Math.ceil(selectedItem.cost / 10).toLocaleString()
			: "⏣ " + Math.ceil(selectedItem.cost).toLocaleString();

	return (
		<div id="items">
            <div className="page-wrapper">
                <div id="nitropay-items-top" className="nitropay" />
                <h1 id="items-title">Items directory</h1>
                <div id="items-filters">
					{!filterDropdown ?
						<ul id="items-filters-tabs">
							{categories.current.map((cat, i) => (
								<li key={i} className={category === cat ? search.length >= 1 ? 'items-tab' : 'items-tab selected' : 'items-tab'} onClick={() => changeCategory(i)}>{cat}</li>
							))}
						</ul>
					:
						<div id="items-filters-dropdown">
							<p id="items-filters-dropdown-selected" onClick={() => setDropdownActive(!dropdownActive)}>
								<span id="items-filters-dropdown-selected-name">{category || "All items"}</span>
								<span className="material-icons">expand_more</span>
							</p>
							{dropdownActive ? 
								<div id="items-filters-dropdown-options">
									{category ?
										<p className="items-filters-dropdown-option" onClick={() => {
											changeCategory(null);
											setDropdownActive(!dropdownActive);
										}}>All items</p>
									: ''}
									{categories.current.filter(cat => cat !== category).map((cat, i) => (
										<p className="items-filters-dropdown-option" onClick={() => {
											changeCategory(categories.current.indexOf(cat));
											setDropdownActive(!dropdownActive);
										}}>{cat}</p>
									))}
								</div> 
							: ''}
						</div>
					}
                    <div id="items-filters-search">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={search.length >= 1 ? "#ffffff" : "currentColor"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                            <circle cx="10" cy="10" r="7" />
                            <line x1="21" y1="21" x2="15" y2="15" />
                        </svg>
                        <input id="items-filters-search-input" name="search" placeholder="Search for an item" onChange={(e) => setSearch(e.target.value)}/>
                    </div>
                </div>
                <div id="items-list-wrapper">
					<div id="items-list-container">
						<div id="items-list">
							{viewable.map(item => (
								<>
								<div key={item.name} className={selectedItem.name === item.name ? "item-container active" : "item-container"} onClick={() => setSelectedItem(item)}>
									<img src={item.image} height={55} alt={item.name}/>
								</div>
								{mobileInfo && selectedItem.name === item.name ? 
									<div id="items-info-container" style={{ top: `${mobileInfoPos + 110}px` }}>
										<div id="items-info">
											<div id="items-info-details">
												<img id="items-info-details-image"src={selectedItem.image} width={100} alt={selectedItem.name}/>
												<h1 id="items-info-details-name">{selectedItem.name}</h1>
												<p id="items-info-details-type">Type: {selectedItem.type}</p>
												<p id="items-info-details-description" dangerouslySetInnerHTML={{ __html: mdParser.renderInline(selectedItem.longdescription || selectedItem.description) }}/>
												{selectedItem.effects ?
													<div id="items-info-details-effects">
														<h3>Effects</h3>
														<p id="items-info-details-effects-text">{selectedItem.effects}</p>
													</div>
												: ''}
												{selectedItem.reward ?
													<div id="items-info-details-rewards">
														<h3>Possible items</h3>
														<ul id="items-info-details-rewards-icons">
															{rewards.map(reward => (
																<li className="reward-item" onClick={() => setSelectedItem(reward)}>
																	<img src={reward.image} width={24}/>
																</li>
															))}
														</ul>
													</div>
												: ''}
												{selectedItem.items ?
													<div id="items-info-details-rewards">
														<h3>Items inside</h3>
														<ul id="items-info-details-rewards-icons">
															{rewards.map(item => (
																<li className="reward-item" onClick={() => setSelectedItem(item)}>
																	<img src={item.image} width={24}/>
																</li>
															))}
														</ul>
													</div>
												: ''}
											</div>
											<div id="items-info-prices">
												<div id="items-info-prices-buy">
													<h3>Buy price:</h3>
													<p id="items-info-prices-buy-num" style={buyPrice(selectedItem) === "---" ? { color: "#777777" } : {}}>{buyPrice(selectedItem)}</p>
												</div>
												<div id="items-info-prices-sell">
													<h3>Sell price:</h3>
													<p id="items-info-prices-sell-num" style={sellPrice(selectedItem) === "---" ? { color: "#777777" } : {}}>{sellPrice(selectedItem)}</p>
												</div>
												{/*<div id="items-info-prices-trade"> 
													This can't be done yet, a connection to the database needs to be made.
												</div>*/}
											</div>
										</div>	
									</div>								
								: ''}
								</>
							))}
						</div>
					</div>
					{!mobileInfo ?
						<div id="items-info-container">
							<div id="items-info">
								<div id="items-info-details">
									<img id="items-info-details-image"src={selectedItem.image} width={100} alt={selectedItem.name}/>
									<h1 id="items-info-details-name">{selectedItem.name}</h1>
									<p id="items-info-details-type">Type: {selectedItem.type}</p>
									<p id="items-info-details-description" dangerouslySetInnerHTML={{ __html: mdParser.renderInline(selectedItem.longdescription || selectedItem.description) }}/>
									{selectedItem.effects ?
										<div id="items-info-details-effects">
											<h3>Effects</h3>
											<p id="items-info-details-effects-text">{selectedItem.effects}</p>
										</div>
									: ''}
									{selectedItem.reward ?
										<div id="items-info-details-rewards">
											<h3>Possible items</h3>
											<ul id="items-info-details-rewards-icons">
												{rewards.map(reward => (
													<li className="reward-item" onClick={() => setSelectedItem(reward)}>
														<img src={reward.image} width={24}/>
													</li>
												))}
											</ul>
										</div>
									: ''}
									{selectedItem.items ?
										<div id="items-info-details-rewards">
											<h3>Items inside</h3>
											<ul id="items-info-details-rewards-icons">
												{rewards.map(item => (
													<li className="reward-item" onClick={() => setSelectedItem(item)}>
														<img src={item.image} width={24}/>
													</li>
												))}
											</ul>
										</div>
									: ''}
								</div>
								<div id="items-info-prices">
									<div id="items-info-prices-buy">
										<h3>Buy price:</h3>
										<p id="items-info-prices-buy-num" style={buyPrice(selectedItem) === "---" ? { color: "#777777" } : {}}>{buyPrice(selectedItem)}</p>
									</div>
									<div id="items-info-prices-sell">
										<h3>Sell price:</h3>
										<p id="items-info-prices-sell-num" style={sellPrice(selectedItem) === "---" ? { color: "#777777" } : {}}>{sellPrice(selectedItem)}</p>
									</div>
									{/*<div id="items-info-prices-trade"> 
										This can't be done yet, a connection to the database needs to be made.
									</div>*/}
								</div>
							</div>	
						</div>
					: ''}
                </div>
                <div id="nitropay-items-bottom" className="nitropay" />
            </div>
		</div>
	);
}
