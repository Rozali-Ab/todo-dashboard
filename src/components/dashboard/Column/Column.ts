import Sortable from 'sortablejs';

import Task from '../Task/Task.ts';
import {confirmDeleteColumn} from './utils/confirmDeleteColumn.ts';
import {COLUMN_TOOLS_EVENTS, DASHBOARD_EVENTS} from '../../../constants/events.ts';
import type {ColumnType, TaskType} from '../../../types/types.ts';

export default class Column extends HTMLElement {
	id = '';
	title = '';

	columnTools = document.createElement('div');
	columnHeader = document.createElement('div');
	columnTitle = document.createElement('div');
	columnBody = document.createElement('div');
	addTask = document.createElement('div');
	deleteList = document.createElement('div');

	constructor({id, title}: ColumnType) {

		super();

		this.id = id.toString();
		this.title = title.toString();
		this.setColumnAttributes();
	}

	setColumnAttributes() {
		this.setAttribute('id', this.id);
	}

	getColumnAttributes() {
		if (!this.id) {
			this.id = this.getAttribute('id')!;
		}

	}

	connectedCallback() {

		this.getColumnAttributes();
		this.buildTemplate();
		this.addEventListener('click', this.onColumnToolsClick.bind(this));
		this.initSortable();
	}

	initSortable() {
		new Sortable(this.columnBody, {
			group: 'tasks',
			animation: 150,
			ghostClass: 'ghost',

			//если добавилась новая таска, отправляем event и пересчитываем order у тасок
			onAdd: this.dropTaskEvent.bind(this),
			//если перемещение таски внутри одной колонки, пересчитываем order у тасок
			onSort: this.updateTasksOrders.bind(this),
			//если таска ушла из колонки, пересчитываем order у оставшихся тасок
			onRemove: this.updateTasksOrders.bind(this)
		});
	}

	dropTaskEvent(evt: Sortable.SortableEvent) {

		const event = new CustomEvent(DASHBOARD_EVENTS.DROP_TASK, {
			bubbles: true,
			detail: {
				taskId: evt.item.id,
				parentId: this.id
			}
		});

		this.dispatchEvent(event);
		this.updateTasksOrders();
	}

	updateTasksOrders() {

		Array.from(this.columnBody.children).forEach((element, index) => {
			(element as Task).updateTaskOrder((index + 1).toString());
		});
	}

	appendTask(task: TaskType) {

		const taskComponent = new Task(task);
		this.columnBody.append(taskComponent);

		return taskComponent;
	}

	buildTemplate() {

		this.classList.add('column-component');
		this.columnHeader.classList.add('column-component-header');
		this.columnTitle.classList.add('column-component-title');
		this.columnTitle.dataset.actionType = COLUMN_TOOLS_EVENTS.EDIT_COLUMN;
		this.columnBody.classList.add('column-component-body');

		this.addTask.dataset.actionType = COLUMN_TOOLS_EVENTS.ADD_TASK;
		this.addTask.classList.add('add-task');
		this.addTask.innerHTML = `
     <img src="https://cdn-icons-png.freepik.com/256/17338/17338561.png?ga=GA1.1.1496496612.1674736423" alt="add task">
     Add new task
		`;

		this.deleteList.dataset.actionType = COLUMN_TOOLS_EVENTS.REMOVE_COLUMN;
		this.deleteList.innerHTML =
			`<div class="delete-column" data-action-type=${COLUMN_TOOLS_EVENTS.REMOVE_COLUMN}>
      	<img src="https://cdn-icons-png.freepik.com/256/12765/12765258.png?ga=GA1.1.1496496612.1674736423" alt="remove list">
      </div>
			`;

		this.columnTitle.innerHTML = `
			${this.title}
			<img src="https://cdn-icons-png.freepik.com/256/8861/8861212.png?ga=GA1.1.1496496612.1674736423" alt="edit title">
		`;
		this.columnHeader.append(this.columnTitle, this.addTask);

		this.prepend(this.columnHeader);
		this.append(this.columnBody, this.deleteList);
	}

	async onColumnToolsClick(evt: MouseEvent) {

		const currentAction = (evt.target as HTMLElement).dataset.actionType;

		if (!currentAction || !Object.values(COLUMN_TOOLS_EVENTS).includes(currentAction)) return;

		const {id} = this;

		const event = new CustomEvent(currentAction, {
			bubbles: true,
			detail: {id}
		});

		if (currentAction === COLUMN_TOOLS_EVENTS.REMOVE_COLUMN) {

			//если есть таски, подтверждаем удаление всех тасок вместе с колонкой
			if (this.columnBody.children.length) {

				const confirmed = await confirmDeleteColumn();

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
		}, 300);
	}

}

customElements.define('column-component', Column);
