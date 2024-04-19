import {TaskType} from '../../../store/types/types.ts';
import {Task} from './Task.ts';
import {useTasksStore} from '../../../store/useTasksStore.ts';
import {renderNewList} from '../List/renderNewList.ts';

const {createList} = useTasksStore();

export const renderNewTask = async (task: TaskType) => {
	const {parentListId} = task;

	const listElement = document.querySelector(`.task-list[data-id="${parentListId}"]`);

	if (!listElement) {
		renderNewList(createList('Task today'));
		await renderNewTask(task);
		return;
	}

	listElement?.insertAdjacentHTML('beforeend', Task(task));
};
