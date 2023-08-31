import { useState } from 'react';

import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import { Task } from './interface/Task';

const App = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const handleAddTask = (task: Omit<Task, 'id'>, reset: () => void) => {
    const newTask: Task = {
      id: Math.floor(Math.random() * Date.now()),
      title: task.title,
      dueDate: task.dueDate,
      category: task.category,
    };

    setTasks([...tasks, newTask]);
    reset();
  };

  const handleDeleteTask = (id: number) => {
    const newTasks = tasks.filter((task) => task.id !== id);
    setTasks(newTasks);
  };

  console.log('aaa', tasks);

  return (
    <div className='w-full h-screen p-3'>
      <div className='flex gap-7 flex-wrap p-5 w-full h-full border rounded-lg'>
        <div className='w-1/3'>
          <TaskForm onAddTask={handleAddTask} />
        </div>
        <div className='flex-1'>
          <TaskList tasks={tasks} onDelete={handleDeleteTask} />
        </div>
      </div>
    </div>
  );
};

export default App;
