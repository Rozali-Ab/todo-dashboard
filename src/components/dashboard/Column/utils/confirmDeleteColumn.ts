import AppModal from '../../../AppModal/AppModal.ts';

export const confirmDeleteColumn = async (): Promise<boolean> => {

	const modal = new AppModal();

	const content = document.createElement('div');
	content.classList.add('modal-message');

	const message = document.createElement('div');
	message.textContent = 'Delete list with all tasks?';

	const buttons = document.createElement('div');
	buttons.classList.add('modal-buttons');

	const answerNo = document.createElement('button');
	answerNo.textContent = 'No';

	const answerYes = document.createElement('button');
	answerYes.textContent = 'Yes';

	buttons.append(answerNo, answerYes);

	content.append(message, buttons);

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
