import type { TaskListType, TaskType } from './types/types';
import { useLocalStore } from './useLocalStore';

const localStore = useLocalStore();

type StoreType = {
  taskLists: TaskListType[];
  tasks: TaskType[];
  addList(list: TaskListType): void;
  addTask(task: TaskType): void;
  deleteList(id: number): void;
  deleteTask(id: number): void;
  updateTask(taskId: number, taskParentId: number): void;
}

export const store: StoreType = {
  taskLists: localStore.getLists() || [],
  tasks: localStore.getTasks() || [],

  addList(list: TaskListType) {
      this.taskLists.push(list);
      localStore.setLists(this.taskLists);
    },

  addTask(task: TaskType) {
    this.tasks.push(task);
    localStore.setTasks(this.tasks);
  },

  deleteList(id) {
    const index = this.taskLists.findIndex(list => list.id === id);
    if (index !== -1) {
      this.taskLists.splice(index, 1);
      localStore.setLists(this.taskLists);
    }
  },

  deleteTask(id) {
    const index = this.tasks.findIndex(task => task.id === id);
    if (index !== -1) {
      this.tasks.splice(index, 1);
      localStore.setTasks(this.tasks);
    }
  },

  updateTask(taskId, taskParentId) {

    const updated = this.tasks.find(task => task.id === taskId);

    if (updated) {
      updated.parentListId = taskParentId;

      this.deleteTask(taskId);
      this.addTask(updated);

      localStore.setTasks(this.tasks);
    }
  }

};
