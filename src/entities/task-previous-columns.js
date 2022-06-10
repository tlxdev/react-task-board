export const initialState = {
  tasks: {}
};

export const setTaskPreviousColumns = (counter) => (task) => {
  const tasksClone = { ...counter.state.tasks, [task.id]: task };

  counter.setState({ ...counter.state, tasks: tasksClone });
};
