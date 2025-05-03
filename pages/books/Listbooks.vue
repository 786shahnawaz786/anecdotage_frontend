<template>
  <div class="container py-5">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card shadow-sm">
          <div class="card-body">
            <h3 class="card-title text-center mb-4">📚 Watermark Generator</h3>
            <form @submit.prevent="submitForm">
              <div class="form-group">
                <label for="watermark">Watermark Text</label>
                <input type="text" class="form-control" id="watermark" placeholder="Enter something like DOGS"
                  v-model="watermark" />
              </div>

              <button type="submit" class="btn btn-primary btn-block mt-3">
                💾 Generate & Download
              </button>

              <div v-if="error" class="alert alert-danger mt-3">
                {{ error }}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const watermark = ref('')
const error = ref(null)

const submitForm = async () => {
  error.value = null
  try {
    const response = await fetch('http://127.0.0.1:8000/api/books/covers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({ watermark: watermark.value })
    })

    if (!response.ok) {
      throw new Error('Failed to generate image')
    }

    const blob = await response.blob()
    const url = window.URL.createObjectURL(blob)

    const a = document.createElement('a')
    a.href = url
    a.download = 'watermarked.jpg'
    document.body.appendChild(a)
    a.click()
    a.remove()
    window.URL.revokeObjectURL(url)
  } catch (err) {
    error.value = err.message || 'Something went wrong.'
    console.error('Download failed:', err)
  }
}
</script>
