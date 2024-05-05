import {TaskType} from '../../../store/types/types.ts';
import {TASK_TOOLS_EVENTS} from '../../../constants/dashboardEvents.ts';

export default class Task extends HTMLElement {
	id = '';
	title = '';
	parent = '';
	taskTitle = document.createElement('div');
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

	onTaskToolsClick = (e) => {

		const currentAction = e.target.dataset.actionType;
		// задание со зведочкой починить this без стрелочной фнукции потеря контекста bind

		// сделать првоерку есть ли евент такой
		const {id} = this;

		const event = 	new CustomEvent(currentAction, {
			bubbles: true,
			detail: { id }
		});

		this.dispatchEvent(event);
	};

	/**
		следит за изменениями атрибутов и вызывает attributeChangedCallback при изменении
	 */
	static get observedAttributes() {

		return ['title', 'parent'];
	}
	
	attributeChangedCallback(attribute: string) {

		let currentValue;

		if (attribute === 'title') {

			currentValue = this.getAttribute(attribute)!;

			if (this.title === currentValue) return;

			this.title = currentValue;
			this.taskTitle.textContent = currentValue;
	
		}

		if (attribute === 'parent') {

			currentValue = this.getAttribute(attribute)!;

			if (this.parent === currentValue) return;
			this.parent = currentValue;
			this.buildTemplate();
		}

	}

}
