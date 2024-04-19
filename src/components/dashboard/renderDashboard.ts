import {List} from './List/List.ts';
import {ListType, TaskType} from '../../store/types/types.ts';

export const renderDashboard = (dashboard: HTMLElement, lists: ListType[], tasks: TaskType[]) => {
	if (dashboard) {
		lists.forEach((list) => {
			const taskInList = tasks.filter(task => task.parentListId === list.id);
			const listElement = List({list, tasks: taskInList});
			dashboard.insertAdjacentHTML('beforeend', listElement);
		});
	}
};
