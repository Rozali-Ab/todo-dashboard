import {useTasksStore} from '../../../store/useTasksStore';

export const removeTask = (evt: MouseEvent) => {
	const {removeTaskById} = useTasksStore();
	const task = (evt.target as HTMLElement).closest('div.task') as HTMLElement;
	if (task) {
		const taskId = Number(task.dataset.id);
		task.remove();
		removeTaskById(taskId);
	}
};
