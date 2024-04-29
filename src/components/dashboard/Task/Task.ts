import {useTasksStore} from '../../../store/useTasksStore.ts';
import {List} from '../List/List.ts';
import type {TaskType} from '../../../store/types/types';

const template = (task: TaskType) => {
	const {
		id,
		title,
		parentListId,
	} = task;

	return `
	  <div
	      class="task"
	      draggable="true"
	      data-id="${id}"
	      data-parent-list-id="${parentListId}"
	  >
	      <div class="task-tools">
        <button 
          class="task-tools__edit" 
          data-action="edit-task" 
        > 
          edit
        </button>
        <button 
          class="task-tools__remove" 
          data-action="remove-task"
        ></button>
      </div>
      <div class="task-type">Work</div>
      <div class="task-title">${title}</div>
      <div class="task-tags">
        <span class="task-tag">tag</span>
        <span class="task-tag">tag</span>
        <span class="task-tag">tag</span>
      </div>
    </div>   
  `;
};

export const Task = (task: TaskType) => {

	const {removeTaskById, updateTaskParentIdById, updateTaskTitleByTitle, createList} = useTasksStore();

	const taskElement = document.querySelector(`.task[data-id="${task.id}"]`) as HTMLDivElement;
	const titleElement = taskElement?.querySelector('.task-title');

	const getTaskTemplate = () => {
		return template(task);
	};

	const renderNewTask = () => {
		
		const taskParentElement = document.querySelector('.task-list[data-id="0"]');

		if (!taskParentElement) {

			const list = createList('Task today');
			
			List(list).renderList();

			renderNewTask();
			return;
			
		}

		taskParentElement.insertAdjacentHTML('beforeend', getTaskTemplate());
	};

	const renameTaskTitle = () => {
		if (titleElement)
			titleElement.textContent = task.title;
		updateTaskTitleByTitle(task);
	};

	const updateParentId = (parentId: number) => {
		task.parentListId = parentId;
		taskElement.dataset.parentListId = parentId.toString();
		updateTaskParentIdById(task.id, parentId);
	};

	const removeTask = () => {
		taskElement?.remove();
		removeTaskById(task.id);
	};

	return {
		getTaskTemplate,
		renameTaskTitle,
		updateParentId,
		removeTask,
		renderNewTask
	};
};

/*export const Task = (task: TaskType) => {

	const {
		id,
		title,
		parentListId,
	} = task;

	return `
	  <div
	      class="task"
	      draggable="true"
	      data-id="${id}"
	      data-parent-list-id="${parentListId}"
	  >
	      <div class="task-tools">
        <button
          class="task-tools__edit"
          data-action="edit-task"
        >
          edit
        </button>
        <button
          class="task-tools__remove"
          data-action="remove-task"
        ></button>
      </div>
      <div class="task-type">Work</div>
      <div class="task-title">${title}</div>
      <div class="task-tags">
        <span class="task-tag">tag</span>
        <span class="task-tag">tag</span>
        <span class="task-tag">tag</span>
      </div>
    </div>
  `;
};*/
