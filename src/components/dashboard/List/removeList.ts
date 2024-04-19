import {useTasksStore} from '../../../store/useTasksStore';

export const removeList = (evt: MouseEvent) => {
	const listElement = (evt.target as HTMLElement).closest('div.task-list') as HTMLElement;
	const listId = Number(listElement.dataset.id);

	const isEmpty = listElement.querySelectorAll('.task').length === 0;

	const {removeListById, removeAllTasksByParentId} = useTasksStore();

	if (isEmpty) {
		listElement.remove();
		removeListById(listId);
	} else {
		const confirmed = window.confirm('Remove list with all tasks?');
		if (confirmed) {
			listElement.remove();
			removeListById(listId);
			removeAllTasksByParentId(listId);
		}
	}
};
