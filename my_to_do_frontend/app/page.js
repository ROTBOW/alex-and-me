"use client"

import ItemCard from "@/components/itemCard";
import { useEffect, useState } from "react";


const Home = () => {
  const [todos, setTodos] = useState([]);
  const [doneTasks, setDoneTasks] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/tasks').then(
      dat => (dat.json())
    ).then(data => {
      data = Object.values(data);
      let td = [];
      let dt = [];

      for (let task of data) {
        if (task.finished) {
          dt.push(task);
        } else {
          td.push(task);
        }
      }

      setTodos(td);
      setDoneTasks(dt);
    })

  }, []);

  if (todos.length === 0 && doneTasks.length === 0) {
    return (
      <div>loading...</div>
    )
  }
  
  return (
    <main className="flex flex-col items-center mt-8 font-mono text-green-500">
      <h1 className="text-4xl">My To-Do list!</h1>

      <section className="mt-16 flex w-1/2 justify-between">

        <div>
          <h2 className="text-2xl animate-pulse">To Do!</h2>
          {
            todos.map(task => <ItemCard card={task}/>)
          }
        </div>

        <div>
          <h2 className="text-2xl animate-pulse">All Done!</h2>
          {
            doneTasks.map(task => <ItemCard card={task}/>)
          }
        </div>

      </section>
    </main>
  );
}

export default Home;