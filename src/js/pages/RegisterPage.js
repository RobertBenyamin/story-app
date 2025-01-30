import { LitElement, html } from "lit";
import Auth from "../network/auth";

class RegisterPage extends LitElement {
  static properties = {
    errorMessage: { type: String },
    isLoading: { type: Boolean },
    showPassword: { type: Boolean },
  };

  constructor() {
    super();
    this.errorMessage = "";
    this.isLoading = false;
    this.showPassword = false;
  }

  createRenderRoot() {
    return this;
  }

  render() {
    return html`
      <div class="row justify-content-center">
        <div class="col-md-6">
          <div class="card mt-5">
            <div class="card-body">
              <h2 class="text-center mb-4">Register</h2>
              ${this.errorMessage
                ? html`
                    <div class="alert alert-danger">${this.errorMessage}</div>
                  `
                : ""}
              <form @submit=${this._handleSubmit}>
                <div class="mb-3">
                  <label for="name" class="form-label">Name</label>
                  <input type="text" class="form-control" id="name" required />
                </div>
                <div class="mb-3">
                  <label for="email" class="form-label">Email</label>
                  <input
                    type="email"
                    class="form-control"
                    id="email"
                    required
                  />
                </div>
                <div class="mb-3">
                  <label for="password" class="form-label">Password</label>
                  <div class="input-group">
                    <input
                      type="${this.showPassword ? "text" : "password"}"
                      class="form-control"
                      id="password"
                      required
                      minlength="8"
                    />
                    <button
                      class="btn btn-outline-secondary"
                      type="button"
                      @click=${this._togglePassword}
                    >
                      <i
                        class="bi ${this.showPassword
                          ? "bi-eye-slash"
                          : "bi-eye"}"
                        style="cursor: pointer; z-index: 100;"
                      ></i>
                    </button>
                  </div>
                </div>
                <button
                  type="submit"
                  class="btn btn-primary w-100"
                  ?disabled=${this.isLoading}
                >
                  ${this.isLoading ? "Loading..." : "Register"}
                </button>
              </form>
              <p class="text-center mt-3">
                Already have an account? <a href="#/login">Login</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  _togglePassword() {
    this.showPassword = !this.showPassword;
  }

  async _handleSubmit(e) {
    e.preventDefault();
    this.isLoading = true;
    this.errorMessage = "";

    try {
      const name = e.target.name.value;
      const email = e.target.email.value;
      const password = e.target.password.value;

      await Auth.register({ name, email, password });
      window.location.hash = "#/login";
    } catch (error) {
      this.errorMessage =
        error.response?.data?.message || "Registration failed";
    } finally {
      this.isLoading = false;
    }
  }
}

customElements.define("register-page", RegisterPage);
