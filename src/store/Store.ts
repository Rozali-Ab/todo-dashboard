import {logoutUser} from '../firebase/auth.ts';
import {fetchUserData} from './useStore.ts';
import type {UserType} from '../types/types.ts';

type Listener = (state: Store) => void;

export default class Store {
	isAuth: boolean;
	isLoading: boolean;
	user: UserType;
	private listeners: Listener[] = [];

	constructor() {
		this.isAuth = false;
		this.isLoading = false;

		this.user = {
			id: '',
			email: '',
			tasks: [],
			columns: [],
			username: '',
			password: '',
		};
	}

	async init() {
		const savedState = localStorage.getItem('state');

		if (savedState) {
			const state = JSON.parse(savedState);
			const userId = state.id;

			if (userId) {
				const userData = await fetchUserData(userId);

				if (userData) {
					this.user = {...userData};
					this.isAuth = true;
					this.notify();
					console.log('Successfully login');
				}
			}
		}
	}

	setLoading(isLoading: boolean) {
		this.isLoading = isLoading;
		this.notify();
	}

	login(user: UserType) {
		this.isAuth = true;
		this.user = {...user};

		this.notify();
		this.saveToLocalStorage();
	}

	async logout() {

		try {
			await logoutUser();

			this.isAuth = false;
			this.user = Object.assign({});

			this.notify();
			this.clearLocalStorage();
		} catch (err) {
			console.log(err);
		}
	}

	subscribe(listener: Listener) {
		this.listeners.push(listener);
	}

	private notify() {
		for (const listener of this.listeners) {
			listener(this);
		}
	}

	update() {
		this.notify();
	}

	get state() {
		return this;
	}

	saveToLocalStorage() {
		const state = {
			id: this.user.id,
		};
		localStorage.setItem('state', JSON.stringify(state));
	}

	clearLocalStorage() {
		localStorage.removeItem('state');
	}
}
