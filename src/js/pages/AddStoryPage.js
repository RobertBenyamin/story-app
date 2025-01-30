import { LitElement, html } from "lit";

class AddStoryPage extends LitElement {
  createRenderRoot() {
    return this;
  }

  render() {
    return html`
      <div class="row justify-content-center">
        <div class="col-md-8">
          <h2 class="mb-4">Add New Story</h2>
          <story-form></story-form>
        </div>
      </div>
    `;
  }
}

customElements.define("add-story-page", AddStoryPage);
