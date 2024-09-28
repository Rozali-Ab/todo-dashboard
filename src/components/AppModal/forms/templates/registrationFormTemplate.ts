export const registrationFormTemplate = () => {
	const form = document.createElement('form');

	form.innerHTML = `
		<label for="id"> Create new account
			<input 
				name="id"
				type="number"
				value="${Date.now()}"
				class="hide"
			>
		</label>
		<label for="username">
			<input
				name="username"
				type="text"
				placeholder="Name"
				required
			>
		</label>
		<label for="email">
			<input
				name="email"
				type="email"
				placeholder="Email"
				required
			>
		</label>
				<label for="password">
			<input
				name="password"
				type="password"
				placeholder="Password"
				required
				minlength="6"
			>
		</label>
		<div class="form-buttons">
			<button type="button" id="cancel">Cancel</button>
			<button type="submit">Create</button>
		</div>
	`;

	return form;
};
