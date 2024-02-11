import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import {Navigate } from 'react-router-dom';

export default function ProtectedRoute(isAuth: isAuth, component: Component , ...rest) {
    return (
        <Route
        {...rest}
        render= {(props) => {
            if (isAuth) {
                return <Component />;
            }else{
                return(
                    <Navigate to= {{pathname: "/" , state: { from : props.location}}} />
                )
            }

        }}
        />
    )
}; 

