import {TaskType} from '../../../store/types/types';
import {useTaskForm} from '../../NavBar/useTaskForm';
import {useTasksStore} from '../../../store/useTasksStore';

export const editTask = (evt: MouseEvent) => {
	const taskElement = (evt.target as HTMLElement).closest('div.task') as HTMLElement;
	const taskTitleElement = taskElement.querySelector('.task-title');

	if (taskElement && taskTitleElement) {
		const title = taskTitleElement.textContent;
		if (title !== null) {
			const task = {
				id: Number(taskElement.dataset.id),
				title: title,
				parentListId: Number(taskElement.dataset.parentListId)
			};

			const {showTaskForm} = useTaskForm(task);
			showTaskForm();
		}
	}
};

export const updateTaskTitle = (task: TaskType) => {
	const taskElement = document.querySelector(`.task[data-id="${task.id}"]`);
	if (taskElement) {
		const title = taskElement.querySelector('.task-title');
		if (title) {
			title.textContent = task.title;
			const {updateTaskTitleByTitle} = useTasksStore();
			updateTaskTitleByTitle(task);
		}
	}
};
