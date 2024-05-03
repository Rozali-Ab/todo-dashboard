import {TaskType} from '../../../store/types/types.ts';
import {TaskToolsEvent} from '../../../constants/TaskToolsEvent.ts';

export default class Task extends HTMLElement {
	id = '';
	title = '';
	parent = '';
	taskTools = document.createElement('div');

	constructor({id, title, parentListId}: TaskType) {

		super();

		this.id = id.toString();
		this.title = title;
		this.parent = parentListId.toString();

		this.setTaskAttributes();
	}

	/**
 в конструкторе устанавливаем атрибуты
	 */
	setTaskAttributes() {

		this.setAttribute('id', this.id);
		this.setAttribute('title', this.title);
		this.setAttribute('parent', this.parent);
		this.setAttribute('draggable', 'true');
	}

	/**
 при билде их считаем
	 */
	getTaskAttributes() {
		this.id = this.getAttribute('id')!;
		this.title = this.getAttribute('title')!;
		this.parent = this.getAttribute('parent')!;
	}

	connectedCallback() {
		//mounted

		this.buildTemplate();
		this.addEventListener('click', this.onTaskToolsClick);

	}

	buildTemplate() {

		this.getTaskAttributes();
		this.classList.add('task');

		this.taskTools.classList.add('task-tools');
		this.taskTools.innerHTML = `
			<button class="task-tools__edit" data-action-type="${TaskToolsEvent.EDIT_TASK}">edit</button>
			<button class="task-tools__remove" data-action-type="${TaskToolsEvent.REMOVE_TASK}"></button>
		`;
		this.prepend(this.taskTools);

		let taskTitle = this.querySelector('.task-title');
		if (!taskTitle) {
			taskTitle = document.createElement('div');
			taskTitle.classList.add('task-title');
			this.append(taskTitle);
		}
		taskTitle.textContent = this.title;

		this.append(taskTitle);

	}

	onTaskToolsClick(evt: MouseEvent) {

		if (!(evt.target as HTMLElement).dataset.actionType) return;

		const currentAction = (evt.target as HTMLElement).dataset.actionType;
		if (!currentAction || !Object.values(TaskToolsEvent).includes(currentAction)) return;

		const {id} = this;

		const event = new CustomEvent(currentAction, {
			bubbles: true,
			detail: {id}
		});

		this.dispatchEvent(event);
	}

	/**
		следит за изменениями атрибутов и вызывает attributeChangedCallback при изменении
	 */
	static get observedAttributes() {

		return ['title', 'parent'];
	}

	attributeChangedCallback(attribute: string) {

		let previousValue;
		let currentValue;

		if (attribute === 'title') {
			previousValue = this.title;
			currentValue = this.getAttribute(attribute)!;

			if (previousValue === currentValue) return;

			this.title = currentValue;
			this.buildTemplate();
		}

		if (attribute === 'parent') {
			previousValue = this.parent;
			currentValue = this.getAttribute(attribute)!;

			if (previousValue === currentValue) return;
			this.parent = currentValue;
			this.buildTemplate();
		}

		console.log('attributeChangedCallback');
	}

}
