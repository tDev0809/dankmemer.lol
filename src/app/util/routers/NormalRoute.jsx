import React, { Suspense } from "react";
import { Route } from 'react-router-dom';
import NavBar from '../../components/navbar.jsx';
import Footer from '../../components/footer.jsx';

export default function NormalRoute({ path, exact, strict, component }) {
    return (
        <Route
            exact={exact}
            strict={strict} 
            path={path} 
            component={() =>
                <Suspense fallback={<div></div>}>
                    <NavBar />
                    {component}
                    <Footer />
                </Suspense>}
        />
    )
}
