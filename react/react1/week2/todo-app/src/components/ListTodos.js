import Todo from './Todo';

export default function ListToDos({ todos, handleDelete }) {
    return (
        <ul className='todos-container'>
            {todos.map(todo => (
                <Todo todo={todo} handleDelete={handleDelete} key={todo.id} />
            ))}
        </ul>
    );
}
