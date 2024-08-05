import {initializeApp} from '@firebase/app';
import {createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut} from '@firebase/auth';
import {getDatabase, ref, set} from '@firebase/database';

import {firebaseConfig} from './firebaseConfig.ts';
import {USERS_PATH} from '../constants/databasePaths.ts';
import {UserType} from '../types/types.ts';

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export const database = getDatabase(app);

export async function registerUser(user: UserType) {

	const {email, password, username} = user;

	const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
	const userId = userCredentials.user.uid;

	await writeUserToDatabase(userId, email, username);

	return userId;
}

export async function signInUser(user: UserType) {
	const {email, password} = user;

	const userCredentials = await signInWithEmailAndPassword(auth, email, password);

	return userCredentials.user.uid;
}

export async function logoutUser() {
	return await signOut(auth);
}

async function writeUserToDatabase(userId: string, email: string, username: string = '') {
	const userRef = ref(database, `${USERS_PATH}/${userId}`);

	await set(userRef, {
		email: email,
		username: username,
	})
	.then(() => {
		console.log('User record created in database.');
	})
	.catch((error) => {
		throw error;
	});
}

export function getUserRef(userId: string) {
	return ref(database, `${USERS_PATH}/${userId}`);
}
