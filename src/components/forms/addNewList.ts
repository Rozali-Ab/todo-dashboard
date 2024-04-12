import {  useTasksStore } from '../../store/useTasksStore.ts';
import { renderList } from '../TaskList/renderList';
import { TaskListType } from '../../store/types/types';

const {taskLists,addList} = useTasksStore();
export const addNewList = () => {

  const addNewListBtn = document.querySelector<HTMLButtonElement>('.add-list-btn');
  const form = document.querySelector<HTMLFormElement>('#form-new-list');
  const input = document.querySelector<HTMLInputElement>('.form-new-list__input');
  const cancelBtn = document.querySelector<HTMLButtonElement>('#cancel-list');

  if (addNewListBtn && form && input && cancelBtn) {
    const getListFormData = () => {
      const id = taskLists.length + 1;
      const title = input.value;
      const order = taskLists.length + 1;

      if (title) {
        const listData: TaskListType = {
        id,
        title,
        order
      };

        return listData;
      }
    };

    const toggleShowForm = () => {
      form.classList.toggle('hide');
      addNewListBtn.classList.toggle('blur');
    };

    const onFormSubmit = (evt: Event) => {
      evt.preventDefault();

      const list = getListFormData();

      if (list) {
        renderList(list);
        addList(list);
        toggleShowForm();
      }

      form.reset();
    };

    cancelBtn.addEventListener('click', () => {
      toggleShowForm();
    });
    form.addEventListener('submit', (evt) => onFormSubmit(evt));
    toggleShowForm();
  }
};
