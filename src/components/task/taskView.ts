import type { TaskType } from '../../store/types/types';

export const taskView = (task: TaskType) => {
  const {
    title,
    description,
  } = task;

  return `
      <div class="task-tools">
        <span 
          class="task-tools__edit"  
          id="edit-task"
        > 
          edit
        </span>
        <button 
          class="task-tools__remove" 
          id="remove-task"
        ></button>
      </div>
      <div class="task-type">Work</div>
      <div class="task-title">${title}</div>
      <div class="task-description">${description}</div>
      <div class="task-tags">
        <span class="task-tag">tag</span>
        <span class="task-tag">tag</span>
        <span class="task-tag">tag</span>
      </div>
  `;
};
