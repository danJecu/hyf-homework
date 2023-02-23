export default function Todo({ title, date }) {
    return (
        <li className='todo-item'>
            {title} - {date}
        </li>
    );
}
