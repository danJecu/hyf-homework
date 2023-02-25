import Todo from './Todo';

export default function ListToDos({ todos }) {
    return (
        <ul className='todos-container'>
            {todos.map(todo => (
                <Todo todo={todo} />
            ))}
        </ul>
    );
}
