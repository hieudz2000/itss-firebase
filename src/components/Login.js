import React from "react";
import { auth, db } from "../lib/firebase";
import firebase from "../lib/firebase";
const ggProvideer = new firebase.auth.GoogleAuthProvider();
const Login = ({ setUser }) => {
    const loginWithGoogle = async () => {
        const { additionalUserInfo, user } = await auth.signInWithPopup(
            ggProvideer
        );
        if (additionalUserInfo.isNewUser) {
            db.collection("users").add({
                name: user.displayName,
                uid: user.uid,
            });
        }
        setUser(user);
    };
    return (
        <div
            style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
            }}
        >
            <button
                className="button is-primary is-inverted"
                onClick={loginWithGoogle}
            >
                <span className="icon">
                    <i className="fas fa-user"></i>
                </span>
                <h3> Login with Goole </h3>
            </button>
        </div>
    );
};

export default Login;
