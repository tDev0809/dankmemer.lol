import React, { useEffect, useState } from 'react';
import * as axios from 'axios';
import { toast } from 'react-toastify';

export default function AddStaff() {

    const [accountID, setAccountID] = useState(0);
    const [category, setCategory] = useState("Moderators");
	const [addStaffSelectedCategory, setAddStaffSelectedsCategory] = useState(null);
	const [addStaffDropdownOpen, setAddStaffDropdownOpen] = useState(false);
	const [hasEventListener, setHasEventListener] = useState(false);

	useEffect(() => {
		document.documentElement.addEventListener('click', (e) => {
			console.log("C")
			if(!addStaffDropdownOpen) return;
			if(e.target !== document.getElementById('access-card-dropdown-container')) {
				addStaffDropdownOpen(false);
			}
		});
	}, [])

    const submit = async () => {
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
				<input className="access-card-input" type="text" placeholder="Account ID" onChange={(e) => setAccountID(e.target.value)}/>
			</div>
			<div className="access-card-dropdown">
				<div id="access-card-dropdown-container" onClick={() => setAddStaffDropdownOpen(!addStaffDropdownOpen)}>
					<span className="icon material-icons">badge</span>
					<p className={addStaffDropdownOpen ? "access-card-dropdown-selected open" : "access-card-dropdown-selected"}>Staff type</p>
					<span className="right material-icons">expand_more</span>
				</div>
				{addStaffDropdownOpen ? 
					<div className="access-card-dropdown-options">
						<p>Moderator</p>
						<p>Honorable Mention</p>
						<p>Server Management</p>
						<p>Developer</p>
					</div>
				: ''}
				{/* <select onChange={(e) => setCategory(e.target.value)}>
                    <option value="Moderators">Moderator</option>
                    <option value="Honorable Mentions">Honorable Mention</option>
                    <option value="Server Management">Server Management</option>      
                    <option value="Developers">Developer</option>
				</select> */}
			</div>
			<p className="access-card-button" onClick={() => submit()}>Confirm</p>
		</div>
    )
}