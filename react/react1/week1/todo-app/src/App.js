import Header from './components/Header';
import ListTodos from './components/ListTodos';

export default function App() {
    const todos = [
        {
            title: 'Write homework for react class',
            date: '10-02/2023',
        },
        {
            title: 'Buy food for meal prep',
            date: '8-02/2023',
        },
        {
            title: 'Meet family for dinner',
            date: '11-02/2023',
        },
    ];
    return (
        <div className='app-container'>
            <Header title={'Todo List'} />
            <ListTodos todos={todos} />
        </div>
    );
}
