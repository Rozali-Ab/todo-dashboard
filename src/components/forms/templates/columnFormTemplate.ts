export const columnFormTemplate = (title?: string): HTMLFormElement => {
	const isNew = title ? '' : 'New';
	const columnTitle = title ? title : '';

	const form = document.createElement('form');
	form.classList.add('form-new-column');
	form.setAttribute('id', 'form-new-column');

	form.innerHTML = `
		<label class="form-new-column__label" for="title">${isNew} column title
      <input
          class="form-new-column__input"
          type="text"
          placeholder="New column title"
          maxlength="30"
          name="title"
          id="new-column-title"
          required
          value=${columnTitle}
      >
    </label>
    <div class="form-buttons">
        <button class="cancel" type="button" id="cancel">Cancel</button>
        <button class="submit" type="submit" id="submit">Save</button>
    </div>
	`;

	setTimeout(() => {
		const input = form.querySelector('#new-column-title') as HTMLInputElement;
		if (input) {
			input.focus();
			input.setSelectionRange(input.value.length, input.value.length);
		}
	}, 0);

	return form;
};
