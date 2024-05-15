import AppModal from '../../../AppModal/AppModal.ts';

export const confirmDeleteColumn = async (): Promise<boolean> => {

	const modal = new AppModal();

	const content = document.createElement('div');
	content.classList.add('modal-message');

	const message = document.createElement('p');
	message.textContent = 'Remove Column with all tasks?';

	const answerNo = document.createElement('button');
	answerNo.textContent = 'No';

	const answerYes = document.createElement('button');
	answerYes.textContent = 'Yes';

	content.append(message, answerNo, answerYes);

	modal.appendContent(content);

	modal.open();

	return new Promise((resolve) => {

		answerNo.addEventListener('click', () => {
			modal.close();
			resolve(false);
		});
		answerYes.addEventListener('click', () => {
			modal.close();
			resolve(true);
		});
	});

};
