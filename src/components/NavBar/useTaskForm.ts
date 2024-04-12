// тут логику отображение и сбора данных формы

import {TaskType} from '../../store/types/types.ts';
import {useTasksStore} from '../../store/useTasksStore.ts';

const {creteNewTask} = useTasksStore();
const formTemplate = ({title}: TaskType) => {

    `<form onsubmit="onSubmitForm" class="task form-new-task hide" id="form-new-task">
            <label for="new-task-title">
              Title
            </label>
            <input
                class="form-new-task__input"
                type="text"
                placeholder="max 30 symbols"
                maxlength="30"
                name="new-task-title"
                id="new-task-title"
               
                value="${title}"
            />
            <label for="new-task-description">
              Description
            </label>
            <textarea
              class="form-new-task__textarea"
              maxlength="200"
              placeholder="max 200 symbols"
              name="new-task-description"
              id="new-task-description"
            ></textarea>
            <div class="task-tags"></div>
            <div class="form-buttons">
              <button type="button" id="cancel-task">Cancel</button>
              <button type="submit" id="submit-task">Save</button>
            </div>
          </form>`;
};

const  emptyTask:TaskType = {
    id: 0,
    title: 'hui',
    description: 'bla bla',
    parentListId: 0,
};

export const useTaskForm  = ( taskPayload = emptyTask ) => {
    const showForm = () => {

    };

    const onSubmitForm = ()=> {

        // if (id) {
            // или апдейт
        // }
        // или новую
        // creteNewTask()
    };

    return {
        onSubmitForm,
        showForm
    };
};
