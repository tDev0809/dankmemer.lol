import React, { useEffect, useState } from 'react';
import * as axios from 'axios';

import '../assets/styles/components/controlCard.scss';

export default function ControlCard({ mainIcon, colour, title, action={}, inputOptions = {}, dropdownOptions, finish}) {

    const [requestBody, setRequestBody] = useState({});
    const [pending, setPending] = useState(false);
    const [accountID, setAccountID] = useState("");
    const [category, setCategory] = useState(dropdownOptions.initial);
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

    const submit = async () => {
		setPending(true);
        setRequestBody({ id: accountID, type: category })
        await axios({
            url: `/api${action.endpoint}`,
            method: action.method,
            credentials: 'same-origin',
            headers: {
              'Content-Type': 'application/json'
            },
            body: {
                ...requestBody
            }
        }).then(() => {
            if(typeof(finish) === "function") finish();
			setPending(false);
			setAccountID("")
        }).catch(() => {
			toast.error("Something went wrong while trying to add a new staff member.", {
				position: "top-right",
				autoClose: 10000,
				hideProgressBar: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				toastId: 'staffError'
			});
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
                        <p className={dropdownOpen ? "control-card-dropdown-selected open" : "control-card-dropdown-selected"}>{category ? category : dropdownOptions.initial}</p>
                        <span className="right material-icons">expand_more</span>
                    </div>
                    {dropdownOpen ? 
                        <div id="control-card-dropdown-options">
                            {dropdownOptions.options.map(({text, value}) => (
                                <p onClick={() => setCategory(value ? value : text)}>{text}</p>
                            ))}
                        </div>
                    : ''}
                </div>
            : '' }
			<p className={pending ? "control-card-button filled" : "control-card-button"} onClick={() => { if(!pending) submit() }}>{pending ? "Pending" : "Confirm"}</p>
		</div>
    //   <GenericPanel
    //     title={title}
    //     dropdownHeader=
    //     textAreaHeader="User ID"
    //     defaultDropdown="appeal"
    //     options={this.props.options.concat('Appeal', 'Lootbox')}
    //     action={this.action.bind(this)}
    //     buttonText={this.props.buttonText}
    //   />
    );
}

//   async action (state) {
//     if (!state.textVal) {
//       return alert('enter a user id dumb cunt');
//     }

//     const res = await fetch(`/api/admin${this.props.getEndpoint(state)}`, {
//       ...this.props.getFetchParams(state),
//       credentials: 'same-origin',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//     });

//     if (res.status !== 200) {
//       alert(`Unknown HTTP response code: ${res.status}`);
//     } else {
//       this.props.finish(state, res);
//     }
//   }

//   static defaultProps = {
//     getFetchParams: (state) => ({
//       method: 'POST',
//       body: JSON.stringify({
//         type: state.dropdownVal,
//         id: state.textVal
//       })
//     }),
//     options: []
//   };
// }

// import React, { useEffect, useState } from 'react';
