<template>
  <div class="container my-5">
    <div class="card shadow-lg rounded-lg p-4">
      <h1 class="text-center mb-4">Database Tables</h1>
      <div class="card-body">

        <!-- Dropdown above the table -->
        <div class="dropdown mb-4">
          <button class="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Select Table
          </button>
          <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <!-- Dynamically populate dropdown items -->
            <a
              class="dropdown-item"
              v-for="(table, index) in tables"
              :key="index"
              href="#"
              @click.prevent="selectTable(table.name)"
            >
              {{ table.name }}
            </a>
          </div>
        </div>

        <!-- Table -->
        <table class="table table-responsive table-striped table-bordered table-hover" v-if="selectedTableData.length > 0">
          <thead class="thead-dark">
          <tr>
            <th v-for="(column, index) in columnNames" :key="index" scope="col">{{ column }}</th>
          </tr>
          </thead>
          <tbody>
          <!-- Loop through table data and display it in the table -->
          <tr v-for="(row, index) in selectedTableData" :key="index">
            <td v-for="(value, key) in row" :key="key">{{ value }}</td>
          </tr>
          </tbody>
        </table>

        <div v-else>
          <p class="text-center">Please select a table to view its data.</p>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'backup',
  data() {
    return {
      tables: [],  // Store tables fetched from the API
      selectedTableData: [],  // Store the data of the selected table
      columnNames: [],  // Store the column names of the selected table
    };
  },
  mounted() {
    this.fetchTables();
  },
  methods: {
    // Fetch the list of available tables
    async fetchTables() {
      try {
        const response = await axios.get('https://anecdotage.com/api/tables');
        this.tables = response.data;  // Populate the tables array with the API response
      } catch (error) {
        console.error('Error fetching tables:', error);
      }
    },

    // Fetch data for the selected table
    async selectTable(tableName) {
      try {
        const response = await axios.get(`https://anecdotage.com/api/tables/${tableName}`);
        this.selectedTableData = response.data;  // Store the table data
        this.columnNames = response.data.length > 0 ? Object.keys(response.data[0]) : [];  // Get column names from the first row
      } catch (error) {
        console.error('Error fetching table data:', error);
        this.selectedTableData = [];
      }
    },
  },
};
</script>

<style scoped>
/* Add scroll functionality for the dropdown menu */
.dropdown-menu {
  max-height: 200px; /* Adjust the height for your needs */
  overflow-y: auto;  /* Enable vertical scroll */
  width: 100%; /* Optional: to make sure the dropdown is wide enough */
}
</style>
