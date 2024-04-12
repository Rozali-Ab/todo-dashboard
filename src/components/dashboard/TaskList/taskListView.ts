import { TaskListType } from '../../store/types/types';

export const taskListView = (list: TaskListType) => {
  const {
    title
  } = list;

  return `
    <div class="task-list-header">
      <div class="task-list-title">${title}</div>
      <div class="task-list-settings" id="list settings">
        <div class="settigs-menu">
          <span class="settig-menu__span" id="rename-list">rename</span>
        </div>
      </div>
    </div>
  `;
};
