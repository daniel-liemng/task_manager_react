import categories from '../categories';

interface TaskFilterProps {
  onSearchByCategory: (category: string) => void;
}

const TaskFilter: React.FC<TaskFilterProps> = ({ onSearchByCategory }) => {
  const allCategories = ['All', ...categories];

  return (
    <div className='mt-2 mb-5'>
      <h3 className='text-xl text-orange-500 mb-2'>Search By Category</h3>
      <select
        className='p-2 rounded-lg w-full'
        onChange={(e) => onSearchByCategory(e.target.value)}
      >
        <option value='' disabled>
          Please select one
        </option>
        {allCategories.map((category, index) => (
          <option value={category} key={index}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
};

export default TaskFilter;
