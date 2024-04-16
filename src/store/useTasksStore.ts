import type {ListType, TaskType} from './types/types';
import {LOCAL_STORAGE_KEYS} from '../constants/const.ts';

const getFromLocalStorage = (key: string) => {
	const data = localStorage.getItem(key);

	return data ? JSON.parse(data) : null;
};

const setToLocalStorage = (key: string, value: TaskType[] | ListType[]) => {
	localStorage.setItem(key, JSON.stringify(value));
};

export const useTasksStore = () => {
	const tasks: TaskType[] = getFromLocalStorage(LOCAL_STORAGE_KEYS.TASKS) || [];
	const lists: ListType[] = getFromLocalStorage(LOCAL_STORAGE_KEYS.LISTS) || [];

	const saveTasks = () => {
		setToLocalStorage(LOCAL_STORAGE_KEYS.TASKS, tasks);
	};

	const saveLists = () => {
		setToLocalStorage(LOCAL_STORAGE_KEYS.LISTS, lists);
	};

	const createTask = (title: string, description: string): TaskType => {
		const task: TaskType = {
			id: tasks.length,
			title: title,
			description: description,
			parentListId: 0,
		};
		tasks.push(task);
		saveTasks();

		return task;
	};

	const createList = (title: string): ListType => {
		const list: ListType = {
			id: lists.length,
			title: title,
			order: lists.length
		};
		lists.push(list);
		saveLists();

		return list;
	};

	const removeTaskById = (taskId: number) => {
		const index = tasks.findIndex(task => task.id === taskId);
		if (index !== -1) {
			tasks.splice(index, 1);
			saveTasks();
		}
	};

	const updateTaskParentIdById = (taskId: number, parentId: number) => {
		const updatedTask = tasks.find(task => task.id === taskId);

		if (updatedTask) {
			updatedTask.parentListId = parentId;
			saveTasks();
		}
	};

	return {
		tasks,
		lists,
		createTask,
		createList,
		removeTaskById,
		updateTaskParentIdById
	};
};
