import Task from './Task/Task.ts';
import List from './List/List.ts';

export const useTouchDnD = () => {
	let draggingTask: Task;
	let initX = 0;
	let initY = 0;
	let taskWidth = 0;
	let taskHeight = 0;
	const placeholder = document.createElement('div');

	const onTouchStart = (evt: TouchEvent) => {
		if (evt.target instanceof Task) {
			draggingTask = evt.target;
			draggingTask.style.position = 'fixed';
			draggingTask.style.zIndex = '1000';

			const rect = draggingTask.getBoundingClientRect();
			initX = rect.left;
			initY = rect.top;
			taskWidth = rect.width;
			taskHeight = rect.height;
			placeholder.style.height = `${taskHeight}px`;
		}
	};

	const onTouchMove = (evt: TouchEvent) => {
		const touch = evt.touches[0];
		const x = touch.clientX - initX - taskWidth / 2;
		const y = touch.clientY - initY - taskHeight / 2;
		draggingTask.style.transform = `translate(${x}px, ${y}px)`;

		const target = document.elementFromPoint(touch.clientX, touch.clientY);

		if (target instanceof Task) {

			const list = target.closest('.task-list');

			if (list && target && target !== draggingTask) {
				const rect = target.getBoundingClientRect();
				const offsetY = touch.clientY - rect.top;

				if (offsetY > rect.height / 2) {
					list.insertBefore(placeholder, target.nextSibling);
				} else {
					list.insertBefore(placeholder, target);
				}
			}
		}

	};

	const onTouchEnd = () => {

		draggingTask.style.position = '';
		draggingTask.style.zIndex = '';
		draggingTask.style.transform = '';

		if (placeholder.parentNode instanceof List) {

			draggingTask.setAttribute('parent', placeholder.parentNode.id);

			placeholder.parentNode.insertBefore(draggingTask, placeholder);
			placeholder.parentNode.removeChild(placeholder);
		}
	};

	return {
		onTouchStart,
		onTouchMove,
		onTouchEnd
	};
};
