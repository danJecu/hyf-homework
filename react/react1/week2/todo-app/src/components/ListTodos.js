import Todo from './Todo';

export default function ListToDos({ todos, handleDelete }) {
  return (
    <ul className="todos-container">
      {todos.map((todo) => (
        <Todo
          key={todo.id}
          id={todo.id}
          description={todo.description}
          handleDelete={handleDelete}
        />
      ))}
    </ul>
  );
}
