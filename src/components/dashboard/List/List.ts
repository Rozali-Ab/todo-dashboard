import {addTaskEvent, editListEvent, removeListEvent} from '../../../events/events';

const template = document.createElement('template');
template.innerHTML = `
	<style>
		.task-list {
			display: flex;
			flex-direction: column;
			margin: 1rem;
			padding: 1em;
			width: 20rem;
			background-color: rgba(255,255,255,0.23);
	    border-radius: 1.5rem;
		}
		.task-list-header {
			position: relative;
	    display: flex;
	    flex-direction: row;
	    justify-content: space-between;
	    margin-bottom: 1rem;
		}
		.task-list-title {
	    font-size: 2rem;
    	font-weight: 600;
		}
	</style>
	<div class="task-list">
		<div class="task-list-header">
      <div class="task-list-title"></div>
      <div class="task-list-settings ">
        <div class="settigs-menu">
          <button 
          	class="settigs-menu__remove"
          	data-action="remove-list"
          >
          	delete list
          </button>
          <button 
          	class="settigs-menu__rename"
          	data-action="rename-list"
          >
          	rename list
          </button>
          <button
          	data-action="add-task"
          >
          	add task
          </button>
        </div>
      </div>
    </div>
    
    <slot name="task"></slot>
	</div>
`;

export default class List extends HTMLElement {
	id = '';
	title = '';

	constructor(payload) {
		super();
		this.taskArray = [];
		const shadow = this.attachShadow({mode: 'open'});
		shadow.append(template.content.cloneNode(true));
	}

	onRemoveClick() {
		this.dispatchEvent(removeListEvent());
		this.remove();
	}

	onEditClick() {
		this.dispatchEvent(editListEvent());
	}

	onAddTaskClick() {
		this.dispatchEvent(addTaskEvent());
	}

	connectedCallback() {
		//mounted

		this.id = this.getAttribute('id');
		this.title = this.getAttribute('title');

		this.shadowRoot.querySelector('.task-list-title').textContent = this.title;

		this.shadowRoot.querySelector('[data-action="remove-list"]').addEventListener('click', this.onRemoveClick.bind(this));
		this.shadowRoot.querySelector('[data-action="rename-list"]').addEventListener('click', this.onEditClick.bind(this));
		this.shadowRoot.querySelector('[data-action="add-task"]').addEventListener('click', this.onAddTaskClick.bind(this));

	}

	disconnectedCallback() {
		// "Unmount"
		this.shadowRoot.querySelector('[data-action="remove-list"]').removeEventListener('click', this.onRemoveClick.bind(this));
		this.shadowRoot.querySelector('[data-action="rename-list"]').removeEventListener('click', this.onEditClick.bind(this));
	}

	static get observedAttributes() {
		return ['title'];
	}

	attributeChangedCallback(attribute, previousValue, currentValue) {
// attr change handle
	}

}

/*
import {useTasksStore} from '../../../store/useTasksStore.ts';
import {Task} from '../Task/Task.ts';
import type {ListType, TaskType} from '../../../store/types/types.ts';

const dashboard = document.getElementById('dashboard');

const template = (list: ListType, tasks?: TaskType[]) => {
	const {id, title} = list;
	const taskElements = tasks?.map(task => Task(task).getTaskTemplate()).join('') || '';
	//const isHide = id === 0 ? 'hide' : '';

	return `
		<div
			class="task-list"
			data-id="${id}"
		>
		<div class="task-list-header">
      <div class="task-list-title">${title}</div>
      <div class="task-list-settings ">
        <div class="settigs-menu">
          <button
          	class="settigs-menu__remove"
          	data-action="remove-list"
          >
          	delete list
          </button>
          <button
          	class="settigs-menu__rename"
          	data-action="rename-list"
          >
          	rename list
          </button>
        </div>
      </div>
    </div>
    ${taskElements}
	</div>
	`;
};

export const List = (list: ListType, tasks?: TaskType[]) => {
	const {removeListById, removeAllTasksByParentId, updateListById} = useTasksStore();

	const listElement = document.querySelector(`.task-list[data-id="${list.id}"]`);
	const titleElement = listElement?.querySelector('.task-list-title');

	const renderList = () => {
		if (dashboard) {
			dashboard.insertAdjacentHTML('beforeend', template(list, tasks));
		}
	};

	const renameListTitle = () => {
		if (titleElement)
			titleElement.textContent = list.title;
		updateListById(list);
	};

	const removeList = () => {
		const isEmpty = listElement?.getElementsByClassName('task').length === 0;
		if (isEmpty) {
			listElement.remove();
			removeListById(list.id);
			return;
		} else {
			const confirmed = window.confirm('Remove list with all tasks?');
			if (confirmed) {
				listElement?.remove();
				removeListById(list.id);
				removeAllTasksByParentId(list.id);
			}
		}
	};

	return {
		renderList,
		renameListTitle,
		removeList,
	};
};
*/

/*export const List = ({list, tasks}: ListProps) => {
	const {id, title} = list;

	const taskElements = tasks ? tasks.map(task => Task(task)).join('') : '';

	return `
		<div
			class="task-list"
			data-id="${id}"
		>
		<div class="task-list-header">
      <div class="task-list-title">${title}</div>
      <div class="task-list-settings">
        <div class="settigs-menu">
          <span
          	class="settigs-menu__remove"
          	data-action="remove-list"
          >
          	delete list
          </span>
          <span
          	class="settigs-menu__rename"
          	data-action="rename-list"
          >
          	rename list
          </span>
        </div>
      </div>
    </div>
    ${taskElements}
	</div>
	`;
};*/
