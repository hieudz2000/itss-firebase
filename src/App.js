import React, { useEffect, useState } from "react";
import { auth } from "./lib/firebase";
/* スタイルシート */
import "./styles/main.css";

/* コンポーネント */
import Todo from "./components/Todo";
import Login from "./components/Login";

function App() {
    const [user, setUser] = useState(null);
    useEffect(() => {
        const unsubscribed = auth.onAuthStateChanged((user) => {
            console.log(user);
            if (user) {
                setUser(user);
                return;
            }
        });
        return () => {
            unsubscribed();
        };
    }, []);
    return (
        <div className="container is-fluid">
            {user ? (
                <Todo user={user} setUser={setUser} />
            ) : (
                <Login setUser={setUser} />
            )}
        </div>
    );
}

export default App;
