import { LitElement, html } from "lit";

class FooterApp extends LitElement {
  createRenderRoot() {
    return this;
  }

  render() {
    return html`
      <footer class="bg-light py-3 mt-4">
        <div class="container text-center">
          <p class="mb-0">&copy; 2025 Story App. All rights reserved.</p>
        </div>
      </footer>
    `;
  }
}

customElements.define("footer-app", FooterApp);
