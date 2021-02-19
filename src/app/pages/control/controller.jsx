import React, { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import Logo from 'assets/img/memer.png';

// Views
import AdminAccess from './admin/access';

export default function ControlPanelController(props) {
    const [isLoaded, setIsLoaded] = useState(false);
    const [componentToRender, setComponentToRender] = useState(null);

    useEffect(() => {
        if(!componentToRender || !props.view) return
        setIsLoaded(true);
    }, [componentToRender])

    useEffect(() => {
        console.log(props);
        switch(props.view) {
            case 'admin:access':
                setComponentToRender(<AdminAccess />);
                break;
            default:
                setComponentToRender(<h1>{props.view}</h1>)
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
            : 'Loading'}
        </div>
    );
}