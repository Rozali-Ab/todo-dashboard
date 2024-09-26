export const authenticationFormTemplate = () => {
	const form = document.createElement('form');

	form.innerHTML = `
		<label for="email">Login
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
		<div class="form-buttons">
			<button type="button" id="cancel">Cancel</button>
			<button type="submit">Login</button>
		</div>
	`;

	return form;
};
