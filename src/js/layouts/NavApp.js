import { LitElement, html } from "lit";
import Utils from "../utils/utils";
import Config from "../config/config";

class NavApp extends LitElement {
  static properties = {
    isLoggedIn: { type: Boolean },
  };

  constructor() {
    super();
    this.isLoggedIn = !!Utils.getUserToken(Config.USER_TOKEN_KEY);

    window.addEventListener('user-login', () => {
      this.isLoggedIn = true;
    });
  }

  createRenderRoot() {
    return this;
  }

  render() {
    return html`
      <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
        <div class="container">
          <a class="navbar-brand" href="#">Story App</a>
          ${this.isLoggedIn
            ? html`
                <button
                  class="navbar-toggler"
                  type="button"
                  data-bs-toggle="offcanvas"
                  data-bs-target="#navbarOffcanvas"
                >
                  <span class="navbar-toggler-icon"></span>
                </button>

                <div
                  class="offcanvas offcanvas-end bg-primary"
                  id="navbarOffcanvas"
                >
                  <div class="offcanvas-header">
                    <h5 class="offcanvas-title text-white">Menu</h5>
                    <button
                      type="button"
                      class="btn-close btn-close-white"
                      data-bs-dismiss="offcanvas"
                    ></button>
                  </div>
                  <div class="offcanvas-body">
                    <ul class="navbar-nav ms-auto">
                      <li class="nav-item">
                        <a class="nav-link" href="#/">Dashboard</a>
                      </li>
                      <li class="nav-item">
                        <a class="nav-link" href="#/add">Add Story</a>
                      </li>
                      <li class="nav-item">
                        <a class="nav-link" href="#/about">About</a>
                      </li>
                      <li class="nav-item">
                        <button
                          class="btn btn-outline-light"
                          @click=${this._handleLogout}
                        >
                          Logout
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
              `
            : ""}
        </div>
      </nav>
    `;
  }

  _handleLogout() {
    Utils.destroyUserToken(Config.USER_TOKEN_KEY);
    window.location.hash = "#/login";
  }
}

customElements.define("nav-app", NavApp);
