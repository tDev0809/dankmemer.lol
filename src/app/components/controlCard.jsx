import React, { useEffect, useState } from 'react';
import * as axios from 'axios';
import { toast } from 'react-toastify';

import '../assets/styles/components/controlCard.scss';

export default function ControlCard({ mainIcon, colour, title, options={}, fillRow, resize, action={}, inputOptions = {}, dropdownOptions, finish}) {
    const [submittable, setSubmittable] = useState(false);
    const [pending, setPending] = useState(false);
    const [accountID, setAccountID] = useState("");
    const [category, setCategory] = useState(dropdownOptions ?  dropdownOptions.initial : null);
    const [selectedCategory, setSelectedCategory] = useState(-1);
	const [dropdownOpen, setDropdownOpen] = useState(false);
	const [hasEventListener, setHasEventListener] = useState(false);

    const [bannerPreviewHTML, setBannerPreviewHTML] = useState("Write a message to display a preview");

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
        if(options.bannerPreview) {
            let preview = new DOMParser().parseFromString(accountID, 'text/html').body;
            for(let i = 0; i < preview.querySelectorAll("a").length; i++) {
                const anchor = preview.querySelectorAll("a")[i];
                anchor.classList.add("announcement-link");
            }
            for(let i = 0; i < preview.querySelectorAll("b").length; i++) {
                const _bold = preview.querySelectorAll("b")[i];
                const bold = document.createElement("span")
                bold.classList.add("announcement-bold");
                bold.innerHTML = _bold.innerText;
                _bold.parentNode.replaceChild(bold, _bold);
            }
            setBannerPreviewHTML(preview.innerHTML || "Write a message to display a preview");
        }

        if(!dropdownOptions && accountID.length >= 1) return setSubmittable(true);
        if(accountID.length >= 1 && category !== dropdownOptions.initial) setSubmittable(true);
    }, [accountID, category]);

    const submit = async (override) => {
		setPending(true);
        const endpoint = action.endpoint.replace("{{input}}", accountID).replace("{{dropdown}}", category);
        await axios({
            url: `/api${endpoint}`,
            method: override ? 'DELETE' : action.method,
            credentials: 'same-origin',
            headers: {
              'Content-Type': 'application/json'
            },
            data: options && options.includeBody ? {
                id: options.submit === "announcement" ?
                    bannerPreviewHTML : accountID,
                type: category 
            } : {}
        }).then((data) => {
            if(typeof(finish) === "function") finish(data);
			setPending(false);
			setAccountID("");
            setSubmittable(false);
        }).catch((e) => {
            console.error(e);
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
        <div className={resize ? "control-card resize" : fillRow ? "control-card fill" :  "control-card"}>
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
				<input className="control-card-input" type={inputOptions.min ? "number" : "text"} placeholder={inputOptions.placeholder} min={inputOptions.min} max={inputOptions.max} value={accountID}
                    onChange={(e) => {
                        setAccountID(e.target.value);
                        if(inputOptions.min && e.target.value < inputOptions.min) e.target.value = inputOptions.min;
                        else if(inputOptions.max && e.target.value > inputOptions.max) e.target.value = inputOptions.max;
                    }}
                    onInput={(e) => {
                        if(e.target.value < inputOptions.min) e.target.value = inputOptions.min;
                        else if(e.target.value > inputOptions.max) e.target.value = inputOptions.max;
                    }}/>
			</div>
            {options.bannerPreview ? 
                <div id="announcement">
                    <div id="announcement-content">
                        <p dangerouslySetInnerHTML={{ __html: bannerPreviewHTML }}></p>
                    </div>
                    <div id="announcement-action">
                        <span className="material-icons">close</span>
                    </div>
                </div>
            : ''}
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
            <div className="control-card-buttons">
                <p className={!submittable ? "button disabled" : pending ? "button filled" : "button"} onClick={() => { if(!pending && submittable) submit() }}>{pending ? "Pending" : "Confirm"}</p>
                {options.submit === "announcement" ?
                <p className={pending ? "button filled" : "button"} onClick={() => { if(!pending) submit(true) }}>{pending ? "Pending" : "Clear announcement"}</p>    
                : ''}
            </div>
        </div>
    );
}

