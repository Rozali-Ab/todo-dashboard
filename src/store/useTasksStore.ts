import type {ColumnType, TaskType} from './types/types';
import {
	deleteColumnById,
	deleteTaskById,
	fetchColumns,
	fetchTasks,
	postColumn,
	postTask,
	updateColumn,
	updateTask
} from '../api';

let tasks: TaskType[] = await fetchTasks();
let columns: ColumnType[] = await fetchColumns();

const getTaskOrder = (columnId: string) => {

	return tasks.filter(task => task.parentColumnId === columnId).length + 1;
};

export const useTasksStore = () => {

	const createTask = async (title: string, parentColumnId: string) => {

		const task: TaskType = {
			id: Date.now().toString(),
			title: title,
			parentColumnId: parentColumnId,
			order: getTaskOrder(parentColumnId),
		};

		try {
			tasks.push(task);
			await postTask(task);

			return task;
		} catch (e) {
			console.log('Error saving task at createTask', e);
			return null;
		}

	};

	const createColumn = async (title: string) => {

		const column: ColumnType = {
			id: Date.now().toString(),
			title: title,
			order: columns.length
		};

		try {
			columns.push(column);
			await postColumn(column);
			return column;
		} catch (e) {
			console.log('Error saving column', e);
			return null;
		}
	};

	const removeTaskById = async (taskId: string) => {
		const index = tasks.findIndex(task => task.id === taskId);
		if (index !== -1) {
			tasks.splice(index, 1);
			await deleteTaskById(taskId);
		}
	};

	const removeAllTasksByParentId = async (parentId: string) => {

		const taskToRemove = tasks.filter(task => task.parentColumnId === parentId);

		for (const task of taskToRemove) {
			try {
				await deleteTaskById(task.id);
			} catch (e) {
				console.log('Error removing task id ', task.id);
			}
		}

		tasks = tasks.filter(task => task.parentColumnId !== parentId);
	};

	const removeColumnById = async (columnId: string) => {
		columns = columns.filter(column => column.id !== columnId);
		await deleteColumnById(columnId);
	};

	const updateTaskParentIdById = async (taskId: string, parentId: string) => {
		const updatedTask = tasks.find(task => task.id === taskId);

		if (updatedTask) {
			updatedTask.parentColumnId = parentId;
			await updateTask(updatedTask);
		}
	};

	const updateTaskTitle = async (payload: TaskType) => {
		const {id} = payload;
		const index = tasks.findIndex(task => task.id === id);
		tasks[index] = payload;
		await updateTask(payload);
	};

	const updateTaskOrder = async (id: string, order: number) => {
		const updatedTask = tasks.find(task => task.id === id);

		if (updatedTask) {

			updatedTask.order = order;

			await updateTask(updatedTask);
		}

	};

	const updateColumnById = async (payload: ColumnType) => {
		const {id} = payload;
		const index = columns.findIndex(column => column.id === id);

		if (index >= 0) {
			columns[index] = payload;
		}
		await updateColumn(payload);
	};

	const findColumnById = (columnId: string) => {
		if (columnId) {
			return columns.find(column => column.id === columnId);
		}
	};

	const findTaskById = (taskId: string) => {
		if (taskId) {
			return tasks.find(task => task.id === taskId);
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
		updateTaskOrder,
		updateColumnById,
		findColumnById,
		findTaskById
	};
};
