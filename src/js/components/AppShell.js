import { LitElement, html } from 'lit';
import { router } from '../utils/router';

class AppShell extends LitElement {
  constructor() {
    super();
    router();
  }

  createRenderRoot() {
    return this;
  }

  render() {
    return html`
      <nav-app></nav-app>
      <main class="container py-4">
        <div id="content">
          <dashboard-page></dashboard-page>
        </div>
      </main>
      <footer-app></footer-app>
    `;
  }
}

customElements.define('app-shell', AppShell);