import { auth } from "../config/firebase";
import { getAuth,createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { useState } from "react";
import {useNavigate} from "react-router-dom";

export const Auth = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate= useNavigate();
    // const [logat, setlogare]= useState("false");

    const signIn = async () => {
        try {
            const auth=getAuth();
            await createUserWithEmailAndPassword(auth, email, password);
            // setlogare(true);
            alert("Welcome " + auth?.currentUser?.email + " !");
            navigate("/Discover");
        } catch (err) {
            console.error(err);
        }
    };

    // const elogat = async () => {
    //     return {logat};
    // }

    const logout = async () => {
        try {
            await signOut(auth);
            alert("You signed out succesfully!");
            navigate("/Discover");
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div id="container">
            <div id="header">
                <div id="text">Sign up </div>
            </div>
            <input id="inp"
                placeholder="Email..."
                onChange={(e) => setEmail(e.target.value)}
            />
            <input id="inp"
                placeholder="Password..."
                type="password"
                onChange={(e) => setPassword(e.target.value)}
            />
            <div id="submit">
            <button id="btn" onClick={signIn}> Sign In</button>
            <button id="btn" onClick={logout}> Sign Out </button>
            </div>
        </div>

    );
};
