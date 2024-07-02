import {useTasksStore} from '../../store/useTasksStore.ts';
import {getFormData} from './utils/getFormData.ts';
import AppModal from '../AppModal/AppModal.ts';
import type {TaskType} from '../../store/types/types.ts';

const {createTask, updateTaskTitle} = useTasksStore();

const formTemplate = ({title}: TaskType) => {
	const isNew = title === '' ? 'New' : '';

	const form = document.createElement('form');
	form.classList.add('form-new-task');
	form.setAttribute('id', 'form-new-task');

	form.innerHTML = `
		<label for="title"> ${isNew} Task Title
	      <input
	          class="form-new-task__input"
	          type="text"
	          placeholder="max 30 symbols"
	          maxlength="30"
	          name="title"
	          id="new-task-title"
						required
	          value="${title}"
	      >
    </label>
    <div class="form-buttons">
      <button type="button" id="cancel-task"></button>
      <button type="submit" id="submit-task">Save</button>
    </div>
	`;

	setTimeout(() => {
		const input = form.querySelector('#new-task-title') as HTMLInputElement;
		if (input) {
			input.focus();
			input.setSelectionRange(input.value.length, input.value.length);
		}
	}, 0);

	return form;
};

const emptyTask: TaskType = {
	id: '0',
	title: '',
	parentColumnId: '0',
	order: 1
};

export const useTaskForm = (taskPayload?: Partial<TaskType>) => {

	const taskToUse = {...emptyTask, ...taskPayload};

	const showTaskForm = async (): Promise<TaskType> => {

		const modal = new AppModal();

		const form = formTemplate(taskToUse);

		modal.appendContent(form);
		modal.open();

		return new Promise((resolve, reject) => {
			form.addEventListener('submit', async (evt) => {
				await handleSubmit(evt, modal, resolve, reject);
			});

			const cancelButton = document.getElementById('cancel-task');
			cancelButton?.addEventListener('click', () => {
				modal.close();
				reject();
			});
		});

	};

	const onSubmitForm = async (evt: SubmitEvent): Promise<TaskType | null> => {
		const formNode = evt.target as HTMLFormElement;
		const titleInput = getFormData(formNode).title;

		if (!taskToUse.title) {

			return await createTask(titleInput, taskToUse.parentColumnId);
		}

		taskToUse.title = titleInput;
		await updateTaskTitle(taskToUse);

		return taskToUse;
	};

	const handleSubmit = async (
		evt: SubmitEvent,
		modal: AppModal,
		resolve: (value: TaskType | PromiseLike<TaskType>) => void,
		reject: (reason?: Error | null) => void
	) => {
		evt.preventDefault();

		try {
			const task = await onSubmitForm(evt);
			modal.close();

			if (task) resolve(task);
		} catch (e) {
			console.log('Error submitting task form', e);
			reject(e instanceof Error ? e : null);
		}
	};

	return {
		showTaskForm
	};
};
