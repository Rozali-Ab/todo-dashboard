import {editTaskEvent, removeTaskEvent} from '../../../events/events';
import {TaskType} from '../../../store/types/types.ts';
import {TaskToolsEvent} from '../../../constants/TaskToolsEvent.ts';

export default class Task extends HTMLElement {
	id = '';
	title = '';
	parent = '';
	taskTools = document.createElement('div');

	constructor(payload ? : TaskType ) {

		super();
		this.setTaskAttributes(payload);

		// this.innerHTML = template;

	}

	onRemoveClick() {
		this.dispatchEvent(removeTaskEvent());
		this.remove();
	}

	onEditClick() {
		this.dispatchEvent(editTaskEvent());
	}

	connectedCallback() {
		//mounted

		this.buildTemplate();
		this.taskTools.addEventListener( 'click', this.onTaskToolsClick );
		//
		// this.shadowRoot.querySelector('.task-title').textContent = this.title;
		//
		// this.shadowRoot.querySelector('[data-action="remove-task"]').addEventListener('click', this.onRemoveClick.bind(this));
		// this.shadowRoot.querySelector('[data-action="edit-task"]').addEventListener('click', this.onEditClick.bind(this));

	}

	disconnectedCallback() {
		// "Unmount"
		// this.shadowRoot.querySelector('[data-action="remove-task"]').removeEventListener('click', this.onRemoveClick.bind(this));
		// this.shadowRoot.querySelector('[data-action-type="edit-task"]').removeEventListener('click', this.onEditClick.bind(this));
	}

	static get observedAttributes() {
		return ['title', 'parent'];
	}

	attributeChangedCallback(attribute, previousValue, currentValue) {

	}

	onTaskToolsClick = (e) => {

		const currentAction = e.target.dataset.actionType;
		// задание со зведочкой починить this без стрелочной фнукции потеря контекста
		
		// сделать првоерку есть ли евент такой
		const {id} = this;

		const event = 	new CustomEvent(currentAction, {
			bubbles: true,
			detail: { id }
		});

		this.dispatchEvent(event);
	};

	buildTemplate  (){

		this.setTaskAttributes();
		this.classList.add('task');
		this.setAttribute('draggable', 'true');

		this.taskTools.innerHTML = ` <button   class="task-tools__edit"   data-action-type="${TaskToolsEvent.EDIT_TASK}">   edit </button> <button class="task-tools__remove" data-action-type="${TaskToolsEvent.REMOVE_TASK}">кай унтан </button>`;
		this.prepend(this.taskTools);

		const taskBody = document.createElement('div');
		taskBody.innerHTML = `<div class="task-title"> ${this.title} id ${this.id} </div>`;
		this.append(taskBody);

	}

	setTaskAttributes(payload = {}) {

		const {id} = payload;
		// проверять число ли id
		this.id = id ? id : this.getAttribute('id');

		this.title = this.getAttribute('title');
		this.parent = this.getAttribute('parent');

	}

	updateData (payload = {}) {

		console.log('updateData!');
	}
}

/*import {useTasksStore} from '../../../store/useTasksStore.ts';
import {List} from '../List/List.ts';
import type {TaskType} from '../../../store/types/types';

const template = (task: TaskType) => {
	const {
		id,
		title,
		parentListId,
	} = task;

	return `
	  <div
	      class="task"
	      draggable="true"
	      data-id="${id}"
	      data-parent-list-id="${parentListId}"
	  >
	      <div class="task-tools">
        <button
          class="task-tools__edit"
          data-action="edit-task"
        >
          edit
        </button>
        <button
          class="task-tools__remove"
          data-action="remove-task"
        ></button>
      </div>
      <div class="task-type">Work</div>
      <div class="task-title">${title}</div>
      <div class="task-tags">
        <span class="task-tag">tag</span>
        <span class="task-tag">tag</span>
        <span class="task-tag">tag</span>
      </div>
    </div>
  `;
};

export const Task = (task: TaskType) => {
	const {removeTaskById, updateTaskParentIdById, updateTaskTitle, createList} = useTasksStore();

	const taskElement = document.querySelector(`.task[data-id="${task.id}"]`) as HTMLDivElement;
	const titleElement = taskElement?.querySelector('.task-title');

	const getTaskTemplate = () => {
		return template(task);
	};

	const renderNewTask = () => {
		const taskParentElement = document.querySelector('.task-list[data-id="0"]');

		if (!taskParentElement) {
			const list = createList('Task today');
			List(list, [task]).renderList();
			return;
		}

		taskParentElement.insertAdjacentHTML('beforeend', getTaskTemplate());
	};

	const renameTaskTitle = () => {
		if (titleElement)
			titleElement.textContent = task.title;
		updateTaskTitle(task);
	};

	const updateParentId = (parentId: number) => {
		task.parentListId = parentId;
		taskElement.dataset.parentListId = parentId.toString();
		updateTaskParentIdById(task.id, parentId);
	};

	const removeTask = () => {
		taskElement?.remove();
		removeTaskById(task.id);
	};

	return {
		getTaskTemplate,
		renameTaskTitle,
		updateParentId,
		removeTask,
		renderNewTask
	};
};*/

/*export const Task = (task: TaskType) => {

	const {
		id,
		title,
		parentListId,
	} = task;

	return `
	  <div
	      class="task"
	      draggable="true"
	      data-id="${id}"
	      data-parent-list-id="${parentListId}"
	  >
	      <div class="task-tools">
        <button
          class="task-tools__edit"
          data-action="edit-task"
        >
          edit
        </button>
        <button
          class="task-tools__remove"
          data-action="remove-task"
        ></button>
      </div>
      <div class="task-type">Work</div>
      <div class="task-title">${title}</div>
      <div class="task-tags">
        <span class="task-tag">tag</span>
        <span class="task-tag">tag</span>
        <span class="task-tag">tag</span>
      </div>
    </div>
  `;
};*/
