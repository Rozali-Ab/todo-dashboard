import {CLICK_ACTIONS} from '../../constants/const';
import {removeTask} from './Task/removeTask';
import {editTask} from './Task/editTask';

export const clickEventDispatcher = (evt: MouseEvent) => {
	const action = (evt.target as HTMLElement).dataset.action;

	switch (action) {
		case CLICK_ACTIONS.REMOVE_TASK:
			removeTask(evt);
			break;

		case CLICK_ACTIONS.EDIT_TASK:
			editTask(evt);
	}

};
