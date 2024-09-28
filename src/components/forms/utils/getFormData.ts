import {UserType} from '../../../types/types.ts';

export const getFormData = (formNode: HTMLFormElement) => {
	const {elements} = formNode;
	const formData: Record<string, string> = {};

	Array.from(elements).forEach((element: Element) => {
		if (element instanceof HTMLInputElement && element.name) {
			formData[element.name] = element.value;
		}
	});

	return formData;
};

export const createUser = (form: HTMLFormElement): UserType => {
	return {
		email: getFormData(form).email,
		password: getFormData(form).password,
		id: '',
		tasks: [],
		columns: [],
	};
};
