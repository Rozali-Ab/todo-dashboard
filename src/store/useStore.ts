import {getUserData, removeColumn, removeTask, setColumn, setTask} from '../firebase/data.ts';
import {useForm} from '../components/AppModal/forms/useForm.ts';
import type {ColumnType, TaskType, UserType} from '../types/types.ts';
import Store from './Store.ts';

const {showColumnForm, showTaskForm} = useForm();

const store = new Store();

let tasks: TaskType[] = [];
let columns: ColumnType[] = [];
let currentUser: UserType | null = null;

export const fetchUserData = async (userId: string) => {
	store.setLoading(true);

	try {
		currentUser = await getUserData(userId);

		return currentUser;
	} catch (error) {
		return null;
	} finally {
		store.setLoading(false);
	}

};

const getTaskOrder = (tasks: TaskType[], columnId: string) => {

	return tasks.filter(task => task.parentColumnId === columnId).length + 1;
};

export const useStore = () => {

	const createTask = async (parentColumnId: string) => {

		if (!currentUser) return;

		tasks = currentUser.tasks;

		const formData = await showTaskForm();
		if (!formData) return;

		const newTask: TaskType = {
			id: Date.now().toString(),
			title: formData.title,
			parentColumnId: parentColumnId,
			order: getTaskOrder(tasks, parentColumnId).toString(),
			isDone: false,
		};

		await updateTaskOnServer(newTask)
		.then(() => {
			tasks.push(newTask);
			store.update();
		});

	};

	const createColumn = async () => {

		if (!currentUser) return;

		columns = currentUser.columns;

		const formData = await showColumnForm();
		if (!formData) return;

		const newColumn: ColumnType = {
			id: Date.now().toString(),
			title: formData.title,
			order: (columns.length + 1).toString(),
		};

		await updateColumnOnServer(newColumn)
		.then(() => {
			columns.push(newColumn);
			store.update();
		});
	};

	const removeTaskById = async (taskId: string) => {
		if (!currentUser) return;
		const userId = currentUser.id;
		tasks = currentUser.tasks;

		store.setLoading(true);
		try {
			if (userId) {
				await removeTask(userId, taskId);

				tasks = removeItemById(taskId, tasks) as TaskType[];
				store.update();
			}
		} catch (error) {
			return null;
		} finally {
			store.setLoading(false);
		}
	};

	const removeAllTasksByParentId = async (parentId: string) => {
		if (!currentUser) return;
		tasks = currentUser.tasks;

		const tasksToRemove = tasks.filter(task => task.parentColumnId === parentId);

		for (const task of tasksToRemove) {
			await removeTaskById(task.id);
		}
	};

	const removeColumnById = async (columnId: string) => {
		if (!currentUser) return;
		const userId = currentUser.id;
		columns = currentUser.columns;

		store.setLoading(true);
		try {

			await removeColumn(userId, columnId)
			.then(() => {
				columns = removeItemById(columnId, columns);
				store.update();
			});

		} catch (error) {
			return null;
		} finally {
			store.setLoading(false);
		}
	};

	const updateTaskParentId = async (taskId: string, parentId: string) => {
		const updatedTask = findTaskById(taskId);

		if (!currentUser) return;

		if (updatedTask) {

			if (updatedTask.parentColumnId === parentId.toString()) return;

			updatedTask.parentColumnId = parentId;

			await updateTaskOnServer(updatedTask);
		}
	};

	const updateTaskOrder = async (id: string, order: number | string) => {
		const updatedTask = findTaskById(id);

		if (updatedTask) {

			if (updatedTask.order === order.toString()) return;

			updatedTask.order = order.toString();

			await updateTaskOnServer(updatedTask);
		}
	};

	const updateTaskTitle = async (id: string) => {
		if (!currentUser) return;
		const task = currentUser.tasks.find(task => task.id === id);
		if (task) {

			try {
				const formData = await showTaskForm(task.title);
				if (!formData) return;

				task.title = formData.title;
				store.setLoading(true);

				await setTask(currentUser.id, task.id, task);

				store.update();
			} catch (error) {
				return null;
			} finally {
				store.setLoading(false);
			}
		}
	};

	const updateTaskStatus = async (id: string, isDone: boolean) => {
		if (!currentUser) return;

		const task = currentUser.tasks.find(task => task.id === id);
		if (task) {

			try {
				task.isDone = isDone;
				store.setLoading(true);

				await setTask(currentUser.id, task.id, task);

				store.update();
			} catch (error) {
				return null;
			} finally {
				store.setLoading(false);
			}
		}
	};

	const updateColumnTitle = async (id: string) => {

		if (!currentUser) return;
		const column = currentUser.columns.find(col => col.id === id);

		if (column) {
			try {
				const formData = await showColumnForm(column.title);
				if (!formData) return;

				column.title = formData.title;
				store.setLoading(true);

				await setColumn(currentUser.id, column.id, column);

				store.update();
			} catch (error) {
				return null;
			} finally {
				store.setLoading(false);
			}
		}
	};

	const findColumnById = (columnId: string) => {
		if (!currentUser) return;
		columns = currentUser.columns;

		return columns.find(column => column.id === columnId);
	};

	const findTaskById = (taskId: string) => {
		if (!currentUser) return;
		tasks = currentUser.tasks;

		return tasks.find(task => task.id === taskId);
	};

	const removeItemById = (itemId: string, arr: TaskType[] | ColumnType[]) => {
		const index = arr.findIndex(item => item.id === itemId);

		if (index !== -1) {
			arr.splice(index, 1);
		}

		return arr;
	};

	const updateTaskOnServer = async (task: TaskType) => {
		if (!currentUser) return;

		const userId = currentUser.id;
		const taskId = task.id;

		store.setLoading(true);
		try {
			await setTask(userId, taskId, task);
		} catch (error) {
			return null;
		} finally {
			store.setLoading(false);
		}
	};

	const updateColumnOnServer = async (column: ColumnType) => {
		if (!currentUser) return;

		const userId = currentUser.id;
		const columnId = column.id;

		store.setLoading(true);
		try {
			await setColumn(userId, columnId, column);
		} catch (error) {
			return null;
		} finally {
			store.setLoading(false);
		}
	};

	return {
		store,
		createTask,
		createColumn,
		removeTaskById,
		removeAllTasksByParentId,
		removeColumnById,
		updateTaskParentId,
		updateTaskTitle,
		updateTaskOrder,
		updateTaskStatus,
		updateColumnTitle,
		findColumnById,
		findTaskById
	};
};
