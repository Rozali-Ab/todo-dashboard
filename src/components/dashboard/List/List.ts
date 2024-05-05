import {ListProps, TaskType} from '../../../store/types/types.ts';
import Task from '../Task/Task.ts';
import {LIST_TOOLS_EVENTS} from '../../../constants/dashboardEvents.ts';

export default class List extends HTMLElement {
	id = '';
	title = '';
	taskArray: TaskType[] = [];
	listTools = document.createElement('div');
	listHeader = document.createElement('div');
	listTitle = document.createElement('div');

	constructor({list, tasks}: ListProps) {

		super();

		this.id = list.id.toString();
		this.title = list.title.toString();

		if (tasks) {
			this.taskArray = Array.isArray(tasks) ? tasks : [tasks];
		}

		this.setListAttributes();
	}

	/**
  в конструкторе устанавливаем атрибуты
	 */
	setListAttributes() {

		this.setAttribute('id', this.id);
		this.setAttribute('title', this.title);
	}

	/**
 при билде их считаем
	 */
	getListAttributes() {

		if (!this.id) {
			this.id  = this.getAttribute('id')!;
		}

		if (!this.title) {
			this.title = this.getAttribute('title')!;
		}
	}

	connectedCallback() {
		//mounted
		this.getListAttributes();
		this.buildTemplate();
		this.addEventListener('click', this.onListClick);

	}

	setTask(task: TaskType) {
		const taskComponent = new Task(task);
		this.append(taskComponent);
	}

	buildTemplate() {
	
		this.classList.add('task-list');
		this.listHeader.classList.add('task-list-header');
		this.listTitle.classList.add('task-list-title');

		this.listTools.classList.add('list-tools');
		this.listTools.innerHTML = `
      <button class="list-tools__add" data-action-type=${LIST_TOOLS_EVENTS.ADD_TASK}>add task</button>
      <button class="list-tools__rename" data-action-type=${LIST_TOOLS_EVENTS.EDIT_LIST}>edit list</button>
      <button class="list-tools__remove" data-action-type=${LIST_TOOLS_EVENTS.REMOVE_LIST}>delete list</button>
		`;

		this.listTitle.textContent = this.title;
		this.listHeader.append(this.listTools);
		this.listHeader.append(this.listTitle);

		this.prepend(this.listHeader);

		//чтобы повторно таски не рендерил
		if (this.taskArray && !this.querySelector('task-component')) {
			this.taskArray.forEach((task) => {
				this.setTask(task);
			});
		}
	}

	onListClick(evt: MouseEvent) {

		const currentAction = (evt.target as HTMLElement).dataset.actionType;

		if (!currentAction || !Object.values(LIST_TOOLS_EVENTS).includes(currentAction)) return;

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
		return ['title'];
	}

	attributeChangedCallback(attribute: string,) {

		let currentValue;

		if (attribute === 'title') {

			currentValue = this.getAttribute(attribute)!;

			if (this.title === currentValue) return;

			this.title = currentValue;
			this.buildTemplate();
		}
	}

}
