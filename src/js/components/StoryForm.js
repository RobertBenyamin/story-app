import { LitElement, html } from "lit";

class StoryForm extends LitElement {
  createRenderRoot() {
    return this;
  }

  render() {
    return html`
      <form class="needs-validation" novalidate @submit=${this._handleSubmit}>
      <div class="mb-3">
        <label for="name" class="form-label">Name</label>
        <input
        type="text"
        class="form-control"
        id="name"
        required
        />
        <div class="invalid-feedback">Please provide your name.</div>
      </div>

      <div class="mb-3">
        <label for="description" class="form-label">Description</label>
        <textarea
        class="form-control"
        id="description"
        rows="3"
        required
        ></textarea>
        <div class="invalid-feedback">Please provide a description.</div>
      </div>

      <div class="mb-3">
        <label for="photo" class="form-label">Photo</label>
        <input
        type="file"
        class="form-control"
        id="photo"
        accept="image/*"
        required
        />
        <div class="invalid-feedback">Please select an image.</div>
      </div>

      <button type="submit" class="btn btn-primary">Submit Story</button>
      </form>
    `;
  }

  async _handleSubmit(e) {
    e.preventDefault();
    const form = e.target;

    if (!form.checkValidity()) {
      e.stopPropagation();
      form.classList.add("was-validated");
      return;
    }

    const name = form.querySelector('#name').value;
    const description = form.querySelector('#description').value;
    const photoFile = form.querySelector('#photo').files[0];

    const randomNum = Math.floor(Math.random() * 1000);
    const photoUrl = `https://picsum.photos/1200/700?random=${randomNum}`;

    const newStory = {
      id: 'story-' + Math.random().toString(36).substr(2, 15),
      name,
      description,
      photoUrl,
      createdAt: new Date().toISOString(),
    };

    try {
      const existingStories = JSON.parse(localStorage.getItem('stories') || '[]');
      
      existingStories.unshift(newStory);
      
      localStorage.setItem('stories', JSON.stringify(existingStories));

      form.reset();
      form.classList.remove("was-validated");
      
      this.dispatchEvent(new CustomEvent('story-added', {
        bubbles: true,
        composed: true,
        detail: { story: newStory }
      }));

      // Redirect to home page
      window.location.hash = '#/';
    } catch (error) {
      console.error('Error saving story:', error);
    }
  }
}

customElements.define("story-form", StoryForm);
