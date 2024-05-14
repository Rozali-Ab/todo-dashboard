//import {useTasksStore} from '../../store/useTasksStore.ts';
import Task from './Task/Task.ts';
import Column from './Column/Column.ts';

export const useDnD = () => {
	//const {updateTaskParentIdById} = useTasksStore();

	let draggingTask: Task;

	const onDragStart = (evt: DragEvent) => {
		if (evt.target instanceof Task) {
			draggingTask = evt.target;

			setTimeout(() => {
				draggingTask.style.opacity = '0';

			}, 0);
		}
	};

	const onDragOver = (evt: DragEvent) => {

		const target = evt.target;
		//if (!target) return;

		if (target instanceof Task) {
			const column = target.closest('.column-component') as Column;
			if (!column) return;

			if (column.children.length === 0) {
				column.appendChild(draggingTask);
				return;
			}

			const targetRect = target.getBoundingClientRect();
			const offsetY = evt.clientY - targetRect.top;

			if (offsetY > targetRect.height / 2) {
				target.nextSibling ? column.insertBefore(draggingTask, target.nextSibling) : column.appendChild(draggingTask);
				return;
			}

			column.insertBefore(draggingTask, target);
		}

	};

	const onDragEnd = () => {
		if (draggingTask) {
			draggingTask.style.opacity = '';
			draggingTask.setAttribute('parent', (draggingTask.parentNode as Column).id);
		}
	};

	return {
		onDragStart,
		onDragOver,
		onDragEnd
	};
};
