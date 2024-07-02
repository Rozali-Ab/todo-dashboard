export default class Loader extends HTMLElement {

	constructor() {
		super();
		document.body.appendChild(this);
	}

	connectedCallback() {
		this.buildTemplate();
	}

	buildTemplate() {
		this.classList.add('loader', 'hidden');
	}

	show() {
		this.classList.remove('hidden');
	}

	hide() {
		this.classList.add('hidden');
	}
}

customElements.define('loader-component', Loader);
