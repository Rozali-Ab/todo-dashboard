import {Task} from '../Task/Task.ts';
import type {ListType, TaskType} from '../../../store/types/types.ts';

type ListProps = {
	list: ListType;
	tasks?: TaskType[];
};

export const List = ({list, tasks}: ListProps) => {
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
          <span class="settigs-menu__span">rename</span>
        </div>
      </div>
    </div>
    ${taskElements}
	</div>
	`;
};
