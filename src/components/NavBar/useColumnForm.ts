import {modal} from './index.ts';
import type {ColumnType} from '../../store/types/types.ts';
import {getFormData} from './utils/getFormData.ts';
import {useTasksStore} from '../../store/useTasksStore.ts';

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
	modal.append(form);
	return form;
};

const emptyColumn: ColumnType = {
	id: 0,
	title: '',
	order: 0,
};

export const useColumnForm = (columnPayload?: ColumnType) => {

	const columnToUse = Object.assign({}, emptyColumn, columnPayload);

	const showColumnForm = async (): Promise<ColumnType> => {

		const form = formTemplate(columnToUse);
		modal.showModal();

		return new Promise((resolve, reject) => {

			form.addEventListener('submit', (evt) => {

				closeModal();
				form.remove();

				return resolve(onSubmitForm(evt));
			});

			const cancelButton = document.getElementById('cancel-column');
			cancelButton?.addEventListener('click', () => {
				closeModal();
				form.remove();

				return reject();
			});
		});
	};

	const closeModal = () => {
		modal.innerHTML = '';
		modal.close();
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
