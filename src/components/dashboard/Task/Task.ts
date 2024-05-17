import {TASK_TOOLS_EVENTS} from '../../../constants/dasboardEvents.ts';
import type {TaskType} from '../../../store/types/types.ts';

export default class Task extends HTMLElement {
	id = '';
	title = '';
	parent = '';
	taskTitle = document.createElement('div');
	taskTools = document.createElement('div');

	constructor({id, title, parentColumnId}: TaskType) {

		super();

		this.id = id.toString();
		this.title = title;
		this.parent = parentColumnId.toString();

		this.setTaskAttributes();
	}

	setTaskAttributes() {

		this.setAttribute('id', this.id);
		this.setAttribute('draggable', 'true');
	}

	getTaskAttributes() {
		if (!this.id) {
			this.id = this.getAttribute('id')!;
		}
	}

	connectedCallback() {

		this.getTaskAttributes();
		this.buildTemplate();
		this.taskTools.addEventListener('click', this.onTaskToolsClick.bind(this));

	}

	buildTemplate() {

		this.classList.add('task');
		this.taskTitle.classList.add('task-title');
		this.taskTools.classList.add('task-tools');

		this.taskTools.innerHTML = `
			<button class="task-tools__edit" data-action-type="${TASK_TOOLS_EVENTS.EDIT_TASK}">edit</button>
			<button class="task-tools__remove" data-action-type="${TASK_TOOLS_EVENTS.REMOVE_TASK}"></button>
		`;
		this.prepend(this.taskTools);

		this.taskTitle.textContent = this.title;

		this.append(this.taskTitle);

	}

	onTaskToolsClick(evt: MouseEvent) {

		const currentAction = (evt.target as HTMLElement).dataset.actionType;

		if (!currentAction || !Object.values(TASK_TOOLS_EVENTS).includes(currentAction)) return;

		const {id} = this;

		const event = new CustomEvent(currentAction, {
			bubbles: true,
			detail: {id}
		});

		if (currentAction === TASK_TOOLS_EVENTS.REMOVE_TASK) {
			this.removeTask();
		}

		this.dispatchEvent(event);
	}

	removeTask() {

		this.classList.add('remove');

		setTimeout(() => {
			this.remove();
		}, 300);
	}

	updateTaskTitle(payload: TaskType) {
		this.title = payload.title;
		this.taskTitle.textContent = this.title;
	}

	updateTaskParent(newParentId: string) {
		this.parent = newParentId;
	}

}
