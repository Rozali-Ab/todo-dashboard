import {List} from './TaskList/List.ts';
import {ListType, TaskType} from '../../store/types/types.ts';

export const renderDashboard = (lists: ListType[], tasks: TaskType[]) => {
	const dashboard = document.querySelector<HTMLElement>('#dashboard');

	if (dashboard) {
		lists.forEach((list) => {
			const taskInList = tasks.filter(task => task.parentListId === list.id);
			const listElement = List({list, tasks: taskInList});
			dashboard.insertAdjacentHTML('beforeend', listElement);
		});
	}
};
