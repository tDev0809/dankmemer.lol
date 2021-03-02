import React from 'react';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'assets/styles/pages/control/mods/inspect.scss';
import ControlCard from '../../../components/controlCard';

function Analytics(props) {
	return (
		<div id="mods-inspect">
            <h1 id="mods-inspect-title">Support channel analytics</h1>
            <iframe 
                style={{ border: "none" }}
                src="https://p.datadoghq.com/sb/a5f739cb1-ecdcf8cfecaf46c432ed77dd64cf7edc?from_ts=1614075099009&live=true&theme=dark&to_ts=1614679899009&tv_mode=true"
                width="1280"
                height="720"
            />
		</div>
	)
}

export default connect(store => store.login, null)(Analytics);
