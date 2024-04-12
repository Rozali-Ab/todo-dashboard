import { renderTask } from '../task/renderTask';
import { renderList } from '../taskList/renderList';
import { TaskListType, TaskType } from '../../store/types/types';

const renderListsToDashboard = (taskLists: TaskListType[]) => {
  taskLists.forEach((list) => {
    renderList(list);
  });
};

const renderTasksToLists = (tasks: TaskType[]) => {
  tasks.forEach((task) => {
    renderTask(task);
  });
};

export const renderDashboard = (taskLists: TaskListType[], tasks: TaskType[]) => {
  renderListsToDashboard(taskLists);
  renderTasksToLists(tasks);
};
