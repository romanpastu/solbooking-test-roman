import { Route } from 'react-router-dom';
import React from 'react';
import { Redirect } from 'react-router';

export default ({component: Component, render: renderFn, authed, ...rest}) => {
    console.log(authed, "state of authed")
    return(
        <Route {...rest} render={props => (authed === true) ? renderFn(props) : <Redirect to={{ pathname: '/', state: { from: props.location } }} />} />
    )
}