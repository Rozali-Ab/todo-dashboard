import Column from './Column/Column';
import Task from './Task/Task';
import {useDnD} from './useDnD.ts';
import {useTaskForm} from '../NavBar/useTaskForm.ts';
import {useColumnForm} from '../NavBar/useColumnForm.ts';
import {COLUMN_TOOLS_EVENTS, TASK_TOOLS_EVENTS} from '../../constants/dasboardEvents.ts';
import type {TaskType} from '../../store/types/types.ts';
import {useTouchDnD} from './useTouchDnD.ts';

customElements.define('column-component', Column);
customElements.define('task-component', Task);

const {
	onDragStart,
	onDragOver,
	onDragEnd,
} = useDnD();

const {
	onTouchStart,
	onTouchMove,
	onTouchEnd
} = useTouchDnD();

export const dashboard = document.getElementById('dashboard');

const domColumnsMap = new Map();
const domTasksMap = new Map();

const tasks = [

	{id: 0, title: 'Task 1', parentColumnId: 0},
	{id: 1, title: 'Task 2', parentColumnId: 0},
	{id: 2, title: 'Task 3', parentColumnId: 0},
	{id: 3, title: 'Task 4', parentColumnId: 1},
	{id: 4, title: 'Task 5', parentColumnId: 1},
	{id: 5, title: 'Task 6', parentColumnId: 1},
	{id: 6, title: 'Task 7', parentColumnId: 2},
	{id: 7, title: 'Task 8', parentColumnId: 2},
	{id: 8, title: 'Task 9', parentColumnId: 2}

];

const columns = [

	{id: 0, title: 'Task today', order: 0},
	{id: 1, title: 'Tomorrow', order: 1},
	{id: 2, title: 'Then', order: 2}

];

const groupedTasksByParent = tasks.reduce((acc, task) => {
	const {parentColumnId} = task;

	if (!acc.has(parentColumnId)) {
		acc.set(parentColumnId, []);
	}
	acc.get(parentColumnId).push(task);
	return acc;
}, new Map());

if (dashboard) {

	const createComponents = () => {

		columns.forEach((column) => {
			const {id} = column;
			const taskInColumn: TaskType[] = groupedTasksByParent.get(id);

			const columnComponent = new Column(column);

			taskInColumn.forEach((item) => {
				const task = columnComponent.appendTask(item);
				domTasksMap.set(item.id, task);
			});

			domColumnsMap.set(id, columnComponent);
			dashboard.appendChild(columnComponent);

		});
	};

	createComponents();

	dashboard.addEventListener(COLUMN_TOOLS_EVENTS.REMOVE_COLUMN, (evt) => {

		const {detail} = evt as CustomEvent;

		const columnId = Number(detail.id || (evt.target as Column).id);
		console.log('columnId ', columnId);

	});

	dashboard.addEventListener(COLUMN_TOOLS_EVENTS.EDIT_COLUMN, async (evt) => {

		const columnId = Number((evt.target as Column).id);
		const currenList = columns.find(column => column.id === columnId);

		const {showColumnForm} = useColumnForm(currenList);

		try {

			const updatedColumn = await showColumnForm();

			domColumnsMap.get(columnId).setAttribute('title', updatedColumn.title);
		} catch (e) {
			console.log('edit column rejected ', e);
		}

	});

	dashboard.addEventListener(COLUMN_TOOLS_EVENTS.ADD_TASK, async (evt) => {
		//получаем id листа, в котором добавить таску
		const {detail} = evt as CustomEvent;
		const columnId = Number(detail.id || (evt.target as Column).id);

		try {
			const currentColumn = domColumnsMap.get(columnId);
			const {showTaskForm} = useTaskForm({parentColumnId: columnId});

			const newTask = await showTaskForm();
			currentColumn.appendTask(newTask);
		} catch (e) {
			console.log('add task reject ', e);
		}
	});

	dashboard.addEventListener(TASK_TOOLS_EVENTS.EDIT_TASK, async (evt) => {

		const {detail} = evt as CustomEvent;

		const taskId = Number(detail.id || (evt.target as Task).id);

		const currentTask = tasks.find(task => task.id === Number(taskId));

		const {showTaskForm} = useTaskForm(currentTask);

		try {
			const updatedTask: TaskType = await showTaskForm();

			domTasksMap.get(taskId).setAttribute('title', updatedTask.title);
		} catch (e) {
			console.log('edit task reject ', e);
		}

	});

	dashboard.addEventListener(TASK_TOOLS_EVENTS.REMOVE_TASK, (evt) => {

		const {detail} = evt as CustomEvent;

		const taskId = Number(detail.id || (evt.target as Task).id);
		console.log('taskId ', taskId);

	});

	dashboard.addEventListener('dragstart', (evt: DragEvent) => onDragStart(evt));
	dashboard.addEventListener('dragover', (evt: DragEvent) => onDragOver(evt));
	dashboard.addEventListener('dragend', onDragEnd);

	dashboard.addEventListener('touchstart', (evt: TouchEvent) => onTouchStart(evt));
	dashboard.addEventListener('touchmove', (evt: TouchEvent) => onTouchMove(evt));
	dashboard.addEventListener('touchend', onTouchEnd);
}
