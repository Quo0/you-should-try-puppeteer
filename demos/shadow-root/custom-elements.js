class customDiv extends HTMLElement {
  constructor () { super(); }

  connectedCallback () {
    const shadowRoot = this.attachShadow({ mode: 'closed' });
    shadowRoot.innerHTML = `
      <div class='custom-div'>
        <h1>Closed shadow root!</h1>

        <custom-input>
          <p>You can't access the shadow root from outside</p>
        </custom-input>

        <slot></slot>
      <div>
    `;
    shadowRoot.firstElementChild.style = `
      width: 300px;
      border: 3px solid #999;
      color: rebeccapurple;
      padding: 0 10px 10px 10px;
      margin: 100px auto;
      text-align: center;
    `;
  }
}

class customInput extends HTMLElement {
  constructor () { super(); }

  connectedCallback () {
    const shadowRoot = this.attachShadow({ mode: 'closed' });
    shadowRoot.innerHTML = `
      <div>
        <p><slot></slot></p>
        <input type="text">        
      <div>
    `;
  }
}

customElements.define('custom-div', customDiv);
customElements.define('custom-input', customInput);