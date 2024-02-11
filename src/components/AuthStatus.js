import React from 'react'
import {useEffect, useState, useRef} from 'react'
import {getAuth, onAuthStateChanged} from 'firebase/auth'


export const AuthStatus = () => {
    const [loggedIn, setLoggedIn] = useState(false);
    const isMounted = useRef(true);
    useEffect(() => {
        if(isMounted){
            const auth = getAuth();
            console.log(auth.currentUser.email)
            onAuthStateChanged(auth, (user) => {
                if(user) {
                    setLoggedIn(true);
                }
            })
            return () => {
                isMounted.current = false
            }
    }
    }, [isMounted])


    return {loggedIn}
}