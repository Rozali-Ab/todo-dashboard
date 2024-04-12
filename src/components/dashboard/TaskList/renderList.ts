import { taskListView } from './taskListView';
import { dragAndDropEvent } from '../dashboard/dragAndDropEvent';
import { TaskListType } from '../../store/types/types';

export const renderList = (taskList: TaskListType) => {
  const {id} = taskList;
  const dashboard = document.getElementById('dashboard');

  if (dashboard) {
    const listElement = document.createElement('div');
    listElement.className = 'Task-list';
    listElement.dataset.id = `${id}`;
    listElement.innerHTML = taskListView(taskList);

    listElement.addEventListener('dragover', (event) => {
      event.preventDefault();
    });

    listElement.addEventListener('drop', (evt: DragEvent) => {
      dragAndDropEvent.onDrop(evt, listElement);
    });

    listElement.addEventListener('dragenter', (evt) => {
      dragAndDropEvent.onDragEnter(evt, listElement);
    });

    dashboard.appendChild(listElement);
  }
};
