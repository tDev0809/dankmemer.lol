import React, { useEffect, useState, useRef } from 'react';
import faqFile from './data/faq.json';
import Expandable from '../../components/expandable';
import createAd from '../../util/createAd';

import 'assets/styles/pages/info/commands.scss';

export default function FAQ(props) {
	const categories = useRef(Object.keys(faqFile));
	const [category, setCategory] = useState(categories.current[0]);
	const [questions, setQuestions] = useState(Object.values(faqFile)[Object.keys(faqFile).indexOf(category)]);
	const [categoryDropdown, setCategoryDropdown] = useState(false);
	const [hasEventListener, setHasEventListener] = useState(false);
	const [expandedIndex, setExpandedIndex] = useState(null);
	const [search, setSearch] = useState('');
	const [prefix, setPrefix] = useState('pls ');

	useEffect(() => {
		createAd('nitropay-faq-top', { sizes: [ [728, 90] ] }, 'desktop');
		createAd('nitropay-faq-top', { sizes: [
			[320, 50],
			[300, 50],
			[300, 250]
		] }, 'mobile');

		createAd('nitropay-faq-bottom', {
			sizes: [
				[728, 90],
				[970, 90],
				[970, 250]
			],
			renderVisibleOnly: true
		}, 'desktop');
		createAd('nitropay-faq-bottom', {
			sizes: [
				[320, 50],
				[300, 50],
				[300, 250]
			],
			renderVisibleOnly: true
		}, 'mobile');

		if(window.location.search && window.location.search.split("?")[1].split("=")[0] === "prefix") {
			setPrefix(`${window.location.search.split("?")[1].split("=")[1]} `);
			return window.history.pushState(null, null, 'faq');
		}

		return () => {
			setPrefix('pls ');
		}
	}, []);

	useEffect(() => {
		setQuestions([]);
		setQuestions(Object.values(faqFile)[Object.keys(faqFile).indexOf(category)]);
	}, [category]);

	useEffect(() => {
		if(search.length >= 1) {
			setExpandedIndex(null);
			Object.values(faqFile).flat().filter(question => {
				if(question.q.toLowerCase().includes(search.toLowerCase()) || question.a.toLowerCase().includes(search.toLowerCase())) {
					setQuestions(oldQuestions => [...oldQuestions, question]);
				}
			})
		} else {
			setCategory(categories.current[0]);
			setQuestions(Object.values(faqFile)[Object.keys(faqFile).indexOf(category)]);
		}
		return () => {
			setQuestions([]);
		}
	}, [search]);

	useEffect(() => {
		if(!categoryDropdown && hasEventListener) {
			document.getElementById('faq').removeEventListener('click', () => {
				setHasEventListener(false);
				return;
			});
		} else if(categoryDropdown && !hasEventListener) {
			setHasEventListener(true);
			document.getElementById('faq').addEventListener('click', (e) => {
				if(e.target !== document.getElementById('faq-top-dropdown') && e.target.parentNode !== document.getElementById('faq-top-dropdown-options')) {
					setCategoryDropdown(false);
				}
			});
		}
	}, [categoryDropdown])
	
	const changeCategory = (index) => {
		setSearch("");
		document.getElementById('faq-search').value="";
		setCategory(categories.current[index]);
		setExpandedIndex(null);
	}

	const expand = (index) => {
		setExpandedIndex(index.toString() && index === expandedIndex ? null : index);
	}

	return (
		<div id="faq">
			<div id="nitropay-faq-top" className="nitropay" />
			<div id="faq-header">
				<h1 id="faq-header-title">Frequently Asked Questions</h1>
				<p id="faq-header-message">The most frequently asked questions can be found below. Split into categories depending on what they are related to.</p>
				<svg id="faq-header-dots" viewBox="0 0 52 24" fill="#16c458">
					<defs>
						<pattern id="dots" x="0" y="0" width=".15" height=".28">
							<circle cx="1" cy="1" r="1"></circle>
						</pattern>
					</defs>
					<rect fill="url(#dots)" width="42" height="20"></rect>
				</svg>
			</div>
			<div id="faq-top">
				<div id="faq-top-dropdown">
					<p id="faq-top-dropdown-selected" onClick={() => setCategoryDropdown(!categoryDropdown)}><span id="faq-top-dropdown-selected-name">{category}</span> <span>
						<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 20" fill="none" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
							<path stroke="none" d="M0 0h24v24H0z" fill="none"/>
								<polyline points="6 9 12 15 18 9" />
							</svg>
					</span></p>
					{categoryDropdown ? <div id="faq-top-dropdown-options">
						{categories.current.filter(cat => cat !== category).map((cat, i) => (
							<p className="faq-top-dropdown-option" onClick={() => {
								changeCategory(categories.current.indexOf(cat));
								setCategoryDropdown(!categoryDropdown);
							}}>{cat}</p>
						))}
					</div> : ''}
				</div>
				<ul id="faq-top-tabs">
					{categories.current.map((cat, i) => (
						<li key={i} className={category === cat ? search.length >= 1 ? 'faq-tab' : 'faq-tab selected' : 'faq-tab'} onClick={() => changeCategory(i)}>{cat}</li>
					))}
				</ul>
				<div id="faq-top-search">
					<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
						<path stroke="none" d="M0 0h24v24H0z" fill="none"/>
						<circle cx="10" cy="10" r="7" />
						<line x1="21" y1="21" x2="15" y2="15" />
					</svg>
					<input id="faq-search" name="search" placeholder="Find an answer for your question" onChange={(e) => setSearch(e.target.value)}/>
				</div>
			</div>
			<div id="faq-list-wrapper">
				<div id="faq-list">
					{questions.map((command, i) => (
						<Expandable
							key={i}
							index={i}
							prefix={prefix}
							name={command.q}
							description={command.a.replace(/pls /g, prefix)}
							expanded={expandedIndex === questions.indexOf(command)}
							setExpanded={expand}/>
					))}
				</div>
			</div>
			<div id="nitropay-faq-bottom" className="nitropay" />
		</div>
	);
}
