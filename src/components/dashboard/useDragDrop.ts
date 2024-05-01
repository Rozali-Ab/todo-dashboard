import {useTasksStore} from '../../store/useTasksStore.ts';
import Task from './Task/Task.ts';
import List from './List/List.ts';

export const useDragDrop = () => {
	const {updateTaskParentIdById} = useTasksStore();

	const onDragStart = (evt: DragEvent) => {
		const taskId = (evt.target as Task).id;
		(evt.target as HTMLElement).classList.add('dragging');
		if (taskId) {
			evt.dataTransfer?.setData('taskId', taskId);
		}
	};

	const onDragEnter = (evt: DragEvent) => {
// TODO почитать что такое  instanceof ;
		if ( evt.target instanceof Task ) {
			// или провверять по тегу

			console.log('true!!');
		}
		evt.preventDefault();

	};

	const onDragOver = (evt: DragEvent) => {

		evt.preventDefault();
	};

	const onDrop = (evt: DragEvent) => {
		evt.preventDefault();

		const list = (evt.target as HTMLElement).closest('task-list') as List;
		if (list) {

			const listId = Number(list.id);
			const taskId = Number(evt.dataTransfer?.getData('taskId'));
			const task = document.getElementsByClassName('dragging')[0] as Task;

			updateTaskParentIdById(taskId, listId);

			task.setAttribute('parent', listId.toString());

			list.appendChild(task);
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

		const targetList = document.elementFromPoint(evt.changedTouches[0].clientX, evt.changedTouches[0].clientY) as HTMLElement;
		const list = targetList.closest('.task-list') as HTMLElement;

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
