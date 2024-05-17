export default class AppModal extends HTMLElement {
	
	modal = document.createElement('dialog');

	constructor() {
		super();
	}

	connectedCallback() {
		this.buildTemplate();
	}

	buildTemplate() {

		this.setAttribute('id', 'modal');
		this.appendChild(this.modal);
	}

	appendContent(content: HTMLElement) {
		this.modal.innerHTML = '';
		this.modal.appendChild(content);
	}

	open() {

		if (!document.body.contains(this)) {
			document.body.appendChild(this);
		}

		this.modal.showModal();
	}

	close() {
		this.modal.close();

		if (document.body.contains(this)) {
			document.body.removeChild(this);
		}
	}
}

customElements.define('app-modal', AppModal);
