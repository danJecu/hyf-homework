import Todo from './Todo';

export default function ListToDos({ todos }) {
    return (
        <ul className='todos-container'>
            {todos.map(todo => (
                <Todo title={todo.title} date={todo.date} />
            ))}
        </ul>
    );
}
