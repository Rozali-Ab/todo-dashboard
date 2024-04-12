import {  useTasksStore } from '../../store/useTasksStore.ts';
const {deleteTaskById} = useTasksStore();
export const onClickDeleteBtn = (element: HTMLElement) => {
  const id = Number(element.dataset.id);
  deleteTaskById(id);
};
