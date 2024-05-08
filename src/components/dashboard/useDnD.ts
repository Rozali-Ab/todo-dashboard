//import {useTasksStore} from '../../store/useTasksStore.ts';
import Task from './Task/Task.ts';
import List from './List/List.ts';

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

		const target = evt.target as Task;
		if (!target) return;

		const list = target.closest('.task-list') as List;
		if (!list) return;

		if (list.children.length === 0) {
			list.appendChild(draggingTask);
			return;
		}

		const targetRect = target.getBoundingClientRect();
		const offsetY = evt.clientY - targetRect.top;

		if (offsetY > targetRect.height / 2) {
			target.nextSibling ? list.insertBefore(draggingTask, target.nextSibling) : list.appendChild(draggingTask);
			return;
		}

		list.insertBefore(draggingTask, target);

	};

	const onDragEnd = () => {
		if (draggingTask) {
			draggingTask.style.opacity = '';
			draggingTask.setAttribute('parent', (draggingTask.parentNode as List).id);
		}
	};

	return {
		onDragStart,
		onDragOver,
		onDragEnd
	};
};
