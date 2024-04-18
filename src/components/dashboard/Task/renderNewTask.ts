import {TaskType} from '../../../store/types/types.ts';
import {Task} from './Task.ts';
import {useTasksStore} from '../../../store/useTasksStore.ts';
import {renderNewList} from '../TaskList/renderNewList.ts';

const {createList} = useTasksStore();

export const renderNewTask = (task: TaskType) => {
	const {parentListId} = task;

	const listElement = document.querySelector(`.task-list[data-id="${parentListId}"]`);

	if (!listElement) {
		renderNewList(createList({title: 'Task today'}));
		renderNewTask(task);
	}

	listElement?.insertAdjacentHTML('beforeend', Task(task));
};
