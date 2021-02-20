import React, { useState } from 'react';
import * as axios from 'axios';
import { toast } from 'react-toastify';

export default function AddStaff() {

    const [accountID, setAccountID] = useState(0);

    const submit = async () => {
        await axios({
            url: `/api/admin/staff?id=${accountID}`,
            method: 'DELETE'
        }).then(() => {
			toast.dark("Staff member removed.", {
				position: "top-right",
				autoClose: 10000,
				hideProgressBar: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				toastId: 'removeStaff'
			});
        }).catch(() => {
			toast.error("Something went wrong while trying to remove a staff member.", {
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
					<span className="material-icons">person_remove</span>
					<span className="access-card-icon-bg lg red"></span>
					<span className="access-card-icon-bg sm red"></span>
				</div>
				<h3>Search for<br/>staff members</h3>
			</div>
			<div className="access-card-input-group">
				<span className="material-icons">account_box</span>
				<input className="access-card-input" type="text" placeholder="Account ID" onChange={(e) => setAccountID(e.target.value)}/>
			</div>
			<p className="access-card-button" onClick={() => submit()}>Confirm</p>
		</div>
    )
}