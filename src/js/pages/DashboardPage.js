import { LitElement, html } from "lit";

class DashboardPage extends LitElement {
  static properties = {
    stories: { type: Array },
  };

  constructor() {
    super();
    this.stories = [];
    this._loadStories();
  }

  createRenderRoot() {
    return this;
  }

  async _loadStories() {
    try {
      const response = await fetch("/data/DATA.json");
      this.stories = await response.json();
      this.stories = this.stories.listStory;
    } catch (error) {
      console.error("Error loading stories:", error);
    }
  }

  render() {
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
