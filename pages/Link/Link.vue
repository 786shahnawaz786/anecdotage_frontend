<template>
  <div class="container mt-5">
    <h1 class="text-center mb-4">Link Manager</h1>

    <!-- Form to add a new link -->
    <div class="card mb-4 shadow-sm">
      <div class="card-body">
        <h5 class="card-title">Add a New Link</h5>
        <form @submit.prevent="addLink" class="row g-3">
          <div class="col-md-10">
            <input
              v-model="newLink"
              type="url"
              class="form-control"
              placeholder="Enter a valid URL"
              required
            />
          </div>
          <div class="col-md-2">
            <button type="submit" class="btn btn-primary w-100">Add Link</button>
          </div>
        </form>
      </div>
    </div>

    <!-- Display all links in a table -->
    <div class="card shadow-sm">
      <div class="card-body">
        <h5 class="card-title">All Links</h5>
        <table class="table table-striped table-hover">
          <thead>
          <tr>
            <th>ID</th>
            <th>Link</th>
            <th>Actions</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="link in links" :key="link.id">
            <td>{{ link.id }}</td>
            <td>{{ link.link }}</td>
            <td>
              <button
                @click="openUpdateModal(link.id, link.link)"
                class="btn btn-sm btn-warning me-2"
              >
                Update
              </button>
              <button
                @click="deleteLink(link.id)"
                class="btn btn-sm btn-danger"
              >
                Delete
              </button>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Modal for Update -->
    <div
      class="modal fade"
      id="updateModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="updateModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="updateModalLabel">Update Link</h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="updateLink">
              <input type="hidden" v-model="updateLinkId" />
              <div class="mb-3">
                <label for="updateLinkInput" class="form-label">New URL</label>
                <input
                  v-model="updateLinkInput"
                  type="url"
                  class="form-control"
                  placeholder="Enter the new URL"
                  required
                />
              </div>
              <button type="submit" class="btn btn-primary w-100">Save Changes</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  middleware: 'auth',
  mounted() {
    if (!this.$auth.loggedIn || this.$auth.user.email !== 'kakooljay@gmail.com') {
      this.$router.push('/')
    }
    this.fetchLinks();
  },
  data() {
    return {
      newLink: '',
      updateLinkId: null,
      updateLinkInput: '',
      links: [],
      API_URL: "https://anecdotage.com/api/links",
    };
  },
  methods: {
    // Fetch all links from the API
    async fetchLinks() {
      try {
        const response = await fetch(this.API_URL);
        if (!response.ok) throw new Error('Failed to fetch links.');
        this.links = await response.json();
      } catch (error) {
        console.error("Error fetching links:", error);
        this.showAlert("Error fetching links. Please try again later.");
      }
    },

    // Add a new link to the database
    async addLink() {
      if (!this.newLink) return;

      try {
        const response = await fetch(this.API_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ link: this.newLink }),
        });

        if (response.ok) {
          this.showAlert("Link added successfully!");
          this.newLink = '';
          this.fetchLinks();
        } else {
          const errorData = await response.json();
          console.error("Failed add response:", errorData); // Log for debugging
          this.showAlert("Failed to add link: " + (errorData.message || "Unknown error"));
        }
      } catch (error) {
        console.error("Error adding link:", error);
        this.showAlert("Failed to add link. Check the API connection.");
      }
    },

    // Open the update modal with current link info
    openUpdateModal(id, currentLink) {
      this.updateLinkId = id;
      this.updateLinkInput = currentLink;
      console.log("Modal opened with:", id, currentLink);  // Log for debugging

      // Show the modal using Bootstrap 4 modal method
      $('#updateModal').modal('show');
    },

    // Update an existing link
    async updateLink() {
      if (!this.updateLinkInput) return;

      try {
        const response = await fetch(`${this.API_URL}/${this.updateLinkId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ link: this.updateLinkInput }),
        });

        if (response.ok) {
          this.showAlert("Link updated successfully!");
          this.fetchLinks();
          this.closeModal();
        } else {
          const errorData = await response.json();
          console.error("Failed update response:", errorData); // Log for debugging
          this.showAlert("Failed to update link: " + (errorData.message || "Unknown error"));
        }
      } catch (error) {
        console.error("Error updating link:", error);
        this.showAlert("Failed to update link. Check the API connection.");
      }
    },

    // Delete a link
    async deleteLink(id) {
      const confirmDelete = confirm("Are you sure you want to delete this link?");
      if (confirmDelete) {
        try {
          const response = await fetch(`${this.API_URL}/${id}`, {
            method: "DELETE",
          });

          if (response.ok) {
            this.showAlert("Link deleted successfully!");
            this.fetchLinks();
          } else {
            const errorData = await response.json();
            console.error("Failed delete response:", errorData); // Log for debugging
            this.showAlert("Failed to delete link: " + (errorData.message || "Unknown error"));
          }
        } catch (error) {
          console.error("Error deleting link:", error);
          this.showAlert("Failed to delete link. Check the API connection.");
        }
      }
    },

    // Display alert messages
    showAlert(message) {
      alert(message);
    },

    // Close the modal after update
    closeModal() {
      // Close the modal using Bootstrap 4 method
      $('#updateModal').modal('hide');
    },
  },
};
</script>

<style scoped>
/* Custom styles for better presentation */
</style>
