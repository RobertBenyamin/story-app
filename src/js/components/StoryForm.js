import { LitElement, html } from "lit";
import Stories from "../network/stories";

class StoryForm extends LitElement {
  static properties = {
    isLoading: { type: Boolean },
    errorMessage: { type: String },
  };

  constructor() {
    super();
    this.isLoading = false;
    this.errorMessage = "";
  }

  createRenderRoot() {
    return this;
  }

  render() {
    return html`
      <form class="needs-validation" novalidate @submit=${this._handleSubmit}>
        ${this.errorMessage
          ? html`
              <div class="alert alert-danger mb-3">${this.errorMessage}</div>
            `
          : ""}

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
          <label for="photo" class="form-label">Photo (max 1MB)</label>
          <input
            type="file"
            class="form-control"
            id="photo"
            accept="image/*"
            required
            @change=${this._validateFileSize}
          />
          <div class="invalid-feedback">
            Please select a valid image (max 1MB).
          </div>
        </div>

        <button
          type="submit"
          class="btn btn-primary"
          ?disabled=${this.isLoading}
        >
          ${this.isLoading ? "Submitting..." : "Submit Story"}
        </button>
      </form>
    `;
  }

  _validateFileSize(e) {
    const file = e.target.files[0];
    const maxSize = 1024 * 1024; // 1MB

    if (file && file.size > maxSize) {
      e.target.value = ""; 
      this.errorMessage = "File size must be less than 1MB";
      return false;
    }

    this.errorMessage = "";
    return true;
  }

  async _handleSubmit(e) {
    e.preventDefault();
    const form = e.target;

    if (!form.checkValidity()) {
      e.stopPropagation();
      form.classList.add("was-validated");
      return;
    }

    this.isLoading = true;
    this.errorMessage = "";

    try {
      const description = form.description.value;
      const photo = form.photo.files[0];

      if (!this._validateFileSize({ target: form.photo })) {
        return;
      }

      const formData = new FormData();
      formData.append("description", description);
      formData.append("photo", photo);

      await Stories.store({
        description: description,
        photo: photo,
      });

      form.reset();
      form.classList.remove("was-validated");
      window.location.hash = "/";
    } catch (error) {
      console.error("Error posting story:", error);
      this.errorMessage =
        error.response?.data?.message ||
        "Failed to post story. Please try again.";
    } finally {
      this.isLoading = false;
    }
  }
}

customElements.define("story-form", StoryForm);
