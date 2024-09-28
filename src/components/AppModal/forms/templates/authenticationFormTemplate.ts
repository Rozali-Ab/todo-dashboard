export const authenticationFormTemplate = (payload?: boolean) => {

	return `
		<label for="email"> ${payload ? 'Create account' : 'Login'}
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
		<label for="registration">
				<input name="registration" type="text" class="hide" value="${payload ? payload : ''}" >
		</label>

		<div class="form-buttons">
			<button type="button" id="cancel">Cancel</button>
			<button type="submit">${payload ? 'Create' : 'Login'}</button>
		</div>
		
		${!payload
		? `
					<br><hr><br>
					<button id="create-account">Create an account</button>
				`
		: ''
	}
	`;
};
