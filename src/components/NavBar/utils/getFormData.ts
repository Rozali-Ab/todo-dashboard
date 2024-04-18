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
