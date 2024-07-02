import Loader from '../components/Loader/Loader.ts';
import {ColumnType, TaskType} from '../store/types/types.ts';
import {URL_COLUMNS, URL_TASKS} from './mockApi.ts';

const loader = new Loader();

export const fetchTasks = async () => {
	loader.show();

	try {
		const response = await fetch(URL_TASKS);
		return response.json();
	} catch (err) {
		console.log('Error fetching tasks', err);
		return [];
	} finally {
		loader.hide();
	}
};

export const fetchColumns = async () => {
	loader.show();

	try {
		const response = await fetch(URL_COLUMNS);
		return response.json();
	} catch (err) {
		console.log('Error fetching columns', err);
		return [];
	} finally {
		loader.hide();
	}
};

export const postTask = async (data: TaskType) => {
	loader.show();

	try {
		await fetch(URL_TASKS, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		});
	} catch (err) {
		console.log('Error post data');
	} finally {
		loader.hide();
	}
};

export const postColumn = async (data: ColumnType) => {
	loader.show();

	try {
		await fetch(URL_COLUMNS, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		});
	} catch (err) {
		console.log('Error post data');
	} finally {
		loader.hide();
	}
};

export const deleteTaskById = async (id: string) => {
	loader.show();

	try {
		await fetch(`${URL_TASKS}/${id}`, {
			method: 'DELETE',
		});
	} catch (err) {
		console.log('Failed delete task');
	} finally {
		loader.hide();
	}
};

export const deleteColumnById = async (id: string) => {
	loader.show();

	try {
		await fetch(`${URL_COLUMNS}/${id}`, {
			method: 'DELETE',
		});
	} catch (err) {
		console.log('Failed delete column');
	} finally {
		loader.hide();
	}
};

export const updateTask = async (payload: TaskType) => {
	loader.show();

	const {id} = payload;
	try {
		await fetch(`${URL_TASKS}/${id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(payload)
		});
	} catch (err) {
		console.log('Failed update');
	} finally {
		loader.hide();
	}
};

export const updateColumn = async (payload: ColumnType) => {
	loader.show();

	const {id} = payload;

	try {
		await fetch(`${URL_COLUMNS}/${id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(payload)
		});
	} catch (err) {
		console.log('Failed update');
	} finally {
		loader.hide();
	}
};
