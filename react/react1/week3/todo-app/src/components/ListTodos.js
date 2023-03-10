import { useContext } from 'react';
import { ToDosContext } from '../contexts/ToDosContext';

// components
import Todo from './Todo';
import BorderWrapper from './BorderWrapper';

export default function ListToDos() {
  const { todos } = useContext(ToDosContext);

  if (!todos.length) {
    return <div className="todos-container">There are no todos left!</div>;
  }

  return (
    <ul className="todos-container">
      {todos.map((todo) => (
        <BorderWrapper key={todo.id}>
          <Todo todo={todo} />
        </BorderWrapper>
      ))}
    </ul>
  );
}
