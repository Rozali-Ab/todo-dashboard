import Dashboard from './Dashboard.ts';

const main = document.querySelector('main');
export const dashboard = new Dashboard();
main?.appendChild(dashboard);
