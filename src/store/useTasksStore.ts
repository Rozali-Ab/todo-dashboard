import {LOCAL_STORAGE_KEYS} from '../constants/localStorageKeys.ts';
import type {ColumnType, TaskType} from './types/types';

const getFromLocalStorage = (key: string) => {
	const data = localStorage.getItem(key);

	return data ? JSON.parse(data) : null;
};

const setToLocalStorage = (key: string, value: TaskType[] | ColumnType[]) => {
	localStorage.setItem(key, JSON.stringify(value));
};

let tasks: TaskType[] = getFromLocalStorage(LOCAL_STORAGE_KEYS.TASKS) || [];
let columns: ColumnType[] = getFromLocalStorage(LOCAL_STORAGE_KEYS.COLUMNS) || [];

export const useTasksStore = () => {

	const saveTasks = () => {
		setToLocalStorage(LOCAL_STORAGE_KEYS.TASKS, tasks);
	};

	const saveColumns = () => {
		setToLocalStorage(LOCAL_STORAGE_KEYS.COLUMNS, columns);
	};

	const createTask = (title: string) => {
		const task: TaskType = {
			id: tasks.length,
			title: title,
			parentColumnId: 0,
		};
		tasks.push(task);
		saveTasks();

		return task;
	};

	const createColumn = (title: string) => {

		const column: ColumnType = {
			id: columns.length,
			title: title,
			order: columns.length
		};
		columns.push(column);
		saveColumns();
		return column;
	};

	const removeTaskById = (taskId: number) => {
		const index = tasks.findIndex(task => task.id === taskId);
		if (index !== -1) {
			tasks.splice(index, 1);
			saveTasks();
		}
	};

	const removeAllTasksByParentId = (parentId: number) => {
		tasks = tasks.filter(task => task.parentColumnId !== parentId);
		saveTasks();
	};

	const removeColumnById = (columnId: number) => {
		columns = columns.filter(column => column.id !== columnId);
		saveColumns();
	};

	const updateTaskParentIdById = (taskId: number, parentId: number) => {
		const updatedTask = tasks.find(task => task.id === taskId);

		if (updatedTask) {
			updatedTask.parentColumnId = parentId;
			saveTasks();
		}
	};

	const updateTaskTitle = (payload: TaskType) => {
		const {id} = payload;
		const index = tasks.findIndex(task => task.id === id);
		tasks[index] = payload;
		saveTasks();
	};

	const updateColumnById = (payload: ColumnType) => {
		const {id} = payload;
		const index = columns.findIndex(column => column.id === id);

		if (index >= 0) {
			columns[index] = payload;
		}
		saveColumns();
	};

	const findColumnById = (columnId: number) => {
		if (columnId) {
			return columns.find(column => column.id === columnId);
		}
	};

	return {
		tasks,
		columns,
		createTask,
		createColumn,
		removeTaskById,
		removeAllTasksByParentId,
		removeColumnById,
		updateTaskParentIdById,
		updateTaskTitle,
		updateColumnById,
		findColumnById
	};
};
