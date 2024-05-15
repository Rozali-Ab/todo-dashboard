export const taskFormTemplate = (title?: string) => {
	const isNew = title ? '' : 'New';
	const taskTitle = title ? title : '';

	const form = document.createElement('form');
	form.classList.add('form-new-task');
	form.setAttribute('id', 'form-new-task');

	form.innerHTML = `
		<label for="title"> ${isNew} Task Title
	      <input
	          class="form-new-task__input"
	          type="text"
	          placeholder="max 30 symbols"
	          maxlength="30"
	          name="title"
	          id="new-task-title"
						required
	          value="${taskTitle}"
	      >
    </label>
    <div class="form-buttons">
      <button type="button" id="cancel">Cancel</button>
      <button type="submit" id="submit">Save</button>
    </div>
	`;

	setTimeout(() => {
		const input = form.querySelector('#new-task-title') as HTMLInputElement;
		if (input) {
			input.focus();
			input.setSelectionRange(input.value.length, input.value.length);
		}
	}, 0);

	return form;
};
