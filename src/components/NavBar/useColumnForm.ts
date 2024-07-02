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

	setTimeout(() => {
		const input = form.querySelector('#new-column-title') as HTMLInputElement;
		if (input) {
			input.focus();
			input.setSelectionRange(input.value.length, input.value.length);
		}
	}, 0);

	return form;
};

const emptyColumn: ColumnType = {
	id: '0',
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

			form.addEventListener('submit', async (evt) => {
				await handleSubmit(evt, modal, resolve, reject);
			});

			const cancelButton = document.getElementById('cancel-column');
			cancelButton?.addEventListener('click', () => {
				modal.close();
				reject();
			});
		});
	};

	const onSubmitForm = async (evt: SubmitEvent) => {
		const formNode = evt.target as HTMLFormElement;
		const titleInput = getFormData(formNode).title;

		if (!columnToUse.title) {

			return await createColumn(titleInput);
		}

		columnToUse.title = titleInput;
		await updateColumnById(columnToUse);

		return columnToUse;
	};

	const handleSubmit = async (
		evt: SubmitEvent,
		modal: AppModal,
		resolve: (value: ColumnType | PromiseLike<ColumnType>) => void,
		reject: (reason?: Error | null) => void
	) => {
		evt.preventDefault();

		try {
			const column = await onSubmitForm(evt);
			modal.close();

			if (column) resolve(column);
		} catch (e) {
			console.log('Error submitting column form', e);
			reject(e instanceof Error ? e : null);
		}
	};

	return {
		showColumnForm,
	};
};
