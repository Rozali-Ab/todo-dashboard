export const authenticationFormTemplate = () => {
	const form = document.createElement('form');
	form.classList.add('form-auth');

	form.innerHTML = `
		<h4>Login</h4>
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
			>
		</label>
		<div>
			<button type="button" id="cancel">Cancel</button>
			<button type="reset" id="reset">Clear</button>
			<button type="submit">Login</button>
		</div>
	`;

	form.name = 'auth-form';

	return form;
};
