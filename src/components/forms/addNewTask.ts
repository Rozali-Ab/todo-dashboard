import {  useTasksStore } from '../../store/useTasksStore.ts';
import { renderTask } from '../Task/renderTask';
import { TaskType } from '../../store/types/types';
const {tasksLength,creteNewTask} = useTasksStore();
export const addNewTask = () => {
  const form = document.querySelector<HTMLFormElement>('#form-new-Task');
  const titleInput = document.querySelector<HTMLInputElement>('#new-Task-title');
  const descriptionInput = document.querySelector<HTMLTextAreaElement>('#new-Task-description');
  const cancelBtn = document.querySelector<HTMLButtonElement>('#cancel-Task');
  const addBtn = document.querySelector('#add-new-Task');

  if (form && titleInput && descriptionInput && cancelBtn && addBtn) {

    const toggleShowForm = (e) => {
      console.log(e.target);
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
        creteNewTask(newTask);
        renderTask(newTask);
        toggleShowForm();
        form.reset();
      }
    };

    addBtn.addEventListener('click',  toggleShowForm);
    cancelBtn.addEventListener('click', toggleShowForm);

    descriptionInput.addEventListener('input', () => onChangeDescriptionInput());
    form.addEventListener('submit', (evt) => onFormSubmit(evt));
  }
};
