import AppModal from '../AppModal/AppModal.ts';
import {columnFormTemplate} from './templates/columnFormTemplate.ts';
import {authenticationFormTemplate} from './templates/authenticationFormTemplate.ts';
import {registrationFormTemplate} from './templates/registrationFormTemplate.ts';
import {taskFormTemplate} from './templates/taskFormTemplate.ts';
import {getFormData} from './utils/getFormData.ts';

interface FormData {
	[key: string]: string;
}

type FormTemplate = (payload?: string) => HTMLFormElement;

export const useForm = (payload?: string) => {

	const showForm = (formTemplate: FormTemplate): Promise<FormData | null> => {
		const modal = new AppModal();
		const form = formTemplate(payload);

		modal.appendContent(form);
		modal.open();

		return new Promise((resolve) => {
			form.addEventListener('submit', (evt: SubmitEvent) => {
				evt.preventDefault();

				const formData = getFormData(form);

				form.remove();
				modal.close();

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

	const showRegistrationForm = (): Promise<FormData | null> => {
		return showForm(registrationFormTemplate);
	};

	const showColumnForm = (title?: string): Promise<FormData | null> => {
		return showForm(() => columnFormTemplate(title));
	};

	const showTaskForm = (title?: string): Promise<FormData | null> => {
		return showForm(() => taskFormTemplate(title));
	};

	return {
		showAuthForm,
		showRegistrationForm,
		showColumnForm,
		showTaskForm,
	};
};
