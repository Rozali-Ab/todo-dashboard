import Column from './Column/Column';
import Task from './Task/Task';
import {useTasksStore} from '../../store/useTasksStore.ts';
import {useTaskForm} from '../NavBar/useTaskForm.ts';
import {useColumnForm} from '../NavBar/useColumnForm.ts';
import {COLUMN_TOOLS_EVENTS, TASK_TOOLS_EVENTS} from '../../constants/dasboardEvents.ts';
import type {TaskType} from '../../store/types/types.ts';
import {useTouchDnD} from './useTouchDnD.ts';
import {useDnD} from './useDnD.ts';

const {tasks, columns, removeColumnById, removeTaskById, removeAllTasksByParentId} = useTasksStore();

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

export const domColumnsMap = new Map();
const domTasksMap = new Map();

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

			if (taskInColumn) {
				taskInColumn.forEach((item) => {
					const task = columnComponent.appendTask(item);
					domTasksMap.set(item.id, task);
				});
			}

			domColumnsMap.set(id, columnComponent);
			dashboard.appendChild(columnComponent);

		});
	};

	createComponents();

	dashboard.addEventListener(COLUMN_TOOLS_EVENTS.REMOVE_COLUMN, (evt) => {

		const {detail} = evt as CustomEvent;

		const columnId = Number(detail.id || (evt.target as Column).id);

		removeColumnById(columnId);

		if (!detail.isEmpty) {
			removeAllTasksByParentId(columnId);
		}
	});

	dashboard.addEventListener(COLUMN_TOOLS_EVENTS.EDIT_COLUMN, async (evt) => {

		const {detail} = evt as CustomEvent;

		const columnId = Number(detail.id || (evt.target as Column).id);

		const currentColumnInStore = columns.find(column => column.id === columnId);

		const {showColumnForm} = useColumnForm(currentColumnInStore);

		try {

			const updatedColumn = await showColumnForm();

			domColumnsMap.get(columnId).updateColumnTitle(updatedColumn);

		} catch (e) {
			console.log('edit column rejected ', e);
		}

	});

	dashboard.addEventListener(COLUMN_TOOLS_EVENTS.ADD_TASK, async (evt) => {

		const {detail} = evt as CustomEvent;
		const columnId = Number(detail.id || (evt.target as Column).id);

		const currentColumn = domColumnsMap.get(columnId);

		try {

			const {showTaskForm} = useTaskForm({parentColumnId: columnId});

			const newTask = await showTaskForm();

			domTasksMap.set(newTask.id, currentColumn.appendTask(newTask));

		} catch (e) {
			console.log('add task reject ', e);
		}
	});

	dashboard.addEventListener(TASK_TOOLS_EVENTS.EDIT_TASK, async (evt) => {

		const {detail} = evt as CustomEvent;

		const taskId = Number(detail.id || (evt.target as Task).id);

		const currentTaskInStore = tasks.find(task => task.id === Number(taskId));

		try {
			const {showTaskForm} = useTaskForm(currentTaskInStore);
			const updatedTask: TaskType = await showTaskForm();

			domTasksMap.get(taskId).updateTaskTitle(updatedTask);

		} catch (e) {
			console.log('edit task reject ', e);
		}

	});

	dashboard.addEventListener(TASK_TOOLS_EVENTS.REMOVE_TASK, (evt) => {

		const {detail} = evt as CustomEvent;

		const taskId = Number(detail.id || (evt.target as Task).id);

		removeTaskById(taskId);

	});

	dashboard.addEventListener('dragstart', (evt: DragEvent) => onDragStart(evt));
	dashboard.addEventListener('dragover', (evt: DragEvent) => onDragOver(evt));
	dashboard.addEventListener('dragend', onDragEnd);

	dashboard.addEventListener('touchstart', (evt: TouchEvent) => onTouchStart(evt));
	dashboard.addEventListener('touchmove', (evt: TouchEvent) => onTouchMove(evt));
	dashboard.addEventListener('touchend', onTouchEnd);
}
