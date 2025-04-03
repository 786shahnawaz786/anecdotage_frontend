<template>
  <div>
    <div class="card card-m-5" v-for="book in books" :key="book.id">
      <div class="card-body">
        <div class="container-fluid">
          <div class="row">
            <div class="col-xl-2 col-lg-2 col-md-12 col-sm-12">
              <div class="profile-avatar">
                <img
                  :title="book.title"
                  :alt="book.title"
                  class="profile-img lazyLoad"
                  :src="book.cover_image || 'https://default-image-url.jpg'"
                  @error="handleImageError"
                />
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
                  by <span style="color: #007185;">{{ book.author_name || 'Unknown Author' }}</span> (Author)
                </h5>
                <p class="profile-desc">{{ book.main_subject || 'No subject available' }}</p>
                <p class="profile-desc">{{ book.description || 'No description available' }}</p>
              </div>
              <div class="profile-buttons">
                <button
                  class="btn btn-sm follow-btn"
                  :class="{ 'disabled-btn': !book.file_attachment_pdf }"
                  :disabled="!book.file_attachment_pdf"
                  @click="showModal(book, 'pdf')">
                  Download PDF
                </button>
                <button
                  class="btn btn-sm follow-btn"
                  :class="{ 'disabled-btn': !book.file_attachment_txt }"
                  :disabled="!book.file_attachment_txt"
                  @click="showModal(book, 'txt')">
                  Download TEXT
                </button>
                <button
                  class="btn btn-sm follow-btn"
                  :class="{ 'disabled-btn': !book.file_attachment_epub }"
                  :disabled="!book.file_attachment_epub"
                  @click="showModal(book, 'epub')">
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
        <input
          v-model="inputText"
          type="text"
          placeholder="Enter Download Pin or Master Key"
          class="modal-input"
          :disabled="isDownloading"
          @keyup.enter="downloadBook"
        />
        <button
          @click="downloadBook"
          class="btn btn-sm follow-btn"
          :disabled="isDownloading">
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
      books: [],
      isModalVisible: false,
      inputText: '',
      selectedBook: null,
      selectedFormat: '',
      isDownloading: false,
      retryAttempts: 0,
      maxRetryAttempts: 3
    };
  },
  mounted() {
    this.fetchBooks();
  },
  methods: {
    async fetchBooks() {
      try {
        const response = await fetch('https://anecdotage.com/api/books', {
          headers: { 'Content-Type': 'application/json' },
          timeout: 10000 // 10 seconds timeout
        });

        if (!response.ok) {
          throw new Error(`Server error: ${response.status}`);
        }

        const data = await response.json();

        if (!data.books) {
          throw new Error('No books data received from server');
        }

        this.books = data.books.map(book => ({
          ...book,
          cover_image: book.cover_image || '',
          author_name: book.author_name || 'Unknown Author',
          main_subject: book.main_subject || '',
          description: book.description || '',
          file_attachment_pdf: book.file_attachment_pdf || '',
          file_attachment_txt: book.file_attachment_txt || '',
          file_attachment_epub: book.file_attachment_epub || ''
        }));

        if (this.books.length === 0) {
          alert('No books available at the moment.');
        }
      } catch (error) {
        console.error('Error fetching books:', error);
        this.handleFetchError(error);
      }
    },

    handleFetchError(error) {
      this.retryAttempts++;
      const message = this.retryAttempts < this.maxRetryAttempts
        ? `${error.message}. Attempt ${this.retryAttempts} of ${this.maxRetryAttempts}. Would you like to retry?`
        : 'Maximum retry attempts reached. Please try again later or contact support.';

      if (this.retryAttempts < this.maxRetryAttempts) {
        if (confirm(message)) {
          this.fetchBooks();
        }
      } else {
        alert(message);
      }
    },

    formatPublisherDate(date) {
      try {
        if (!date) return 'Date unavailable';
        const parsedDate = new Date(date);
        if (isNaN(parsedDate.getTime())) throw new Error('Invalid date');
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return parsedDate.toLocaleDateString('en-US', options);
      } catch (error) {
        console.warn('Date formatting error:', error);
        return 'Date unavailable';
      }
    },

    showModal(book, format) {
      this.selectedBook = book;
      this.selectedFormat = format;
      this.isModalVisible = true;
      this.inputText = '';
    },

    closeModal() {
      this.isModalVisible = false;
      this.inputText = '';
      this.isDownloading = false;
    },

    async downloadBook() {
      if (!this.inputText.trim()) {
        alert('Please enter a valid Download Pin or Master Key.');
        return;
      }

      this.isDownloading = true;

      try {
        const downloadUrl = this.getDownloadUrl();
        if (!downloadUrl) {
          throw new Error('Invalid download format selected');
        }

        const response = await fetch(downloadUrl, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
          timeout: 15000 // 15 seconds timeout
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Download failed');
        }

        await this.handleDownloadSuccess(response);
      } catch (error) {
        this.handleDownloadError(error);
      } finally {
        this.isDownloading = false;
      }
    },

    getDownloadUrl() {
      const baseUrl = 'https://anecdotage.com/api';
      const bookId = this.selectedBook.id;
      const pin = this.inputText;
      return `${baseUrl}/downloadFile/${bookId}/${pin}/${this.selectedFormat}`;
    },

    async handleDownloadSuccess(response) {
      try {
        const fileBlob = await response.blob();
        const fileURL = window.URL.createObjectURL(fileBlob);
        const link = document.createElement('a');
        const fileExtension = this.selectedFormat;

        link.href = fileURL;
        link.download = `${this.selectedBook.title}.${fileExtension}`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(fileURL);

        this.closeModal();
      } catch (error) {
        alert('Error processing download: ' + error.message);
      }
    },

    handleDownloadError(error) {
      console.error('Download error:', error);
      const message = error.message.includes('timeout')
        ? 'Download timed out. Please check your connection and try again.'
        : 'Provided pin is invalid';
      alert(message);
    },

    handleImageError(event) {
      event.target.src = 'https://default-image-url.jpg';
    }
  }
};
</script>

<style scoped>
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

.follow-btn {
  width: 240px;
  margin-top: 12px;
  background-color: #ed7d30;
  color: white;
  padding: 8px;
}

.disabled-btn {
  background-color: #cccccc;
  cursor: not-allowed;
  opacity: 0.6;
}

.follow-btn:not(.disabled-btn):hover {
  background-color: #c56b2f;
}

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
}

.profile-title {
  font-size: 24px !important;
  line-height: 32px !important;
  font-weight: 400 !important;
  color: #0f1111;
  font-family: 'Amazon Ember', Arial, sans-serif;
  margin-top: 0;
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

  .follow-btn {
    width: 100%;
    margin-top: 12px;
  }
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