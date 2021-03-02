import React, { useEffect, useState } from 'react';
import * as axios from 'axios';
import { toast } from 'react-toastify';

import '../assets/styles/components/controlCard.scss';

export default function ControlCard({ mainIcon, colour, title, options, action={}, inputOptions = {}, dropdownOptions, finish}) {
    const [submittable, setSubmittable] = useState(false);
    const [pending, setPending] = useState(false);
    const [accountID, setAccountID] = useState("");
    const [category, setCategory] = useState(dropdownOptions ?  dropdownOptions.initial : null);
    const [selectedCategory, setSelectedCategory] = useState(-1);
	const [dropdownOpen, setDropdownOpen] = useState(false);
	const [hasEventListener, setHasEventListener] = useState(false);

    useEffect(() => {
		if(!dropdownOpen && hasEventListener) {
			document.documentElement.removeEventListener('click', () => {
				return setHasEventListener(false);
			});
		} else if (dropdownOpen && !hasEventListener) {
			document.documentElement.addEventListener('click', (e) => {
				setHasEventListener(true);
				if(
                    e.target !== document.getElementById('control-card-dropdown-container') && 
                    e.target.parentNode !== document.getElementById("control-card-dropdown-options")
                ) return setDropdownOpen(false);	
				
			});
		}
	}, [dropdownOpen]);

	useEffect(() => {
		setDropdownOpen(false)
	}, [category]);

    useEffect(() => {
        if(!dropdownOptions && accountID.length >= 1) return setSubmittable(true);
        if(accountID.length >= 1 && category !== dropdownOptions.initial) setSubmittable(true);
    }, [accountID, category]);

    const submit = async () => {
		setPending(true);
        const endpoint = action.endpoint.replace("{{input}}", accountID).replace("{{dropdown}}", category);
        await axios({
            url: `/api${endpoint}`,
            method: action.method,
            credentials: 'same-origin',
            headers: {
              'Content-Type': 'application/json'
            },
            data: options && options.includeBody ? { id: accountID, type: category } : {}
        }).then(() => {
            if(typeof(finish) === "function") finish();
			setPending(false);
			setAccountID("");
            setSubmittable(false);
        }).catch((e) => {
			toast.error("Something went wrong while trying to perform that action.", {
				position: "top-right",
				autoClose: 10000,
				hideProgressBar: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				toastId: 'staffError'
			});
            setPending(false);
        });
    }

    return (
        <div className="control-card">
			<div className="control-card-header">
				<div className="control-card-icon">
					<span className="material-icons">{mainIcon}</span>
					<span className={`control-card-icon-bg lg ${colour}`}></span>
					<span className={`control-card-icon-bg sm ${colour}`}></span>
				</div>
				<h3 dangerouslySetInnerHTML={{ __html: title }}></h3>
			</div>
			<div className="control-card-input-group">
				<span className="material-icons">{inputOptions.icon}</span>
				<input className="control-card-input" type="text" placeholder={inputOptions.placeholder} value={accountID} onChange={(e) => setAccountID(e.target.value)}/>
			</div>
            {dropdownOptions ?
                <div className="control-card-dropdown">
                    <div id="control-card-dropdown-container" onClick={() => setDropdownOpen(!dropdownOpen)}>
                        <span className="icon material-icons">{dropdownOptions.icon}</span>
                        <p className={dropdownOpen ? "control-card-dropdown-selected open" : "control-card-dropdown-selected"}>{dropdownOptions.options[selectedCategory] ? dropdownOptions.options[selectedCategory].text : dropdownOptions.initial}</p>
                        <span className="right material-icons">expand_more</span>
                    </div>
                    {dropdownOpen ? 
                        <div id="control-card-dropdown-options">
                            {dropdownOptions.options.map(({text, value}, i) => (
                                <p key={i} onClick={() => {setCategory(value ? value : text); setSelectedCategory(i)}}>{text}</p>
                            ))}
                        </div>
                    : ''}
                </div>
            : '' }
			<p className={!submittable ? "control-card-button disabled" : pending ? "control-card-button filled" : "control-card-button"} onClick={() => { if(!pending && submittable) submit() }}>{pending ? "Pending" : "Confirm"}</p>
		</div>
    );
}

