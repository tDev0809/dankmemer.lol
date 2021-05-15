import React, { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import Logo from 'assets/img/memer.png';
import 'react-toastify/dist/ReactToastify.css';
import 'assets/styles/pages/control/control.scss';
import DiscordLogin from '../../components/discordLogin';

// Views
import AdminAccess from './admin/access';
import AdminUsers from './admin/users';
import AdminWebsite from './admin/website';
import AdminBlogs from './admin/blogs';

import ModsInspect from './mods/inspect';
import ModsAnalytics from './mods/analytics';
import PersonalizeCard from './personalization/card';

function ControlPanelController(props) {
    const [isLoaded, setIsLoaded] = useState(false);
    const [componentToRender, setComponentToRender] = useState(null);
    const [overrideMargin, setOverrideMargin] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        if(!componentToRender || !props.view) return
        setIsLoaded(true);
    }, [componentToRender])

    useEffect(() => {
        if(!props.pending && !props.loggedIn) return;
        if(!props.pending && props.loggedIn && ((props.view.includes("admin") && !props.isAdmin) || (props.view.includes("mods") && !props.isModerator))) return window.location.href = "https://www.youtube.com/watch?v=2ocykBzWDiM";
        switch(props.view) {
            case 'none:determine': 
                if(props.isAdmin) return window.location.replace('/control/admin/access')
                else if(props.isModerator) return window.location.replace('/control/mods/inspect')
            case 'admin:access':
                setComponentToRender(<AdminAccess />);
                break;
            case 'admin:users':
                setComponentToRender(<AdminUsers />);
                break;
            case 'admin:website':
                setComponentToRender(<AdminWebsite />);
                break;
            case 'admin:blogs':
                setComponentToRender(<AdminBlogs />);
                setOverrideMargin(true);
                break;
            case 'mods:inspect':
                setComponentToRender(<ModsInspect />);
                break;
            case 'mods:analytics':
                setComponentToRender(<ModsAnalytics />);
                break;
            case 'personalize:card':
                setComponentToRender(<PersonalizeCard />);
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
                    <nav id="mobile-nav">
                        <Link id="nav-logo-container" to="/">
                            <img src="nav-logo" src={Logo} width="60" />
                        </Link>
                        <ul id="mobile-nav-links">
                            {props.isAdmin ?
                                <>
                                    <li><NavLink to="/control/admin/access">Access control</NavLink></li>
                                    <li><NavLink to="/control/admin/users">User control</NavLink></li>
                                    <li><NavLink to="/control/admin/website">Website management</NavLink></li>
                                    <li><NavLink to="/control/admin/blogs">Blog management</NavLink></li>                                
                                    <li><NavLink to="/control/mods/inspect">Inspect a user</NavLink></li>
                                    <li><NavLink to="/control/mods/analytics">Support analytics</NavLink></li>
                                </>
                            : props.isModerator ? 
                                <>
                                    <li><NavLink to="/control/mods/inspect">Inspect a user</NavLink></li>
                                    <li><NavLink to="/control/mods/analytics">Support analytics</NavLink></li>
                                </>
                            : ''}
                        </ul>
                        <div id="mobile-nav-right">
                            <div id="mobile-nav-right-hamburger">
                                <span onClick={() => { setDropdownOpen(false); setMenuOpen(!menuOpen) }} className="material-icons">menu</span>
                                {menuOpen ? 
                                    <div id="mobile-nav-right-hamburger-links">
                                        <ul>
                                            {props.isAdmin ?
                                                <>
                                                    <li><NavLink to="/control/admin/access">Access control</NavLink></li>
                                                    <li><NavLink to="/control/admin/users">User control</NavLink></li>
                                                    <li><NavLink to="/control/admin/website">Website management</NavLink></li>
                                                    <li><NavLink to="/control/admin/blogs">Blog management</NavLink></li>                                
                                                    <li><NavLink to="/control/mods/inspect">Inspect a user</NavLink></li>
                                                    <li><NavLink to="/control/mods/analytics">Support analytics</NavLink></li>
                                                    <li><NavLink to="/control/personalize/card">Card appearance</NavLink></li>
                                                </>
                                            : props.isModerator ? 
                                                <>
                                                    <li><NavLink to="/control/personalize/card">Card appearance</NavLink></li>
                                                    <li><NavLink to="/control/mods/inspect">Inspect a user</NavLink></li>
                                                    <li><NavLink to="/control/mods/analytics">Support analytics</NavLink></li>
                                                </>
                                            : ''}
                                        </ul>
                                    </div>
                                : ''}
                            </div>
                            <div id="mobile-nav-right-account" onClick={() => { setMenuOpen(false); setDropdownOpen(!dropdownOpen) }}>
                                <div id="mobile-nav-right-account-info">
                                    <img id="mobile-nav-right-account-info-avatar" src={`https://cdn.discordapp.com/avatars/${props.id}/${props.avatar}`} width="48" />
                                </div>
                            </div>
                        </div>
                        {dropdownOpen ?
                            <div id="nav-account-dropdown">
                                <ul>
                                    <li><NavLink to="/control/personalize/card">Card appearance</NavLink></li>
                                    <li><a href="/oauth/logout">Logout</a></li>
                                </ul>
                            </div>
                        : ''}
                    </nav>
                    <nav id="desktop-nav">
                        <Link id="nav-logo-container" to="/">
                            <img src="nav-logo" src={Logo} width="160" />
                        </Link>
                        {props && props.isAdmin ?
                            <>
                                <div className="nav-category">
                                    <h3 className="nav-category-heading">Administration</h3>
                                    <ul className="nav-category-links">
                                        <li><NavLink to="/control/admin/access">Access control</NavLink></li>
                                        <li><NavLink to="/control/admin/users">User control</NavLink></li>
                                        <li><NavLink to="/control/admin/website">Website management</NavLink></li>
                                        <li><NavLink to="/control/admin/blogs">Blog management</NavLink></li>
                                    </ul>
                                </div>
                                <div className="nav-category">
                                    <h3 className="nav-category-heading">Moderation</h3>
                                    <ul className="nav-category-links">
                                        <li><NavLink to="/control/mods/inspect">Inspect a user</NavLink></li>
                                        <li><NavLink to="/control/mods/analytics">Support analytics</NavLink></li>
                                    </ul>
                                </div>
                            </>
                        : props && props.isModerator ?
                            <div className="nav-category">
                                <h3 className="nav-category-heading">Moderation</h3>
                                <ul className="nav-category-links">
                                    <li><NavLink to="/control/mods/inspect">Inspect a user</NavLink></li>
                                    <li><NavLink to="/control/mods/analytics">Support analytics</NavLink></li>
                                </ul>
                            </div>
                        : ''  }
                        <div className="nav-category">
                            <h3 className="nav-category-heading">Personalization</h3>
                            <ul className="nav-category-links">
                                <li><NavLink to="/control/personalize/card">Card appearance</NavLink></li>
                            </ul>
                        </div>
                        <div id="nav-account">
                            <div id="nav-account-info">
                                <img id="nav-account-info-avatar" src={`https://cdn.discordapp.com/avatars/${props.id}/${props.avatar}`} width="48" />
                                <div id="nav-account-info-user">
                                    <p id="nav-account-info-user-name">{props.username}</p>
                                    <p id="nav-account-info-user-discrim">#{props.discriminator}</p>
                                </div>
                            </div>
                            <div id="nav-account-actions">
                                <a href="/oauth/logout"><span title="Logout" className="material-icons">logout</span></a>
                            </div>
                        </div>
                    </nav>
                    <div id="content-container" className={overrideMargin ? 'no-margin' : ''}>
                        {componentToRender}
                    </div>
                    <ToastContainer />
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