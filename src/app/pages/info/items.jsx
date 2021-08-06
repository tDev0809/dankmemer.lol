import React, { useEffect, useState, useRef } from 'react';
import itemsFile from './data/items.json';
import createAd from '../../util/createAd';

import 'assets/styles/pages/info/items.scss';

// const chunk = (array, chunk_size) => Array(Math.ceil(array.length / chunk_size)).fill().map((_, index) => index * chunk_size).map(begin => array.slice(begin, begin + chunk_size));

export default function Items() {
	// Set the categories variable as an array of the type field from items.json,
	// uses a set to ensure that it they're unique categories
	const categories = useRef([...new Set(Object.values(itemsFile).map(({ type }) => type))]);
	const items = useRef(Object.values(itemsFile).sort((a, b) => a.name.localeCompare(b.name)));
	const [category, setCategory] = useState(null);
	const [page, setPage] = useState(0);
	// const [pages, setPages] = useState(chunk(items.current, 35));
	const [viewable, setViewable] = useState(items.current);
	const [chunked, setChunked] = useState(false);
	const [selectedItem, setSelectedItem] = useState(items.current[0]);
	const [search, setSearch] = useState('');

	useEffect(() => {
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
	}, []);

	useEffect(() => {
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

	useEffect(() => {
		switch(selectedItem.type.toLowerCase()) {
			case "box":
				selectedItem.worth = selectedItem.cost;
				break;
			case "sellable":
				selectedItem.worth = selectedItem.cost;
				break;
			default:
				selectedItem.worth = Math.ceil(selectedItem.cost / 10);
				break;
		}
	}, [selectedItem]);

	// useEffect(() => {
	// 	if(search.length >= 1) {
	// 		setExpandedIndex(null);
	// 		Object.values(itemsFile).flat().filter(question => {
	// 			if(question.q.toLowerCase().includes(search.toLowerCase()) || question.a.toLowerCase().includes(search.toLowerCase())) {
	// 				setQuestions(oldQuestions => [...oldQuestions, question]);
	// 			}
	// 		})
	// 	} else {
	// 		setCategory(categories.current[0]);
	// 		setQuestions(Object.values(itemsFile)[Object.keys(itemsFile).indexOf(category)]);
	// 	}
	// 	return () => {
	// 		setQuestions([]);
	// 	}
	// }, [search]);

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

	return (
		<div id="items">
            <div className="page-wrapper">
                <div id="nitropay-items-top" className="nitropay" />
                <h1 id="items-title">Items directory</h1>
                <div id="items-filters">
                    {/* <div id="items-filters-dropdown">
                        <p id="items-filters-dropdown-selected">
                            <span id="items-filters-dropdown-selected-name">category</span>
                            <span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 20" fill="none" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                    <polyline points="6 9 12 15 18 9" />
                                </svg>
                            </span>
                        </p>
                        {/* {categoryDropdown ? <div id="items-top-dropdown-options">
                            {categories.current.filter(cat => cat !== category).map((cat, i) => (
                                <p className="items-top-dropdown-option" onClick={() => {
                                    changeCategory(categories.current.indexOf(cat));
                                    setCategoryDropdown(!categoryDropdown);
                                }}>{cat}</p>
                            ))}
                        </div> : ''}
                    </div> */}
                    <ul id="items-filters-tabs">
                        {categories.current.map((cat, i) => (
                            <li key={i} className={category === cat ? search.length >= 1 ? 'items-tab' : 'items-tab selected' : 'items-tab'} onClick={() => changeCategory(i)}>{cat}</li>
                        ))}
                    </ul>
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
					<div id="items-list-pagination">
						<div id="items-list">
							{viewable.map(item => (
								<div key={item.name} className={selectedItem.name === item.name ? "item-container active" : "item-container"} onClick={() => setSelectedItem(item)}>
									<img src={item.image} height={55} alt={item.name}/>
								</div>
							))}
						</div>
					</div>
					<div id="items-info-container">
						<div id="items-info">
							<div id="items-info-details">
								<img id="items-info-details-image"src={selectedItem.image} width={100} alt={selectedItem.name}/>
								<h1 id="items-info-details-name">{selectedItem.name}</h1>
								<p id="items-info-details-type">Type: {selectedItem.type}</p>
								<p id="items-info-details-description">{selectedItem.longdescription || selectedItem.description}</p>
							</div>
							<div id="items-info-prices">
								<p>sell: {selectedItem.worth}</p>
								<p>buy: {selectedItem.cost}</p>
							</div>
						</div>	
					</div>

                </div>
                <div id="nitropay-items-bottom" className="nitropay" />
            </div>
		</div>
	);
}
