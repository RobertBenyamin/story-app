import { LitElement, html } from "lit";
import Stories from "../network/stories";

class DashboardPage extends LitElement {
  static properties = {
    stories: { type: Array },
    isLoading: { type: Boolean },
    error: { type: String },
  };

  constructor() {
    super();
    this.stories = [];
    this.isLoading = false;
    this.error = null;
    this._loadStories();
  }

  createRenderRoot() {
    return this;
  }

  async _loadStories() {
    this.isLoading = true;
    try {
      const response = await Stories.getAll();
      this.stories = response.data.listStory;
    } catch (error) {
      console.error("Error loading stories:", error);
      this.error = error.response?.data?.message || "Failed to load stories";
    } finally {
      this.isLoading = false;
    }
  }

  render() {
    if (this.isLoading) {
      return html`
        <div class="text-center">
          <div class="spinner-border" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>
      `;
    }

    if (this.error) {
      return html`
        <div class="alert alert-danger" role="alert">${this.error}</div>
      `;
    }

    return html`
      <h2 class="mb-4">Stories</h2>
      <div class="row">
        ${this.stories.map(
          (story) => html`
            <div class="col-md-4">
              <story-card .story=${story}></story-card>
            </div>
          `
        )}
      </div>
    `;
  }
}

customElements.define("dashboard-page", DashboardPage);
