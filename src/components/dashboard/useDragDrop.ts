import {useTasksStore} from '../../store/useTasksStore.ts';
import Task from './Task/Task.ts';
import List from './List/List.ts';

export const useDragDrop = () => {
	const {updateTaskParentIdById} = useTasksStore();

	const onDragStart = (evt: DragEvent) => {
		const taskId = (evt.target as Task).id;
		(evt.target as Task).classList.add('dragging');

		if (taskId) {
			evt.dataTransfer?.setData('taskId', taskId);
			setTimeout(() => (evt.target as Task).classList.add('hide'), 0);
		}
	};

	const onDragLeave = (evt: DragEvent) => {
		evt.preventDefault();

		(evt.target as Task).classList.remove('drag-enter');

	};

	const onDragEnter = (evt: DragEvent) => {
		evt.preventDefault();

		if (evt.target instanceof Task) {

			evt.target.classList.add('drag-enter');
			((evt.target.closest('.task-list')) as List).style.paddingBottom = '';
		}

		if (evt.target ! instanceof Task) {
			((evt.target.closest('.task-list')) as List).style.paddingBottom = '60px';
		}

	};

	const onDragOver = (evt: DragEvent) => {
		evt.preventDefault();

	};
	const onDragEnd = (evt: DragEvent) => {
		evt.preventDefault();

		(evt.target as Task).classList.remove('hide');
		(((evt.target as Task).closest('task-list')) as List).style.paddingBottom = '15px';
	};

	const onDrop = (evt: DragEvent) => {
		evt.preventDefault();
		(evt.target as Task).classList.remove('drag-enter');

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
		onDragLeave,
		onDragEnter,
		onDragOver,
		onDragEnd,
		onDrop,
		onTouchMove,
		onTouchEnd
	};
};
