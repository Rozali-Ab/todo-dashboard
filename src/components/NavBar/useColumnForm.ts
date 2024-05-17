import {getFormData} from './utils/getFormData.ts';
import {useTasksStore} from '../../store/useTasksStore.ts';
import AppModal from '../AppModal/AppModal.ts';
import type {ColumnType} from '../../store/types/types.ts';

const {createColumn, updateColumnById} = useTasksStore();

const formTemplate = ({title}: ColumnType) => {
	const isNew = title === '' ? 'New' : '';

	const form = document.createElement('form');
	form.classList.add('form-new-column');
	form.setAttribute('id', 'form-new-column');
	form.innerHTML = `
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
        <button class="cancel" type="button" id="cancel-column"></button>
        <button class="submit" type="submit" id="submit-column">Save</button>
    </div>
	`;
	return form;
};

const emptyColumn: ColumnType = {
	id: 0,
	title: '',
	order: 0,
};

export const useColumnForm = (columnPayload?: ColumnType) => {

	const columnToUse = {...emptyColumn, ...columnPayload};

	const showColumnForm = async (): Promise<ColumnType> => {

		const modal = new AppModal();

		const form = formTemplate(columnToUse);
		modal.appendContent(form);
		modal.open();

		return new Promise((resolve, reject) => {

			form.addEventListener('submit', (evt) => {

				modal.close();

				return resolve(onSubmitForm(evt));
			});

			const cancelButton = document.getElementById('cancel-column');
			cancelButton?.addEventListener('click', () => {
				modal.close();

				return reject();
			});
		});
	};

	const onSubmitForm = (evt: SubmitEvent) => {
		evt.preventDefault();

		const formNode = evt.target as HTMLFormElement;
		const titleInput = getFormData(formNode).title;

		if (!columnToUse.title) {

			return createColumn(titleInput);
		}

		columnToUse.title = titleInput;
		updateColumnById(columnToUse);

		return columnToUse;
	};

	return {
		showColumnForm,
	};
};
