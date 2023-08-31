import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import categories from '../categories';
import { zodResolver } from '@hookform/resolvers/zod';

import { Task } from '../interface/Task';

const formSchema = z.object({
  title: z
    .string()
    .min(3, { message: 'Title must be at least 3 characters' })
    .max(50, { message: 'Title must not exceed 50 characters' }),
  // dueDate: z.string().datetime({ message: 'Invalid date' }),
  dueDate: z.coerce.date(),
  category: z.enum(categories),
});

type TaskFormData = z.infer<typeof formSchema>;

interface TaskFormProps {
  onAddTask: (task: Omit<Task, 'id'>, reset: () => void) => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ onAddTask }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TaskFormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit: SubmitHandler<TaskFormData> = (data) => {
    onAddTask(
      {
        title: data.title,
        dueDate: data.dueDate,
        category: data.category,
      },
      reset
    );
  };

  return (
    <div>
      <h3 className='text-2xl text-orange-500 text-center'>Create new task</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='mb-3'>
          <label
            htmlFor='title'
            className='block mb-1 font-semibold text-white'
          >
            Title
          </label>
          <input
            id='title'
            type='text'
            {...register('title')}
            className='p-2 rounded-lg w-full'
          />
          {errors.title && (
            <p className='mt-1 text-red-500'>{errors?.title?.message}</p>
          )}
        </div>

        <div className='mb-3'>
          <label
            htmlFor='dueDate'
            className='block mb-1 font-semibold text-white'
          >
            Due Date
          </label>
          <input
            id='dueDate'
            type='datetime-local'
            {...register('dueDate')}
            className='p-2 rounded-lg w-full'
          />
          {errors.dueDate && (
            <p className='mt-1 text-red-500'>Invalid date input</p>
          )}
        </div>

        <div className='mb-3'>
          <label
            htmlFor='category'
            className='block mb-1 font-semibold text-white'
          >
            Category
          </label>
          <select
            id='category'
            {...register('category')}
            className='p-2 rounded-lg w-full'
          >
            <option value=''>Please select one</option>
            {categories.map((category, index) => (
              <option value={category} key={index}>
                {category}
              </option>
            ))}
          </select>
          {errors.category && (
            <p className='mt-1 text-red-500'>Please select one category</p>
          )}
        </div>

        <div className='flex items-center gap-2 mt-5'>
          <button
            type='button'
            onClick={() => reset()}
            className='w-full py-2 text-white font-semibold bg-gray-500 rounded-lg'
          >
            Reset
          </button>
          <button
            type='submit'
            className='w-full py-2 text-white font-semibold bg-orange-500 rounded-lg'
          >
            Create
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;
