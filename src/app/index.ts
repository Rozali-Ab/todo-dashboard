import Store from '../store/Store.ts';
import Dashboard from '../components/dashboard/Dashboard.ts';
import NavBar from '../components/NavBar/NavBar.ts';
import Loader from '../components/Loader/Loader.ts';

const loader = new Loader();

export const store = new Store();
store.subscribe(state => state.isLoading ? loader.show() : loader.hide());

const navBar = new NavBar();

export const dashboard = new Dashboard();
await store.init();

const main = document.createElement('main');
main.classList.add('container');
document.body.prepend(main);

main.prepend(navBar);
main.append(dashboard);
main.append(loader);
