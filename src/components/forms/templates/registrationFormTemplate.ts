export const registrationFormTemplate = () => {
	const form = document.createElement('form');
	form.classList.add('form-auth');

	form.innerHTML = `
		<h4>Create new account</h4>
		<label for="id">
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
		<div>
			<button type="button" id="cancel">Cancel</button>
			<button type="reset" id="reset">Clear</button>
			<button type="submit">Create</button>
		</div>
	`;

	form.name = 'auth-form';

	return form;
};
