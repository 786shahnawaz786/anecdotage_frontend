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
            <div class="col-md-6">
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
            <div class="col-md-6">
              <div class="form-group">
                <label class="form-label" for="file_attachment">Attach File <span class="text-danger">*</span></label>
                <input
                  ref="fileAttachmentInput"
                  class="form-control"
                  type="file"
                  @change="handleFileChange('file_attachment', $event)"
                />
                <div v-if="errors.file_attachment" class="text-danger">{{ errors.file_attachment[0] }}</div>
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
  data() {
    return {
      form: {
        title: '',
        main_subject: '',
        book_number: '',
        author_name: '',
        publisher_date: '',
        cover_image: null,
        file_attachment: null
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

      // Validate file inputs
      if (!this.form.cover_image) this.errors.cover_image = ['Cover image is required.'];
      if (!this.form.file_attachment) this.errors.file_attachment = ['File attachment is required.'];

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
      for (const key in this.form) {
        formData.append(key, this.form[key]);
      }
      formData.append('DownloadPin', this.downloadPin);

      try {
        const response = await this.$axios.post('https://anecdotage.com/api/books', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
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
        file_attachment: null
      };
      this.errors = {};
      this.downloadPin = '';

      if (this.$refs.coverImageInput) this.$refs.coverImageInput.value = null;
      if (this.$refs.fileAttachmentInput) this.$refs.fileAttachmentInput.value = null;
    }
  }
};
</script>

<style scoped>
.table th{
  padding: 0.5rem;
}
</style>
