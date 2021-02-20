import React, { useState } from 'react';
import * as axios from 'axios';
import { toast } from 'react-toastify';

export default function CheckStaff() {
	const [pending, setPending] = useState(false);
    const [accountID, setAccountID] = useState("");

    const submit = async () => {
		setPending(true);
        await axios({
            url: `/api/admin/staff?id=${accountID}`,
            method: 'GET'
        }).then(() => {
			toast.dark("That staff member was found in the database.", {
				position: "top-right",
				autoClose: 10000,
				hideProgressBar: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				toastId: 'staffFound'
			});
			setAccountID("");
			setPending(false);
        }).catch(() => {
			toast.error("That staff member was not found in the database... or something is broken :)", {
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
					<span className="material-icons">person_search</span>
					<span className="access-card-icon-bg lg green"></span>
					<span className="access-card-icon-bg sm green"></span>
				</div>
				<h3>Search for<br/>staff members</h3>
			</div>
			<div className="access-card-input-group">
				<span className="material-icons">account_box</span>
				<input className="access-card-input" type="text" placeholder="Account ID" value={accountID} onChange={(e) => setAccountID(e.target.value)}/>
			</div>
			<p className={pending ? "access-card-button filled" : "access-card-button"} onClick={() => { if(!pending) submit() }}>{pending ? "Pending" : "Confirm"}</p>
		</div>
    )
}