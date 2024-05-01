import {editTaskEvent, removeTaskEvent} from '../../../events/events';

const template = document.createElement('template');
template.innerHTML = `
	<style>
		.task {
			position: relative;
			display: flex;
			flex-direction: column;
		  margin: .5rem 0;
		  padding: .5rem 1rem;
			background-color: rgba(255,255,255,0.4);
	    border-radius: 1.5rem;
		}
		.task-title {
			margin-top: .5rem;
	    font-size: 2rem;
	    word-break: break-all;
		}
		.task-tools {
			flex-direction: row;
	    position: absolute;
	    padding-right: 1rem;
	    justify-content: end;
	    align-items: center;
	    right: 0;
	    font-size: 1.2rem;
		}
		.task-tools__edit {
      cursor: text;
      transition: transform 0.3s ease-in-out;
      background-color: rgba(255, 255, 255, 0);
      color: rgba(9, 9, 9, 0.4);
		}
		.task-tools__remove {
      border-radius: 0;
      width: 10px;
      height: 15px;
      background-color: rgba(255, 255, 255, 0);
      background-image: url('/src/assets/svg/trash.svg');
      background-repeat: no-repeat;
      filter: sepia(70%);
		}
		button {
		border: none;
		}
		
	</style>
	  <div
	      class="task"
	      draggable="true"
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
      <div class="task-title"></div>
    </div>  
`;

export default class Task extends HTMLElement {
	id = '';
	title = '';
	parent = '';

	constructor() {
		super();

		const shadow = this.attachShadow({mode: 'open'});
		shadow.append(template.content.cloneNode(true));
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

		this.id = this.getAttribute('id');
		this.title = this.getAttribute('title');
		this.parent = this.getAttribute('parent');

		this.shadowRoot.querySelector('.task-title').textContent = this.title;

		this.shadowRoot.querySelector('[data-action="remove-task"]').addEventListener('click', this.onRemoveClick.bind(this));
		this.shadowRoot.querySelector('[data-action="edit-task"]').addEventListener('click', this.onEditClick.bind(this));

	}

	disconnectedCallback() {
		// "Unmount"
		this.shadowRoot.querySelector('[data-action="remove-task"]').removeEventListener('click', this.onRemoveClick.bind(this));
		this.shadowRoot.querySelector('[data-action="edit-task"]').removeEventListener('click', this.onEditClick.bind(this));
	}

	static get observedAttributes() {
		return ['title', 'parent'];
	}

	// attributeChangedCallback(attribute, previousValue, currentValue) {
	// }
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
