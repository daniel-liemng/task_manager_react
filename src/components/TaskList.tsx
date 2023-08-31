import * as dayjs from 'dayjs';
import { FaTrash } from 'react-icons/fa';

import { Task } from '../interface/Task';

interface TaskListProps {
  tasks: Task[];
  onDelete: (id: number) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onDelete }) => {
  return (
    <>
      <table className='table-auto text-white w-full'>
        <thead>
          <tr>
            <th className='text-left'>Title</th>
            <th className='text-left'>Due Date</th>
            <th className='text-left'>Category</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {tasks && tasks.length > 0 ? (
            tasks.map((task: Task) => (
              <tr key={task.id}>
                <td>{task.title}</td>
                <td>{dayjs(task.dueDate).format('DD-MM-YYYY')}</td>
                <td>{task.category}</td>
                <td>
                  <button
                    type='button'
                    onClick={() => onDelete(task.id)}
                    className='bg-red-500 p-1 rounded-full'
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td></td>
              <td className='text-center'>No tasks yet</td>
              <td></td>
              <td></td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
};

export default TaskList;
