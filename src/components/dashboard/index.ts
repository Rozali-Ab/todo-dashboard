import {useTasksStore} from '../../store/useTasksStore.ts';
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
}
