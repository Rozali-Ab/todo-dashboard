import Store from '../store/Store.ts';
import Dashboard from '../components/dashboard/Dashboard.ts';
import NavBar from '../components/NavBar/NavBar.ts';
import Loader from '../components/Loader/Loader.ts';

export const store = new Store();

const loader = new Loader();
const navBar = new NavBar();
const dashboard = new Dashboard();

store.subscribe(state => state.isLoading ? loader.show() : loader.hide());
store.subscribe(state => dashboard.updateDashboard(state));
store.subscribe(state => navBar.updateUI(state));

const initApp = async () => {
	await store.init();

	const main = document.createElement('main');
	main.classList.add('container');
	document.body.prepend(main);

	main.prepend(navBar);
	main.append(dashboard);
	main.append(loader);
};

initApp().catch(error => {
	console.error('Failed to initialize the application', error);
});
