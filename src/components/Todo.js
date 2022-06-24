import React, { useState,useEffect } from 'react';

/* コンポーネント */
import TodoItem from './TodoItem';
import Input from './Input';
import Filter from './Filter';
import {db} from '../lib/firebase.js'
import {getDocs,collection,onSnapshot } from 'firebase/firestore'
import {getKey} from "../lib/util";
/* カスタムフック */
// import useStorage from '../hooks/storage';

/* ライブラリ */

function Todo() {
  // const [items, putItems, clearItems] = useStorage();
  
  const [items,setItems] = useState([])
  const [filter, setFilter] = React.useState('ALL');
  useEffect(()=>{
     const unsubscribe = db.collection('todos').onSnapshot((snapshot) => {
        const documents = snapshot.docs.map((doc) => ({
          ...doc.data(),
          key: doc.id,
        }));
  
        setItems(documents);
      });
  
      return unsubscribe;
  },[])

  const displayItems = items.filter(item => {
    if (filter === 'ALL') return true;
    if (filter === 'TODO') return !item.done;
    if (filter === 'DONE') return item.done;
  });
  
  const handleCheck = checked => {
    const newItems = items.map(item => {
      if (item.key === checked.key) {
        item.done = !item.done;
      }
      return item;
    });
    setItems(newItems)
  };
  
  const handleAdd = text => {
    // putItems([...items, { key: getKey(), text, done: false }]);
    db.collection('todos').add(
      {
        text,
        done: false
      }
    )
  };
  const handleDelete = () => {
    items.forEach(item => {
      const key = item.key
      db.collection('todos').doc(key).delete();
    })
  }
  
  const handleFilterChange = value => setFilter(value);

  return (
    <article class="panel is-danger">
      <div className="panel-heading">
        <span class="icon-text">
          <span class="icon">
            <i class="fas fa-calendar-check"></i>
          </span>
          <span> ITSS Todoアプリ</span>
        </span>
      </div>
      <Input onAdd={handleAdd} />
      <Filter
        onChange={handleFilterChange}
        value={filter}
      />
      {displayItems.map(item => (
        <TodoItem 
          key={item.key}
          item={item}
          onCheck={handleCheck}
        />
      ))}
      <div className="panel-block">
        {displayItems.length} items
      </div>
      <div className="panel-block">
        <button className="button is-light is-fullwidth" onClick={handleDelete}>
          全てのToDoを削除
        </button>
      </div>
    </article>
  )
}
export default Todo;