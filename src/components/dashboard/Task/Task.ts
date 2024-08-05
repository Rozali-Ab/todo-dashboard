import {TASK_TOOLS_EVENTS} from '../../../constants/events.ts';
import type {TaskType} from '../../../types/types.ts';

export default class Task extends HTMLElement {
	id = '';
	title = '';
	parent = '';
	order = '';
	isDone = false;
	taskTitle = document.createElement('div');
	taskTools = document.createElement('div');
	taskCheckbox = document.createElement('input'); // Создаем чекбокс

	constructor({id, title, parentColumnId, order, isDone}: TaskType) {
		super();
		this.id = id.toString();
		this.title = title;
		this.parent = parentColumnId.toString();
		this.order = order.toString();
		this.isDone = isDone;

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
		this.taskCheckbox.addEventListener('change', this.onCheckboxChange.bind(this));
	}

	buildTemplate() {
		this.classList.add('task');
		this.taskTitle.classList.add('task-title');
		this.taskTools.classList.add('task-tools');

		this.taskCheckbox.type = 'checkbox';
		this.taskCheckbox.dataset.actionType = TASK_TOOLS_EVENTS.IS_DONE_TASK;
		this.taskCheckbox.checked = this.isDone;

		this.taskTools.innerHTML = `
      <button class="task-tools__edit" data-action-type="${TASK_TOOLS_EVENTS.EDIT_TASK}">edit</button>
      <button class="task-tools__remove" data-action-type="${TASK_TOOLS_EVENTS.REMOVE_TASK}"></button>
    `;

		this.taskTools.prepend(this.taskCheckbox);
		this.prepend(this.taskTools);

		this.taskTitle.textContent = this.title;
		this.append(this.taskTitle);

		this.updateTaskTitleStyle();
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
			this.onCheckboxChange(evt);
			this.dispatchEvent(event);
			return;
		}

		this.dispatchEvent(event);
	}

	onCheckboxChange(evt: Event) {
		this.isDone = (evt.target as HTMLInputElement).checked;
		this.updateTaskTitleStyle();
	}

	updateTaskTitleStyle() {
		if (this.isDone) {
			this.taskTitle.classList.add('task--done');
		} else {
			this.taskTitle.classList.remove('task--done');
		}
	}

	removeTask() {
		this.classList.add('remove');

		setTimeout(() => {
			this.remove();
		}, 300);
	}

	updateTaskParent(newParentId: string) {
		this.parent = newParentId;
	}
}

customElements.define('task-component', Task);
