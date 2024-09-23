import {fetchUserData, useStore} from '../../store/useStore.ts';
import {useForm} from '../forms/useForm.ts';
import Store from '../../store/Store.ts';
import AppModal from '../AppModal/AppModal.ts';
import {registerUser, signInUser} from '../../firebase/auth.ts';
import type {UserType} from '../../types/types.ts';
import {showMessage} from '../../utils/showMessage.ts';

const {store, createColumn} = useStore();

const {showAuthForm, showRegistrationForm} = useForm();

const modal = new AppModal();

export default class NavBar extends HTMLElement {
	loginButton = document.createElement('button');
	addColumnButton = document.createElement('button');
	logoutButton = document.createElement('button');

	constructor() {
		super();

		this.buildTemplate();
	}

	connectedCallback() {
		this.loginButton.addEventListener('click', this.handleLogin.bind(this));
		this.logoutButton.addEventListener('click', this.handleLogout.bind(this));
		this.addColumnButton.addEventListener('click', this.handleAddColumn.bind(this));
	}

	buildTemplate() {

		this.loginButton.textContent = 'Login';
		this.logoutButton.textContent = 'Logout';
		this.addColumnButton.textContent = 'Add Column';

		this.loginButton.classList.add('login-btn');
		this.addColumnButton.classList.add('add-column-btn');

		this.logoutButton.style.display = 'none';
		this.addColumnButton.style.display = 'none';

		this.appendChild(this.loginButton);
		this.appendChild(this.addColumnButton);
		this.appendChild(this.logoutButton);

	}

	handleLogin() {

		const content = document.createElement('div');
		content.classList.add('modal-message');
		content.textContent = 'Already have an account?';

		const answerYes = document.createElement('button');
		answerYes.textContent = 'Yes';

		const answerNo = document.createElement('button');
		answerNo.textContent = 'No';

		content.append(answerYes, answerNo);
		modal.appendContent(content);
		modal.open();

		answerNo.addEventListener('click', this.registrationUser.bind(this));
		answerYes.addEventListener('click', this.authenticationUser.bind(this));
	}

	async handleAddColumn() {
		await createColumn();

	}

	async authenticationUser() {
		modal.close();
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
		modal.close();

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
		} else {
			this.loginButton.style.display = 'inline-block';
			this.logoutButton.style.display = 'none';
			this.addColumnButton.style.display = 'none';
		}
	}

}

customElements.define('nav-bar', NavBar);
