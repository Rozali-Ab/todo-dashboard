export const removeListEvent = () => new CustomEvent('remove-list', {
	bubbles: true
});

export const editListEvent = () => new CustomEvent('edit-list', {
	bubbles: true
});

export const addTaskEvent = () => new CustomEvent('add-task', {
	bubbles: true
});

export const editTaskEvent = () => new CustomEvent('edit-task', {
	bubbles: true
});

export const removeTaskEvent = () => new CustomEvent('remove-task', {
	bubbles: true
});
