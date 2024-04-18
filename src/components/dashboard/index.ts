import {useTasksStore} from '../../store/useTasksStore.ts';
import {renderDashboard} from './renderDashboard.ts';
import {useDragDrop} from './useDragDrop.ts';

const {onDragStart, onDragEnter, onDragOver, onDrop} = useDragDrop();
const {lists, tasks} = useTasksStore();
renderDashboard(lists, tasks);

document.addEventListener('dragover', (evt: DragEvent) => onDragOver(evt));
document.addEventListener('dragenter', (evt: DragEvent) => onDragEnter(evt));
document.addEventListener('dragstart', (evt: DragEvent) => onDragStart(evt));
document.addEventListener('drop', (evt: DragEvent) => onDrop(evt));
