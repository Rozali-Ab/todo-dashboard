import {fetchUserData, useStore} from '../../store/useStore.ts';
import {useForm} from '../forms/useForm.ts';
import Store from '../../store/Store.ts';
import {registerUser, signInUser} from '../../firebase/auth.ts';
import type {UserType} from '../../types/types.ts';
import {showMessage} from '../../utils/showMessage.ts';

const {store, createColumn} = useStore();

const {showAuthForm, showRegistrationForm} = useForm();

export default class NavBar extends HTMLElement {
	appLogo = document.createElement('div');
	logoImg = document.createElement('img');
	navButtons = document.createElement('div');
	loginButton = document.createElement('button');
	addColumnButton = document.createElement('button');
	logoutButton = document.createElement('button');
	createAccountButton = document.createElement('button');

	constructor() {
		super();

		this.buildTemplate();
	}

	connectedCallback() {
		this.loginButton.addEventListener('click', this.authenticationUser.bind(this));
		this.logoutButton.addEventListener('click', this.handleLogout.bind(this));
		this.addColumnButton.addEventListener('click', this.handleAddColumn.bind(this));
		this.createAccountButton.addEventListener('click', this.registrationUser.bind(this));
	}

	buildTemplate() {
		this.appLogo.classList.add('app-logo');
		this.logoImg.src = 'https://cdn-icons-png.freepik.com/256/17360/17360881.png?ga=GA1.1.1496496612.1674736423&semt=ais_hybrid';
		this.navButtons.classList.add('nav-buttons');
		this.loginButton.textContent = 'Login';
		this.logoutButton.textContent = 'Logout';
		this.addColumnButton.textContent = 'Add New List';
		this.createAccountButton.textContent = 'Create Account';

		this.logoutButton.style.display = 'none';
		this.addColumnButton.style.display = 'none';

		this.appLogo.appendChild(this.logoImg);

		this.navButtons.append(this.loginButton, this.addColumnButton, this.logoutButton, this.createAccountButton);

		this.appendChild(this.appLogo);
		this.appendChild(this.navButtons);
	}

	async handleAddColumn() {
		await createColumn();

	}

	async authenticationUser() {
		const formData = await showAuthForm();

		if (formData) {
			const user: UserType = {
				email: formData.email,
				password: formData.password,
				id: '',
				tasks: [],
				columns: [],
			};

			try {

				const userId = await signInUser(user);
				const userData = await fetchUserData(userId);

				if (userData) {
					store.login(userData);
				}
			} catch (err) {
				showMessage('Wrong email or password');
			}
		}
	}

	async registrationUser() {

		const formData = await showRegistrationForm();

		if (formData) {
			const newUser: UserType = {
				username: formData.username,
				email: formData.email,
				password: formData.password,
				id: '',
				tasks: [],
				columns: [],
			};

			try {
				newUser.id = await registerUser(newUser);

				store.login(newUser);
			} catch (err) {
				showMessage('Use another email');
			}
		}

	}

	async handleLogout() {
		await store.logout();
	}

	updateUI(state: Store) {
		if (state.isAuth) {
			this.loginButton.style.display = 'none';
			this.addColumnButton.style.display = 'inline-block';
			this.logoutButton.style.display = 'inline-block';
			this.createAccountButton.style.display = 'none';
		} else {
			this.loginButton.style.display = 'inline-block';
			this.createAccountButton.style.display = 'inline-block';
			this.logoutButton.style.display = 'none';
			this.addColumnButton.style.display = 'none';
		}
	}

}

customElements.define('nav-bar', NavBar);
