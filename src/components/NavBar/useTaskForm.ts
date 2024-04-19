import {useTasksStore} from '../../store/useTasksStore.ts';
import {createModalContainer} from './utils/createModalContainer.ts';
import {removeModalContainer} from './utils/removeModalContainer.ts';
import {getFormData} from './utils/getFormData.ts';
import {renderNewTask} from '../dashboard/Task/renderNewTask.ts';
import {updateTaskTitle} from '../dashboard/Task/editTask.ts';
import type {TaskType} from '../../store/types/types.ts';

const {createTask} = useTasksStore();

const formTemplate = ({title}: TaskType) => {
	const isNew = title === '' ? 'New' : '';
	return `
		<form 
			class="form-new-task"
			id="form-new-task"
		>
      <label for="title">
        ${isNew} Task Title
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

      <div class="task-tags"></div>
      <div class="form-buttons">
        <button
        	type="button"
        	id="cancel-task"
        >

        </button>
        <button
        	type="submit"
        	id="submit-task"
        >
        	Save
        </button>
      </div>
  	</form>
  `;
};

const emptyTask: TaskType = {
	id: 0,
	title: '',
	parentListId: 0,
};

export const useTaskForm = (taskPayload?: TaskType) => {

	const showTaskForm = () => {
		const taskToUse = taskPayload || emptyTask;
		createModalContainer(formTemplate(taskToUse));

		const form = document.getElementById('form-new-task');
		form?.addEventListener('submit', (evt) => onSubmitForm(evt));
		const cancelButton = document.getElementById('cancel-task');
		cancelButton?.addEventListener('click', removeForm);
	};

	const removeForm = () => {
		removeModalContainer();
	};

	const onSubmitForm = (evt: SubmitEvent) => {
		evt.preventDefault();

		const formNode = evt.target as HTMLFormElement;

		if (taskPayload?.title) {
			taskPayload.title = getFormData(formNode).title;
			updateTaskTitle(taskPayload);
			removeForm();
		} else {
			const newTask = createTask((getFormData(formNode).title));
			if (newTask) {
				renderNewTask(newTask);
				removeForm();
			}
		}
	};

	return {
		onSubmitForm,
		showTaskForm
	};
};
