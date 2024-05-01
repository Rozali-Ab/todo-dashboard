import {useDragDrop} from './useDragDrop';
import List from './List/List';
import Task from './Task/Task';
import {useListForm} from '../NavBar/useListForm';
import {useTaskForm} from '../NavBar/useTaskForm';

customElements.define('task-list', List);
customElements.define('task-component', Task);

const {onDragStart, onDragEnter, onDragOver, onDrop, onTouchMove, onTouchEnd} = useDragDrop();
const dashboard = document.querySelector<HTMLElement>('#dashboard');

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

if (dashboard) {

	const createComponents = () => {
		lists.forEach((list) => {
			const listComponent = new List();
			listComponent.setAttribute('id', list.id.toString());
			listComponent.setAttribute('title', list.title.toString());

			const taskInList = tasks.filter((task) => task.parentListId === list.id);
			taskInList.forEach((task) => {
				const taskComponent = new Task();
				taskComponent.setAttribute('slot', 'task');
				taskComponent.setAttribute('id', task.id.toString());
				taskComponent.setAttribute('title', task.title);
				taskComponent.setAttribute('parent', task.parentListId.toString());

				listComponent.appendChild(taskComponent);
			});
			dashboard.appendChild(listComponent);
		});
	};

	createComponents();

	dashboard.addEventListener('remove-list', (evt) => {
		console.log('remove-list custom event id: ', (evt.target as List).id);
	});

	dashboard.addEventListener('edit-list', (evt) => {

		const listId = Number((evt.target as List).id);
		const currenList = lists.find(list => list.id === listId);
		console.log(currenList);
		useListForm(currenList).showListForm();
	});

	dashboard.addEventListener('edit-task', (evt) => {

		const taskId = Number((evt.target as Task).id);
		const currentTask = tasks.find(task => task.id === taskId);
		console.log(currentTask);
		useTaskForm(currentTask).showTaskForm();
	});

	dashboard.addEventListener('add-task', (evt) => {
		//получаем id листа, в котором добавить таску
		console.log('add-task custom event id: ', (evt.target as List).id);
	});

	dashboard.addEventListener('remove-task', (evt) => {
		console.log('remove-task custom event id: ', (evt.target as Task).id);
	});

	dashboard.addEventListener('dragover', (evt: DragEvent) => onDragOver(evt));
	dashboard.addEventListener('dragenter', (evt: DragEvent) => onDragEnter(evt));
	dashboard.addEventListener('dragstart', (evt: DragEvent) => onDragStart(evt));
	dashboard.addEventListener('drop', (evt: DragEvent) => onDrop(evt));

	dashboard.addEventListener('touchmove', (evt: TouchEvent) => onTouchMove(evt));
	dashboard.addEventListener('touchend', (evt: TouchEvent) => onTouchEnd(evt));

}

/*import {useTasksStore} from '../../store/useTasksStore.ts';
import {useDragDrop} from './useDragDrop.ts';
import {clickEventDispatcher} from './clickEventDispatcher.ts';
import {List} from './List/List.ts';

const {onDragStart, onDragEnter, onDragOver, onDrop, onTouchMove, onTouchEnd} = useDragDrop();
const {lists, tasks} = useTasksStore();
const dashboard = document.querySelector<HTMLElement>('#dashboard');

if (dashboard) {
	lists.forEach((list) => {
		const tasksInList = tasks.filter((task) => task.parentListId === list.id);
		List(list, tasksInList).renderList();
	});

	dashboard.addEventListener('dragover', (evt: DragEvent) => onDragOver(evt));
	dashboard.addEventListener('dragenter', (evt: DragEvent) => onDragEnter(evt));
	dashboard.addEventListener('dragstart', (evt: DragEvent) => onDragStart(evt));
	dashboard.addEventListener('drop', (evt: DragEvent) => onDrop(evt));

	dashboard.addEventListener('touchmove', (evt: TouchEvent) => onTouchMove(evt));
	dashboard.addEventListener('touchend', (evt: TouchEvent) => onTouchEnd(evt));

	dashboard.addEventListener('click', (evt: MouseEvent) => clickEventDispatcher(evt));
}*/
