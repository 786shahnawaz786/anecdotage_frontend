<template>
  <div class="container py-5">
    <div class="form-wrapper">
      <h3 class="text-center mb-4">📚 Watermark Generator</h3>
      <form @submit.prevent="submitForm" class="form-group">
        <label for="watermark" class="form-label">Watermark Text</label>
        <input type="text" id="watermark" v-model="watermark" class="form-input" placeholder="Enter something like DOGS"
          :disabled="isLoading" />

        <div class="input-row">
          <div class="input-group">
            <label for="fontSize" class="form-label">Font Size</label>
            <input type="number" id="fontSize" v-model.number="fontSize" class="form-input" placeholder="e.g., 24"
              min="8" max="500" :disabled="isLoading" />
          </div>

          <div class="input-group">
            <label for="fontColor" class="form-label">Font Color</label>
            <input type="color" id="fontColor" v-model="fontColor" class="form-input color-input"
              :disabled="isLoading" />
          </div>
        </div>

        <button type="submit" class="submit-btn" :disabled="isLoading">
          <span v-if="!isLoading">💾 Generate & Download</span>
          <span v-else class="loader-wrapper">
            <span class="loader"></span>
          </span>
        </button>
      </form>

      <div v-if="error" class="alert-message error">
        {{ error }}
        <button @click="dismissError" class="dismiss-btn">×</button>
      </div>

      <div v-if="success" class="alert-message success">
        {{ success }}
        <button @click="dismissSuccess" class="dismiss-btn">×</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      watermark: '',
      fontSize: 24,
      fontColor: '#000000',
      error: null,
      success: null,
      isLoading: false,
      errorTimeout: null,
      successTimeout: null
    };
  },
  methods: {
    dismissError() {
      clearTimeout(this.errorTimeout);
      this.error = null;
    },
    dismissSuccess() {
      clearTimeout(this.successTimeout);
      this.success = null;
    },
    autoHideAlerts() {
      clearTimeout(this.errorTimeout);
      clearTimeout(this.successTimeout);
      if (this.error) {
        this.errorTimeout = setTimeout(this.dismissError, 5000);
      }
      if (this.success) {
        this.successTimeout = setTimeout(this.dismissSuccess, 5000);
      }
    },
    async submitForm() {
      this.dismissError();
      this.dismissSuccess();
      this.isLoading = true;

      try {
        const response = await fetch('https://anecdotage.com/api/books/covers', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            watermark: this.watermark.trim(),
            fontSize: this.fontSize,
            fontColor: this.fontColor
          })
        });

        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `watermarked_${this.watermark}.jpg`;
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);

        this.success = 'Watermark generated successfully!';
      } catch (err) {
        this.error = err.message || 'Something went wrong. Please try again.';
        console.error('Download failed:', err);
      } finally {
        this.isLoading = false;
        this.autoHideAlerts();
      }
    }
  },
  watch: {
    error: 'autoHideAlerts',
    success: 'autoHideAlerts'
  }
};
</script>

<style scoped>
/* Custom container for the form */
.py-5 {
  padding-top: 7.5rem !important;
  padding-bottom: 7.5rem !important;
}

.form-wrapper {
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 30px;
  max-width: 500px;
  margin: 0 auto;
  position: relative;
}

h3 {
  font-family: 'Arial', sans-serif;
  color: #333;
}

.form-group {
  margin-bottom: 20px;
}

.form-label {
  font-size: 1.1em;
  color: #555;
  display: block;
  margin-bottom: 8px;
}

.form-input {
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1em;
  color: #333;
  margin-bottom: 20px;
  transition: border-color 0.3s;
}

.color-input {
  height: 45px;
  padding: 5px;
}

.input-row {
  display: flex;
  gap: 15px;
}

.input-group {
  flex: 1;
}

.form-input:focus {
  border-color: #007bff;
  outline: none;
}

.form-input:disabled {
  background-color: #f0f0f0;
  cursor: not-allowed;
}

.submit-btn {
  background-color: #007bff;
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 4px;
  width: 100%;
  font-size: 1.1em;
  cursor: pointer;
  transition: background-color 0.3s;
  position: relative;
  min-height: 44px;
}

.submit-btn:hover:not(:disabled) {
  background-color: #0056b3;
}

.submit-btn:disabled {
  background-color: #b3d7ff;
  cursor: not-allowed;
}

.loader-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.loader {
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top: 3px solid white;
  width: 20px;
  height: 20px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

.alert-message {
  margin-top: 20px;
  padding: 12px 40px 12px 20px;
  border-radius: 4px;
  font-size: 1em;
  text-align: center;
  position: relative;
  animation: fadeIn 0.3s ease-in-out;
}

.error {
  background-color: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
}

.success {
  background-color: #d4edda;
  color: #155724;
  border: 1px solid #c3e6cb;
}

.dismiss-btn {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  background: transparent;
  border: none;
  font-size: 1.5em;
  line-height: 1;
  cursor: pointer;
  color: inherit;
  padding: 0 8px;
  opacity: 0.7;
  transition: opacity 0.2s;
}

.dismiss-btn:hover {
  opacity: 1;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
