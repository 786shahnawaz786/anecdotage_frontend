<template>
  <div class="container my-5">
    <div class="card shadow-lg rounded p-4">
      <div class="card-header bg-primary text-white text-center rounded-top">
        <h2 class="card-title mb-0">Add Book</h2>
      </div>
      <div class="card-body">
        <form @submit.prevent="submitForm">
          <!-- Title Input -->
          <div class="row mb-3">
            <div class="col-12">
              <div class="form-group">
                <label class="form-label" for="title">Title <span class="text-danger">*</span></label>
                <input
                  id="title"
                  v-model="form.title"
                  class="form-control"
                  placeholder="Enter Book Title"
                  type="text"
                />
                <div v-if="errors.title" class="text-danger">{{ errors.title[0] }}</div>
              </div>
            </div>
          </div>

          <!-- Main Subject Textarea -->
          <div class="row mb-3">
            <div class="col-12">
              <div class="form-group">
                <label class="form-label" for="main_subject">Main Subject <span class="text-danger">*</span></label>
                <textarea
                  id="main_subject"
                  v-model="form.main_subject"
                  class="form-control"
                  placeholder="Enter the Main Subject"
                  rows="5"
                ></textarea>
                <div v-if="errors.main_subject" class="text-danger">{{ errors.main_subject[0] }}</div>
              </div>
            </div>
          </div>

          <!-- Book Number, Author, and Publisher Date -->
          <div class="row mb-3">
            <div class="col-md-4">
              <div class="form-group">
                <label class="form-label" for="book_number">Book Number <span class="text-danger">*</span></label>
                <input
                  id="book_number"
                  v-model="form.book_number"
                  class="form-control"
                  placeholder="Enter Book Number"
                  type="text"
                />
                <div v-if="errors.book_number" class="text-danger">{{ errors.book_number[0] }}</div>
              </div>
            </div>
            <div class="col-md-4">
              <div class="form-group">
                <label class="form-label" for="author_name">Author Name <span class="text-danger">*</span></label>
                <input
                  id="author_name"
                  v-model="form.author_name"
                  class="form-control"
                  placeholder="Enter Author Name"
                  type="text"
                />
                <div v-if="errors.author_name" class="text-danger">{{ errors.author_name[0] }}</div>
              </div>
            </div>
            <div class="col-md-4">
              <div class="form-group">
                <label class="form-label" for="publisher_date">Publisher Date <span class="text-danger">*</span></label>
                <input
                  id="publisher_date"
                  v-model="form.publisher_date"
                  class="form-control"
                  type="date"
                />
                <div v-if="errors.publisher_date" class="text-danger">{{ errors.publisher_date[0] }}</div>
              </div>
            </div>
          </div>

          <!-- File Uploads -->
          <div class="row mb-3">
            <div class="col-md-4">
              <div class="form-group">
                <label class="form-label" for="cover_image">Cover Image <span class="text-danger">*</span></label>
                <input
                  ref="coverImageInput"
                  class="form-control"
                  type="file"
                  @change="handleFileChange('cover_image', $event)"
                />
                <div v-if="errors.cover_image" class="text-danger">{{ errors.cover_image[0] }}</div>
              </div>
            </div>
            <div class="col-md-4">
              <div class="form-group">
                <label class="form-label" for="file_attachment_epub">EPUB File</label>
                <input
                  ref="fileAttachmentEpubInput"
                  class="form-control"
                  type="file"
                  @change="handleFileChange('file_attachment_epub', $event)"
                />
                <div v-if="errors.file_attachment_epub" class="text-danger">{{ errors.file_attachment_epub[0] }}</div>
              </div>
            </div>
            <div class="col-md-4">
              <div class="form-group">
                <label class="form-label" for="file_attachment_pdf">PDF File</label>
                <input
                  ref="fileAttachmentPdfInput"
                  class="form-control"
                  type="file"
                  @change="handleFileChange('file_attachment_pdf', $event)"
                />
                <div v-if="errors.file_attachment_pdf" class="text-danger">{{ errors.file_attachment_pdf[0] }}</div>
              </div>
            </div>
            <div class="col-md-4">
              <div class="form-group">
                <label class="form-label" for="file_attachment_txt">TXT File</label>
                <input
                  ref="fileAttachmentTxtInput"
                  class="form-control"
                  type="file"
                  @change="handleFileChange('file_attachment_txt', $event)"
                />
                <div v-if="errors.file_attachment_txt" class="text-danger">{{ errors.file_attachment_txt[0] }}</div>
              </div>
            </div>
          </div>

          <!-- Download Pin Section -->
          <div class="row mb-3">
            <div class="col-12">
              <div class="form-group">
                <label class="form-label" for="downloadPin">Generated Download Pin <span class="text-danger">*</span></label>
                <input
                  id="downloadPin"
                  v-model="downloadPin"
                  class="form-control"
                  placeholder="Generated Pin will appear here"
                  readonly
                  type="text"
                />
                <div v-if="errors.downloadPin" class="text-danger">{{ errors.downloadPin[0] }}</div>
                <button
                  class="btn btn-success mt-2"
                  type="button"
                  @click="generateDownloadPin"
                >
                  Generate Pin
                </button>
              </div>
            </div>
          </div>

          <!-- Submit Button -->
          <div class="text-left mt-4">
            <button class="btn btn-primary px-4 py-2 shadow-sm" type="submit">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  middleware: ['auth', 'admin'],
  data() {
    return {
      form: {
        title: '',
        main_subject: '',
        book_number: '',
        author_name: '',
        publisher_date: '',
        cover_image: null,
        file_attachment_epub: null,
        file_attachment_pdf: null,
        file_attachment_txt: null
      },
      errors: {},
      downloadPin: ''
    };
  },
  methods: {
    async generateDownloadPin() {
      try {
        const response = await this.$axios.get('https://anecdotage.com/api/generate-download-pin');
        this.downloadPin = response.data.DownloadPin;
      } catch (error) {
        console.error('Error generating pin:', error);
        this.errors.downloadPin = ['Failed to generate download pin.'];
      }
    },

    handleFileChange(field, event) {
      const file = event.target.files[0];
      this.form[field] = file || null; // Set to null if no file selected
    },

    validateForm() {
      this.errors = {};

      // Validate required fields
      if (!this.form.title) this.errors.title = ['Title is required.'];
      if (!this.form.main_subject) this.errors.main_subject = ['Main subject is required.'];
      if (!this.form.book_number) this.errors.book_number = ['Book number is required.'];
      if (!this.form.author_name) this.errors.author_name = ['Author name is required.'];
      if (!this.form.publisher_date) this.errors.publisher_date = ['Publisher date is required.'];
      if (!this.downloadPin) this.errors.downloadPin = ['Download pin is required.'];

      // Validate only cover image
      if (!this.form.cover_image) this.errors.cover_image = ['Cover image is required.'];

      return Object.keys(this.errors).length === 0;
    },

    async submitForm() {
      if (!this.validateForm()) {
        const firstErrorField = Object.keys(this.errors)[0];
        const errorElement = document.getElementById(firstErrorField);
        if (errorElement) {
          errorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        return;
      }

      const formData = new FormData();
      
      // Add basic form fields
      formData.append('title', this.form.title);
      formData.append('main_subject', this.form.main_subject);
      formData.append('book_number', this.form.book_number);
      formData.append('author_name', this.form.author_name);
      formData.append('publisher_date', this.form.publisher_date);
      formData.append('DownloadPin', this.downloadPin);

      // Handle file uploads
      if (this.form.cover_image) {
        formData.append('cover_image', this.form.cover_image);
      }
      
      if (this.form.file_attachment_epub) {
        formData.append('file_attachment_epub', this.form.file_attachment_epub);
      }
      
      if (this.form.file_attachment_pdf) {
        formData.append('file_attachment_pdf', this.form.file_attachment_pdf);
      }
      
      if (this.form.file_attachment_txt) {
        formData.append('file_attachment_txt', this.form.file_attachment_txt);
      }

      try {
        const response = await this.$axios.post('https://anecdotage.com/api/books', formData, {
          headers: { 
            'Content-Type': 'multipart/form-data'
          }
        });

        alert('Book created successfully!');
        this.resetForm();
        this.$router.push('/books');
      } catch (error) {
        if (error.response && error.response.data.errors) {
          this.errors = error.response.data.errors;
        } else {
          alert('Error creating book.');
        }
      }
    },

    resetForm() {
      this.form = {
        title: '',
        main_subject: '',
        book_number: '',
        author_name: '',
        publisher_date: '',
        cover_image: null,
        file_attachment_epub: null,
        file_attachment_pdf: null,
        file_attachment_txt: null
      };
      this.errors = {};
      this.downloadPin = '';

      if (this.$refs.coverImageInput) this.$refs.coverImageInput.value = null;
      if (this.$refs.fileAttachmentEpubInput) this.$refs.fileAttachmentEpubInput.value = null;
      if (this.$refs.fileAttachmentPdfInput) this.$refs.fileAttachmentPdfInput.value = null;
      if (this.$refs.fileAttachmentTxtInput) this.$refs.fileAttachmentTxtInput.value = null;
    }
  }
};
</script>

<style scoped>
.table th {
  padding: 0.5rem;
}
</style>
