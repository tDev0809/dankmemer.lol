import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import StaffCard from '../../../components/staff';
import '../../../assets/styles/pages/control/personalization/card.scss'
import * as socials from '../../singular/util/socials.js';
import * as axios from 'axios';

function PersonalizeCard(props) {

    const [username, setUsername] = useState(props.username);
    const [avatar, setAvatar] = useState(`https://cdn.discordapp.com/avatars/${props.id}/${props.avatar}`);
    const [social, setSocial] = useState({});

    const [tempPfp, setTempPfp] = useState("");
    const [tempAbout, setTempAbout] = useState("");
    const [tempSocial, setTempSocial] = useState({});

    useEffect(() => {
        axios({
            url: `/api/staff?id=${props.id}`,
            method: 'GET'
        }).then(({ data: user }) => {
            user = user[0];
            setTempPfp(user.avatar);
            setTempAbout(user.about);
            setTempSocial(user.social);
            setUsername(user.username);
            setSocial(user.social);
        }).catch((e) => {
            console.group("Unable to retrieve staff card information.");
            console.error(e.message);
            console.groupEnd();
        }) 
    }, []);


    const socialsChange = (name, value) => {
        if(value.length < 1) {
            const {[name]: v, ...rest} = tempSocial;
            return setTempSocial(rest);
        }
        setTempSocial({ ...tempSocial, [name]: value });
    }

    const saveChanges = () => {
        axios({
            url: `/api/${props.isAdmin ? 'admin' : 'mods'}/staff`,
            method: 'PUT',
            data: {
                avatar: tempPfp,
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
        <div id="personalize-card">
            <h1 id="personalize-card-title">Personalize your staff card.</h1>
            <div id="personalize-card-content">
                <div id="personalize-card-content-preview">
                    <StaffCard name={username} avatar={tempPfp} social={tempSocial} about={tempAbout}/>
                    <input className="input-singular" defaultValue={tempPfp.includes('cdn.discord') ? '' : tempPfp} onChange={(e) => setTempPfp(e.target.value || avatar)} placeholder={`Custom card picture`}/>
                    <span id="personalize-card-content-preview-save" className="hide-mobile" onClick={saveChanges}>Save changes</span>          
                </div>
                <div id="personalize-card-content-info">
                    <textarea defaultValue={tempAbout} onChange={(e) => setTempAbout(e.target.value)}></textarea>
                    {Object.entries(socials).map(([socialName, socialLink], i) => (
                         <div className="input-group"key={i}>
                            <div className="input-group-image" style={{ backgroundImage: `url("${socialLink}")` }}></div>
                            <input defaultValue={social[socialName] ? social[socialName] : ''} onChange={(e) => socialsChange(socialName, e.target.value)} placeholder={`Your ${socialName.toLowerCase()} ${socialName.toLowerCase() !== 'website' ? socialName.toLowerCase() !== 'discord' ? 'account ' : 'server ' : ''}URL`}/>
                        </div>
                    ))}
                </div>
                <span id="personalize-card-content-preview-save" className="show-mobile" onClick={saveChanges}>Save changes</span>
            </div>
        </div>
    )
}

export default connect(store => store.login, null)(PersonalizeCard)