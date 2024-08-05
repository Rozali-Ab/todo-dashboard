import {get, ref, remove, set} from '@firebase/database';

import {database, getUserRef} from './auth.ts';
import {COLUMNS_PATH, TASKS_PATH, USERS_PATH} from '../constants/databasePaths.ts';
import type {ColumnType, TaskType, UserType} from '../types/types.ts';
import {showMessage} from '../utils/showMessage.ts';

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
		showMessage('No data available');
		return null;
	}
}

export async function setColumn(userId: string, columnId: string, columnData: ColumnType) {

	const columnRef = getColumnRef(userId, columnId);

	try {
		await set(columnRef, columnData);
		showMessage('Column added/updated successfully.');
	} catch (error) {
		showMessage('Oops! Not saved');
		throw error;
	}
}

export async function setTask(userId: string, taskId: string, taskData: TaskType) {

	const taskRef = getTaskRef(userId, taskId);

	try {
		await set(taskRef, taskData);
		showMessage('Task added/updated successfully.');
	} catch (error) {
		showMessage('Oops! Not saved');
		throw error;
	}
}

export async function removeColumn(userId: string, columnId: string) {
	const columnRef = getColumnRef(userId, columnId);

	try {
		await remove(columnRef);
		showMessage('Column removed successfully.');
	} catch (error) {
		showMessage('Error removing column');
		throw error;
	}
}

export async function removeTask(userId: string, taskId: string) {
	const taskRef = getTaskRef(userId, taskId);

	try {
		await remove(taskRef);
		showMessage('Task removed successfully.');
	} catch (error) {
		showMessage('Error removing task');
		throw error;
	}
}

const getColumnRef = (userId: string, columnId: string) => {
	return ref(database, `${USERS_PATH}/${userId}/${COLUMNS_PATH}/${columnId}`);
};

const getTaskRef = (userId: string, taskId: string) => {
	return ref(database, `${USERS_PATH}/${userId}/${TASKS_PATH}/${taskId}`);
};
