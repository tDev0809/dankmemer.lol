import React, { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import Logo from 'assets/img/memer.png';
import DiscordLogin from '../../components/discordLogin';

// Views
import AdminAccess from './admin/access';

function ControlPanelController(props) {
    const [isLoaded, setIsLoaded] = useState(false);
    const [componentToRender, setComponentToRender] = useState(null);

    useEffect(() => {
        if(!componentToRender || !props.view) return
        setIsLoaded(true);
    }, [componentToRender])

    useEffect(() => {
        if(!props.pending && !props.loggedIn) return;
        if(!props.pending && props.loggedIn && ((props.view.includes("admin") && !props.isAdmin) || (props.view.includes("mods") && !props.isModerator))) return window.location.href = "https://www.youtube.com/watch?v=2ocykBzWDiM";
        switch(props.view) {
            case 'admin:access':
                setComponentToRender(<AdminAccess />);
                break;
            default:
                setComponentToRender(                
                    <div id="restricted">
                        <div id="restricted-content">
                            <h1 id="restricted-content-title">Restricted</h1>
                            <p id="restricted-content-body">The page you are trying to access is restricted. Please login to continue</p>
                            <DiscordLogin />
                        </div>
                    </div>
                )
        }
    }, [props])

    return (
        <div id="control-panel">
            {isLoaded ?
                <>
                    <nav>
                        <Link id="nav-logo-container" to="/">
                            <img src="nav-logo" src={Logo} width="160" />
                        </Link>
                        <h3>Administration</h3>
                        <ul>
                            <li><NavLink to="/control/admin/access">Access control</NavLink></li>
                            <li><NavLink to="/control/admin/store">Store management</NavLink></li>
                            <li><NavLink to="/control/admin/users">User control</NavLink></li>
                        </ul>
                    </nav>
                    <div id="content-container">
                        {componentToRender}
                    </div>
                </>
            : 				
                <div id="restricted">
                    <div id="restricted-content">
                        <h1 id="restricted-content-title">Restricted</h1>
                        <p id="restricted-content-body">The page you are trying to access is restricted. Please login to continue</p>
                        <DiscordLogin />
                    </div>
                </div>
            }
        </div>
    );
}

export default connect(store => store.login, null)(ControlPanelController)