const TaskList = () => {
  return (
    <>
      <table className='table-auto text-white w-full'>
        <thead>
          <tr>
            <th>Title</th>
            <th>Due Date</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Witchy Woman</td>
            <td>The Eagles</td>
            <td>1972</td>
          </tr>
          <tr>
            <td>Shining Star</td>
            <td>Earth, Wind, and Fire</td>
            <td>1975</td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default TaskList;
