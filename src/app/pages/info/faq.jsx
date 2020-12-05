import React, { useEffect, useState, useRef } from 'react';
import faqFile from './data/faq.json';
import Expandable from '../../components/expandable';
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';

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
		(window.adsbygoogle = window.adsbygoogle || []).push({});
		(window.adsbygoogle = window.adsbygoogle || []).push({});
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
			Object.values(faqFile).flat().filter(question => {
				if(question.q.toLowerCase().includes(search) || question.a.toLowerCase().includes(search)) {
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
			<div align="center">
				<ins className="adsbygoogle ad"
					data-ad-client="ca-pub-7326182486296195"
					data-ad-slot="4551035249">
				</ins>
			</div>
			<div id="faq-header">
				<h1 id="faq-header-title">Frequently Asked Questions</h1>
				<p id="faq-header-message">The most frequently asked questions can be found below. Split into categories depending on what they are related to.</p>
				<svg id="faq-header-circles" height="200" width="350">
					<circle cx="23" cy="130" r="22.5" fill="#242424"/>
					<circle cx="150" cy="73" r="73" fill="#242424"/>
					<circle cx="300" cy="140" r="22.5" fill="#242424"/>
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
					<input id="faq-search" name="search" placeholder="Search for a command..." onChange={(e) => setSearch(e.target.value)}/>
				</div>
			</div>
			<SimpleBar id="faq-list-container" style={{ maxHeight: '60vh' }} autoHide={false}>
				<div id="faq-list-wrapper">
					<div id="faq-list">
						{questions.map((command, i) => (
							<Expandable
								key={i}
								index={i}
								prefix={prefix}
								name={command.q}
								description={command.a.replaceAll("pls ", prefix)}
								expanded={expandedIndex === questions.indexOf(command)}
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

// import React, { PureComponent } from 'react';
// import faq from './data/faq.json';
// import sleep from '../../util/sleep';

// import 'assets/styles/pages/info/faq.scss';

// export default class FAQ extends PureComponent {
//   commandsRef = React.createRef();
//   lastTyped = Date.now();
//   state = {
//     selectedCategory: Object.keys(faq)[0],
//     expandedCommand: '',
//     transitionState: 'fade-in',
//     searchQuery: ''
//   };

//   setCategory (selectedCategory) {
//     if (selectedCategory === this.state.selectedCategory) {
//       return;
//     }

//     this.setState({ transitionState: 'fade-out' }, () =>
//       sleep(250).then(() =>
//         this.setState({ selectedCategory }, () =>
//           this.setState({ transitionState: 'fade-in' })
//         )
//       )
//     );
//   }

//   componentDidMount () {
//     (window.adsbygoogle = window.adsbygoogle || []).push({});
//     (window.adsbygoogle = window.adsbygoogle || []).push({});
//     if (window.location.search) {
//       window.history.pushState(null, null, 'faq');
//     }
//   }

//   updateSearch (ev) {
//     this.lastTyped = Date.now();
//     const { value } = ev.target;

//     if (value === this.state.searchQuery) {
//       return;
//     }

//     setTimeout(() => {
//       const diff = Date.now() - this.lastTyped;
//       if (diff > 300 && diff < 400) {
//         this.lastTyped = Date.now();
//         this.setState({ transitionState: 'fade-out' }, () =>
//           sleep(250).then(() =>
//             this.setState({ searchQuery: value.toLowerCase() }, () =>
//               this.setState({ transitionState: 'fade-in' })
//             )
//           )
//         );
//       }
//     }, 350)
//   }

//   render () {
//     const { selectedCategory, transitionState, expandedCommand, searchQuery } = this.state;
//     return (
//       <>
//       <div align="center">
//           <ins className="adsbygoogle ad"
//             data-ad-client="ca-pub-7326182486296195"
//             data-ad-slot="4551035249">
//           </ins>
//         </div>
//       <div className='content faq-page'>
//         <div className='faq-wrapper'>
//           <div className='categories'>
//             {Object.keys(faq)
//               .map(category => (
//                 <div
//                   className={`${selectedCategory === category ? 'selected ' : ''}category`}
//                   key={category}
//                   onClick={() => this.setCategory(category)}
//                 >
//                   <span>
//                     {category}
//                   </span>
//                 </div>
//               ))}
//           </div>

//           <div className='right'>
//             <textarea
//               placeholder='Search...'
//               rows={1}
//               spellCheck={false}
//               className={`${selectedCategory === 'search-bar' ? 'active ' : ''}search-bar`}
//               onKeyUp={ev => this.updateSearch(ev)}
//               onFocus={() => this.setCategory('search-bar')}
//             />
//             <div className={`${transitionState} faq`} ref={this.commandsRef}>
//               <div className='faq-scroller'>
//               {(selectedCategory !== 'search-bar'
//                 ? faq[selectedCategory]
//                 : Object.values(faq)
//                     .flat()
//                     .filter(command => (
//                       !searchQuery || (
//                         command.q.toLowerCase().includes(searchQuery) ||
//                         command.a.toLowerCase().includes(searchQuery)
//                       )
//                     )))
//                 .map(command => (
//                   <div
//                     className={`${expandedCommand === command ? 'expanded ' : ''}command`}
//                     key={command.q}
//                     onClick={() => this.setState({
//                       expandedCommand: expandedCommand === command ? null : command
//                     })}>

//                     <div className='command-header blurple'>
//                       <div className='command-name'>{command.q}</div>

//                     </div>
//                     <div className={`${expandedCommand === command ? 'expanded ' : ''}command-expanded-info`}>
//                       <div className='command-expanded-seperator' />
//                       <div className='command-info-section'>
//                         <div className='command-info-header'>Answer</div>
//                         <div className='command-info-details command-info-permissions'>{command.a}</div>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//               <div className='faq-shadow'></div>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div align="center">
//           <ins className="adsbygoogle ad"
//             data-ad-client="ca-pub-7326182486296195"
//             data-ad-slot="5725651587">
//           </ins>
//         </div>
//       </>
//     );
//   }
// }
