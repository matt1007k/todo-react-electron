import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

import AddTodo from './components/AppTodo';
import TodoList from './components/TodoList';

const API_URL = 'http://localhost:8000/api/todos';

class App extends Component {
  constructor(){
    super();

    this.state = {
      todos: []
    }
    this.deleteTodo = this.deleteTodo.bind(this);
    this.completeTodo = this.completeTodo.bind(this);
    this.createTodo = this.createTodo.bind(this);
  }

  componentDidMount(){
      axios.get(API_URL)
        .then(response => {
            this.setState({todos: response.data.todos});
            console.log(this.state.todos);
            
        })
        .catch(error => console.log(error));
  }

  deleteTodo(todoId){
    axios.post(`${API_URL}/delete`,{id: todoId})
      .then(response => {

        const todos = this.state.todos.filter((todo) => todo.id !== todoId);
        this.setState({todos});

      })
      .catch(error => console.log(error));
  }
  completeTodo(todoId){
    axios.post(`${API_URL}/complete`,{id: todoId})
    .then(() => {
      
       const todos = this.state.todos.map((todo) => {
          if (todo.id === todoId) {
            todo.completed = !todo.completed;
          }

          return todo;
       });
       this.setState({todos});

    }).catch(error => console.log(error));
  }

  createTodo(content){
    axios.post(API_URL, {content})
      .then((response) => {

        const todos = this.state.todos.concat([response.data]);
        this.setState({todos});
      })
  }

  render() {
    return (
      <div className="App">
        <AddTodo createTodo={this.createTodo} />
        <TodoList  
            todos={this.state.todos}
            completeTodo={this.completeTodo}
            deleteTodo={this.deleteTodo}
         />
      </div>
    );
  }
}

export default App;
