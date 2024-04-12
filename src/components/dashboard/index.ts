import {  useTasksStore } from '../../store/useTasksStore.ts';
import { renderDashboard } from './renderDashboard';
import { addNewList } from '../forms/addNewList';
import { addNewTask } from '../forms/addNewTask';
import { dragAndDropEvent } from './dragAndDropEvent';

const { taskLists, tasks } = useTasksStore();

const dashboard = document.querySelector<HTMLElement>('.dashboard');
const addNewListBtn = document.querySelector<HTMLButtonElement>('#add-list-btn');
const addNewTaskBtn = document.querySelector<HTMLButtonElement>('#add-new-Task');

const draggableList = document.querySelector<HTMLDivElement>('.Task-list');

if (dashboard && addNewListBtn && addNewTaskBtn && draggableList) {
  renderDashboard(taskLists, tasks);
  // TODO  вынести в NavBar
  addNewListBtn.addEventListener('click', () => addNewList());

  addNewTaskBtn.addEventListener('click', () => addNewTask());

  draggableList.addEventListener('drop', (evt: DragEvent) => {
    dragAndDropEvent.onDrop(evt, draggableList);
  });

  draggableList.addEventListener('dragenter', (evt: DragEvent) => {
    dragAndDropEvent.onDrop(evt, draggableList);
  });
}
