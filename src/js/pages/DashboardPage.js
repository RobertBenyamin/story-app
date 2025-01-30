import { LitElement, html } from "lit";

class DashboardPage extends LitElement {
  static properties = {
    stories: { type: Array },
  };

  constructor() {
    super();
    this.stories = [];
    this._loadStories();
    
    this.addEventListener('story-added', (e) => {
      this.stories = [e.detail.story, ...this.stories];
      this.requestUpdate();
    });
  }

  createRenderRoot() {
    return this;
  }

  async _loadStories() {
    try {
      const localStories = localStorage.getItem('stories');
      if (localStories) {
        this.stories = JSON.parse(localStories);
        return;
      }

      const response = await fetch("/data/DATA.json");
      const data = await response.json();
      this.stories = data.listStory;
      
      localStorage.setItem('stories', JSON.stringify(this.stories));
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
