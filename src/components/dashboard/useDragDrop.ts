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

	const onTouchMove = (evt: TouchEvent) => {
		evt.preventDefault();

		const task = (evt.target as HTMLElement).closest('.task') as HTMLDivElement;
		const list = (evt.target as HTMLElement).closest('.task-list') as HTMLDivElement;
		task.classList.add('dragging');
		const touch = evt.targetTouches[0];

		task.style.top = touch.pageY - list.offsetTop - (task.offsetHeight / 2) + 'px';
		task.style.left = touch.pageX - list.offsetLeft - (task.offsetWidth / 2) + 'px';

	};

	const onTouchEnd = (evt: TouchEvent) => {
		evt.preventDefault();
		const task = document.querySelector('.dragging') as HTMLDivElement;

		const tarrenderList = document.elementFromPoint(evt.changedTouches[0].clientX, evt.changedTouches[0].clientY) as HTMLElement;
		const list = tarrenderList.closest('.task-list') as HTMLElement;

		if (list && task) {
			const taskId = Number(task.dataset.id);
			const listId = Number(list.dataset.id);
			list.appendChild(task);
			task?.classList.remove('dragging');
			task.dataset.parentListId = listId.toString();
			task.style.top = '';
			task.style.left = '';
			updateTaskParentIdById(taskId, listId);
		}

	};

	return {
		onDragStart,
		onDragEnter,
		onDragOver,
		onDrop,
		onTouchMove,
		onTouchEnd
	};
};
