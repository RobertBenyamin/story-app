import { LitElement, html } from "lit";

class StoryCard extends LitElement {
  static properties = {
    story: { type: Object },
  };

  createRenderRoot() {
    return this;
  }

  formatDate(date) {
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return new Date(date).toLocaleDateString('id-ID', options);
  }

  render() {
    return html`
      <div class="card mb-4">
        <img
          src="${this.story.photoUrl}"
          class="card-img-top"
          alt="Story Image"
        />
        <div class="card-body">
          <h5 class="card-title">${this.story.name}</h5>
          <p class="card-text">${this.story.description}</p>
          <p class="card-text">
            <small class="text-muted">
              Posted on ${this.formatDate(this.story.createdAt)}
            </small>
          </p>
        </div>
      </div>
    `;
  }
}

customElements.define("story-card", StoryCard);
