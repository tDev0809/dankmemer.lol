import React, { useEffect, useState } from 'react';
import * as axios from 'axios';
import { toast } from 'react-toastify';

export default function AddStaff() {
	const [pending, setPending] = useState(false);
    const [accountID, setAccountID] = useState("");
    const [category, setCategory] = useState("Staff type");
	const [addStaffDropdownOpen, setAddStaffDropdownOpen] = useState(false);
	const [hasEventListener, setHasEventListener] = useState(false);

	useEffect(() => {
		if(!addStaffDropdownOpen && hasEventListener) {
			document.documentElement.removeEventListener('click', () => {
				return setHasEventListener(false);
			});
		} else if (addStaffDropdownOpen && !hasEventListener) {
			document.documentElement.addEventListener('click', (e) => {
				setHasEventListener(true);
				if(e.target !== document.getElementById('access-card-dropdown-container') && e.target.parentNode !== document.getElementById("access-card-dropdown-options")) {
					setAddStaffDropdownOpen(false);	
				}
			});
		}
	}, [addStaffDropdownOpen]);

	useEffect(() => {
		setAddStaffDropdownOpen(false)
	}, [category])

    const submit = async () => {
		setPending(true)
        await axios({
            url: `/api/admin/staff?id=${accountID}&category=${category}`,
            method: 'POST'
        }).then(() => {
			toast.dark("New staff member added.", {
				position: "top-right",
				autoClose: 10000,
				hideProgressBar: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				toastId: 'newStaff'
			});
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
        })
    }

    return (
		<div className="access-card">
			<div className="access-card-header">
				<div className="access-card-icon">
					<span className="material-icons">person_add</span>
					<span className="access-card-icon-bg lg green"></span>
					<span className="access-card-icon-bg sm green"></span>
				</div>
				<h3>Add new<br/>staff member</h3>
			</div>
			<div className="access-card-input-group">
				<span className="material-icons">account_box</span>
				<input className="access-card-input" type="text" placeholder="Account ID" value={accountID} onChange={(e) => setAccountID(e.target.value)}/>
			</div>
			<div className="access-card-dropdown">
				<div id="access-card-dropdown-container" onClick={() => setAddStaffDropdownOpen(!addStaffDropdownOpen)}>
					<span className="icon material-icons">badge</span>
					<p className={addStaffDropdownOpen ? "access-card-dropdown-selected open" : "access-card-dropdown-selected"}>{category ? category : "Staff type"}</p>
					<span className="right material-icons">expand_more</span>
				</div>
				{addStaffDropdownOpen ? 
					<div id="access-card-dropdown-options">
						<p onClick={() => setCategory("Moderator")}>Moderator</p>
						<p onClick={() => setCategory("Honorable Mention")}>Honorable Mention</p>
						<p onClick={() => setCategory("Server Management")}>Server Management</p>
						<p onClick={() => setCategory("Developer")}>Developer</p>
					</div>
				: ''}
			</div>
			<p className={pending ? "access-card-button filled" : "access-card-button"} onClick={() => { if(!pending) submit() }}>{pending ? "Pending" : "Confirm"}</p>
		</div>
    )
}