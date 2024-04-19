import { useListForm } from '../../NavBar/useListForm.ts';
import type {ListType} from '../../../store/types/types.ts';
import { useTasksStore } from '../../../store/useTasksStore.ts';

export const renameList = (evt: MouseEvent) => {
	const listElement = (evt.target as HTMLElement).closest('div.task-list') as HTMLElement;
	const listTitleElement = listElement.querySelector('.task-list-title');
	
	if (listElement && listTitleElement) {
		const title = listTitleElement.textContent;
		if (title !== null) {
			const listToUpdate = {
				id: Number(listElement.dataset.id),
				title: title,
				order: Number(listElement.dataset.id)
			};

			const {showListForm} = useListForm(listToUpdate);
			showListForm();
		}
	}
};

export const updateListTitle = (list: ListType ) => {
	const listElement = document.querySelector(`.task-list[data-id="${list.id}"]`);
	if(listElement) {
		const title = listElement.querySelector('.task-list-title');
		if(title) {
			title.textContent = list.title;
			const {updateListTitleByTitle} = useTasksStore();
			updateListTitleByTitle(list);
		}
	}
};
