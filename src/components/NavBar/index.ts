import {dashboard, domColumnsMap} from '../dashboard';
import Column from '../dashboard/Column/Column.ts';
import {useColumnForm} from './useColumnForm.ts';

const addColumnButton = document.querySelector<HTMLButtonElement>('#add-column-btn');

export const modal = document.getElementById('modal') as HTMLDialogElement;

addColumnButton?.addEventListener('click', async () => {

	try {
		const {showColumnForm} = useColumnForm();

		const newColumn = new Column(await showColumnForm());

		domColumnsMap.set(Number(newColumn.id), newColumn);

		dashboard?.append(newColumn);

	} catch (e) {
		console.log('add new list rejected ', e);
	}
});
