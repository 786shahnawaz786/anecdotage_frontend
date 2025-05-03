<template>
  <div>
    <div class="card card-m-5" v-for="book in books" :key="book.id">
      <div class="card-body">
        <div class="container-fluid">
          <div class="row">
            <div class="col-xl-2 col-lg-2 col-md-12 col-sm-12">
              <div class="profile-avatar">
                <img :title="book.title" :alt="book.title" class="profile-img lazyLoad"
                  :src="book.cover_image_url || 'https://default-image-url.jpg'" />
              </div>
            </div>
            <div class="col-xl-9 col-lg-9 col-md-12 col-sm-12 mt-3 book-list">
              <div class="profile-description">
                <h2 class="profile-name">
                  <span>#{{ book.book_number }}</span>
                </h2>
                <h3 class="profile-title">
                  Explore the World of Books: {{ book.title }}
                  <span style="color: #565959; font-weight: lighter">
                    - {{ formatPublisherDate(book.publisher_date) }}
                  </span>
                </h3>
                <h5>
                  by <span style="color: #007185;">{{ book.author_name }}</span> (Author)
                </h5>
                <p class="profile-desc">{{ book.main_subject }}</p>
                <p class="profile-desc">{{ book.description }}</p>
              </div>
              <div class="profile-buttons">
                <button class="btn btn-sm follow-btn" @click="showModal(book, 'pdf')">
                  Download PDF
                </button>
                <button class="btn btn-sm follow-btn" @click="showModal(book, 'text')">
                  Download TEXT
                </button>
                <button class="btn btn-sm follow-btn" @click="showModal(book, 'epub')">
                  Download EPUB
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <div v-if="isModalVisible" class="modal" @click="closeModal">
      <div class="modal-content" @click.stop>
        <h3>Download Book</h3>
        <input v-model="inputText" type="text" placeholder="Enter Download Pin or Master Key" class="modal-input" />

        <button @click="downloadBook" class="btn btn-sm follow-btn" :disabled="isDownloading">
          <span v-if="isDownloading">Downloading...</span>
          <span v-else>Download Now</span>
        </button>

        <!-- Loader -->
        <div v-if="isDownloading" class="loader"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      books: [], // List of books fetched from API
      isModalVisible: false, // Controls modal visibility
      inputText: '', // Model for download pin input
      selectedBook: null, // Stores the selected book
      selectedFormat: '', // Stores the selected format (pdf, text, epub)
      isDownloading: false, // Controls the download loader
    };
  },
  mounted() {
    this.fetchBooks(); // Fetch books when component mounts
  },
  methods: {
    async fetchBooks() {
      try {
        const response = await fetch('https://anecdotage.com/api/books');
        const data = await response.json();
        if (data.books) {
          this.books = data.books;
        } else {
          console.error('Books data not found');
        }
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    },

    formatPublisherDate(date) {
      const options = { year: 'numeric', month: 'short', day: 'numeric' };
      return new Date(date).toLocaleDateString('en-US', options);
    },

    showModal(book, format) {
      this.selectedBook = book;
      this.selectedFormat = format;
      this.isModalVisible = true;
    },

    closeModal() {
      this.isModalVisible = false;
      this.inputText = '';
      this.isDownloading = false; // Reset download state on modal close
    },

    async downloadBook() {
      if (this.inputText.trim() === '') {
        alert('Please enter a valid Download Pin or Master Key.');
        return;
      }

      try {
        this.isDownloading = true; // Show loader
        let downloadUrl = '';

        switch (this.selectedFormat) {
          case 'pdf':
            downloadUrl = `https://anecdotage.com/api/downloadbooks/${this.inputText}`;
            break;
          case 'text':
            downloadUrl = `https://anecdotage.com/api/downloadbookstext/${this.inputText}`;
            break;
          case 'epub':
            downloadUrl = `https://anecdotage.com/api/downloadbooksepub/${this.inputText}`;
            break;
          default:
            alert('Invalid format selected');
            this.isDownloading = false;
            return;
        }

        const response = await fetch(downloadUrl, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
          const fileBlob = await response.blob();
          const fileURL = window.URL.createObjectURL(fileBlob);
          const link = document.createElement('a');

          let fileExtension = this.selectedFormat === 'text' ? 'txt' : this.selectedFormat;
          link.href = fileURL;
          link.download = `${this.selectedBook.title}.${fileExtension}`;
          link.click();

          this.closeModal();
        } else {
          const data = await response.json();
          alert(data.error || 'An error occurred during download.');
        }
      } catch (error) {
        console.error('Error downloading the book:', error);
      } finally {
        this.isDownloading = false; // Hide loader
      }
    },
  },
};
</script>

<style scoped>
/* Loader */
.loader {
  margin: 10px auto;
  border: 8px solid #f3f3f3;
  border-top: 8px solid #ed7d30;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Modal */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
  text-align: center;
}

.modal-input {
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ddd;
  border-radius: 4px;
}



.modal button:disabled {
  background-color: #c56b2f;
  cursor: not-allowed;
}

.modal button:hover:not(:disabled) {
  background-color: #c56b2f;
}

/* Your existing styles */
.profile-header {
  margin: 30px auto;
  display: flex;
  align-items: center;
  margin-top: 10px;
  margin-bottom: 0;
}

.profile-name {
  font-size: 36px;
  font-weight: 500;
  line-height: 40px;
}

.profile-name span {
  color: #ed7d30;
}

.profile-description {
  margin: 0;
  /* Remove margin above the title */
}

.profile-title {
  font-size: 24px !important;
  line-height: 32px !important;
  font-weight: 400 !important;
  color: #0f1111;
  font-family: 'Amazon Ember', Arial, sans-serif;
  margin-top: 0;
  /* Remove any top margin on the title itself */
  margin-bottom: 6px;
}

.profile-desc {
  font-size: 14px;
  line-height: 20px;
  color: #555;
  margin-top: 6px;
  font-family: 'Amazon Ember', Arial, sans-serif;
}

.profile-buttons {
  padding: 10px 0;
}

.profile-img {
  width: 220px;
  height: 320px;
  padding: 3px;
  border: 2px solid #ed7d30;
  display: block;
}
@media screen and (max-width: 768px) {
  .profile-img {
    width: 100%;
    height: auto;
    }
}
.follow-btn {
  width: 240px;
  margin-top: 12px;
  background-color: #ed7d30;
  color: white;
  padding: 8px;
}

@media screen and (max-width: 768px) {
  .follow-btn {
    width: 100%;
    margin-top: 12px;
    }
}


.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
  text-align: center;
}

.modal-input {
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.modal button {
  width: 100%;
  padding: 8px 20px;
  border: none;
  background-color: #ed7d30;
  color: white;
  cursor: pointer;
}

.modal button:hover {
  background-color: #c56b2f;
}

.book-list{
  margin-left: 0;
}

@media screen and (min-width: 1300px) and (max-width: 1400px) {
    .book-list {
      margin-left: 16px;
    }
}
@media screen and (min-width: 1200px) and (max-width: 1300px) {
    .book-list {
      margin-left: 32px;
    }
}
@media screen and (min-width: 1100px) and (max-width: 1200px) {
    .book-list {
      margin-left: 48px;
    }
}
@media screen and (min-width: 1050px) and (max-width: 1100px) {
    .book-list {
      margin-left: 64px;
    }
}
@media screen and (min-width: 992px) and (max-width: 1050px) {
    .book-list {
        margin-left: 72px;
    }
}

@media screen and (max-width: 991px) {
    .book-list {
      margin-left: 0;
    }
}

</style>
