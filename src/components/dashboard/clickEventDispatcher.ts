import {CLICK_ACTIONS} from '../../constants/const';
import {removeTask} from './Task/removeTask';
import {editTask} from './Task/editTask';
import { renameList } from './List/renameList';
import { removeList } from './List/removeList';

export const clickEventDispatcher = (evt: MouseEvent) => {
	const action = (evt.target as HTMLElement).dataset.action;

	switch (action) {
		case CLICK_ACTIONS.REMOVE_TASK:
			removeTask(evt);
			break;

		case CLICK_ACTIONS.EDIT_TASK:
			editTask(evt);
			break;

		case CLICK_ACTIONS.RENAME_LIST:
      renameList(evt);
			break;

		case CLICK_ACTIONS.REMOVE_LIST:
      removeList(evt);
			break;
	}

};
