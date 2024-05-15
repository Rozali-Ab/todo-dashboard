import {get, ref, remove, set} from '@firebase/database';

import {database, getUserRef} from './auth.ts';
import {COLUMNS_PATH, TASKS_PATH, USERS_PATH} from '../constants/databasePaths.ts';
import type {ColumnType, TaskType, UserType} from '../types/types.ts';

export async function getUserData(userId: string) {
	const userRef = getUserRef(userId);

	const snapshot = await get(userRef);
	if (snapshot.exists()) {

		const data = snapshot.val();

		const userData: UserType = {
			id: userId,
			email: data.email,
			tasks: data.tasks ? Object.values(data.tasks) : [],
			columns: data.columns ? Object.values(data.columns) : [],
			username: data.username,
			password: '',
		};

		return userData;
	} else {
		console.log('No data available');
		return null;
	}
}

export async function setColumn(userId: string, columnId: string, columnData: ColumnType) {

	const columnRef = getColumnRef(userId, columnId);

	try {
		await set(columnRef, columnData);
		console.log('Column added/updated successfully.');
	} catch (error) {
		console.log('Error adding/updating column:', error);
	}
}

export async function setTask(userId: string, taskId: string, taskData: TaskType) {

	const taskRef = getTaskRef(userId, taskId);

	try {
		await set(taskRef, taskData);
		console.log('Task added/updated successfully.');
	} catch (error) {
		console.log('Error adding/updating task:', error);
	}
}

export async function removeColumn(userId: string, columnId: string) {
	const columnRef = getColumnRef(userId, columnId);

	try {
		await remove(columnRef);
		console.log('Column removed successfully.');
	} catch (error) {
		console.log('Error removing column:', error);
	}
}

export async function removeTask(userId: string, taskId: string) {
	const taskRef = getTaskRef(userId, taskId);

	try {
		await remove(taskRef);
		console.log('Task removed successfully.');
	} catch (error) {
		console.log('Error removing task:', error);
	}
}

const getColumnRef = (userId: string, columnId: string) => {
	return ref(database, `${USERS_PATH}/${userId}/${COLUMNS_PATH}/${columnId}`);
};

const getTaskRef = (userId: string, taskId: string) => {
	return ref(database, `${USERS_PATH}/${userId}/${TASKS_PATH}/${taskId}`);
};
