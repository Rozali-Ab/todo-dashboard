//import {useTasksStore} from '../../store/useTasksStore.ts';
//import {Column} from '../dashboard/Column/Column.ts';
import {modal} from './index.ts';
import type {ColumnType} from '../../store/types/types.ts';

//const {createColumn} = useTasksStore();

const formTemplate = ({title}: ColumnType) => {
	const isNew = title === '' ? 'New' : '';
	return `
        <form 
            class="form-new-column" 
            id="form-new-column" 
        >
            <label class="form-new-column__label" for="title">${isNew} column title
	            <input
	                class="form-new-column__input"
	                type="text"
	                placeholder="New column title"
	                maxlength="30"
	                name="title"
	                id="new-column-title"
	                required
	                value=${title}
	            >
            </label>
            <div class="form-buttons">
                <button
                    class="cancel"
                    type="button"
                    id="cancel-column"
                >
                </button>
                <button
                    class="submit"
                    type="submit"
                    id="submit-column"
                >
                    Save
                </button>
            </div>
        </form>
    `;
};

const emptyColumn: ColumnType = {
	id: 0,
	title: '',
	order: 0,
};

export const useColumnForm = (columnPayload?: ColumnType) => {

	const showColumnForm = () => {
		const columnToUse = columnPayload || emptyColumn;
		modal.innerHTML = formTemplate(columnToUse);
		modal.showModal();
		/*
				const form = document.getElementById('form-new-column');
				form?.addEventListener('submit', (evt) => onSubmitForm(evt));*/
		const cancelButton = document.getElementById('cancel-column');
		cancelButton?.addEventListener('click', removeForm);
	};

	const removeForm = () => {
		modal.innerHTML = '';
		modal.close();
	};

	/*const onSubmitForm = (evt: SubmitEvent) => {
		evt.preventDefault();

		const formNode = evt.target as HTMLFormElement;

		if (columnPayload?.title) {
			columnPayload.title = getFormData(formNode).title;
			Column(columnPayload).renameColumnTitle();
			removeForm();
			return;
		}

		const newColumn = createColumn((getFormData(formNode)).title);

		if (newColumn) {
			Column(newColumn).renderColumn();
			removeForm();
		}
	};*/

	return {
		//onSubmitForm,
		showColumnForm,
		//removeForm
	};
};
