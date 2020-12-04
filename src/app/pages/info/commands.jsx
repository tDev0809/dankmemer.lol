import React, { useEffect, useState, useRef } from 'react';
import commandsFile from './data/commands.json';
import Expandable from '../../components/expandable';
import { SnapList, SnapItem, useScroll, useDragToScroll, useVisibleElements } from 'react-snaplist-carousel';
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';

import 'assets/styles/pages/info/commands.scss';


export default function Commands(props) {
	const snapList = useRef(null);
	const categories = useRef(Object.keys(commandsFile));
	const [category, setCategory] = useState(categories.current[0]);
	const [commands, setCommands] = useState(Object.values(commandsFile)[Object.keys(commandsFile).indexOf(category)]);
	const [expandedIndex, setExpandedIndex] = useState(null);
	const [search, setSearch] = useState('');
	const [prefix, setPrefix] = useState('pls ');

	useEffect(() => {
		(window.adsbygoogle = window.adsbygoogle || []).push({});
		(window.adsbygoogle = window.adsbygoogle || []).push({});
		if(window.location.search && window.location.search.split("?")[1].split("=")[0] === "prefix") {
			setPrefix(`${window.location.search.split("?")[1].split("=")[1]} `);
			return window.history.pushState(null, null, 'commands');
		}

		return () => {
			setPrefix('pls ');
		}
	}, []);

	useEffect(() => {
		setCommands([]);
		setCommands(Object.values(commandsFile)[Object.keys(commandsFile).indexOf(category)]);
	}, [category]);

	useEffect(() => {
		if(search.length >= 1) {
			Object.values(commandsFile).flat().filter(command => {
				if(command.t.some(trigger => trigger.includes(search)) || command.d.toLowerCase().includes(search)) {
					setCommands(oldCommands => [...oldCommands, command]);
				}
			})
		} else {
			setCategory(categories.current[0]);
			setCommands(Object.values(commandsFile)[Object.keys(commandsFile).indexOf(category)]);
		}
		return () => {
			setCommands([]);
		}
	}, [search]);
	
	const changeCategory = (index) => {
		setSearch("");
		document.getElementById('commands-search').value="";
		setCategory(categories.current[index]);
		goToChildren(index);
		visible(index);
	}

	const expand = (index) => {
		setExpandedIndex(index.toString() && index === expandedIndex ? null : index);
	}

	const visible = useVisibleElements({ debounce: 10, ref: snapList }, (elements, elementInCenter) => elementInCenter);
	const goToChildren = useScroll({ ref: snapList });
	useDragToScroll({ ref: snapList });

	return (
		<div id="commands">
			<div align="center">
				<ins className="adsbygoogle ad"
					data-ad-client="ca-pub-7326182486296195"
					data-ad-slot="4551035249">
				</ins>
			</div>
			<div id="commands-header">
				<h1 id="commands-header-title">Commands</h1>
				<p id="commands-header-message">Find all the information, including required permissions, regarding the extensive list of commands available to you with Dank Memer.</p>
				<svg id="commands-header-circles" height="200" width="350">
					<circle cx="23" cy="130" r="22.5" fill="#242424"/>
					<circle cx="150" cy="73" r="73" fill="#242424"/>
					<circle cx="300" cy="140" r="22.5" fill="#242424"/>
				</svg>
			</div>
			<div id="commands-top">
				<ul id="commands-top-tabs">
					<SnapList className="commands-top-tabs-scroller" width={'36.5vw'} ref={snapList}>
						{categories.current.map((cat, i) => (
							<SnapItem margin={{ right: '30px' }}>
								<li key={i} className={category === cat ? search.length >= 1 ? 'commands-tab' : 'commands-tab selected' : 'commands-tab'} onClick={() => changeCategory(i)}>{cat}</li>
							</SnapItem>
						))}
					</SnapList>
				</ul>
				<div id="commands-top-search">
					<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
						<path stroke="none" d="M0 0h24v24H0z" fill="none"/>
						<circle cx="10" cy="10" r="7" />
						<line x1="21" y1="21" x2="15" y2="15" />
					</svg>
					<input id="commands-search" name="search" placeholder="Search for a command..." onChange={(e) => setSearch(e.target.value)}/>
				</div>
			</div>
			<SimpleBar id="commands-list-container" style={{ maxHeight: '60vh' }} autoHide={false}>
				<div id="commands-list-wrapper">
					<div id="commands-list">
						{commands.map((command, i) => (
							<Expandable
								key={i}
								index={i}
								prefix={prefix}
								name={command.t[0]}
								description={command.d.replaceAll("pls ", prefix)}
								usage={command.u.replace('pls ', prefix)}
								permissions={command.p}
								star={command.pS ? true : false}
								expanded={expandedIndex === commands.indexOf(command)}
								setExpanded={expand}/>
						))}
					</div>
				</div>
			</SimpleBar>
			<div align="center">
	        	<ins className="adsbygoogle ad"
					data-ad-client="ca-pub-7326182486296195"
					data-ad-slot="5725651587">
				</ins>
			</div>
		</div>
	);
}