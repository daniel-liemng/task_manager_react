import { useState, useEffect } from 'react';

import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import { Task } from './interface/Task';
import TaskFilter from './components/TaskFilter';

// const taskData = [
//   { id: 1, title: 'Task 1', dueDate: '09-08-2023', category: 'Work' },
//   { id: 2, title: 'Task 2', dueDate: '09-08-2023', category: 'Personal' },
//   { id: 3, title: 'Task 3', dueDate: '09-08-2023', category: 'School' },
//   { id: 4, title: 'Task 4', dueDate: '09-08-2023', category: 'Work' },
// ];

const getTaskFromLocalStorage = () => {
  const localTasks = localStorage.getItem('tasks');
  return localTasks ? JSON.parse(localTasks) : [];
};

const App = () => {
  const [tasks, setTasks] = useState<Task[]>(getTaskFromLocalStorage());

  const [searchTerm, setSearchTerm] = useState<string>('All');
  const [filteredTasks, setFilteredTasks] = useState<Task[]>(tasks);

  const connvertedTasks = (taskArr: any[]): Task[] => {
    return taskArr.map((task: any) => ({
      id: task.id,
      title: task.title,
      dueDate: new Date(task.dueDate),
      category: task.category,
    }));
  };

  useEffect(() => {
    if (searchTerm === 'All') {
      // setFilteredTasks(tasks);
      setFilteredTasks(connvertedTasks(tasks));
    } else {
      const newTasks = tasks.filter((task) =>
        task.category.includes(searchTerm)
      );
      // setFilteredTasks(newTasks);
      setFilteredTasks(connvertedTasks(newTasks));
    }
  }, [tasks, searchTerm]);

  const handleAddTask = (task: Omit<Task, 'id'>, reset: () => void) => {
    const newTask: Task = {
      id: Math.floor(Math.random() * Date.now()),
      title: task.title,
      dueDate: task.dueDate,
      category: task.category,
    };
    const newTasks = [...tasks, newTask];

    setTasks(newTasks);
    localStorage.setItem('tasks', JSON.stringify(newTasks));
    reset();
  };

  const handleDeleteTask = (id: number) => {
    const newTasks = tasks.filter((task) => task.id !== id);
    setTasks(newTasks);
  };

  const handleSearchByCategory = (category: string) => {
    setSearchTerm(category);
  };

  console.log('88899', filteredTasks);

  return (
    <div className='w-full h-screen p-3'>
      <div className=' p-5 w-full h-full border rounded-lg'>
        <h2 className='text-3xl text-center text-orange-500 font-semibold mb-5 uppercase'>
          Task Manager
        </h2>
        <div className='flex gap-7 flex-wrap'>
          <div className='w-[350px]'>
            <TaskForm onAddTask={handleAddTask} />
          </div>
          <div className='flex-1'>
            <TaskFilter onSearchByCategory={handleSearchByCategory} />
            <TaskList tasks={filteredTasks} onDelete={handleDeleteTask} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
