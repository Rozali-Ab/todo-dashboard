import {TASK_TOOLS_EVENTS} from '../../../constants/events.ts';
import type {TaskType} from '../../../types/types.ts';

export default class Task extends HTMLElement {
	id = '';
	title = '';
	order = '';
	isDone = false;

	taskTitle = document.createElement('div');
	taskTools = document.createElement('div');
	isDoneTaskElement = document.createElement('div');

	constructor({id = '', title = '', order = '0', isDone = false}: Partial<TaskType> = {}) {
		super();
		this.id = id.toString() || '';
		this.title = title || '';
		this.order = order.toString() || '0';
		this.isDone = isDone;

		this.setTaskAttributes();
	}

	setTaskAttributes() {
		this.setAttribute('id', this.id);
		this.setAttribute('draggable', 'true');
	}

	getTaskAttributes() {
		if (!this.id) {
			this.id = this.getAttribute('id') || '0';
		}
	}

	connectedCallback() {
		this.getTaskAttributes();
		this.buildTemplate();
		this.addEventListener('click', this.onTaskToolsClick.bind(this));
	}

	buildTemplate() {
		this.classList.add('task');
		this.taskTitle.classList.add('task-title');
		this.taskTools.classList.add('task-tools');

		this.isDoneTaskElement.classList.add('is-task-done');
		this.isDoneTaskElement.dataset.actionType = TASK_TOOLS_EVENTS.IS_DONE_TASK;

		this.taskTools.innerHTML = `
			<div class="task-tools--wrapper">
	      <div class="task-tools__edit" data-action-type="${TASK_TOOLS_EVENTS.EDIT_TASK}">
	      	<img src="https://cdn-icons-png.freepik.com/256/8861/8861212.png?ga=GA1.1.1496496612.1674736423" alt="edit task">
				</div>
	      <div class="task-tools__remove" data-action-type="${TASK_TOOLS_EVENTS.REMOVE_TASK}">
	      	<img src="https://cdn-icons-png.freepik.com/256/12560/12560909.png?uid=R115631995&ga=GA1.1.1496496612.1674736423&semt=ais_hybrid" alt="remove task">
				</div>
		</div>
    `;

		this.handlerIsDone();

		this.prepend(this.taskTools);
		this.append(this.isDoneTaskElement);

		this.taskTitle.textContent = this.title;
		this.append(this.taskTitle);
	}

	onTaskToolsClick(evt: MouseEvent) {
		const currentAction = (evt.target as HTMLElement).dataset.actionType;

		if (!currentAction || !Object.values(TASK_TOOLS_EVENTS).includes(currentAction)) return;

		const {id, isDone} = this;
		const event = new CustomEvent(currentAction, {
			bubbles: true,
			detail: {id: id, isDone: !isDone}
		});

		if (currentAction === TASK_TOOLS_EVENTS.REMOVE_TASK) {
			this.removeTask();
		}

		if (currentAction === TASK_TOOLS_EVENTS.IS_DONE_TASK) {
			this.isDone = !this.isDone;
			this.handlerIsDone();
			this.dispatchEvent(event);
			return;
		}

		this.dispatchEvent(event);
	}

	handlerIsDone() {

		this.isDoneTaskElement.innerHTML = this.isDone
			? '<img src="https://cdn-icons-png.freepik.com/256/12593/12593627.png?ga=GA1.1.1496496612.1674736423" alt="done-task">'
			: '<img src="https://cdn-icons-png.freepik.com/256/14619/14619587.png?ga=GA1.1.1496496612.1674736423" alt="not-done-task">';
	}

	removeTask() {
		this.classList.add('remove');

		setTimeout(() => {
			this.remove();
		}, 300);
	}

	//если order изменился, отправляем событие в Dashboard, оттуда в store и на сервер
	updateTaskOrder(newOrder: string) {
		if (this.order === newOrder.toString()) return;

		this.order = newOrder;

		const event = new CustomEvent(TASK_TOOLS_EVENTS.UPDATE_ORDER, {
			bubbles: true,
			detail: {
				taskId: this.id,
				order: this.order
			}
		});

		this.dispatchEvent(event);
	}
}

customElements.define('task-component', Task);
