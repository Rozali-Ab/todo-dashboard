import Task from '../Task/Task.ts';
import {confirmDeleteColumn} from './utils/confirmDeleteColumn.ts';
import {COLUMN_TOOLS_EVENTS, TASK_TOOLS_EVENTS} from '../../../constants/events.ts';
import type {ColumnType, TaskType} from '../../../types/types.ts';

export default class Column extends HTMLElement {
	id = '';
	title = '';
	taskArray: TaskType[] = [];

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
		this.columnBody.addEventListener(TASK_TOOLS_EVENTS.REMOVE_TASK, (evt) => this.removeTask(evt as CustomEvent));
	}

	appendTask(task: TaskType) {

		this.taskArray.push(task);

		const taskComponent = new Task(task);
		this.columnBody.append(taskComponent);

		return taskComponent;
	}

	removeTask(evt: CustomEvent) {

		const taskId = evt.detail.id;

		this.removeTaskById(taskId);
	}

	removeTaskById(taskId: string) {
		const index = this.taskArray.findIndex((task) => task.id === taskId);
		this.taskArray.splice(index, 1);
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
		const isEmpty = this.taskArray.length === 0;

		const event = new CustomEvent(currentAction, {
			bubbles: true,
			detail: {id, isEmpty}
		});

		if (currentAction === COLUMN_TOOLS_EVENTS.REMOVE_COLUMN) {

			if (this.taskArray.length > 0) {

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
