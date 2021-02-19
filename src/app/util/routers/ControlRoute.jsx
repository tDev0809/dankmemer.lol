import React, { Suspense } from "react";
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import ControlPanelController from '../../pages/control/controller';

function ControlRoute({ path, exact, strict, view }) {
    return (
        <Route
            exact={exact}
            strict={strict} 
            path={path} 
            component={() =>
                <Suspense fallback={<div></div>}>
                    <ControlPanelController view={view}/>
                </Suspense>}
        />
    )
}

export default connect(store => store.login, null)(ControlRoute);
