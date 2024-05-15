import {ColumnType, TaskType} from '../../../store/types/types.ts';
import Task from '../Task/Task.ts';
import {COLUMN_TOOLS_EVENTS} from '../../../constants/dasboardEvents.ts';

export default class Column extends HTMLElement {
	id = '';
	title = '';
	taskArray: TaskType[] = [];
	columnTools = document.createElement('div');
	columnHeader = document.createElement('div');
	columnTitle = document.createElement('div');

	constructor({id, title}: ColumnType) {

		super();

		this.id = id.toString();
		this.title = title.toString();
		this.setColumnAttributes();
	}

	/**
  в конструкторе устанавливаем атрибуты
	 */
	setColumnAttributes() {

		this.setAttribute('id', this.id);
		//this.setAttribute('title', this.title);
	}

	getColumnAttributes() {
		if (!this.id) {
			this.id = this.getAttribute('id')!;
		}

		/*		if (!this.title) {
					this.title = this.getAttribute('title')!;
				}*/
	}

	connectedCallback() {
		//mounted

		this.getColumnAttributes();
		this.buildTemplate();
		this.columnTools.addEventListener('click', this.onColumnToolsClick.bind(this));

	}

	appendTask(task: TaskType) {

		this.taskArray.push(task);

		const taskComponent = new Task(task);
		this.append(taskComponent);

		return taskComponent;
	}

	buildTemplate() {

		this.classList.add('column-component');
		this.columnHeader.classList.add('column-component-header');
		this.columnTitle.classList.add('column-component-title');

		this.columnTools.classList.add('column-tools');
		this.columnTools.innerHTML = `
      <button class="column-tools__add" data-action-type=${COLUMN_TOOLS_EVENTS.ADD_TASK}>add task</button>
      <button class="column-tools__rename" data-action-type=${COLUMN_TOOLS_EVENTS.EDIT_COLUMN}>edit</button>
      <button class="column-tools__remove" data-action-type=${COLUMN_TOOLS_EVENTS.REMOVE_COLUMN}>remove</button>
		`;

		this.columnTitle.textContent = this.title;
		this.columnHeader.append(this.columnTools);
		this.columnHeader.append(this.columnTitle);

		this.prepend(this.columnHeader);

	}

	onColumnToolsClick(evt: MouseEvent) {

		const currentAction = (evt.target as HTMLElement).dataset.actionType;

		if (!currentAction || !Object.values(COLUMN_TOOLS_EVENTS).includes(currentAction)) return;

		const {id} = this;
		const isEmpty = this.taskArray.length === 0;

		const event = new CustomEvent(currentAction, {
			bubbles: true,
			detail: {id, isEmpty}
		});

		if (currentAction === COLUMN_TOOLS_EVENTS.REMOVE_COLUMN) {

			if (this.taskArray.length > 0) {
				const confirmed = window.confirm('Remove Column with all tasks?');
				if (confirmed) {
					this.removeColumn();
					this.dispatchEvent(event);
					return;
				}
				return;
			}
			this.removeColumn();
		}

		this.dispatchEvent(event);
	}

	removeColumn() {
		this.classList.add('remove');

		setTimeout(() => {
			this.remove();
		}, 500);
	}

	updateColumnTitle(payload: ColumnType) {
		this.title = payload.title;
		this.columnTitle.textContent = this.title;
	}

	/*	/!**
			следит за изменениями атрибутов и вызывает attributeChangedCallback при изменении
		 *!/
		static get observedAttributes() {
			return ['title'];
		}

		attributeChangedCallback(attribute: string) {

			let currentValue;

			if (attribute === 'title') {

				currentValue = this.getAttribute(attribute)!;

				if (this.title === currentValue) return;

				this.title = currentValue;
				this.columnTitle.textContent = this.title;
			}
		}*/

}
