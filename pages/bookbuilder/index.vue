<template>
  <div class="container">
    <div class="row">
      <div class="col-md-12">
        <div></div>
        <template v-if="loading">
          <div class="loading-box">
            <img src="~assets/images/loading.gif" alt="" />
          </div>
        </template>
        <div class="card card-m-5">
          <div class="card-body">
            <div class="row mb-3">
              <div class="col-md-6">
                <button class="btn btn-danger" @click.prevent="reset">RESET</button>
              </div>
              <div class="col-md-6 d-flex justify-content-end">
                <button class="btn btn-primary ml-auto" @click.prevent="skip"
                  v-if="pageinateData.next_page_url">SKIP</button>
                <button class="btn btn-success ml-auto" @click.prevent="add">ADD</button>
              </div>
            </div>
            <div class="row">
              <div class="col-md-12">
                <div class="form-group" :class="{ 'has-error': errors.title }">
                  <label for="title" class="control-label">Title (required)</label>

                  <BaseInput :form="form" field="title" id="title" v-model="form.title" placeholder="Enter Thread Title"
                    inputType="text"></BaseInput>
                </div>

              </div>


            </div>

            <div class="row">
              <div class="col-md-12">
                <div class="form-group thread-body" :class="{ 'is-invalid': form.errors.errors.body }">
                  <label for="body" class="control-label">Your Story (required)</label>
                  <div class="mb-2">
                    <button v-if="isAdmin" type="button" class="btn btn-sm btn-info my-2 mr-2" @click="rewordContent">
                      Reword
                    </button>
                    <button v-if="isAdmin" type="button" class="btn my-2 btn-sm btn-warning" @click="stripQuotes">
                      Strip Quotes
                    </button>
                  </div>
                  <vue-ckeditor v-model="form.body" :config="config" />

                  <p class="text-danger" v-if="form.errors.errors.body">
                    {{ form.errors.errors.body[0] }}
                  </p>
                </div>
                <div class="form-group">
                  <has-error :form="form" field="body"></has-error>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-12">
                <div class="form-group">
                  <label for="source" class="control-label">Source</label>
                  <input type="text" name="source" id="source" class="form-control" v-model="form.source" />
                  <span class="help-block">
                    Where did you hear this story? If this story was reported on
                    a website or other publication please list it here
                    (&lt;i&gt; &lt;a&gt; tags are allowed).</span>
                </div>
              </div>


            </div>
          </div>
        </div>
        <div class="mt-3 d-flex justify-content-between">
          <button class="btn btn-success" @click.prevent="update">SAVE</button>
          <button class="btn btn-primary ml-auto" @click.prevent="getFile">GETFILE</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination';
import { mapGetters, mapActions } from 'vuex';
import VueCkeditor from 'vue-ckeditor2';
import BaseButton from '@/components/form/buttons/BaseButton'
import BaseInput from '@/components/form/inputs/BaseInput'
import userStatus from '@/mixins/userStatus'

export default {
  mixins: [userStatus],
  name: 'bookbuilder.index',
  watchQuery: true,
  components: {
    Pagination,
    VueCkeditor,
    BaseButton,
    BaseInput,
  },
  computed: {
    ...mapGetters({
      // settings: 'settings',
      pageinateData: 'bookbuilder/pageinateData',
      threads: 'bookbuilder/threads',
      loading: 'bookbuilder/loading',
    }),

    thread() {
      if (this.threads.length) {
        return this.threads[0]
      }
      return {}
    }
  },
  data() {
    return {
      config: {
        height: 300,
        extraAllowedContent: 'iframe[*]',
        contentsCss: [
          'body {font-size: 22px;}',
          'blockquote { display: block !important;}',
          'blockquote { margin-block-start: 1em !important;}',
          'blockquote { margin-block-end: 1em !important;}',
          'blockquote { margin-inline-start: 40px !important;}',
          'blockquote { margin-inline-end: 40px !important;}',
          // 'blockquote { quotes: "“" "”" "‘" "’" !important;}',
          // 'blockquote::before { content:  "“";}',
          // 'blockquote::after { content:  "”";}',
        ],
        scayt_autoStartup: true
      },
      errors: [],
      form: this.$vform({
        title: '',
        body: '',
        source: '',
      }),
    };
  },
  async fetch({ params, query, app, $axios, store, redirect, }) {
    try {

      const term = params.term
      await store.dispatch('bookbuilder/getThreads', { term, query })

    } catch (e) {
      console.log(e);
    }
  },
  mounted() {
    this.form.title = this.thread.title
    this.form.body = this.thread.body
    this.form.source = this.thread.source

  },

  methods: {
    ...mapActions({}),
    setFormData() {
      this.form.title = this.thread.title
      this.form.body = this.thread.body
      this.form.source = this.thread.source
    },
    async skip() {
      if (!this.pageinateData.next_page_url) return
      const page = this.pageinateData.current_page + 1;
      const term = this.$route.params.term


      await this.$store.dispatch('bookbuilder/getThreads', { term: term, query: { ...this.$route.query, page: page }, })
      this.setFormData()
    },
    update() {
      this.$axios
        .$put(`admin/bookbuilder/${this.thread.slug}`, this.form)
        .then((res) => {
          console.log(res)
        });
    },
    add() {
      const term = this.$route.params.term
      this.$axios
        .$post(`admin/bookbuilder/${this.thread.slug}`, {
          term: term
        })
        .then((res) => {
          this.skip()
        });
    },
    async reset() {
      try {
        const term = this.$route.params.term
        await this.$axios
          .$delete(`admin/bookbuilder/${term}/reset`, {
            term: term,
          })

        await this.$store.dispatch('bookbuilder/getThreads', { term: term, query: { ...this.$route.query, page: 1 }, })
        this.setFormData()

        this.$toast.open({
          type: 'success',
          position: 'top-right',
          message: 'Bookbuilder reset Successfully',
        });
      } catch (error) {

      }
    },
    async getFile() {
      try {
        const term = this.$route.params.term
        const response = await this.$axios({
          url: `admin/bookbuilder/${term}/get-file`,
          method: 'GET',
          responseType: 'blob', // important
        })

        let fileName = term + '.txt'

        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', fileName); //or any other extension
        document.body.appendChild(link);
        link.click();

      } catch (error) {

      }
    },
    async rewordContent() {
      if (!this.form.body?.trim()) {
        this.showToast('Please enter some text to reword', 'warning');
        return;
      }

      const loadingToast = this.showToast('Rewording content...', 'info', 0);

      try {
        const response = await this.$axios.$post('http://127.0.0.1:8000/api/reword-content', {
          text: this.form.body
        });

        if (response.success) {
          this.form.body = response.reworded_text;
          this.$toast.clear(loadingToast);
          this.showToast('Content reworded successfully', 'success');
        } else {
          throw new Error(response.message || 'No reworded content received');
        }
      } catch (error) {
        console.error('Rewording error:', error);

        let errorMsg = error.message;
        if (error.response?.data?.details?.error) {
          errorMsg = `${errorMsg}: ${error.response.data.details.error.message}`;
        } else if (error.response?.data?.message) {
          errorMsg = error.response.data.message;
        }

        this.showToast(errorMsg || 'Failed to reword content', 'error');
      }
    }
    ,
    stripQuotes() {
      if (!this.form.body?.trim()) {
        this.showToast('No content to process', 'warning');
        return;
      }

      // 2. Remove ALL types of quotes (expanded regex)
      let processed = this.form.body
        // Double quotes (all variations)
        .replace(/["“”„‟«»]/g, '')
        // Single quotes (all variations)
        .replace(/['‘’‛ʻ`´]/g, '')
        // HTML entities (both single and double quotes)
        .replace(/&(quot|ldquo|rdquo|apos|lsquo|rsquo|#39|#x27);/gi, '');

      // 3. Log the processed content to verify
      console.log("Processed:", JSON.stringify(processed));

      // 4. Update the content (CKEditor or v-model)
      if (this.$refs.ckeditor?.editor) {
        this.$refs.ckeditor.editor.setData(processed);
      } else {
        this.form.body = processed;
      }

      this.showToast('All quotes removed successfully', 'success');

    },
    showToast(message, type = 'info', duration = 3000) {
      return this.$toast.open({
        type,
        position: 'top-right',
        message,
        duration
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.thread-thumbnail {
  display: flex;
  justify-content: center;
}

.image_description {
  text-align: center;
  width: 100%;
  padding: 5px;
  display: inherit;
  justify-content: inherit;
  align-items: inherit;
  flex-wrap: wrap;
}

.image_description {
  font-size: 14px;
}

.loading-box {
  // widows: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20vh;
}
</style>
