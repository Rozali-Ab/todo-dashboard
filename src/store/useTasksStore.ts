import {LOCAL_STORAGE_KEYS} from '../constants/const.ts';
import type {ListType, TaskType} from './types/types';

const getFromLocalStorage = (key: string) => {
	const data = localStorage.getItem(key);

	return data ? JSON.parse(data) : null;
};

const setToLocalStorage = (key: string, value: TaskType[] | ListType[]) => {
	localStorage.setItem(key, JSON.stringify(value));
};

let tasks: TaskType[] = getFromLocalStorage(LOCAL_STORAGE_KEYS.TASKS) || [];
let lists: ListType[] = getFromLocalStorage(LOCAL_STORAGE_KEYS.LISTS) || [];

export const useTasksStore = () => {

	const saveTasks = () => {
		setToLocalStorage(LOCAL_STORAGE_KEYS.TASKS, tasks);
	};

	const saveLists = () => {
		setToLocalStorage(LOCAL_STORAGE_KEYS.LISTS, lists);
	};

	const createTask = (title: string) => {
		const task: TaskType = {
			id: tasks.length,
			title: title,
			parentListId: 0,
		};
		tasks.push(task);
		saveTasks();

		return task;
	};

	const createList = (title: string) => {

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

	const removeAllTasksByParentId = (parentId: number) => {
		tasks = tasks.filter(task => task.parentListId !== parentId);
		saveTasks();
	};

	const removeListById = (listId: number) => {
		lists = lists.filter(list => list.id !== listId);
		saveLists();
	};

	const updateTaskParentIdById = (taskId: number, parentId: number) => {
		const updatedTask = tasks.find(task => task.id === taskId);

		if (updatedTask) {
			updatedTask.parentListId = parentId;
			saveTasks();
		}
	};

	const updateTaskTitle = (payload: TaskType) => {
		const {id} = payload;
		const index = tasks.findIndex(task => task.id === id);
		tasks[index] = payload;
		saveTasks();
	};

	const updateListById = (payload: ListType) => {
		const {id} = payload;
		const index = lists.findIndex(list => list.id === id);

		if (index >= 0) {
			lists[index] = payload;
		}
		saveLists();
	};

	const findListById = (listId: number) => {
		if (listId) {
			return lists.find(list => list.id === listId);
		}
	};

	return {
		tasks,
		lists,
		createTask,
		createList,
		removeTaskById,
		removeAllTasksByParentId,
		removeListById,
		updateTaskParentIdById,
		updateTaskTitle,
		updateListById,
		findListById
	};
};
