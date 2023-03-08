import PropTypes from 'prop-types';

import { useState, useContext } from 'react';
import { ToDosContext } from '../contexts/ToDosContext';

export default function Todo({ todo }) {
  const [checked, setChecked] = useState(false);
  const [update, setUpdate] = useState(false);
  const [descriptionValue, setDescriptionValue] = useState(todo.description);

  const { handleDelete, handleAddUpdate } = useContext(ToDosContext);

  const handleUpdate = () => {
    if (descriptionValue) {
      handleAddUpdate({
        ...todo,
        description: descriptionValue,
      });
    }
    setDescriptionValue(todo.description);
    setUpdate(false);
  };

  return (
    <li className="todo-container" id={todo.id}>
      <div
        className="todo-item"
        style={{
          textDecoration: checked ? 'line-through' : 'none',
        }}
      >
        {update ? (
          <>
            <input
              type="text"
              value={descriptionValue}
              onChange={(e) => setDescriptionValue(e.target.value)}
              required
            />
            <button type="button" onClick={() => setUpdate(false)}>
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
        {update ? (
          <button
            type="button"
            onClick={handleUpdate}
            style={{ backgroundColor: update ? 'green' : 'red' }}
          >
            Save
          </button>
        ) : (
          <button type="button" onClick={() => setUpdate(true)} disabled={checked}>
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
