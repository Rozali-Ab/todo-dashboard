import {useColumnForm} from './useColumnForm.ts';
import {dashboard} from '../dashboard';
import Column from '../dashboard/Column/Column.ts';

const {showColumnForm} = useColumnForm();
const addColumnButton = document.querySelector<HTMLButtonElement>('#add-column-btn');

export const modal = document.getElementById('modal') as HTMLDialogElement;

addColumnButton?.addEventListener('click', async () => {

	try {

		const newColumn = new Column(await showColumnForm());
		dashboard?.append(newColumn);

	} catch (e) {
		console.log('add new list rejected ', e);
	}
});
