//import {useTasksStore} from '../../store/useTasksStore.ts';
import {getFormData} from './utils/getFormData.ts';
//import {Task} from '../dashboard/Task/Task.ts';
import {modal} from './index.ts';
import type {TaskType} from '../../store/types/types.ts';

//const {createTask} = useTasksStore();

const formTemplate = ({title}: TaskType) => {

	const isNew = title === '' ? 'New' : '';
	const form = document.createElement('form');
	form.classList.add('form-new-task');
	form.setAttribute('id','form-new-task');

	form.innerHTML = `
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
  `;

	modal.append(form);
	return form;
};

const emptyTask: TaskType = {
	id: 0,
	title: '',
	parentListId: 0,
};

export const useTaskForm = (taskPayload?: TaskType) => {

	const showTaskForm = async () => {
		const taskToUse = Object.assign(emptyTask,taskPayload);

		const form =		formTemplate(taskToUse);
		modal.showModal();

		return new Promise((resolve, reject) => {

			form?.addEventListener('submit', (evt) => {
				return resolve(		onSubmitForm(evt));
			});

			const cancelButton = document.getElementById('cancel-task');

			cancelButton?.addEventListener('click', ()=>{
				removeForm();
				reject();
			});

		});
	};

	const removeForm = () => {
		modal.close();
		modal.innerHTML = '';
	};

	const onSubmitForm = (evt: SubmitEvent) => {
		evt.preventDefault();

		const formNode = evt.target as HTMLFormElement;

		if (taskPayload?.title) {
			//taskPayload.title = getFormData(formNode).title;
			//Task(taskPayload).renameTaskTitle();
			removeForm();
			return getFormData(formNode);
		}
		/*const newTask = createTask((getFormData(formNode).title));
		if (newTask) {
			Task(newTask).renderNewTask();
			removeForm();
		}*/
	};

	return {
		onSubmitForm,
		showTaskForm
	};
};
