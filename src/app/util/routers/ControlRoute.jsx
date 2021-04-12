import React, { Suspense } from "react";
import { Route } from 'react-router-dom';
import ControlPanelController from '../../pages/control/controller';

export default function ControlRoute({ path, exact, strict, view }) {
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