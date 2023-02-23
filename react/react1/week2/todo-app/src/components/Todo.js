import { useState } from 'react';

export default function Todo({ description, id, handleDelete }) {
  const [checked, setChecked] = useState(false);

  return (
    <li className="todo-item">
      <span
        style={{
          textDecoration: checked ? 'line-through' : 'none',
        }}
      >
        {description}
      </span>

      <input
        type="checkbox"
        checked={checked}
        onChange={() => (checked ? setChecked(false) : setChecked(true))}
      />
      <button onClick={() => handleDelete(id)}>Delete</button>
    </li>
  );
}
