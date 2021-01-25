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
		<div className="admin-panel large">
			<h3>Remove Staff Member</h3>
			<input type="text" placeholder="User ID" onChange={(e) => setAccountID(e.target.value)}/>
			<p className="admin-panel-button" onClick={() => submit()}>Remove</p>
		</div>
    )
}