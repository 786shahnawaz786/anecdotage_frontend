<template>
  <div class="container my-5">
    <div class="card shadow-lg rounded-lg p-4">
      <div class="d-flex justify-content-between align-items-center mb-4">
        <h1 style="font-size: 50px;" class="text-left mb-0 ml-4">Books</h1>
        <nuxt-link
          class="btn btn-primary btn-lg mr-4"
          :to="{ name: 'books-create' }"
        > Add Books</nuxt-link>
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
                <th class="text-center" scope="col">Downloads</th>
                <th class="text-center" scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="book in books" :key="book.id">
                <th scope="row">{{ book.id }}</th>
                <td>
                  <img :src="book.cover_image_url" alt="Cover Image" class="img-thumbnail" v-if="book.cover_image_url" />
                  <span v-else class="text-muted">No Image</span>
                </td>
                <td class="text-left">
                  <span v-if="!book.isTitleExpanded">{{ truncateText(book.title, 30) }}</span>
                  <span v-else>{{ book.title }}</span>
                  <a href="#" @click.prevent="toggleReadMore(book, 'title')" v-if="book.title.length > 30" class="text-primary">Read More</a>
                </td>
                <td class="text-left">
                  <span v-if="!book.isDescriptionExpanded">{{ truncateText(book.main_subject, 50) }}</span>
                  <span v-else>{{ book.main_subject }}</span>
                  <a href="#" @click.prevent="toggleReadMore(book, 'description')" v-if="book.main_subject.length > 50" class="text-primary">Read More</a>
                </td>
                <td class="text-left">{{ book.author_name }}</td>
                <td class="text-left">{{ book.book_number }}</td>
                <td class="text-center">{{ new Date(book.publisher_date).toLocaleDateString() }}</td>
                <td class="d-flex justify-content-center">
                  <!-- EPUB Download -->
                  <a :href="'https://anecdotage.com/api/admindownloadbooksepub/' + book.id" 
                     v-if="book.file_attachment_url" target="_blank" class="btn btn-sm btn-info mx-1">
                    <i class="fas fa-download"></i> EPUB
                  </a>
                  
                  <!-- TEXT Download -->
                  <a :href="'https://anecdotage.com/api/admindownloadFiletext/' + book.id" 
                     v-if="book.file_attachment_url" target="_blank" class="btn btn-sm btn-info mx-1">
                    <i class="fas fa-download"></i> TEXT
                  </a>
                  
                  <!-- PDF Download (Optional if PDF is available) -->
                  <a :href="book.file_attachment_url" 
                     v-if="book.file_attachment_url" target="_blank" class="btn btn-sm btn-info mx-1">
                    <i class="fas fa-download"></i> PDF
                  </a>
                  
                  <span v-else class="text-muted">No Attachment</span>
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

    <!-- Modal for Editing Book -->
    <div v-if="showModal" class="modal" style="display: block;">
      <div class="modal-dialog modal-dialog-scrollable" style="max-width: 90%; width: auto;">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Edit Book</h5>
            <button type="button" class="close" @click="closeModal">
              <span>&times;</span>
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
                <label for="cover-image">Cover Image</label>
                <input type="file" id="cover-image" class="form-control" @change="handleCoverImageChange" />
                <p v-if="selectedBook.cover_image_url">Current Cover: <img :src="selectedBook.cover_image_url" alt="Current Cover" width="50" /></p>
              </div>
              <div class="form-group">
                <label for="file-attachment">File Attachment</label>
                <input type="file" id="file-attachment" class="form-control" @change="handleFileAttachmentChange" />
                <p v-if="selectedBook.file_attachment_url">Current File: <a :href="selectedBook.file_attachment_url" target="_blank">{{ selectedBook.file_attachment_url.split('/').pop() }}</a></p>
              </div>
              <button type="submit" class="btn btn-primary">Update Book</button>
            </form>
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
    };
  },
  mounted() {
    this.fetchBooks();
  },
  methods: {
    async fetchBooks() {
      try {
        const response = await axios.get("https://anecdotage.com/api/books");
        this.books = response.data.books;
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    },

    truncateText(text, length) {
      const screenWidth = window.innerWidth;
      const truncatedLength = screenWidth <= 768 ? 20 : length; // Shorter text on mobile
      if (text.length > truncatedLength) {
        return text.substring(0, truncatedLength) + '...';
      }
      return text;
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

    async updateBook() {
      const formData = new FormData();
      formData.append("title", this.selectedBook.title);
      formData.append("main_subject", this.selectedBook.main_subject);
      formData.append("book_number", this.selectedBook.book_number);
      formData.append("author_name", this.selectedBook.author_name);
      formData.append("publisher_date", this.selectedBook.publisher_date);

      // Only append cover image if it has changed
      if (this.selectedBook.cover_image) {
        formData.append("cover_image", this.selectedBook.cover_image);
      }

      // Only append file attachment if it has changed
      if (this.selectedBook.file_attachment) {
        formData.append("file_attachment", this.selectedBook.file_attachment);
      }

      try {
        const response = await axios.post(
          `https://anecdotage.com/api/books/${this.selectedBook.id}`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );

        if (response.status === 200) {
          const updatedBook = response.data.book;
          // Ensure the book retains the previous image if no new one was uploaded
          updatedBook.cover_image_url = updatedBook.cover_image_url || this.selectedBook.cover_image_url;

          const bookIndex = this.books.findIndex((book) => book.id === updatedBook.id);
          this.books.splice(bookIndex, 1, updatedBook);
          this.closeModal();
        }
      } catch (error) {
        console.error("Error updating book:", error);
      }
    },

    async deleteBook(id) {
      const confirmDelete = confirm("Are you sure you want to delete this book?");
      if (confirmDelete) {
        try {
          await axios.delete(`https://anecdotage.com/api/books/${id}`);
          this.books = this.books.filter((book) => book.id !== id);
        } catch (error) {
          console.error("Error deleting book:", error);
        }
      }
    },

    handleCoverImageChange(event) {
      const file = event.target.files[0];
      if (file) {
        this.selectedBook.cover_image = file;
      }
    },

    handleFileAttachmentChange(event) {
      const file = event.target.files[0];
      if (file) {
        this.selectedBook.file_attachment = file;
      }
    },

    toggleReadMore(book, field) {
      book[`is${field.charAt(0).toUpperCase() + field.slice(1)}Expanded`] = !book[`is${field.charAt(0).toUpperCase() + field.slice(1)}Expanded`];
    }
  }
};
</script>
