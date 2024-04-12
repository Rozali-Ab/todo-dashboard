import { taskView } from './taskView';
import { dragAndDropEvent } from '../dashboard/dragAndDropEvent';
import { TaskType } from '../../store/types/types';
import { onClickDeleteBtn } from './removeTask';

export const renderTask = (task: TaskType) => {
  const {id, parentListId} = task;

  const listElement = document.querySelector(`.task-list[data-id="${parentListId}"]`) 
    || document.querySelector('.Task-list[data-id="0"]');

  const taskElement = document.createElement('div');
    taskElement.className = 'Task';
    taskElement.draggable = true;
    taskElement.dataset.id = `${id}`;
    taskElement.dataset.parentId = `${parentListId}`;
    taskElement.innerHTML = taskView(task);
    taskElement.draggable = true;

    listElement?.appendChild(taskElement);

    taskElement.querySelector('#remove-Task')?.addEventListener('click', () => {
      onClickDeleteBtn(taskElement);

      listElement?.removeChild(taskElement);
    });

    taskElement.addEventListener('dragstart', () => {
      dragAndDropEvent.onDragStart(taskElement);
    });
    taskElement.addEventListener('dragend', () => {
      dragAndDropEvent.onDragEnd(taskElement);
    });
    taskElement.addEventListener('dragover', (evt) => {
      dragAndDropEvent.onDragOver(evt);
    });
    taskElement.addEventListener('dragleave', () => {
      dragAndDropEvent.onDragLeave();
    });
};
