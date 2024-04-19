import {useTasksStore} from '../../store/useTasksStore.ts';
import { clickEventDispatcher } from './clickEventDispatcher.ts';
import {renderDashboard} from './renderDashboard.ts';
import {useDragDrop} from './useDragDrop.ts';

const dashboard = document.querySelector<HTMLElement>('#dashboard');
const {onDragStart, onDragEnter, onDragOver, onDrop} = useDragDrop();
const {lists, tasks} = useTasksStore();

if (dashboard) {
  renderDashboard(dashboard, lists, tasks);

  dashboard.addEventListener('dragover', (evt: DragEvent) => onDragOver(evt));
  dashboard.addEventListener('dragenter', (evt: DragEvent) => onDragEnter(evt));
  dashboard.addEventListener('dragstart', (evt: DragEvent) => onDragStart(evt));
  dashboard.addEventListener('drop', (evt: DragEvent) => onDrop(evt));

  dashboard.addEventListener('click', (evt: MouseEvent) => clickEventDispatcher(evt));
}
