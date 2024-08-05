const SHOW_TIME = 3000;

export const showMessage = (message: string) => {
	const container = document.createElement('div');
	container.textContent = message;
	container.classList.add('error');

	document.body.append(container);

	setTimeout(() => {
		container.remove();
	}, SHOW_TIME);
};
