import {useTasksStore} from '../../../store/useTasksStore.ts';
import {Task} from '../Task/Task.ts';
import type {ListType, TaskType} from '../../../store/types/types.ts';

const template = (list: ListType, tasks?: TaskType[]) => {
	const {id, title} = list;
	const taskElements = tasks?.map(task => Task(task).getTaskTemplate()).join('') || '';
	const isHide = id === 0 ? 'hide' : '';

	return `
		<div
			class="task-list"
			data-id="${id}"
		>
		<div class="task-list-header">
      <div class="task-list-title">${title}</div>
      <div class="task-list-settings ${isHide}">
        <div class="settigs-menu">
          <span 
          	class="settigs-menu__remove"
          	data-action="remove-list"
          >
          	delete list
          </span>
          <span 
          	class="settigs-menu__rename"
          	data-action="rename-list"
          >
          	rename list
          </span>
        </div>
      </div>
    </div>
    ${taskElements}
	</div>
	`;
};

export const List = (list: ListType, tasks?: TaskType[]) => {
	const {removeListById, removeAllTasksByParentId, updateListTitleByTitle} = useTasksStore();
	const container = document.getElementById('dashboard');

	const listElement = document.querySelector(`.task-list[data-id="${list.id}"]`);
	const titleElement = listElement?.querySelector('.task-list-title');

	const getList = () => {
		if (container) container.insertAdjacentHTML('beforeend', template(list, tasks));
	};

	const renameListTitle = () => {
		if (titleElement)
			titleElement.textContent = list.title;
		updateListTitleByTitle(list);
	};

	const removeList = () => {
		const isEmpty = listElement?.getElementsByClassName('task').length === 0;
		if (isEmpty) {
			listElement.remove();
			removeListById(list.id);
			return;
		} else {
			const confirmed = window.confirm('Remove list with all tasks?');
			if (confirmed) {
				listElement?.remove();
				removeListById(list.id);
				removeAllTasksByParentId(list.id);
			}
		}
	};

	return {
		getList,
		renameListTitle,
		removeList,
	};
};

/*export const List = ({list, tasks}: ListProps) => {
	const {id, title} = list;

	const taskElements = tasks ? tasks.map(task => Task(task)).join('') : '';

	return `
		<div
			class="task-list"
			data-id="${id}"
		>
		<div class="task-list-header">
      <div class="task-list-title">${title}</div>
      <div class="task-list-settings">
        <div class="settigs-menu">
          <span
          	class="settigs-menu__remove"
          	data-action="remove-list"
          >
          	delete list
          </span>
          <span
          	class="settigs-menu__rename"
          	data-action="rename-list"
          >
          	rename list
          </span>
        </div>
      </div>
    </div>
    ${taskElements}
	</div>
	`;
};*/
