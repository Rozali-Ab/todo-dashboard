import Column from './Column/Column.ts';
import Task from './Task/Task.ts';
import Store from '../../store/Store.ts';
import {useStore} from '../../store/useStore.ts';
import {useDnD} from './useDnD.ts';
import {useTouchDnD} from './useTouchDnD.ts';
import {COLUMN_TOOLS_EVENTS, TASK_TOOLS_EVENTS} from '../../constants/events.ts';
import type {ColumnType, TaskType} from '../../types/types.ts';

const {onDragStart, onDragEnter, onDragEnd} = useDnD();
const {onTouchStart, onTouchMove, onTouchEnd} = useTouchDnD();

const {
	createTask,
	removeColumnById,
	removeTaskById,
	removeAllTasksByParentId,
	updateColumnTitle,
	updateTaskTitle
} = useStore();

export default class Dashboard extends HTMLElement {
	columns: ColumnType[];
	tasks: TaskType[];

	constructor() {
		super();

		this.columns = [];
		this.tasks = [];

		this.buildTemplate();
	}

	connectedCallback() {
		this.addEventListeners();
	}

	addEventListeners() {
		this.addEventListener(COLUMN_TOOLS_EVENTS.REMOVE_COLUMN, this.removeColumn.bind(this));
		this.addEventListener(COLUMN_TOOLS_EVENTS.EDIT_COLUMN, this.editColumn.bind(this));

		this.addEventListener(COLUMN_TOOLS_EVENTS.ADD_TASK, this.addNewTask.bind(this));

		this.addEventListener(TASK_TOOLS_EVENTS.REMOVE_TASK, this.removeTask.bind(this));
		this.addEventListener(TASK_TOOLS_EVENTS.EDIT_TASK, this.editTask.bind(this));

		this.addEventListener('dragstart', onDragStart);
		this.addEventListener('dragenter', onDragEnter);
		this.addEventListener('dragend', onDragEnd);

		this.addEventListener('touchstart', onTouchStart);
		this.addEventListener('touchmove', onTouchMove);
		this.addEventListener('touchend', onTouchEnd);
	}

	buildTemplate() {
		this.setAttribute('id', 'dashboard');
		this.classList.add('dashboard');
	}

	renderColumnsAndTasks() {

		this.innerHTML = '';

		if (this.columns && this.tasks) {
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
	}

	async removeColumn(evt: Event) {
		const {detail} = evt as CustomEvent;

		const columnId = detail.id || (evt.target as Column).id;

		try {
			if (!detail.isEmpty) {
				await removeAllTasksByParentId(columnId);
			}
			await removeColumnById(columnId);

		} catch (e) {
			console.log('Column not removed', e);
		}
	}

	async editColumn(evt: Event) {
		const {detail} = evt as CustomEvent;
		const columnId = detail.id || (evt.target as Column).id;

		await updateColumnTitle(columnId);
	}

	async addNewTask(evt: Event) {
		const {detail} = evt as CustomEvent;
		const columnId = detail.id || (evt.target as Column).id;

		await createTask(columnId);
	}

	async removeTask(evt: Event) {

		const {detail} = evt as CustomEvent;
		const taskId = detail.id || (evt.target as Task).id;

		await removeTaskById(taskId);
	}

	async editTask(evt: Event) {

		const {detail} = evt as CustomEvent;
		const taskId = detail.id || (evt.target as Task).id;

		await updateTaskTitle(taskId);
	}

	updateDashboard(state: Store) {

		const {tasks, columns} = state.user;
		this.tasks = tasks || [];
		this.columns = columns || [];

		this.renderColumnsAndTasks();

		if (!state.isAuth) {
			this.innerHTML = '';
		}
	}

}

customElements.define('dashboard-component', Dashboard);
