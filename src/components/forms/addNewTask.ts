import {  useTasksStore } from '../../store/useTasksStore.ts';
import { renderTask } from '../task/renderTask';
import { TaskType } from '../../store/types/types';
const {tasksLength,addTask} = useTasksStore();
export const addNewTask = () => {
  const form = document.querySelector<HTMLFormElement>('#form-new-task');
  const titleInput = document.querySelector<HTMLInputElement>('#new-task-title');
  const descriptionInput = document.querySelector<HTMLTextAreaElement>('#new-task-description');
  const cancelBtn = document.querySelector<HTMLButtonElement>('#cancel-task');
  const addBtn = document.querySelector('#add-new-task');

  if (form && titleInput && descriptionInput && cancelBtn && addBtn) {

    const toggleShowForm = () => {
      form.classList.toggle('hide');
      addBtn.classList.toggle('hide');
    };

    const getTaskFormData = () => {
      const id = tasksLength + 1;
      const title = titleInput.value;
      const description = descriptionInput.value;
      const parentListId = 0;

      if (title) {
        const taskData: TaskType = {
        id,
        title,
        description,
        parentListId
      };

      return taskData;
      }
    };

    const onChangeDescriptionInput = () => {
      descriptionInput.style.height = '0';
      descriptionInput.style.height = descriptionInput.scrollHeight + 'px';
    };

    const onFormSubmit = (evt: SubmitEvent) => {
      evt.preventDefault();

      const newTask = getTaskFormData();
      if (newTask) {
        addTask(newTask);
        renderTask(newTask);
        toggleShowForm();
        form.reset();
      }
    };

    addBtn.addEventListener('click', () => toggleShowForm());
    cancelBtn.addEventListener('click', () => toggleShowForm());
    descriptionInput.addEventListener('input', () => onChangeDescriptionInput());
    form.addEventListener('submit', (evt) => onFormSubmit(evt));
  }
};
