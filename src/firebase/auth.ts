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

	try {
		const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
		const userId = userCredentials.user.uid;

		await writeUserToDatabase(userId, email, username);

		return userId;
	} catch (error) {
		//
		// const errorCode = error.code;
		//
		// switch (errorCode) {
		// 	case 'auth/email-already-in-use':
		// 		console.log('Email is already in use.');
		// 		break;
		// 	case 'auth/invalid-email':
		// 		console.log('Invalid email');
		// 		break;
		// 	case 'auth/weak-password':
		// 		console.log('Weak password');
		// 		break;
		// 	default:
		// 		console.log('Error registering user:', error.message);
		// 		break;
		//
		// }
		throw error;
	}
}

export async function signInUser(user: UserType) {
	const {email, password} = user;

	try {
		const userCredentials = await signInWithEmailAndPassword(auth, email, password);

		return userCredentials.user.uid;
	} catch (error) {
		//
		// if (error.code === 'auth/user-not-found') {
		// 	console.log('User not found');
		// }
		//
		// if (error.code === 'auth/wrong-password') {
		// 	console.log('Wrong password');
		// }

		console.log('Error signing in user');
		throw error;
	}
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
		console.log('Error creating user record:', error.message);
	});
}

export function getUserRef(userId: string) {
	return ref(database, `${USERS_PATH}/${userId}`);
}
