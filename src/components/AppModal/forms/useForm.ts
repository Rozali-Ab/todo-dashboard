import AppModal from '../AppModal.ts';
import {authenticationFormTemplate} from './templates/authenticationFormTemplate.ts';
import {getFormData} from './utils/getFormData.ts';

interface FormData {
	[key: string]: string;
}

type FormTemplate = (payload?: boolean) => string;

const form = document.createElement('form');
const modal = new AppModal();

export const useForm = () => {

	const showForm = (formTemplate: FormTemplate): Promise<FormData | null> => {

		form.innerHTML = formTemplate();

		modal.appendContent(form);
		modal.open();

		form.querySelector('#create-account')?.addEventListener('click', () => {
			form.innerHTML = formTemplate(true);
			form.name = 'registration-form';
		});

		return new Promise((resolve) => {
			form.addEventListener('submit', (evt: SubmitEvent) => {
				evt.preventDefault();

				const formData = getFormData(form);

				resolve(formData);
			});

			form.querySelector('#cancel')!.addEventListener('click', () => {
				form.remove();
				modal.close();

				resolve(null);
			});
		});

	};

	const showAuthForm = (): Promise<FormData | null> => {
		return showForm(authenticationFormTemplate);

	};

	// const showColumnForm = (title?: string): Promise<FormData | null> => {
	// 	return showForm(() => columnFormTemplate(title));
	// };
	//
	// const showTaskForm = (title?: string): Promise<FormData | null> => {
	// 	return showForm(() => taskFormTemplate(title));
	// };

	return {
		form,
		modal,
		showAuthForm,
		// showColumnForm,
		// showTaskForm,
	};
};
