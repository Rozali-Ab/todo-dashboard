export const createModalContainer = (template: string) => {
	const modalContainer = document.createElement('div');
	modalContainer.classList.add('modal');
	modalContainer.id = 'modal';
	modalContainer.innerHTML = template;
	document.body.appendChild(modalContainer);
};
