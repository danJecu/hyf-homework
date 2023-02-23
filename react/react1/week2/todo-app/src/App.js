import { useState } from 'react';

import Header from './components/Header';
import Counter from './components/Counter';
import ListTodos from './components/ListTodos';

export default function App() {
  const [todos, setTodos] = useState([
    {
      id: 1,
      description: 'Get out of bed',
    },
    {
      id: 2,
      description: 'Brush teeth',
    },
    {
      id: 3,
      description: 'Eat breakfast',
    },
  ]);

  const handleDelete = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  return (
    <div className="app-container">
      <Header title={'Todo List'} />
      <Counter />
      <button
        className="btn-add"
        onClick={() =>
          setTodos([
            ...todos,
            {
              id: todos.length ? todos[todos.length - 1].id + 1 : 1,
              description: 'Lorem ipsum',
            },
          ])
        }
      >
        Add new Todo
      </button>
      {todos.length ? (
        <ListTodos todos={todos} handleDelete={handleDelete} />
      ) : (
        <h2>There are no Todos!</h2>
      )}
    </div>
  );
}
