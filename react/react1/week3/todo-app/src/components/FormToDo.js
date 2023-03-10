import { useContext, useState } from 'react';
import { ToDosContext } from '../contexts/ToDosContext';

export default function FormToDo() {
  const { handleAdd, todos } = useContext(ToDosContext);
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const newToDo = {
      description,
      deadline,
      id: todos.length ? todos[todos.length - 1].id + 1 : 1,
    };

    handleAdd(newToDo);

    setDescription('');
    setDeadline('');
  };

  return (
    <form onSubmit={handleSubmit} className="form-todo">
      <input
        type="text"
        placeholder="Description"
        value={description}
        required
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="date"
        value={deadline}
        required
        min={new Date().toISOString().split('T')[0]} // set min to today's date
        onChange={(e) => setDeadline(e.target.value)}
      />
      <button className="btn-add">Add new Todo</button>
    </form>
  );
}
