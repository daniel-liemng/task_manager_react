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

const App = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filteredTasks, setFilteredTasks] = useState<Task[]>(tasks);

  useEffect(() => {
    if (searchTerm === 'All') {
      setFilteredTasks(tasks);
    } else {
      const newTasks = tasks.filter((task) =>
        task.category.includes(searchTerm)
      );
      setFilteredTasks(newTasks);
    }
  }, [tasks, searchTerm]);

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

  const handleSearchByCategory = (category: string) => {
    setSearchTerm(category);
  };

  console.log('aaa', tasks);
  console.log('bbb', searchTerm);

  return (
    <div className='w-full h-screen p-3'>
      <div className='flex gap-7 flex-wrap p-5 w-full h-full border rounded-lg'>
        <div className='w-1/3'>
          <TaskForm onAddTask={handleAddTask} />
        </div>
        <div className='flex-1'>
          <TaskFilter onSearchByCategory={handleSearchByCategory} />
          <TaskList tasks={filteredTasks} onDelete={handleDeleteTask} />
        </div>
      </div>
    </div>
  );
};

export default App;
