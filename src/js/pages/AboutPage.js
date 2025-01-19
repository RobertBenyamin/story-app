import { LitElement, html } from "lit";

class AboutPage extends LitElement {
  createRenderRoot() {
    return this;
  }

  render() {
    return html`
      <div class="row justify-content-center">
        <div class="col-md-8">
          <h2 class="mb-4">About Us</h2>
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Story App</h5>
              <p class="card-text">
                Story App is a platform where users can share their stories and
                experiences through text and images. Built with modern web
                technologies including Lit, Bootstrap, and Sass.
              </p>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define("about-page", AboutPage);
