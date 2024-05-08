import List from './List/List';
import Task from './Task/Task';
import {useDnD} from './useDnD.ts';
import {useTaskForm} from '../NavBar/useTaskForm.ts';
import {useListForm} from '../NavBar/useListForm.ts';
import {LIST_TOOLS_EVENTS, TASK_TOOLS_EVENTS} from '../../constants/dasboardEvents.ts';
import type {TaskType} from '../../store/types/types.ts';
import {useTouchDnD} from './useTouchDnD.ts';

customElements.define('task-list', List);
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

const dashboard = document.querySelector<HTMLElement>('#dashboard');

const domListsMap = new Map();

const tasks = [

	{id: 0, title: 'Task 1', parentListId: 0},
	{id: 1, title: 'Task 2', parentListId: 0},
	{id: 2, title: 'Task 3', parentListId: 0},
	{id: 3, title: 'Task 4', parentListId: 1},
	{id: 4, title: 'Task 5', parentListId: 1},
	{id: 5, title: 'Task 6', parentListId: 1},
	{id: 6, title: 'Task 7', parentListId: 2},
	{id: 7, title: 'Task 8', parentListId: 2},
	{id: 8, title: 'Task 9', parentListId: 2}

];

const lists = [

	{id: 0, title: 'Task today', order: 0},
	{id: 1, title: 'Tomorrow', order: 1},
	{id: 2, title: 'Then', order: 2}

];

const groupedTasksByParent = tasks.reduce((acc, task) => {
	const {parentListId} = task;

	if (!acc.has(parentListId)) {
		acc.set(parentListId, []);
	}
	acc.get(parentListId).push(task);
	return acc;
}, new Map());

if (dashboard) {

	const createComponents = () => {

		lists.forEach((list) => {
			const {id} = list;
			const taskInList: TaskType | TaskType[] = groupedTasksByParent.get(id);

			const listComponent = taskInList ? new List({list, tasks: taskInList}) : new List({list});

			domListsMap.set(id, listComponent);
			dashboard.appendChild(listComponent);

		});
	};

	createComponents();

	dashboard.addEventListener(LIST_TOOLS_EVENTS.REMOVE_LIST, (evt) => {

		const {detail} = evt as CustomEvent;

		const listId = Number(detail.id || (evt.target as List).id);
		console.log('listId ', listId);

	});

	dashboard.addEventListener(LIST_TOOLS_EVENTS.EDIT_LIST, (evt) => {

		const listId = Number((evt.target as List).id);
		const currenList = lists.find(list => list.id === listId);

		domListsMap.get(listId).setAttribute('title', 'Edit');
		useListForm(currenList).showListForm();

	});

	dashboard.addEventListener(LIST_TOOLS_EVENTS.ADD_TASK, (evt) => {
		//получаем id листа, в котором добавить таску
		console.log('add-task custom event id: ', (evt.target as List).id);
	});

	dashboard.addEventListener(TASK_TOOLS_EVENTS.EDIT_TASK, (evt) => {

		const {detail} = evt as CustomEvent;

		const taskId = Number(detail.id || (evt.target as Task).id);

		(evt.target as Task).setAttribute('title', 'edited');

		const currentTask = tasks.find(task => task.id === Number(taskId));

		useTaskForm(currentTask).showTaskForm();

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
