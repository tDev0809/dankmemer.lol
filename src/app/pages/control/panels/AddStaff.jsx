import React, { useState } from 'react';
import * as axios from 'axios';
import { toast } from 'react-toastify';

export default function AddStaff() {

    const [accountID, setAccountID] = useState(0);
    const [category, setCategory] = useState("Moderators");

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
		<div className="admin-panel large">
			<h3>Add Staff Member</h3>
			<div className="admin-panel-input-group">
            <label>Category</label>
				<select onChange={(e) => setCategory(e.target.value)}>
                    <option value="Moderators">Moderator</option>
                    <option value="Honorable Mentions">Honorable Mention</option>
                    <option value="Server Management">Server Management</option>      
                    <option value="Developers">Developer</option>
				</select>
			</div>
			<input type="text" placeholder="User ID" onChange={(e) => setAccountID(e.target.value)}/>
			<p className="admin-panel-button" onClick={() => submit()}>Add</p>
		</div>
    )
}