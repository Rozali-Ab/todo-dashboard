import {ListType, TaskType} from '../../../store/types/types.ts';
import Task from '../Task/Task.ts';
import {LIST_TOOLS_EVENTS} from '../../../constants/dasboardEvents.ts';

export default class List extends HTMLElement {
	id = '';
	title = '';
	taskArray: TaskType[] = [];
	listTools = document.createElement('div');
	listHeader = document.createElement('div');
	listTitle = document.createElement('div');

	constructor({id, title}: ListType) {

		super();

		this.id = id.toString();
		this.title = title.toString();
		this.setListAttributes();
	}

	/**
  в конструкторе устанавливаем атрибуты
	 */
	setListAttributes() {

		this.setAttribute('id', this.id);
		this.setAttribute('title', this.title);
	}

	getListAttributes() {
		if (!this.id) {
			this.id = this.getAttribute('id')!;
		}

		if (!this.title) {
			this.title = this.getAttribute('title')!;
		}
	}

	connectedCallback() {
		//mounted

		this.getListAttributes();
		this.buildTemplate();
		this.listTools.addEventListener('click', this.onListToolsClick.bind(this));

	}

	appendTask(task: TaskType) {

		this.taskArray.push(task);

		const taskComponent = new Task(task);
		this.append(taskComponent);

		return taskComponent;
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

	}

	onListToolsClick(evt: MouseEvent) {

		const currentAction = (evt.target as HTMLElement).dataset.actionType;

		if (!currentAction || !Object.values(LIST_TOOLS_EVENTS).includes(currentAction)) return;

		const {id} = this;

		const event = new CustomEvent(currentAction, {
			bubbles: true,
			detail: {id}
		});

		if (currentAction === LIST_TOOLS_EVENTS.REMOVE_LIST) {
			this.removeList();
		}

		this.dispatchEvent(event);
	}

	removeList() {
		this.classList.add('remove');

		setTimeout(() => {
			this.remove();
		}, 500);
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
