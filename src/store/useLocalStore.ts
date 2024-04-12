import { TaskListType, TaskType } from './types/types';

const localStorageTasks = localStorage.getItem('tasks');
const localStorageLists = localStorage.getItem('task lists');

export const useLocalStore = () => {
  const getTasks = () => {
    return localStorageTasks ? JSON.parse(localStorageTasks) : [];
  };

  const getLists = () => {
    return localStorageLists ? JSON.parse(localStorageLists) : [];
  };

  const setTasks = (tasks: TaskType[]) => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  };

  const setLists = (lists: TaskListType[]) => {
    localStorage.setItem('task lists', JSON.stringify(lists));
  };

  return {getTasks, getLists, setTasks, setLists};
};
