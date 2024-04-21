import {useTasksStore} from '../../store/useTasksStore.ts';

export const useDragDrop = () => {
	const {updateTaskParentIdById} = useTasksStore();

	const onDragStart = (evt: DragEvent) => {
		const taskId = (evt.target as HTMLElement).dataset.id;
		(evt.target as HTMLElement).classList.add('dragging');
		if (taskId) {
			evt.dataTransfer?.setData('taskId', taskId);
		}
	};

	const onDragEnter = (evt: DragEvent) => {
		evt.preventDefault();

	};

	const onDragOver = (evt: DragEvent) => {
		evt.preventDefault();
	};

	const onDrop = (evt: DragEvent) => {
		evt.preventDefault();

		const list = (evt.target as HTMLElement).closest('.task-list') as HTMLDivElement;
		if (list) {
			const listId = Number(list.dataset.id);
			const taskId = Number(evt.dataTransfer?.getData('taskId'));
			const task = document.getElementsByClassName('dragging')[0] as HTMLElement;

			updateTaskParentIdById(taskId, listId);
			list.appendChild(task);
			task.dataset.parentListId = listId.toString();
			task.classList.remove('dragging');
		}
	};

	return {
		onDragStart,
		onDragEnter,
		onDragOver,
		onDrop,
	};
};
