<template>
    <div class="batch-upload-container">
        <div class="upload-card">
            <div class="upload-header">
                <h1 class="upload-title">Batch Story Upload</h1>
                <p class="upload-subtitle">Upload multiple stories at once using a formatted text file</p>
            </div>

            <form @submit.prevent="uploadBatch" class="upload-form">
                <div class="form-group">
                    <label class="form-label">
                        <span class="label-text">Batch File (TXT)</span>
                        <span class="label-required">*</span>
                    </label>
                    <div class="file-input-wrapper">
                        <input type="file" ref="fileInput" accept=".txt" class="file-input" @change="handleFileChange">
                        <button type="button" @click="$refs.fileInput.click()" class="file-select-button">
                            <svg class="file-icon" viewBox="0 0 24 24">
                                <path
                                    d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
                            </svg>
                            <span>{{ file ? file.name : 'Choose a file...' }}</span>
                            <div v-if="fileError" class="error-message">{{ fileError }}</div>
                        </button>
                    </div>
                </div>

                <div class="form-group">
                    <label class="form-label">
                        <span class="label-text">Admin PIN</span>
                        <span class="label-required">*</span>
                    </label>
                    <div class="pin-input-wrapper">
                        <input v-model="pin" type="password" class="pin-input" required>
                        <svg class="pin-icon" viewBox="0 0 24 24">
                            <path
                                d="M12,17A2,2 0 0,0 14,15C14,13.89 13.1,13 12,13A2,2 0 0,0 10,15A2,2 0 0,0 12,17M18,8A2,2 0 0,1 20,10V20A2,2 0 0,1 18,22H6A2,2 0 0,1 4,20V10C4,8.89 4.9,8 6,8H7V6A5,5 0 0,1 12,1A5,5 0 0,1 17,6V8H18M12,3A3,3 0 0,0 9,6V8H15V6A3,3 0 0,0 12,3Z" />
                        </svg>
                    </div>
                </div>

                <button type="submit" :disabled="!file || loading" class="submit-button">
                    <span v-if="loading" class="button-loading">
                        <svg class="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4">
                            </circle>
                            <path class="opacity-75" fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                            </path>
                        </svg>
                        Processing...
                    </span>
                    <span v-else>
                        <svg class="upload-icon" viewBox="0 0 24 24">
                            <path d="M9,16V10H5L12,3L19,10H15V16H9M5,20V18H19V20H5Z" />
                        </svg>
                        Upload Batch
                    </span>
                </button>

                <div v-if="progress" class="progress-container">
                    <div class="progress-bar">
                        <div class="progress-fill" :style="{ width: `${progress}%` }"></div>
                    </div>
                    <div class="progress-text">{{ progress }}% uploaded</div>
                </div>

                <div v-if="message" class="message-alert" :class="messageClass">
                    <svg v-if="messageClass === 'success'" class="alert-icon" viewBox="0 0 24 24">
                        <path
                            d="M12 2C6.5 2 2 6.5 2 12S6.5 22 12 22 22 17.5 22 12 17.5 2 12 2M10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z" />
                    </svg>
                    <svg v-else class="alert-icon" viewBox="0 0 24 24">
                        <path
                            d="M13,13H11V7H13M13,17H11V15H13M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" />
                    </svg>
                    <div class="message-content">
                        <span>{{ message }}</span>
                        <ul v-if="detailedErrors && detailedErrors.length" class="error-details">
                            <li v-for="(error, index) in detailedErrors" :key="index">{{ error }}</li>
                        </ul>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            file: null,
            pin: '',
            loading: false,
            progress: 0,
            message: '',
            messageClass: '',
            detailedErrors: [], // Add this for detailed error messages,
            fileError: ''
        }
    },
    methods: {
        handleFileChange(e) {
            this.file = e.target.files[0]
            this.fileError = ''; // Reset file error message
            this.message = ''
            this.detailedErrors = []

            if (!this.file) return;

            // More reliable file extension check
            const fileName = this.file.name.toLowerCase();
            const validExtensions = ['.txt', '.text'];
            const fileExt = fileName.substring(fileName.lastIndexOf('.'));

            if (!validExtensions.includes(fileExt)) {
                this.fileError = 'Only .txt files are allowed';
                this.file = null; // Reset file if invalid
                e.target.value = ''; // Clear the file input
                return;
            }

        },
        async uploadBatch() {
            if (!this.file) return

            this.loading = true
            this.progress = 0
            this.message = ''

            const formData = new FormData()
            formData.append('batch_file', this.file)
            formData.append('pin', this.pin)

            try {
                const response = await this.$axios.post('https://anecdotage.com/api/batch/process', formData, {
                    onUploadProgress: (progressEvent) => {
                        this.progress = Math.round(
                            (progressEvent.loaded * 100) / progressEvent.total
                        )
                    },
                    headers: {
                        'Content-Type': 'multipart/form-data' // Important for file uploads
                    }
                })

                this.message = response.data.message
                this.messageClass = 'success'
                this.file = null
                this.pin = ''
                this.progress = 0
            } catch (error) {
                if (error.response) {
                    if (error.response.status === 400) {
                        this.message = error.response.data.error.pin[0] || 'Validation error'

                        this.detailedErrors = error.response.data.errors || []

                        // If no detailed errors, use the first message
                        if (this.detailedErrors.length === 0 && error.response.data.message) {
                            this.detailedErrors = [error.response.data.message]
                        }
                    } else {
                        console.error(error)
                        this.message = error.response.data.message ||
                            error.response.data.error ||
                            'Error processing batch'
                        this.detailedErrors = []
                    }
                } else {
                    this.message = 'Network error or server unavailable'
                    this.detailedErrors = []
                }
                this.messageClass = 'error'
            } finally {
                this.loading = false
                this.$refs.fileInput.value = ''; // <-- ADD THIS
            }
        }
    }
}
</script>

<style scoped>
.batch-upload-container {
    max-width: 600px;
    margin: 2rem auto;
    padding: 1.1rem 1rem;
}

.upload-card {
    background: white;
    border-radius: 12px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
    overflow: hidden;
    transition: transform 0.3s ease;
}

.upload-card:hover {
    transform: translateY(-2px);
}

.upload-header {
    padding: 1.5rem 2rem;
    background: linear-gradient(135deg, #4f46e5, #7c3aed);
    color: white;
}

.upload-title {
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: 0.25rem;
}

.upload-subtitle {
    font-size: 0.875rem;
    opacity: 0.9;
}

.upload-form {
    padding: 2rem;
}

.form-group {
    margin-bottom: 1.5rem;
}

.form-label {
    display: flex;
    align-items: center;
    margin-bottom: 0.5rem;
    font-size: 0.875rem;
    font-weight: 600;
    color: #4b5563;
}

.label-text {
    margin-right: 0.25rem;
}

.label-required {
    color: #ef4444;
}

.file-input-wrapper {
    position: relative;
}

.file-input {
    position: absolute;
    width: 0.1px;
    height: 0.1px;
    opacity: 0;
    overflow: hidden;
    z-index: -1;
}

.file-select-button {
    display: flex;
    align-items: center;
    width: 100%;
    padding: 0.75rem 1rem;
    background-color: #f9fafb;
    border: 1px dashed #d1d5db;
    border-radius: 8px;
    font-size: 0.875rem;
    color: #4b5563;
    cursor: pointer;
    transition: all 0.2s ease;
}

.file-select-button:hover {
    background-color: #f3f4f6;
    border-color: #9ca3af;
}

.file-icon {
    width: 20px;
    height: 20px;
    margin-right: 0.75rem;
    fill: #4f46e5;
}

.pin-input-wrapper {
    position: relative;
}

.pin-input {
    width: 100%;
    padding: 0.75rem 1rem 0.75rem 2.5rem;
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    font-size: 0.875rem;
    color: #1f2937;
    transition: border-color 0.2s ease;
}

.pin-input:focus {
    outline: none;
    border-color: #4f46e5;
    box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
}

.pin-icon {
    position: absolute;
    left: 1rem;
    top: 50%;
    transform: translateY(-50%);
    width: 20px;
    height: 20px;
    fill: #9ca3af;
}

.submit-button {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    padding: 0.875rem 1rem;
    background: linear-gradient(135deg, #4f46e5, #7c3aed);
    color: white;
    border: none;
    border-radius: 8px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
}

.submit-button:hover:not(:disabled) {
    background: linear-gradient(135deg, #4338ca, #6d28d9);
    box-shadow: 0 4px 6px rgba(79, 70, 229, 0.2);
}

.submit-button:disabled {
    opacity: 0.7;
    cursor: not-allowed;
}

.upload-icon {
    width: 20px;
    height: 20px;
    margin-right: 0.5rem;
    fill: currentColor;
}

.button-loading {
    display: flex;
    align-items: center;
}

.progress-container {
    margin-top: 1.5rem;
}

.progress-bar {
    height: 6px;
    background-color: #e5e7eb;
    border-radius: 3px;
    overflow: hidden;
}

.progress-fill {
    height: 100%;
    background: linear-gradient(90deg, #4f46e5, #7c3aed);
    border-radius: 3px;
    transition: width 0.3s ease;
}

.progress-text {
    margin-top: 0.5rem;
    font-size: 0.75rem;
    color: #6b7280;
    text-align: center;
}

.message-alert {
    display: flex;
    align-items: center;
    padding: 0.875rem 1rem;
    margin-top: 1.5rem;
    border-radius: 8px;
    font-size: 0.875rem;
}

.message-alert.success {
    background-color: #ecfdf5;
    color: #065f46;
    border: 1px solid #a7f3d0;
}

.message-alert.error {
    background-color: #fef2f2;
    color: #b91c1c;
    border: 1px solid #fecaca;
}

.alert-icon {
    width: 20px;
    height: 20px;
    margin-right: 0.75rem;
    flex-shrink: 0;
}

.message-alert.success .alert-icon {
    fill: #10b981;
}

.message-alert.error .alert-icon {
    fill: #ef4444;
}

.message-content {
    display: flex;
    flex-direction: column;
}

.error-details {
    margin-top: 0.5rem;
    padding-left: 1.5rem;
    list-style-type: disc;
    font-size: 0.8em;
}

.error-details li {
    margin-top: 0.25rem;
}
</style>