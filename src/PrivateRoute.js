import {AuthStatus} from './components/AuthStatus'
import {Outlet, Navigate } from 'react-router-dom';
// import {Auth} from './components/auth'
function PrivateRoute() {
    const { loggedIn} = AuthStatus();

    return (
        loggedIn ? <Outlet /> : <Navigate to = "/SignIn" />
    )
}; 

export default PrivateRoute;