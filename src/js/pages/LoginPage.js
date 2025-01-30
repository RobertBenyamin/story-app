import { LitElement, html } from "lit";
import Auth from "../network/auth";
import Utils from "../utils/utils";
import Config from "../config/config";

class LoginPage extends LitElement {
  static properties = {
    errorMessage: { type: String },
    isLoading: { type: Boolean },
  };

  constructor() {
    super();
    this.errorMessage = "";
    this.isLoading = false;
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
              <h2 class="text-center mb-4">Login</h2>
              ${this.errorMessage
                ? html`
                    <div class="alert alert-danger">${this.errorMessage}</div>
                  `
                : ""}
              <form @submit=${this._handleSubmit}>
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
                  <input
                    type="password"
                    class="form-control"
                    id="password"
                    required
                    minlength="8"
                  />
                </div>
                <button
                  type="submit"
                  class="btn btn-primary w-100"
                  ?disabled=${this.isLoading}
                >
                  ${this.isLoading ? "Loading..." : "Login"}
                </button>
              </form>
              <p class="text-center mt-3">
                Don't have an account? <a href="#/register">Register</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  async _handleSubmit(e) {
    e.preventDefault();
    this.isLoading = true;
    this.errorMessage = "";

    try {
      const email = e.target.email.value;
      const password = e.target.password.value;

      const response = await Auth.login({ email, password });
      const { token } = response.data.loginResult;

      Utils.setUserToken(Config.USER_TOKEN_KEY, token);
      window.location.hash = "#/";
    } catch (error) {
      this.errorMessage = error.response?.data?.message || "Login failed";
    } finally {
      this.isLoading = false;
    }
  }
}

customElements.define("login-page", LoginPage);
