// import Task from './Task/Task.ts';
// import Column from './Column/Column.ts';
// import {useStore} from '../../store/useStore.ts';
//
// const {updateTaskOrder, updateTaskParentId, findTaskById} = useStore();
//
// let draggingTask: Task | null = null;
// let dropColumn: Column | null = null;
// let leavedColumn: Column | null = null;
//
// export const useDnD = () => {
//
// 	const onDragStart = (evt: DragEvent) => {
// 		if (evt.target instanceof Task) {
// 			draggingTask = evt.target;
// 			draggingTask.classList.add('task--drag-target');
// 			leavedColumn = draggingTask.closest('.column-component') as Column;
// 			dropColumn = draggingTask.closest('.column-component') as Column;
// 		}
// 	};
//
// 	const onDragEnter = (evt: DragEvent) => {
// 		evt.preventDefault();
//
// 		if (!draggingTask) return;
//
// 		if (evt.target instanceof Column) {
// 			dropColumn = evt.target.closest('.column-component');
//
// 			if (dropColumn) dropColumn.columnBody.append(draggingTask);
// 		}
//
// 		if (evt.target instanceof Task) {
// 			const targetTask = evt.target as Task;
// 			const targetRect = targetTask.getBoundingClientRect();
// 			const mouseY = evt.clientY;
// 			const taskMiddle = targetRect.top + targetRect.height / 2;
//
// 			if (targetTask.parentNode) {
// 				if (mouseY < taskMiddle) {
// 					targetTask.parentNode.insertBefore(draggingTask, targetTask);
// 				} else {
// 					if (targetTask.nextSibling) {
// 						targetTask.parentNode.insertBefore(draggingTask, targetTask.nextSibling);
// 					} else {
// 						targetTask.parentNode.appendChild(draggingTask);
// 					}
// 				}
// 			}
// 		}
// 		return;
// 	};
//
// 	const onDragEnd = async (evt: DragEvent) => {
//
// 		if (!draggingTask || !leavedColumn || !dropColumn) return;
//
// 		if (evt.target instanceof Task) {
//
// 			const task = evt.target as Task;
// 			const taskId = task.id;
// 			const column = task.closest('.column-component') as Column;
// 			const newParentId = column.id;
//
// 			task.classList.remove('task--drag-target');
//
// 			try {
//
// 				if (task.parent !== newParentId) {
// 					await updateTaskParentId(taskId, newParentId);
// 					task.updateTaskParent(newParentId);
// 				}
//
// 				const tasksInNewColumn = Array.from(column.querySelectorAll('.task')) as Task[];
//
// 				tasksInNewColumn.forEach((task, index) => {
// 					const {id, order} = task;
// 					const newOrder = (index + 1).toString();
//
// 					if (order !== newOrder) {
// 						updateTaskOrder(id, ++index);
// 					}
//
// 				});
//
// 				if (column === leavedColumn) return;
//
// 				const storedTask = findTaskById(taskId);
// 				if (storedTask) {
// 					column.taskArray.push(storedTask);
// 					leavedColumn.removeTaskById(storedTask.id);
// 				}
// 			} catch (e) {
// 				console.log(e);
// 				console.log('Failed drag drop');
// 			}
// 		}
//
// 		draggingTask = null;
// 		dropColumn = null;
// 		leavedColumn = null;
// 	};
//
// 	return {
// 		onDragStart,
// 		onDragEnter,
// 		onDragEnd
// 	};
// };
