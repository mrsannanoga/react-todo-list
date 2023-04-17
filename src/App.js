import { useState, useEffect } from 'react';
import './App.css';
import Form from "./components/Form";
import TodoList from './components/TodoList';

function App() {

  //States
  const [inputText, setInputText] = useState("");
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState("all");
  const [filteredTodos, setFilteredTodos] = useState([]);

  // useEffect run once when app starts
  useEffect(() => {
    getLocalTodos();
    
  }, []);

  //UseEffect
  useEffect(() => {
    filterHandler();
    saveLocalTodos();
   
  }, [todos, status]);

  
  //Functions

  const filterHandler = () => {
    switch (status) {
      case 'completed':
        setFilteredTodos(todos.filter(todo => todo.completed === true));
        break;
      case 'uncompleted':
        setFilteredTodos(todos.filter(todo => todo.completed === false));
        break;
      default:
        setFilteredTodos(todos);
        break;
    };
  };

  const saveLocalTodos = () => {

    localStorage.setItem("todos", JSON.stringify(todos));

  };

  const getLocalTodos = () => {
   
    if (localStorage.getItem("todos") === null) {
      localStorage.setItem("todos", JSON.stringify([]));
    } else {
     let todoLocal = JSON.parse(localStorage.getItem("todos"));
     setTodos(todoLocal);
     console.log(todoLocal);
    }
  };

  return (
    <div className="App">
      <header>
        <h1>Anna's todo list</h1>
      </header>
      <Form
        todos={todos}
        setTodos={setTodos}
        inputText={inputText}
        setInputText={setInputText}
        // status={status}
        setStatus={setStatus}

      />
      <TodoList
        filteredTodos={filteredTodos}
        setTodos={setTodos}
        todos={todos}

      />
    </div>
  );
}

export default App;
