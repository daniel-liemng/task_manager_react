import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';

const App = () => {
  return (
    <div className='w-full h-screen p-3'>
      <div className='flex gap-5 flex-wrap p-5 w-full h-full border rounded-lg'>
        <div className='w-1/3'>
          <TaskForm />
        </div>
        <div className='flex-1'>
          <TaskList />
        </div>
      </div>
    </div>
  );
};

export default App;
