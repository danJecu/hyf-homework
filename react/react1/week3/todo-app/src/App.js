import { ToDosProvider } from './contexts/ToDosContext';

// components
import Header from './components/Header';
import Counter from './components/Counter';
import FormToDo from './components/FormToDo';
import ListTodos from './components/ListTodos';

export default function App() {
  return (
    <ToDosProvider>
      <div className="app-container">
        <Header title={'Todo List'} />
        <Counter />
        <FormToDo />
        <ListTodos />
      </div>
    </ToDosProvider>
  );
}
