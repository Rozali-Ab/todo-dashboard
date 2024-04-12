import { useTasksStore } from '../../store/useTasksStore.ts';
const {updateTask} =  useTasksStore();

type DragAndDropEventType = {
  currentList: HTMLElement;
  currentTask: HTMLElement;
  onDragStart(task: HTMLElement): void;
  onDragEnd(task: HTMLElement): void;
  onDragOver(evt: Event): void;
  onDragLeave(): void;
  onDragEnter(evt: Event, list: HTMLElement): void;
  onDrop(evt: Event, list: HTMLElement): void;
}

export const dragAndDropEvent: DragAndDropEventType  = {
  currentList: document.createElement('div'),
  currentTask: document.createElement('div'),

  onDragStart(task) {
    this.currentTask = task;

    setTimeout(() => {
      this.currentTask.classList.add('hide');
    }, 0);
  },

  onDragEnd(task) {
    this.currentTask.classList.remove('hide');
    this.currentList.style.boxShadow = 'none';
    task.dataset.parentId = this.currentList.dataset.id;
    const taskId = Number(this.currentTask.dataset.id);
    const taskParentId = Number(this.currentList.dataset.id);
    updateTask(taskId, taskParentId);

  },

  onDragOver(evt) {
    evt.preventDefault();
    this.currentList.style.boxShadow = '0 10px 3px gray';
  },

  onDragLeave() {
    this.currentList.style.boxShadow = 'none';
  },

  onDragEnter(evt, list) {
    evt.preventDefault();
    this.currentList = list;
  },

  onDrop(evt, list) {
    evt.preventDefault();

    this.currentList = list;
    list.append(this.currentTask);
  },
};
