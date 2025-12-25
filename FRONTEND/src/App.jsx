import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [todo, setTodo] = useState([])
  const [task, setTask] = useState('')

  useEffect(() => {
    getTodos();
  }, [])


  const getTodos = async () => {
    try {
      const res = await fetch('http://localhost:4008/todo')
      const data = await res.json()
      setTodo(data)
    }
    catch (err) {
      console.log(err);
    }
  }




  function addTodo() {
    if (!task.trim()) {
      return;
    }
    fetch('http://localhost:4008/todo/add', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: task })
    }).then(() => {
      setTask("");
      return fetch('http://localhost:4008/todo').then(res => res.json()).then(data => setTodo(data));
    })

  }

  const deleteTodo = (id) => {
    fetch(`http://localhost:4008/todo/delete/${id}`, {
      method: "DELETE"
    }).then(() => {
      setTodo(todo.filter(t => t._id != id))
    })
  }

  const completeTodo = (id) => {
    fetch(`http://localhost:4008/todo/complete/${id}`, {
      method: "PUT"
    })
      .then(res => res.json())
      .then((updated) => {
        setTodo(oldTodos =>
          oldTodos.map(t =>
            t._id === updated._id ? updated : t
          )
        );
      });
    }


    return (
      <div>
        <div className='TodoBox'>
          <h1>Todo App</h1>
          <input type="text" placeholder="Enter a task" value={task} onChange={(e) => setTask(e.target.value)} style={{ padding: "10px", width: "300px", border: "2px solid black" }}></input>


          <button id='addButton' onClick={addTodo}>Add</button>
        </div>
        <div id = "taskList">
          {todo.map(to => {
            return (
              <div key={to._id}>
                <div id = "taskBox">
                <button onClick={() => completeTodo(to._id)} id = "tickButton">✓</button>
                <p style={{ textDecoration: to.completed ? "line-through" : "none" , marginLeft: "10px" }}>{to.name}</p>
                <button onClick={() => deleteTodo(to._id)} id= "deleteButton">X</button>
                </div>
              </div>

            )
          })}
        </div>


      </div>
    )
}

  export default App
