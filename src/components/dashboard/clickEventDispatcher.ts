import {List} from './List/List.ts';
import {Task} from './Task/Task.ts';
import {useListForm} from '../NavBar/useListForm.ts';
import {useTaskForm} from '../NavBar/useTaskForm.ts';
import {CLICK_ACTIONS} from '../../constants/const';
import {useTasksStore} from '../../store/useTasksStore.ts';

const {findListById} = useTasksStore();

const renderListToUpdate = (evt: MouseEvent) => {
	const listElement = (evt.target as HTMLElement).closest('div.task-list') as HTMLDivElement;

	const listId = Number(listElement.dataset.id);

	return 	findListById(listId);
	// const listTitle = (listElement.querySelector('.task-list-title') as HTMLDivElement).textContent;
	//
	// return {
	// 	id: listId,
	// 	title: listTitle || 'hi bug',
	// 	order: listId
	// };
};
const getTaskToUpdate = (evt: MouseEvent) => {

	const taskElement = (evt.target as HTMLElement).closest('div.task') as HTMLElement;
	const taskId = Number(taskElement.dataset.id);

	const taskParentId = Number(taskElement.dataset.parentListId);
	const taskTitle = (taskElement.querySelector('.task-title') as HTMLDivElement).textContent;
	// TODO useStore
	return {
		id: taskId,
		title: taskTitle || 'hi bug',
		parentListId: taskParentId
	};
};

export const clickEventDispatcher = (evt: MouseEvent) => {
	const action = (evt.target as HTMLElement).dataset.action;
	// TODO
	// if (CLICK_ACTIONS.REMOVE_TASK === action) {
	//	Task(getTaskToUpdate(evt)).removeTask();
	// 	return
	// }
	console.log(evt.target);

	switch (action) {
		case CLICK_ACTIONS.REMOVE_TASK:
			Task(getTaskToUpdate(evt)).removeTask();
			break;

		case CLICK_ACTIONS.REMOVE_LIST:
			List(renderListToUpdate(evt)).removeList();
			break;

		case CLICK_ACTIONS.EDIT_TASK:
			useTaskForm(getTaskToUpdate(evt)).showTaskForm();
			break;
		case CLICK_ACTIONS.RENAME_LIST:

			const currentList =   renderListToUpdate(evt);
			useListForm(currentList).showListForm();
			break;
	}
};
