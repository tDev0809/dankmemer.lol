import React, { useEffect, useState } from 'react';

export default function GenericPanel(props) {
	const [title, setTitle] = useState('Admin Panel');
	const [dropdownText, setDropdownText] = useState('');
	const [dropdownValue, setDropdownValue] = useState(props.defaultDropdown);
	const [inputValue, setInputValue] = useState('');
	const [inputPlaceholder, setInputPlaceholder] = useState('Placeholder');
	const [buttonText, setButtonText] = useState('Submit');

	useEffect(() => {
		setTitle(props.title);
		setDropdownText(props.dropdownHeader);
		setDropdownValue(props.defaultDropdown);
		setInputPlaceholder(props.textAreaHeader);
		setButtonText(props.buttonText)
	}, [props])

	return (
		<div className="admin-panel">
			<h3>{title}</h3>
			<div className="admin-panel-input-group">
				<label>{dropdownText}</label>
				<select value={dropdownValue} onChange={e => setDropdownValue(e.target.value)}>
					{props.options && props.options.map(option => (
						<option value={option} key={option}>{option}</option>
					))}
				</select>
			</div>
			<input type="text" placeholder={inputPlaceholder} onChange={(e) => setInputValue(e.target.value)}/>
			<p className="admin-panel-button" onClick={() => props.action({ dropdownVal: dropdownValue, textVal: inputValue })}>{buttonText}</p>
		</div>
	)
}