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
          <input type="text" class="form-control" id="name" required />
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

  _compressImage(file) {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        const img = new Image();
        img.src = e.target.result;
        img.onload = () => {
          const canvas = document.createElement("canvas");
          let width = img.width;
          let height = img.height;

          const maxSize = 800;
          if (width > height) {
            if (width > maxSize) {
              height *= maxSize / width;
              width = maxSize;
            }
          } else {
            if (height > maxSize) {
              width *= maxSize / height;
              height = maxSize;
            }
          }

          canvas.width = width;
          canvas.height = height;

          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0, width, height);

          resolve(canvas.toDataURL("image/jpeg", 0.7));
        };
      };
    });
  }

  async _handleSubmit(e) {
    e.preventDefault();
    console.log("Form submitted");

    const form = e.target;

    if (!form.checkValidity()) {
      e.stopPropagation();
      form.classList.add("was-validated");
      return;
    }

    try {
      const name = form.querySelector("#name").value;
      const description = form.querySelector("#description").value;
      const photoFile = form.querySelector("#photo").files[0];

      if (!photoFile) {
        console.error("No photo selected");
        return;
      }

      console.log("Processing photo...");
      const photoUrl = await this._compressImage(photoFile);

      const newStory = {
        id: "story-" + Math.random().toString(36).substr(2, 15),
        name,
        description,
        photoUrl,
        createdAt: new Date().toISOString(),
      };

      console.log("Saving story...", newStory);

      try {
        const existingStories = JSON.parse(
          localStorage.getItem("stories") || "[]"
        );

        existingStories.unshift(newStory);
        localStorage.setItem("stories", JSON.stringify(existingStories));

        form.reset();
        form.classList.remove("was-validated");

        this.dispatchEvent(
          new CustomEvent("story-added", {
            bubbles: true,
            composed: true,
            detail: { story: newStory },
          })
        );

        console.log("Redirecting...");
        window.location.hash = "/";
      } catch (storageError) {
        console.error("Storage error:", storageError);
        alert(
          "Failed to save story. Storage limit reached. Try removing some old stories first."
        );
      }
    } catch (error) {
      console.error("Error in form submission:", error);
    }
  }
}

customElements.define("story-form", StoryForm);
