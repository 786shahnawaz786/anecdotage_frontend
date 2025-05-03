<template>
  <div class="container my-5">
    <div class="card shadow-lg rounded-lg p-4">
      <h1 class="text-center mb-4">Backup Database Dumps</h1>
      <div class="card-body">
        <!-- Backup Buttons -->
        <button @click="createBackup('database')" class="btn btn-primary mb-4 float-right mx-1" :disabled="loading">
          <i class="fas fa-cogs"></i> Database Backup
        </button>

        <button @click="createBackup('public')" class="btn btn-primary mb-4 float-right mx-1" :disabled="loading">
          <i class="fas fa-cogs"></i> Public Backup
        </button>

        <button @click="createBackup('fullproject')" class="btn btn-primary mb-4 float-right mx-1" :disabled="loading">
          <i class="fas fa-cogs"></i> Full Project Backup
        </button>

        <!-- Loading Spinner -->
        <div v-if="loading" class="text-center">
          <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Loading</span>
          </div>
        </div>

        <!-- Backups Table -->
        <table class="table table-striped table-bordered table-hover">
          <thead class="thead-dark">
            <tr>
              <th>#</th>
              <th>Backup File</th>
              <th>Type</th>
              <th class="text-left">Created At</th>
              <th class="text-left">Updated At</th>
              <th class="text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(backup, index) in backups" :key="backup.id">
              <td>{{ index + 1 }}</td>
              <td>{{ backup.filename }}</td>
              <td>{{ backup.type }}</td>
              <td class="text-left">{{ formatDate(backup.created_at) }}</td>
              <td class="text-left">{{ formatDate(backup.updated_at) }}</td>
              <td class="text-center">
                <div style="display: flex; gap: 10px; justify-content: center;">
                  <button class="btn btn-sm btn-primary" @click="downloadBackup(backup.id)">
                    <i class="fas fa-download"></i> Download
                  </button>
                  <button class="btn btn-sm btn-danger" @click="deleteBackup(backup.filename)">
                    <i class="fas fa-trash-alt"></i> Delete
                  </button>
                </div>
              </td>
            </tr>
            <tr v-if="backups.length === 0">
              <td colspan="6" class="text-center">No backups available.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style scoped>
.spinner-border {
  width: 5rem;
  height: 5rem;
}

.mb-4 {
  margin-bottom: 1.5rem;
}

.text-left {
  text-align: left;
}

.text-center {
  text-align: center;
}

.table {
  width: 100%;
  border-collapse: collapse;
}

.table th, .table td {
  padding: 8px;
  text-align: left;
}

.table-striped tbody tr:nth-child(odd) {
  background-color: #f9f9f9;
}

.table-bordered th, .table-bordered td {
  border: 1px solid #ddd;
}
</style>

<script>
import axios from "axios";

export default {
  name: "BackupComponent",

  data() {
    return {
      backups: [], // Stores backup data
      loading: false, // Loading state for buttons
    };
  },

  methods: {
    // Fetch all backups
    fetchBackups() {
      axios.get("https://anecdotage.com/api/allbackups")
        .then(response => {
          this.backups = response.data;
        })
        .catch(error => console.error("Error fetching backups:", error));
    },

    // Create a backup
    createBackup(type) {
      let url = type === "database" ? "https://anecdotage.com/api/run-backup"
                : type === "public" ? "https://anecdotage.com/api/backup-public"
                : "https://anecdotage.com/api/Full-project";

      this.loading = true;
      axios.get(url)
        .then(response => {
          alert(response.data.message);
          this.fetchBackups(); // Refresh table
        })
        .catch(error => console.error("Error creating backup:", error))
        .finally(() => this.loading = false);
    },

    // Download a backup
    downloadBackup(id) {
      window.location.href = `https://anecdotage.com/api/backups/download/${id}`;
    },

    // Delete a backup
    deleteBackup(filename) {
      if (confirm("Are you sure you want to delete this backup?")) {
        axios.delete(`https://anecdotage.com/api/backups/delete/${filename}`)
          .then(response => {
            alert(response.data.message);
            this.fetchBackups(); // Refresh table
          })
          .catch(error => console.error("Error deleting backup:", error));
      }
    },

    // Format date for display
    formatDate(dateString) {
      const options = { year: "numeric", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" };
      return new Date(dateString).toLocaleDateString(undefined, options);
    }
  },

  mounted() {
    this.fetchBackups(); // Fetch backups when component loads
  }
};
</script>
