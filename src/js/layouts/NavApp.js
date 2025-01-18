import { LitElement, html } from "lit";

class NavApp extends LitElement {
  createRenderRoot() {
    return this;
  }

  render() {
    return html`
      <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
        <div class="container">
          <a class="navbar-brand" href="#">Story App</a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#navbarOffcanvas"
          >
            <span class="navbar-toggler-icon"></span>
          </button>

          <div class="offcanvas offcanvas-end bg-primary" id="navbarOffcanvas">
            <div class="offcanvas-header">
              <h5 class="offcanvas-title">Menu</h5>
              <button
                type="button"
                class="btn-close text-reset"
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
              </ul>
            </div>
          </div>
        </div>
      </nav>
    `;
  }
}

customElements.define("nav-app", NavApp);
