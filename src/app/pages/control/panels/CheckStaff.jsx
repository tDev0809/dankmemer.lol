import React, { useState } from 'react';
import * as axios from 'axios';
import { toast } from 'react-toastify';

export default function CheckStaff() {

    const [accountID, setAccountID] = useState(0);

    const submit = async () => {
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
		<div className="admin-panel large">
			<h3>Find Staff Member</h3>
			<input type="text" placeholder="User ID" onChange={(e) => setAccountID(e.target.value)}/>
			<p className="admin-panel-button" onClick={() => submit()}>Check</p>
		</div>
    )
}