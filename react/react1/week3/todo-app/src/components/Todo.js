import PropTypes from 'prop-types';

import { useState, useContext } from 'react';
import { ToDosContext } from '../contexts/ToDosContext';

export default function Todo({ todo }) {
  const [checked, setChecked] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [descriptionValue, setDescriptionValue] = useState(todo.description);

  const { handleUpdate, handleDelete } = useContext(ToDosContext);

  const handleTodo = () => {
    if (descriptionValue) {
      handleUpdate({ ...todo, description: descriptionValue });
    }
    setDescriptionValue(todo.description);
    setIsEditing(false);
  };

  return (
    <li className="todo-container" id={todo.id}>
      <div
        className="todo-item"
        style={{
          textDecoration: checked ? 'line-through' : 'none',
        }}
      >
        {isEditing ? (
          <>
            <input
              type="text"
              value={descriptionValue}
              onChange={(e) => setDescriptionValue(e.target.value)}
              required
            />
            <button type="button" onClick={() => setIsEditing(false)}>
              Cancel
            </button>
          </>
        ) : (
          <>
            {todo.description} | {todo.deadline}
            <input
              type="checkbox"
              checked={checked}
              onChange={() => setChecked(!checked)}
            />
          </>
        )}
      </div>

      <div className="btn-container">
        {isEditing ? (
          <button
            type="button"
            onClick={handleTodo}
            style={{ backgroundColor: isEditing ? 'green' : 'red' }}
          >
            Save
          </button>
        ) : (
          <button
            type="button"
            onClick={() => setIsEditing(true)}
            disabled={checked}
          >
            Edit
          </button>
        )}
        <button onClick={() => handleDelete(todo.id)}>Delete</button>
      </div>
    </li>
  );
}

Todo.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    deadline: PropTypes.string.isRequired,
  }).isRequired,
};
