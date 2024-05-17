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

	return form;
};

const emptyTask: TaskType = {
	id: 0,
	title: '',
	parentColumnId: 0,
};

export const useTaskForm = (taskPayload?: Partial<TaskType>) => {

	const taskToUse = {...emptyTask, ...taskPayload};

	const showTaskForm = async (): Promise<TaskType> => {

		const modal = new AppModal();

		const form = formTemplate(taskToUse);

		modal.appendContent(form);
		modal.open();

		return new Promise((resolve, reject) => {
			form.addEventListener('submit', (evt) => {
				modal.close();
				return resolve(onSubmitForm(evt));
			});

			const cancelButton = document.getElementById('cancel-task');
			cancelButton?.addEventListener('click', () => {
				modal.close();
				return reject();
			});
		});

	};

	const onSubmitForm = (evt: SubmitEvent): TaskType => {
		evt.preventDefault();

		const formNode = evt.target as HTMLFormElement;
		const titleInput = getFormData(formNode).title;

		if (!taskToUse.title) {

			return createTask(titleInput, taskToUse.parentColumnId);
		}

		taskToUse.title = titleInput;
		updateTaskTitle(taskToUse);

		return taskToUse;
	};

	return {
		showTaskForm
	};
};
