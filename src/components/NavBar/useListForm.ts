import {useTasksStore} from '../../store/useTasksStore.ts';
import {createModalContainer} from './utils/createModalContainer.ts';
import {removeModalContainer} from './utils/removeModalContainer.ts';
import {getFormData} from './utils/getFormData.ts';
import {renderNewList} from '../dashboard/List/renderNewList.ts';
import type {ListType} from '../../store/types/types.ts';

const {createList} = useTasksStore();

const formTemplate = ({title}: ListType) => {
	return `
        <form 
            class="form-new-list" 
            id="form-new-list" 
        >
            <label class="form-new-list__label" for="title">New list title
	            <input
	                class="form-new-list__input"
	                type="text"
	                placeholder="New list title"
	                maxlength="30"
	                name="title"
	                id="new-list-title"
	                required
	                value=${title}
	            >
            </label>
            <div class="form-buttons">
                <button
                    class="cancel"
                    type="button"
                    id="cancel-list"
                >
                </button>
                <button
                    class="submit"
                    type="submit"
                    id="submit-list"
                >
                    Save
                </button>
            </div>
        </form>
    `;
};

const emptyList: ListType = {
	id: 0,
	title: '',
	order: 0,
};

export const useListForm = (listPayload?: ListType) => {

	const showListForm = () => {
		const listToUse = listPayload || emptyList;
		createModalContainer(formTemplate(listToUse));

		const form = document.getElementById('form-new-list');
		form?.addEventListener('submit', (evt) => onSubmitForm(evt));
		const cancelButton = document.getElementById('cancel-list');
		cancelButton?.addEventListener('click', removeForm);
	};

	const removeForm = () => {
		removeModalContainer();
	};

	const onSubmitForm = (evt: SubmitEvent) => {
		evt.preventDefault();

		const formNode = evt.target as HTMLFormElement;
		const newList = createList(getFormData(formNode));
		if (newList) {
			renderNewList(newList);
			removeForm();
		}
	};

	return {
		onSubmitForm,
		showListForm,
		removeForm
	};
};
