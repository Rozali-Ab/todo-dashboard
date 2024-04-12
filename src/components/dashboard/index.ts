import { store } from '../../store/store';
import { renderDashboard } from './renderDashboard';
import { addNewList } from '../forms/addNewList';
import { addNewTask } from '../forms/addNewTask';
import { dragAndDropEvent } from './dragAndDropEvent';

const dashboard = document.querySelector<HTMLElement>('.dashboard');
const addNewListBtn = document.querySelector<HTMLButtonElement>('#add-list-btn');
const { taskLists, tasks } = store;
const addNewTaskBtn = document.querySelector<HTMLButtonElement>('#add-new-task');
const draggableList = document.querySelector<HTMLDivElement>('.task-list');

if (dashboard && addNewListBtn && addNewTaskBtn && draggableList) {
  renderDashboard(taskLists, tasks);

  addNewListBtn.addEventListener('click', () => addNewList());

  addNewTaskBtn.addEventListener('click', () => addNewTask());

  draggableList.addEventListener('drop', (evt: DragEvent) => {
    dragAndDropEvent.onDrop(evt, draggableList);
  });

  draggableList.addEventListener('dragenter', (evt: DragEvent) => {
    dragAndDropEvent.onDrop(evt, draggableList);
  });
}
