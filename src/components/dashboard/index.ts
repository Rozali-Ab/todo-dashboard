import List from './List/List';
import Task from './Task/Task';
import {useDragDrop} from './useDragDrop';
import {useTaskForm} from '../NavBar/useTaskForm.ts';
import {useListForm} from '../NavBar/useListForm.ts';
import {TaskToolsEvent} from '../../constants/TaskToolsEvent.ts';
import {ListToolsEvents} from '../../constants/ListToolsEvents.ts';
import type {TaskType} from '../../store/types/types.ts';

customElements.define('task-list', List);
customElements.define('task-component', Task);

const {onDragStart, onDragLeave, onDragEnter, onDragOver, onDragEnd, onDrop, onTouchMove, onTouchEnd} = useDragDrop();
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

	dashboard.addEventListener(ListToolsEvents.REMOVE_LIST, (evt) => {

		const {detail} = evt as CustomEvent;

		const listId = Number(detail.id || (evt.target as List).id);

		const listComponent = domListsMap.get(listId);
		listComponent.addEventListener('transitionend', () => listComponent.remove());
		listComponent.style.opacity = 0;

	});

	dashboard.addEventListener(ListToolsEvents.EDIT_LIST, (evt) => {

		const listId = Number((evt.target as List).id);
		const currenList = lists.find(list => list.id === listId);

		domListsMap.get(listId).setAttribute('title', 'Edit');
		useListForm(currenList).showListForm();

	});

	dashboard.addEventListener(ListToolsEvents.ADD_TASK, (evt) => {
		//получаем id листа, в котором добавить таску
		console.log('add-task custom event id: ', (evt.target as List).id);
	});

	dashboard.addEventListener(TaskToolsEvent.EDIT_TASK, (evt) => {

		const {detail} = evt as CustomEvent;

		const taskId = Number(detail.id || (evt.target as Task).id);

		(evt.target as Task).setAttribute('title', 'edited');

		const currentTask = tasks.find(task => task.id === Number(taskId));

		useTaskForm(currentTask).showTaskForm();

	});

	dashboard.addEventListener(TaskToolsEvent.REMOVE_TASK, (evt) => {

		const {detail} = evt as CustomEvent;

		const taskId = Number(detail.id || (evt.target as Task).id);
		const listId = Number((evt.target as Task).parent);

		if (listId !== undefined) {

			const listComponent = domListsMap.get(listId);

			const taskComponent = listComponent.querySelector(`task-component[id="${taskId}"]`);
			taskComponent.addEventListener('transitionend', () => taskComponent.remove());
			taskComponent.style.opacity = 0;

		}
	});

	dashboard.addEventListener('dragleave', (evt: DragEvent) => onDragLeave(evt));
	dashboard.addEventListener('dragover', (evt: DragEvent) => onDragOver(evt));
	dashboard.addEventListener('dragenter', (evt: DragEvent) => onDragEnter(evt));
	dashboard.addEventListener('dragstart', (evt: DragEvent) => onDragStart(evt));
	dashboard.addEventListener('dragend', (evt: DragEvent) => onDragEnd(evt));
	dashboard.addEventListener('drop', (evt: DragEvent) => onDrop(evt));

	dashboard.addEventListener('touchmove', (evt: TouchEvent) => onTouchMove(evt));
	dashboard.addEventListener('touchend', (evt: TouchEvent) => onTouchEnd(evt));

}
