import React, { useState, useEffect } from "react";

/* コンポーネント */
import TodoItem from "./TodoItem";
import Input from "./Input";
import Filter from "./Filter";
import { auth, db, storage } from "../lib/firebase.js";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import firebase from "firebase/compat";

/* カスタムフック */
// import useStorage from '../hooks/storage';

/* ライブラリ */

function Todo({ user, setUser }) {
    // const [items, putItems, clearItems] = useStorage();

    const [items, setItems] = useState([]);
    const [filter, setFilter] = React.useState("ALL");
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [avt, setAvt] = useState(null);
    useEffect(() => {
        db.collection("users").onSnapshot((snapshot) => {
            snapshot.docs.map((doc) => {
                if (doc.data().uid == user.uid) {
                    if (doc.data().image) {
                        setAvt(doc.data().image);
                    }
                }
            });
        });
        const unsubscribe = db.collection("todos").onSnapshot((snapshot) => {
            const documents = snapshot.docs.map((doc) => ({
                ...doc.data(),
                key: doc.id,
            }));

            setItems(documents);
        });

        return unsubscribe;
    }, []);

    const handleLogout = () => {
        setUser(null);
        auth.signOut();
    };
    const displayItems = items.filter((item) => {
        if (filter === "ALL") return true;
        if (filter === "TODO") return !item.done;
        if (filter === "DONE") return item.done;
    });

    const handleCheck = (checked) => {
        const newItems = items.map((item) => {
            if (item.key === checked.key) {
                item.done = !item.done;
            }
            return item;
        });
        setItems(newItems);
        newItems.forEach((item) => {
            db.collection("todos").doc(item.key).update(item);
        });
    };

    const handleAdd = (text) => {
        // putItems([...items, { key: getKey(), text, done: false }]);
        db.collection("todos").add({
            text,
            done: false,
        });
    };
    const handleDelete = () => {
        items.forEach((item) => {
            const key = item.key;
            db.collection("todos").doc(key).delete();
        });
    };
    const handleUpload = async (e) => {
        const file = e.target.files[0];
        console.log(file);
        // const ref = firebase.storage().ref().child(`/images/${file.name}`);
        // try {
        //     await ref.put(file);
        //     setAvt(await ref.getDownloadURL());
        // } catch (err) {
        //     console.log(err);
        // }
        const storageRef = ref(storage, `/files/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask.on(
            "state_changed",
            (snapshot) => {},
            (err) => console.log(err),
            () => {
                // download url
                getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                    console.log(url);
                    setAvt(url);
                    db.collection("users").onSnapshot((snapshot) => {
                        snapshot.docs.map((doc) => {
                            if (doc.data().uid == user.uid) {
                                db.collection("users")
                                    .doc(doc.id)
                                    .update({
                                        ...doc.data(),
                                        image: url,
                                    });
                            }
                        });
                    });
                });
            }
        );
        setIsOpenModal(false);
    };

    const handleFilterChange = (value) => setFilter(value);

    return (
        <article class="panel is-danger">
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                {!avt ? (
                    <button
                        className="button is-primary is-inverted"
                        onClick={() => setIsOpenModal(true)}
                    >
                        <span className="icon">
                            <i className="fas fa-user"></i>
                        </span>
                    </button>
                ) : (
                    <div
                        style={{
                            width: "50px",
                            height: "50px",
                            borderRadius: "15px",
                        }}
                    >
                        <img src={avt}></img>
                    </div>
                )}
                {isOpenModal && (
                    <div className="modal is-active">
                        <div className="modal-background"></div>
                        <div className="modal-card">
                            <header className="modal-card-head">
                                <p className="modal-card-title">Modal title</p>
                                <button
                                    aria-label="close"
                                    onClick={() => setIsOpenModal(false)}
                                >
                                    <span class="icon is-small">
                                        <i class="fas fa-times"></i>
                                    </span>
                                </button>
                            </header>
                            <section className="modal-card-body">
                                <div className="file ">
                                    <label className="file-label">
                                        <input
                                            className="file-input"
                                            type="file"
                                            onChange={handleUpload}
                                        />
                                        <span className="file-cta">
                                            <span className="file-icon">
                                                <i className="fas fa-upload"></i>
                                            </span>
                                            <span className="file-label">
                                                Choose a file…
                                            </span>
                                        </span>
                                    </label>
                                </div>
                            </section>
                        </div>
                    </div>
                )}
                {user.displayName}
                <button
                    className="button is-primary is-inverted"
                    onClick={handleLogout}
                >
                    Logout
                </button>
            </div>
            <div className="panel-heading">
                <span class="icon-text">
                    <span class="icon">
                        <i class="fas fa-calendar-check"></i>
                    </span>
                    <span> ITSS Todoアプリ</span>
                </span>
            </div>
            <Input onAdd={handleAdd} />
            <Filter onChange={handleFilterChange} value={filter} />
            {displayItems.map((item) => (
                <TodoItem key={item.key} item={item} onCheck={handleCheck} />
            ))}
            <div className="panel-block">{displayItems.length} items</div>
            <div className="panel-block">
                <button
                    className="button is-light is-fullwidth"
                    onClick={handleDelete}
                >
                    全てのToDoを削除
                </button>
            </div>
        </article>
    );
}
export default Todo;
