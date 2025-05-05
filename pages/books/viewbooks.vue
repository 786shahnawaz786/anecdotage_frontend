<template>
  <div class="container my-5">
    <div class="card shadow-lg rounded-lg p-4">
      <div class="d-flex justify-content-between align-items-center mb-4">
        <h1 style="font-size: 50px;" class="text-left mb-0 ml-4">Books</h1>
        <nuxt-link class="btn btn-primary btn-lg mr-4" :to="{ name: 'books-create' }">
          Add Books
        </nuxt-link>
      </div>

      <div class="card-body">
        <div class="table-responsive">
          <table class="table table-striped table-bordered table-hover">
            <thead class="thead-dark">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Image</th>
                <th class="text-left" scope="col">Title</th>
                <th class="text-left" scope="col">Description</th>
                <th class="text-left" scope="col">Author</th>
                <th class="text-left" scope="col">Book#</th>
                <th class="text-center" scope="col">Publish at</th>
                <th class="text-center" scope="col">Download Pin</th>
                <th class="text-center" scope="col">Downloads</th>
                <th class="text-center" scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="book in books" :key="book.id">
                <th scope="row">{{ book.id }}</th>
                <td>
                  <img :src="book.cover_image" alt="Cover Image" class="img-thumbnail" 
                       v-if="book.cover_image" style="max-width: 100px;" />
                  <span v-else class="text-muted">No Image</span>
                </td>
                <td class="text-left">
                  <span v-if="!book.isTitleExpanded">{{ truncateText(book.title, 30) }}</span>
                  <span v-else>{{ book.title }}</span>
                  <a href="#" @click.prevent="toggleReadMore(book, 'title')" 
                     v-if="book.title.length > 30" class="text-primary">Read More</a>
                </td>
                <td class="text-left">
                  <span v-if="!book.isDescriptionExpanded">{{ truncateText(book.main_subject, 50) }}</span>
                  <span v-else>{{ book.main_subject }}</span>
                  <a href="#" @click.prevent="toggleReadMore(book, 'description')" 
                     v-if="book.main_subject.length > 50" class="text-primary">Read More</a>
                </td>
                <td class="text-left">{{ book.author_name }}</td>
                <td class="text-left">{{ book.book_number }}</td>
                <td class="text-center">{{ formatDate(book.publisher_date) }}</td>
                <td class="text-center">{{ book.DownloadPin }}</td>
                <td class="d-flex justify-content-center flex-wrap gap-1">
                  <button @click="openDownloadModal(book.id, 'pdf')" 
                          v-if="book.file_attachment_pdf" 
                          class="btn btn-sm btn-info mx-1">
                    <i class="fas fa-download"></i> PDF
                  </button>
                  <button @click="openDownloadModal(book.id, 'epub')" 
                          v-if="book.file_attachment_epub" 
                          class="btn btn-sm btn-info mx-1">
                    <i class="fas fa-download"></i> EPUB
                  </button>
                  <button @click="openDownloadModal(book.id, 'txt')" 
                          v-if="book.file_attachment_txt" 
                          class="btn btn-sm btn-info mx-1">
                    <i class="fas fa-download"></i> TXT
                  </button>
                  <span v-if="!book.file_attachment_pdf && !book.file_attachment_epub && !book.file_attachment_txt" 
                        class="text-muted">No Files</span>
                </td>
                <td class="text-center">
                  <div style="display: flex; gap: 10px; justify-content: center;">
                    <button @click="editBook(book)" class="btn btn-sm btn-warning">
                      <i class="fas fa-edit"></i> Edit
                    </button>
                    <button @click="deleteBook(book.id)" class="btn btn-sm btn-danger">
                      <i class="fas fa-trash-alt"></i> Del
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <div v-if="showModal" class="modal" style="display: block;">
      <div class="modal-dialog modal-dialog-scrollable" style="max-width: 90%; width: auto;">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Edit Book</h5>
            <button type="button" class="close" @click="closeModal">
              <span>×</span>
            </button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="updateBook">
              <div class="form-group">
                <label for="title">Title</label>
                <input type="text" id="title" class="form-control" v-model="selectedBook.title" required />
              </div>
              <div class="form-group">
                <label for="description">Description</label>
                <textarea id="description" class="form-control" v-model="selectedBook.main_subject" required></textarea>
              </div>
              <div class="form-group">
                <label for="book-number">Book Number</label>
                <input type="text" id="book-number" class="form-control" v-model="selectedBook.book_number" required />
              </div>
              <div class="form-group">
                <label for="author">Author</label>
                <input type="text" id="author" class="form-control" v-model="selectedBook.author_name" required />
              </div>
              <div class="form-group">
                <label for="publisher-date">Publisher Date</label>
                <input type="date" id="publisher-date" class="form-control" v-model="selectedBook.publisher_date" required />
              </div>
              <div class="form-group">
                <label for="download-pin">Download Pin</label>
                <input type="text" id="download-pin" class="form-control" v-model="selectedBook.DownloadPin" required />
              </div>
              <div class="form-group">
                <label for="cover-image">Cover Image</label>
                <input type="file" id="cover-image" class="form-control" @change="handleCoverImageChange" accept="image/*" />
                <p v-if="selectedBook.cover_image">Current: <img :src="selectedBook.cover_image" alt="Current Cover" width="50" /></p>
              </div>
              <div class="form-group">
                <label for="file-attachment-pdf">PDF Attachment</label>
                <input type="file" id="file-attachment-pdf" class="form-control" @change="handleFileChange($event, 'pdf')" accept=".pdf" />
                <p v-if="selectedBook.file_attachment_pdf">Current: <a :href="selectedBook.file_attachment_pdf" target="_blank">PDF File</a></p>
              </div>
              <div class="form-group">
                <label for="file-attachment-epub">EPUB Attachment</label>
                <input type="file" id="file-attachment-epub" class="form-control" @change="handleFileChange($event, 'epub')" accept=".epub" />
                <p v-if="selectedBook.file_attachment_epub">Current: <a :href="selectedBook.file_attachment_epub" target="_blank">EPUB File</a></p>
              </div>
              <div class="form-group">
                <label for="file-attachment-txt">TXT Attachment</label>
                <input type="file" id="file-attachment-txt" class="form-control" @change="handleFileChange($event, 'txt')" accept=".txt" />
                <p v-if="selectedBook.file_attachment_txt">Current: <a :href="selectedBook.file_attachment_txt" target="_blank">TXT File</a></p>
              </div>
              <button type="submit" class="btn btn-primary">Update Book</button>
            </form>
          </div>
        </div>
      </div>
    </div>

    <!-- Download Modal -->
    <div v-if="showDownloadModal" class="modal" style="display: block;">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Enter Download PIN</h5>
            <button type="button" class="close" @click="closeDownloadModal">
              <span>×</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <label for="download-pin">PIN</label>
              <input type="text" id="download-pin" class="form-control" v-model="downloadPin" required>
            </div>
            <button @click="downloadBook" class="btn btn-primary">Download</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      books: [],
      showModal: false,
      selectedBook: {},
      showDownloadModal: false,
      downloadPin: '',
      selectedBookId: null,
      selectedFileType: '',
    };
  },
  mounted() {
    this.fetchBooks();
  },
  methods: {
    async fetchBooks() {
      try {
        const response = await axios.get("https://anecdotage.com/api/books");
        this.books = response.data.books.map(book => ({
          ...book,
          isTitleExpanded: false,
          isDescriptionExpanded: false
        }));
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    },

    formatDate(date) {
      return new Date(date).toLocaleDateString();
    },

    truncateText(text, length) {
      const screenWidth = window.innerWidth;
      const truncatedLength = screenWidth <= 768 ? 20 : length;
      return text.length > truncatedLength ? text.substring(0, truncatedLength) + '...' : text;
    },

    toggleReadMore(book, field) {
      book[`is${field.charAt(0).toUpperCase() + field.slice(1)}Expanded`] = 
        !book[`is${field.charAt(0).toUpperCase() + field.slice(1)}Expanded`];
    },

    editBook(book) {
      this.selectedBook = { ...book };
      if (this.selectedBook.publisher_date) {
        this.selectedBook.publisher_date = new Date(book.publisher_date).toISOString().split('T')[0];
      }
      this.showModal = true;
    },

    closeModal() {
      this.showModal = false;
    },

    handleCoverImageChange(event) {
      const file = event.target.files[0];
      if (file) this.selectedBook.cover_image = file;
    },

    handleFileChange(event, type) {
      const file = event.target.files[0];
      if (file) {
        this.selectedBook[`file_attachment_${type}`] = file;
      }
    },

    async updateBook() {
      const formData = new FormData();
      formData.append("title", this.selectedBook.title);
      formData.append("main_subject", this.selectedBook.main_subject);
      formData.append("book_number", this.selectedBook.book_number);
      formData.append("author_name", this.selectedBook.author_name);
      formData.append("publisher_date", this.selectedBook.publisher_date);
      formData.append("DownloadPin", this.selectedBook.DownloadPin);

      if (this.selectedBook.cover_image instanceof File) {
        formData.append("cover_image", this.selectedBook.cover_image);
      }
      if (this.selectedBook.file_attachment_pdf instanceof File) {
        formData.append("file_attachment_pdf", this.selectedBook.file_attachment_pdf);
      }
      if (this.selectedBook.file_attachment_epub instanceof File) {
        formData.append("file_attachment_epub", this.selectedBook.file_attachment_epub);
      }
      if (this.selectedBook.file_attachment_txt instanceof File) {
        formData.append("file_attachment_txt", this.selectedBook.file_attachment_txt);
      }

      try {
        const response = await axios.post(
          `https://anecdotage.com/api/books/${this.selectedBook.id}`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );

        if (response.status === 200) {
          const updatedBook = response.data.book;
          const bookIndex = this.books.findIndex((book) => book.id === updatedBook.id);
          this.books.splice(bookIndex, 1, { ...updatedBook, isTitleExpanded: false, isDescriptionExpanded: false });
          this.closeModal();
        }
      } catch (error) {
        console.error("Error updating book:", error);
      }
    },

    async deleteBook(id) {
      if (confirm("Are you sure you want to delete this book?")) {
        try {
          await axios.delete(`https://anecdotage.com/api/books/${id}`);
          this.books = this.books.filter((book) => book.id !== id);
        } catch (error) {
          console.error("Error deleting book:", error);
        }
      }
    },

    openDownloadModal(bookId, fileType) {
      this.selectedBookId = bookId;
      this.selectedFileType = fileType;
      this.showDownloadModal = true;
      this.downloadPin = '';
    },

    closeDownloadModal() {
      this.showDownloadModal = false;
      this.selectedBookId = null;
      this.selectedFileType = '';
    },

    async downloadBook() {
      if (!this.downloadPin) {
        alert('Please enter a valid PIN.');
        return;
      }
      try {
        const response = await axios.get(`https://anecdotage.com/api/downloadFile/${this.selectedBookId}/${this.downloadPin}/${this.selectedFileType}`, {
          responseType: 'blob'
        });
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `book.${this.selectedFileType}`);
        document.body.appendChild(link);
        link.click();
        window.URL.revokeObjectURL(url);
        this.closeDownloadModal();
      } catch (error) {
        alert('Invalid PIN . Please try again.');
        console.error(error);
      }
    }
  }
};

</script>

<style scoped>
.gap-1 {
  gap: 0.25rem;
}
</style>