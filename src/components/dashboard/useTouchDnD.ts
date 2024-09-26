// import {useStore} from '../../store/useStore.ts';
// import Task from './Task/Task.ts';
// import Column from './Column/Column.ts';
//
// const {updateTaskOrder, updateTaskParentId} = useStore();
//
// let draggingTask: Task | null = null;
// let dropColumn: Column | null = null;
// let leavedColumn: Column | null = null;
//
// let initX = 0;
// let initY = 0;
// let taskWidth = 0;
// let taskHeight = 0;
// const placeholder = document.createElement('div');
// let animationFrameId: number | null = null;
//
// export const useTouchDnD = () => {
// 	const onTouchStart = (evt: TouchEvent) => {
// 		if (evt.target instanceof Task) {
// 			draggingTask = evt.target;
// 			draggingTask.style.position = 'fixed';
// 			draggingTask.style.zIndex = '1000';
//
// 			const rect = draggingTask.getBoundingClientRect();
// 			initX = rect.left;
// 			initY = rect.top;
// 			taskWidth = rect.width;
// 			taskHeight = rect.height;
//
// 			placeholder.style.height = `${taskHeight}px`;
// 			placeholder.className = 'placeholder';
//
// 			dropColumn = draggingTask.parentNode as Column;
// 			leavedColumn = dropColumn;
//
// 			if (dropColumn) {
// 				dropColumn.insertBefore(placeholder, draggingTask);
// 			}
// 		}
// 	};
//
// 	const onTouchMove = (evt: TouchEvent) => {
// 		if (!draggingTask) return;
//
// 		const touch = evt.touches[0];
// 		const x = touch.clientX - initX - taskWidth / 2;
// 		const y = touch.clientY - initY - taskHeight / 2;
//
// 		if (animationFrameId !== null) {
// 			cancelAnimationFrame(animationFrameId);
// 		}
//
// 		animationFrameId = requestAnimationFrame(() => {
// 			if (!draggingTask) return;
//
// 			draggingTask.style.transform = `translate(${x}px, ${y}px)`;
// 			const target = document.elementFromPoint(touch.clientX, touch.clientY);
//
// 			if (target instanceof Column) {
// 				dropColumn = target;
//
// 				const tasks = Array.from(dropColumn.querySelectorAll('.task')) as Task[];
// 				let inserted = false;
//
// 				if (!inserted) {
// 					dropColumn.appendChild(placeholder);
// 				}
//
// 				for (const task of tasks) {
// 					if (task === draggingTask) continue;
// 					const taskRect = task.getBoundingClientRect();
// 					const taskMiddle = taskRect.top + taskRect.height / 2;
//
// 					if (y < taskMiddle) {
// 						if (task.parentNode === dropColumn) {
// 							dropColumn.insertBefore(placeholder, task);
// 							inserted = true;
// 						} else return;
// 					}
// 				}
// 			} else if (target instanceof Task) {
// 				const targetTask = target as Task;
// 				if (targetTask === draggingTask) return;
//
// 				const taskRect = targetTask.getBoundingClientRect();
// 				const mouseY = touch.clientY;
// 				const taskMiddle = taskRect.top + taskRect.height / 2;
//
// 				dropColumn = targetTask.parentNode as Column;
//
// 				if (dropColumn) {
// 					if (mouseY < taskMiddle) {
// 						dropColumn.insertBefore(placeholder, targetTask);
// 					} else {
// 						if (targetTask.nextSibling) {
// 							dropColumn.insertBefore(placeholder, targetTask.nextSibling);
// 						} else {
// 							dropColumn.appendChild(placeholder);
// 						}
// 					}
// 				}
// 			} else return;
// 		});
// 	};
//
// 	const onTouchEnd = async () => {
// 		if (!draggingTask || !dropColumn) return;
//
// 		const taskId = draggingTask.id;
// 		const newParentId = (placeholder.closest('.column-component') as Column).id;
//
// 		if (animationFrameId !== null) {
// 			cancelAnimationFrame(animationFrameId);
// 			animationFrameId = null;
// 		}
//
// 		draggingTask.style.position = '';
// 		draggingTask.style.zIndex = '';
// 		draggingTask.style.transform = '';
//
// 		if (placeholder.parentNode) {
// 			placeholder.parentNode.insertBefore(draggingTask, placeholder);
// 			placeholder.parentNode.removeChild(placeholder);
// 		}
//
// 		try {
//
// 			if (newParentId && draggingTask.parent !== newParentId) {
// 				await updateTaskParentId(taskId, newParentId);
// 				draggingTask.updateTaskParent(newParentId);
// 			}
//
// 			const tasksInNewColumn = Array.from(dropColumn.querySelectorAll('.task')) as Task[];
// 			tasksInNewColumn.forEach((task, index) => {
// 				const {id, order} = task;
// 				const newOrder = (index + 1).toString();
// 				if (order !== newOrder) {
// 					updateTaskOrder(id, newOrder);
// 				}
// 			});
//
// 			if (dropColumn !== leavedColumn) {
//
// 				if (leavedColumn) {
// 					const tasksInLeavedColumn = Array.from(leavedColumn.querySelectorAll('.task')) as Task[];
// 					tasksInLeavedColumn.forEach((task, index) => {
// 						const {id, order} = task;
// 						const newOrder = (index + 1).toString();
// 						if (order !== newOrder) {
// 							updateTaskOrder(id, newOrder);
// 						}
// 					});
// 				}
// 			}
//
// 		} catch (e) {
// 			console.log('Failed touch drag drop');
// 			console.log(e);
// 		}
//
// 		draggingTask = null;
// 		dropColumn = null;
// 		leavedColumn = null;
// 	};
//
// 	return {
// 		onTouchStart,
// 		onTouchMove,
// 		onTouchEnd
// 	};
// };
