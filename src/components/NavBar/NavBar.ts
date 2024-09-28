import {useStore} from '../../store/useStore.ts';
import {useForm} from '../forms/useForm.ts';
import Store from '../../store/Store.ts';

const {store, createColumn} = useStore();

const {showAuthForm} = useForm();

export default class NavBar extends HTMLElement {
	appLogo = document.createElement('div');
	logoImg = document.createElement('img');
	navButtons = document.createElement('div');
	loginButton = document.createElement('button');
	addColumnButton = document.createElement('button');
	logoutButton = document.createElement('button');

	constructor() {
		super();

		this.buildTemplate();
	}

	connectedCallback() {
		this.loginButton.addEventListener('click', showAuthForm);
		this.logoutButton.addEventListener('click', this.handleLogout.bind(this));
		this.addColumnButton.addEventListener('click', this.handleAddColumn.bind(this));
	}

	buildTemplate() {
		this.appLogo.classList.add('app-logo');
		this.logoImg.src = 'https://cdn-icons-png.freepik.com/256/17360/17360881.png?ga=GA1.1.1496496612.1674736423&semt=ais_hybrid';
		this.navButtons.classList.add('nav-buttons');
		this.loginButton.textContent = 'Login';
		this.logoutButton.textContent = 'Logout';
		this.addColumnButton.textContent = 'Add New List';

		this.logoutButton.hidden = true;
		this.addColumnButton.hidden = true;

		this.appLogo.appendChild(this.logoImg);

		this.navButtons.append(this.loginButton, this.addColumnButton, this.logoutButton);

		this.appendChild(this.appLogo);
		this.appendChild(this.navButtons);
	}

	async handleAddColumn() {
		await createColumn();

	}

	async handleLogout() {
		await store.logout();
	}

	updateUI(state: Store) {
		if (state.isAuth) {
			this.loginButton.hidden = true;
			this.addColumnButton.hidden = false;
			this.logoutButton.hidden = false;
		} else {
			this.loginButton.hidden = false;
			this.logoutButton.hidden = true;
			this.addColumnButton.hidden = true;
		}
	}

}

customElements.define('nav-bar', NavBar);
