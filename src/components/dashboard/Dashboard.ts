import {useTasksStore} from '../../store/useTasksStore.ts';
import {ColumnType, TaskType} from '../../store/types/types.ts';
import Column from './Column/Column.ts';
import {COLUMN_TOOLS_EVENTS, TASK_TOOLS_EVENTS} from '../../constants/dasboardEvents.ts';
import {useColumnForm} from '../NavBar/useColumnForm.ts';
import Task from './Task/Task.ts';
import {useTaskForm} from '../NavBar/useTaskForm.ts';

const {
	tasks,
	columns,
	removeColumnById,
	removeTaskById,
	removeAllTasksByParentId
} = useTasksStore();

export default class Dashboard extends HTMLElement {
	columns: ColumnType[];
	tasks: TaskType[];

	constructor() {
		super();

		this.columns = [];
		this.tasks = [];
	}

	connectedCallback() {
		this.buildTemplate();
		this.getData()
		.catch((e) => {
			console.log('Error in connectedCallback', e);
		})
		.then(() => this.renderColumnsAndTasks())
		.then(() => this.addEventListeners());
	}

	addEventListeners() {
		this.addEventListener(COLUMN_TOOLS_EVENTS.REMOVE_COLUMN, this.removeColumn);
		this.addEventListener(COLUMN_TOOLS_EVENTS.EDIT_COLUMN, this.editColumn);
		this.addEventListener(COLUMN_TOOLS_EVENTS.ADD_TASK, this.addNewTask);

		this.addEventListener(TASK_TOOLS_EVENTS.REMOVE_TASK, this.removeTask);
		this.addEventListener(TASK_TOOLS_EVENTS.EDIT_TASK, this.editTask);
	}

	buildTemplate() {
		this.setAttribute('id', 'dashboard');
		this.classList.add('dashboard');
	}

	async getData() {
		try {
			this.tasks = tasks;
			this.columns = columns;
		} catch (e) {
			console.log('getData error at Dashboard', e);
			this.tasks = [];
			this.columns = [];
		}
	}

	renderColumnsAndTasks() {
		this.columns.forEach((column) => {

			const tasksInColumn = this.tasks
			.filter((task) => task.parentColumnId === column.id);

			const columnComponent = new Column(column);

			if (tasksInColumn) {
				const sortedByOrder = tasksInColumn.sort((task1, task2) => task1.order > task2.order ? 1 : -1);

				sortedByOrder.forEach((task) => {
					columnComponent.appendTask(task);
				});
			}

			this.appendChild(columnComponent);
		});
	}

	appendNewColumn(column: ColumnType) {
		const columnElement = new Column(column);

		this.appendChild(columnElement);
	}

	async removeColumn(evt: Event) {
		const {detail} = evt as CustomEvent;

		const columnId = detail.id || (evt.target as Column).id;

		try {
			await removeColumnById(columnId);

			if (!detail.isEmpty) {
				await removeAllTasksByParentId(columnId);
			}

		} catch (e) {
			console.log('Column not removed', e);
		}
	}

	async editColumn(evt: Event) {
		const {detail} = evt as CustomEvent;
		const columnId = detail.id || (evt.target as Column).id;
		const currentColumnInStore = columns.find(column => column.id === columnId);

		const {showColumnForm} = useColumnForm(currentColumnInStore);

		try {
			const updatedColumn = await showColumnForm();
			(evt.target as Column).updateColumnTitle(updatedColumn);
		} catch (e) {
			console.log('edit column rejected ', e);
		}

	}

	async addNewTask(evt: Event) {
		const {detail} = evt as CustomEvent;
		const columnId = detail.id || (evt.target as Column).id;

		try {

			const {showTaskForm} = useTaskForm({parentColumnId: columnId});

			const newTask = await showTaskForm();

			(evt.target as Column).appendTask(newTask);

		} catch (e) {
			console.log('add task reject ', e);
		}
	}

	async removeTask(evt: Event) {

		const {detail} = evt as CustomEvent;

		const taskId = detail.id || (evt.target as Task).id;

		await removeTaskById(taskId);
	}

	async editTask(evt: Event) {

		const {detail} = evt as CustomEvent;

		const taskId = detail.id || (evt.target as Task).id;

		const currentTaskInStore = tasks.find(task => task.id === taskId);

		try {
			const {showTaskForm} = useTaskForm(currentTaskInStore);
			const updatedTask: TaskType = await showTaskForm();

			(evt.target as Task).updateTaskTitle(updatedTask);
		} catch (e) {
			console.log('edit task reject ', e);
		}
	}
}

customElements.define('dashboard-component', Dashboard);
