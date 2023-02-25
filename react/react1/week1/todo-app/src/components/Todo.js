export default function Todo({ todo }) {
    return (
        <li className='todo-item'>
            {todo.title} - {todo.date}
        </li>
    );
}
