import type {TaskType} from '../../../store/types/types';

export const Task = (task: TaskType) => {

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
