export const authenticationFormTemplate = () => {
	return `
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
			<button type="button" id="authentication">Auth</button>
		</div>
		<br><hr><br>
 		<button type="button" id="registration" >Create an account</button>
	`;
};
