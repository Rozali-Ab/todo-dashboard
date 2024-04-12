import type { TaskListType, TaskType } from './types/types';

const LOCAL_STORAGE_KEYS = {
  TASKS: 'tasks',
  TASK_LIST:'task lists'
};

// type StoreType = {
//   taskLists: TaskListType[];
//   tasks: TaskType[];
//   addList(list: TaskListType): void;
//   addTask(task: TaskType): void;
//   deleteList(id: number): void;
//   deleteTaskById(id: number): void;
//   updateTask(taskId: number, taskParentId: number): void;
// }

export const useTasksStore  = () => {
    // @ts-ignore
    const taskLists: TaskListType[] =  JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEYS.TASK_LIST) ) ||  [];
    // @ts-ignore
    const tasks:TaskType[] = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEYS.TASKS) ) ||  [];

    //state
    const saveTasks = (payload : any ) => {
        localStorage.setItem(LOCAL_STORAGE_KEYS.TASKS,JSON.stringify( payload));
    };
    const saveTaskLists = (payload : any ) => {
        localStorage.setItem(LOCAL_STORAGE_KEYS.TASK_LIST,JSON.stringify( payload));
    };

    const      addList = (list: TaskListType) => {
            taskLists.push(list);
            saveTasks(taskLists);
    };

    const     addTask = (task: TaskType) => {
            tasks.push(task);
            saveTasks(tasks);
        };

    const        deleteList = (id) => {
            const index = taskLists.findIndex(list => list.id === id);
            if (index !== -1) {
                taskLists.splice(index, 1);
                saveTasks(taskLists);
            }
        };

    const      deleteTaskById = (id) => {
            const index = tasks.findIndex(task => task.id === id);
            if (index !== -1) {
                tasks.splice(index, 1);
                saveTaskLists(tasks);
            }
        };

     const    updateTask =  (taskId, taskParentId) => {
// TODO переименовать
            const updated = tasks.find(task => task.id === taskId);

            if (updated) {
                updated.parentListId = taskParentId;

                deleteTaskById(taskId);
                addTask(updated);

                saveTaskLists(tasks);
            }
        };

    return {
        get tasksLength () {
           return tasks.length;
        },
        taskLists,
        tasks,
        addList,
        addTask,
        deleteList,
        deleteTaskById,
        updateTask,
    };
};
