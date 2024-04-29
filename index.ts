import './src/scss/index.scss';
import './src/components/NavBar/index';
import './src/components/dashboard/index';

const template = document.createElement('template');
template.innerHTML = '<div><slot></slot></div>';

export default class SuperHui extends HTMLElement {
    id = '';

    constructor() {
        super();

        this.id = this.getAttribute('id');

        const shadow  = this.attachShadow({mode:'open'});
        shadow.append(template.content.cloneNode(true));
    }

    onRemoveClick(){
        dispatchEvent('remove', this.id);
    }

    onEditClick(){
        dispatchEvent('edittodo', this.id);
    }

    async onClickHandle  (e) {

        e.preventDefault();

    }

    connectedCallback() {
        console.log(this , 'mounted');

        this.addEventListener('click', this.onClickHandle );
        //mounted

    }

    disconnectedCallback() {
        // "Unmount"
        // console.log('disconnectedCallback')
    }

    attributeChangedCallback(attribute, previousValue, currentValue) {

// attr change handle
    }
}

customElements.define('super-hui', SuperHui );
