import React from 'react'
import "./TodoListBackground.css";
import sunSvg from"../assets/images/icon-sun.svg"
import crossIcon from "../assets/images/icon-cross.svg"
import darkThemeSvg from "../assets/images/bg-desktop-dark.jpg"
import lightThemeSvg from "../assets/images/bg-desktop-light.jpg"
import moonSvg from "../assets/images/icon-moon.svg"
import { useState,useEffect } from 'react';
const TodoListBackground = () => {
  const[task,setTask] = useState("");
  const[todos,setTodos] = useState(()=>{
    return JSON.parse(localStorage.getItem("todos") || "[]")
  });
  const[isDarkMode,setIsDarkMode] = useState(false);
  const [filter,setFilter] = useState("All");
  const handleSubmission = (e)=>{
    e.preventDefault();
    const newTask = {
      id: Date.now(),
      task : task,
      completed : false
    }
    setTodos([...todos,newTask]);
    setTask("")
  }
  useEffect(()=>{
   localStorage.setItem("todos",JSON.stringify(todos))
  },[todos]);
  const toggleTask = (todo)=>{
    setTodos((prev) => (
      prev.map((item)=> item.id === todo ? {...item,completed : !item.completed} : item)
    ))
  }
  const deleteTodos = (todo)=>{
    setTodos((prev) => (
      prev.filter((item) => item.id !== todo)
    ))
  }
  const clearCompleted = ()=>{
    setTodos((prev) => prev.filter((todo) => !todo.completed))
  }
  const toggleSvg = ()=>{
    setIsDarkMode((prevMode) =>{
      const newMode = !prevMode;
    document.body.style.backgroundColor = newMode ? "hsl(235, 21%, 11%)" : "hsl(0,0%,98%)";
    document.body.style.color = newMode ? "hsl(0,0%,98%)" : "hsl(235, 21%, 11%)";
    return newMode
    })
  }
  
  const filterTodos = () =>{
       if(filter === "All") return todos;
       if(filter === "Active") return  todos.filter((todo) => !todo.completed);
       if(filter === "Completed") return todos.filter((todo) => todo.completed);
  }
  const filterdTodos = filterTodos();
  
  return (
    <>
<img src={isDarkMode ? darkThemeSvg : lightThemeSvg}  className='backgrund-image' alt='background-image'/>
    <section className='mt-5'>
    <div className='todo-image d-flex justify-content-between '>
<h1  className='todo-title'>TODO</h1>
<img src={isDarkMode ? sunSvg : moonSvg} className="pointer" alt={isDarkMode ? "light mode" : "Dark mode"} loading='lazy'  onClick={toggleSvg} />
</div>
<form onSubmit={handleSubmission}>
<input className={`todo-input  ${isDarkMode ? "black" : ""}` }  value={task} type="text" placeholder="Create a new todo..." onChange={(e)=>setTask(e.target.value)} />
</form>
<ul className='todo-display'>
  {filterdTodos.map((todo)=>(
  <li  className={`d-flex justify-content-between ${isDarkMode ? "white" : "black"}`} key={todo.id}>
    <div className=''>
    <input type="checkbox" checked={todo.completed}    onChange={()=>toggleTask(todo.id)} />
    <span className={`ms-2 fw-semibold  ${todo.completed ? (isDarkMode ? "checked" : "yeahChecked") : ""} `} >{todo.task}</span>
    </div>
    <button aria-label='Delete todo'  onClick={()=> deleteTodos(todo.id)}>
    <img  src={crossIcon} alt="Delete todo" loading='lazy'/>
  </button>
  </li>
  ))}
  <div className={`filterTodos d-flex justify-content-between ${isDarkMode ? "white" : "black"}`}>
  <p className='text-center'>{todos.filter(todo => !todo.completed).length} items left</p>
  <ul className={`d-flex`}>
    <li ><button aria-pressed={filter ==="All"} onClick={()=> setFilter("All")}>All</button></li>
    <li><button  aria-pressed={filter ==="Active"} onClick={()=> setFilter("Active")}>Active</button></li>
    <li><button disabled={todos.every((todo)=> !todo.completed)} aria-pressed={filter ==="Completed"} onClick={()=> setFilter("Completed")} >Completed</button></li>
  </ul>
  <button className='clear-completed' onClick={clearCompleted}>Clear Completed</button>
</div>
</ul>
    </section>
    </>
  )
}

export default TodoListBackground
