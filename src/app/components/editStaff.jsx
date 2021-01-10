import React, { useState } from 'react';
import { toast } from 'react-toastify';
import StaffCard from './staff';
import * as socials from '../pages/singular/util/socials.js';
import * as axios from 'axios';

export default function EditStaff({ name, avatar, social, about }) {

    const [tempAbout, setTempAbout] = useState(about);
    const [tempSocial, setTempSocial] = useState(social);

    const socialsChange = (name, value) => {
        if(value.length < 1) {
            const {[name]: v, ...rest} = tempSocial;
            return setTempSocial(rest);
        }
        setTempSocial({ ...tempSocial, [name]: value });
    }

    const saveChanges = () => {
        axios({
            url: `/api/${window.location.pathname.split("/")[1]}/staff`,
            method: 'PUT',
            data: {
                about: tempAbout,
                socials: tempSocial
            }
        }).then(() => {
            window.location.reload();
        }).catch(e => {
			toast.error("There was an issue while trying to update your staff card.", {
				position: "top-right",
				autoClose: 10000,
				hideProgressBar: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				toastId: 'noStaff'
			});
        });
    }

    return (
        <div id="edit-staff-modal">
            <h1 id="edit-staff-modal-title">Editing your staff card.</h1>
            <div id="edit-staff-modal-content">
                <div id="edit-staff-modal-content-preview">
                    <StaffCard name={name} avatar={avatar} social={tempSocial} about={tempAbout}/>
                    <span id="edit-staff-modal-content-preview-save" onClick={saveChanges}>Save changes</span>
                </div>
                <div id="edit-staff-modal-content-info">
                    <textarea defaultValue={about} onChange={(e) => setTempAbout(e.target.value)}></textarea>
                    {Object.entries(socials).map(([socialName, socialLink], i) => (
                        <div className="input-group" key={i}>
                            <div className="input-group-image" style={{ backgroundImage: `url("${socialLink}")` }}></div>
                            <input defaultValue={social[socialName] ? social[socialName] : ''} onChange={(e) => socialsChange(socialName, e.target.value)}/>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}