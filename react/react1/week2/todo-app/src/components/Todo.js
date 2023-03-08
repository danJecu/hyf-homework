import { useState } from 'react';

export default function Todo({ todo, handleDelete }) {
    const [checked, setChecked] = useState(false);

    return (
        <li className='todo-item' id={todo.id}>
            <span
                style={{
                    textDecoration: checked ? 'line-through' : 'none',
                }}
            >
                {todo.description}
            </span>

            <input
                type='checkbox'
                checked={checked}
                onChange={() => setChecked(!checked)}
            />
            <button onClick={() => handleDelete(todo.id)}>Delete</button>
        </li>
    );
}
