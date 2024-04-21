import {LOCAL_STORAGE_KEYS} from '../constants/const.ts';
import type {ListType, TaskType} from './types/types';

const getFromLocalStorage = (key: string) => {
	const data = localStorage.getItem(key);

	return data ? JSON.parse(data) : null;
};

const setToLocalStorage = (key: string, value: TaskType[] | ListType[]) => {
	localStorage.setItem(key, JSON.stringify(value));
};

export const useTasksStore = () => {
	let tasks: TaskType[] = getFromLocalStorage(LOCAL_STORAGE_KEYS.TASKS) || [];
	let lists: ListType[] = getFromLocalStorage(LOCAL_STORAGE_KEYS.LISTS) || [];

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

	const updateTaskTitleByTitle = ({id, title}: TaskType) => {
		const index = tasks.findIndex(task => task.id === id);
		tasks[index].title = title;
		saveTasks();
	};

	const updateListTitleByTitle = ({id, title}: ListType) => {
		const index = lists.findIndex(list => list.id === id);
		lists[index].title = title;
		saveLists();
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
		updateTaskTitleByTitle,
		updateListTitleByTitle
	};
};
