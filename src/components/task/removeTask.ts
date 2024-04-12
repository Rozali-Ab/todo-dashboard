import { store } from '../../store/store';

export const onClickDeleteBtn = (element: HTMLElement) => {
  const id = Number(element.dataset.id);
  store.deleteTask(id);
};
