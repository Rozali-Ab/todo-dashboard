import {TASK_TOOLS_EVENTS} from '../../../constants/events.ts';
// import {useDnD} from '../useDnD.ts';
// import {useTouchDnD} from '../useTouchDnD.ts';
import type {TaskType} from '../../../types/types.ts';
//
// const {onDragStart, onDragEnd} = useDnD();
// const {onTouchStart, onTouchMove, onTouchEnd} = useTouchDnD();

export default class Task extends HTMLElement {
	id = '';
	title = '';
	parent = '';
	order = '';
	taskTitle = document.createElement('div');
	taskTools = document.createElement('div');

	constructor({id, title, parentColumnId, order}: TaskType) {

		super();

		this.id = id.toString();
		this.title = title;
		this.parent = parentColumnId.toString();
		this.order = order.toString();

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

		// this.addEventListener('dragstart', onDragStart);
		// this.addEventListener('dragend', onDragEnd);
		//
		// this.addEventListener('touchstart', onTouchStart);
		// this.addEventListener('touchmove', onTouchMove);
		// this.addEventListener('touchend', onTouchEnd);
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

	updateTaskParent(newParentId: string) {
		this.parent = newParentId;
	}

}

customElements.define('task-component', Task);
