<template>
  <div class="container">
    <div class="card card-m-5">
      <div class="card-header d-flex justify-content-between">
        <h2 class="card-title big-label">Post an Anecdote</h2>
        <AdminButtons :thread="thread" />
      </div>
      <div class="card-body">
        <form class="" action="" method="post" enctype="multipart/form-data" @submit.prevent="updateAndGoThumb">
          <div class="row">
            <div class="col-md-6">
              <div class="form-group" :class="{ 'has-error': errors.title }">
                <label for="title" class="control-label">Title (required)</label>

                <BaseInput :form="form" field="title" id="title" v-model="form.title" placeholder="Enter Thread Title"
                  inputType="text"></BaseInput>
                <!-- <input type="text" id="title" class="form-control" v-model="form.title"> -->

                <!-- <span class="help-block error" v-if="errors.title">{{ errors.title[0] }}</span> -->
                <div class="form-check">
                  <input type="checkbox" class="form-check-input" id="title_case" v-model="title_case" />
                  <label class="form-check-label" for="title_case">Apply Title Case</label>
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6">
              <div class="form-group">
                <label for="main_subject" class="control-label">Main Subject:</label>
                <input type="text" name="main_subject" id="main_subject" class="form-control"
                  v-model="form.main_subject" />
                <span class="help-block">Who or what is this story about? This will be added as a tag.
                </span>
              </div>
              <div class="form-group">
                <div class="checkbox">
                  <label>
                    <input type="checkbox" value="1" v-model="form.scrape_image" />
                    <span class="import_wikipedia_image_checkbox">Try to import Wikipedia image
                      <img v-if="showImportWikipediaTooltip" width="20px" height="20px"
                        src="~assets/images/icons/info.png" alt="Try to import image from wikipedia"
                        data-toggle="tooltip" data-placement="bottom" :title="tooltipText"
                        :data-original-title="tooltipText">
                      <img v-else width="20px" height="20px" src="~assets/images/icons/info.png"
                        alt="Try to import image from wikipedia" title="" data-original-title="">
                    </span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-md-4">
              <div class="form-group" id="category">
                <label for="input">Category</label>
                <input id="input" class="form-control" type="text" placeholder="Choose a category"
                  :value="defaultChannel.name" autocomplete="off" />
                <typeahead v-model="form.channel" match-start :append-to-body="true" target="#input" :data="allchannels"
                  item-key="name" />
              </div>
            </div>
            <div class="col-md-8">
              <div class="form-group">
                <label for="tags" class="control-label"> Tags </label>
                <v-select taggable push-tags v-model="form.tags" :options="alltags" multiple @search="searchTag"
                  @input="selecetdTag" :closeOnSelect="false">
                  <template v-slot:no-options="{ search, searching }">
                    <template v-if="searching">
                      No results found for <em>{{ search }}</em>.
                    </template>
                    <em style="opacity: 0.5" v-else>Start typing to search for a tags.</em>
                  </template>
                </v-select>
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
                <vue-ckeditor ref="ckeditor" v-model="form.body" :config="config" />

                <p class="text-danger" v-if="form.errors.errors.body">
                  {{ form.errors.errors.body[0] }}
                </p>
              </div>
              <div class="form-group">
                <has-error :form="form" field="body"></has-error>
              </div>
            </div>
          </div>

          <!-- Disable for now
          <div class="row">
            <div class="col-md-12">
              <div class="form-group">
                <button
                  tton
                  class="btn btn-default btn-sm"
                  type="button"
                  @click="show_more_fields = !show_more_fields"
                >
                  <span v-if="show_more_fields">
                    <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="angle-up" class="svg-inline--fa fa-angle-up" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path fill="currentColor" d="M177 159.7l136 136c9.4 9.4 9.4 24.6 0 33.9l-22.6 22.6c-9.4 9.4-24.6 9.4-33.9 0L160 255.9l-96.4 96.4c-9.4 9.4-24.6 9.4-33.9 0L7 329.7c-9.4-9.4-9.4-24.6 0-33.9l136-136c9.4-9.5 24.6-9.5 34-.1z"></path>
                    </svg>
                  </span>
                  <span v-else>
                    Show More Fields
                    <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="angle-down" class="svg-inline--fa fa-angle-down" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path fill="currentColor" d="M143 352.3L7 216.3c-9.4-9.4-9.4-24.6 0-33.9l22.6-22.6c9.4-9.4 24.6-9.4 33.9 0l96.4 96.4 96.4-96.4c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9l-136 136c-9.2 9.4-24.4 9.4-33.8 0z"></path>
                    </svg>
                  </span>
                </button>
              </div>
            </div>
          </div> -->

          <div class="more-fields" v-if="show_more_fields">
            <div class="row">
              <div class="col-md-6">
                <div class="form-group">
                  <label for="source" class="control-label">Source</label>
                  <input type="text" name="source" id="source" class="form-control" v-model="form.source" />
                  <span class="help-block">
                    Where did you hear this story? If this story was reported on
                    a website or other publication please list it here
                    (&lt;i&gt; &lt;a&gt; tags are allowed).</span>
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group">
                  <label for="location" class="control-label">Location</label>
                  <input type="text" name="location" id="location" class="form-control" v-model="form.location" />
                  <span class="help-block">Where did your story take place? If google can find it,
                    we'll add maps & markers for this story. Example locations
                    are: "111 5th ave, NYC" and "Louvre."</span>
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-md-4">
                <div class="form-group">
                  <label for="age_restriction">Age Restriction</label>
                  <select name="age_restriction" id="age_restriction" class="form-control"
                    v-model="form.age_restriction">
                    <option :value="0" selected>Ok for everyone</option>
                    <option :value="13">PG-13</option>
                    <option :value="18">R-rated (18+)</option>
                  </select>
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-md-4">
                <div class="form-group">
                  <label for="category" class="control-label"></label>

                  <div class="checkbox">
                    <label><input type="checkbox" value="1" v-model="form.cno.famous" /> This story involves a famous
                      person or
                      thing</label>
                  </div>

                  <div class="checkbox" v-if="form.cno.famous" style="margin-left: 30px">
                    <label><input type="checkbox" value="1" v-model="form.cno.celebrity" /> Is it a celebrity?</label>
                  </div>
                </div>
              </div>
            </div>
            <div class="row" v-if="isAdmin">
              <div class="col-md-6">
                <div class="form-group">
                  <div class="checkbox">
                    <label><input type="checkbox" v-model="form.copy_cno" /> Copy CNO to items with Main Subject in
                      Title</label>
                  </div>
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-md-3">
                <div class="form-group">
                  <div class="checkbox">
                    <label><input type="checkbox" v-bind:value="1" name="anonymous" v-model="form.anonymous" /> Post
                      Anonymously</label>
                  </div>
                </div>
              </div>
            </div>


            <template v-if="isAdmin">

              <div class="row">

                <div class="col-md-12">
                  <div class="form-group">
                    <label for="slide_body" class="control-label">Slide Body</label>
                    <textarea name="slide_body" id="slide_body" cols="30" rows="3" class="form-control"
                      v-model="form.slide_body"></textarea>
                  </div>
                </div>
              </div>

              <!-- Currently unused -->
              <!-- <div class="row">
                <div class="col-md-12">
                  <div class="form-group">
                    <label for="slide_image_path" class="control-label"
                      >Slide Image</label
                    >
                    <input type="file" name="slide_image_path" id="slide_image_path" @change="handleSlideImagePath">
                  </div>
                </div>
              </div> -->


              <div class="row">
                <div class="col-md-6">
                  <div class="form-group">
                    <label for="slide_image_pos" class="control-label">Slide Image Position</label>
                    <input name="slide_image_pos" id="slide_image_pos" class="form-control"
                      v-model="form.slide_image_pos" />
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group">
                    <label for="slide_color_bg" class="control-label">Slide Color BG</label>
                    <input name="slide_color_bg" id="slide_color_bg" class="form-control"
                      v-model="form.slide_color_bg" />
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-4">
                  <div class="form-group">
                    <label for="slide_color_0" class="control-label">Slide Color 0</label>
                    <input name="slide_color_0" id="slide_color_0" class="form-control" v-model="form.slide_color_0" />
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="form-group">
                    <label for="slide_color_1" class="control-label">Slide Color 1</label>
                    <input name="slide_color_1" id="slide_color_1" class="form-control" v-model="form.slide_color_1" />
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="form-group">
                    <label for="slide_color_2" class="control-label">Slide Color 2</label>
                    <input name="slide_color_2" id="slide_color_2" class="form-control" v-model="form.slide_color_2" />
                  </div>
                </div>
              </div>
            </template>
          </div>

          <div class="row">
            <div class="col-md-12">
              <div class="form-group">
                <!-- <button class="btn btn-primary" type="submit" :disabled="form.wiki_info_page_url !='' && form.wiki_image_copyright_free != true">Add Thread</button> -->

                <!-- <BaseButton :loading="form.busy"  nativeType="button" type="success">Update Your Story</BaseButton> -->
                <!-- <BaseButton :loading="form.busy" nativeType="button" @click="updateThread">Add An Image</BaseButton> -->
                <button :disabled="form.busy" type="button" class="btn btn-success" @click="updateAndGoThread">
                  <span v-if="form.busy">
                    <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="spinner"
                      class="svg-inline--fa fa-spinner" role="img" xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512">
                      <path fill="currentColor"
                        d="M304 48c0 26.51-21.49 48-48 48s-48-21.49-48-48 21.49-48 48-48 48 21.49 48 48zm-48 368c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zm208-208c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zM96 256c0-26.51-21.49-48-48-48S0 229.49 0 256s21.49 48 48 48 48-21.49 48-48zm12.922 99.078c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.491-48-48-48zm294.156 0c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.49-48-48-48zM108.922 60.922c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.491-48-48-48z">
                      </path>
                    </svg>
                  </span>
                  Update Your Story
                </button>
                <button :disabled="form.busy" type="submit" class="btn btn-primary">
                  <span v-if="form.busy">
                    <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="spinner"
                      class="svg-inline--fa fa-spinner" role="img" xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512">
                      <path fill="currentColor"
                        d="M304 48c0 26.51-21.49 48-48 48s-48-21.49-48-48 21.49-48 48-48 48 21.49 48 48zm-48 368c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zm208-208c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zM96 256c0-26.51-21.49-48-48-48S0 229.49 0 256s21.49 48 48 48 48-21.49 48-48zm12.922 99.078c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.491-48-48-48zm294.156 0c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.49-48-48-48zM108.922 60.922c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.491-48-48-48z">
                      </path>
                    </svg>
                  </span>
                  Add An Image
                </button>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-12">
              <div class="form-group">
                <nuxt-link :to="{ name: 'threads.show', params: { slug: thread.slug } }" href="#"
                  class="btn btn-danger">
                  <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="arrow-left"
                    class="svg-inline--fa fa-arrow-left" role="img" xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512">
                    <path fill="currentColor"
                      d="M257.5 445.1l-22.2 22.2c-9.4 9.4-24.6 9.4-33.9 0L7 273c-9.4-9.4-9.4-24.6 0-33.9L201.4 44.7c9.4-9.4 24.6-9.4 33.9 0l22.2 22.2c9.5 9.5 9.3 25-.4 34.3L136.6 216H424c13.3 0 24 10.7 24 24v32c0 13.3-10.7 24-24 24H136.6l120.5 114.8c9.8 9.3 10 24.8.4 34.3z">
                    </path>
                  </svg>
                  Cancel</nuxt-link>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
    <ShareModal v-if="show_share_modal" :thread="thread" @share-cancel="cancelShare(updatedThread)"
      @hide-share-modal="show_share_modal = false" @share-complete="completeShare(updatedThread)" />
  </div>
</template>

<script>
import VueCkeditor from 'vue-ckeditor2';
import { mapGetters } from 'vuex';
import { serialize } from 'object-to-formdata'
import scrollToTop from '@/mixins/scrollToTop'
import userStatus from '@/mixins/userStatus'
import createEditThread from '@/mixins/createEditThread'
import AdminButtons from '@/components/threads/AdminButtons';
import ThreadShare from '@/mixins/threadShare'

export default {
  components: { VueCkeditor, AdminButtons },
  mixins: [scrollToTop, userStatus, createEditThread, ThreadShare],
  computed: {
    ...mapGetters({
      settings: 'settings',
      thread: 'threads/thread',

    }),
    owns() {
      if (this.signedIn) {
        return this.$store.state.auth.user.id == this.thread.user_id;
      }

      return false;
    },
    stripTagTitle() {
      return this.thread.title.replace(/(<([^>]+)>)/gi, '');
    },
  },
  head() {
    return {
      title: `${this.settings.site_title} | Edit:  ${this.stripTagTitle} `,
    };
  },
  data() {
    return {
      defaultChannel: {
        name: '',
        id: '',
        slug: '',
      },
      title_case: false,
      updatedThread: null
    };
  },
  created() {
    if (!this.isAdmin && !this.owns) {
      this.$router.push({ name: 'index' });
    }
  },
  mounted() {
    if (this.thread) {
      this.form.title = this.thread.title;
      this.form.body = this.thread.body;
      this.form.source = this.thread.source;
      this.form.location = this.thread.formatted_address;
      this.form.main_subject = this.thread.main_subject;
      this.form.age_restriction = this.thread.age_restriction;
      this.form.anonymous = this.thread.anonymous;
      this.defaultChannel = this.thread.channel;
      // this.form.channel = this.thread.channel;

      this.form.slide_body = this.thread.slide_body;
      this.form.slide_image_pos = this.thread.slide_image_pos;
      this.form.slide_color_bg = this.thread.slide_color_bg;
      this.form.slide_color_0 = this.thread.slide_color_0;
      this.form.slide_color_1 = this.thread.slide_color_1;
      this.form.slide_color_2 = this.thread.slide_color_2;

      this.form.tags = this.thread.tags.map((tag) => {
        return tag.name;
      });

      if (this.thread.cno == 'C') {
        this.form.cno = {
          famous: true,
          celebrity: true,
        };
      } else if (this.thread.cno == 'N') {
        this.form.cno = {
          famous: true,
          celebrity: false,
        };
      } else {
        this.form.cno = {
          famous: false,
          celebrity: false,
        };
      }

      this.updatedThread = this.thread;
    }
    const iframe = document.querySelectorAll('iframe');
    const threadBody = document.querySelector('.thread-body');
    const position = threadBody.getBoundingClientRect();
    for (let i = 0; i < iframe.length; i++) {
      iframe[i].width = position.width;
      iframe[i].height = position.height;
    }


    document.getElementById('title').focus;

  },
  async fetch({ params, query, error, $axios, store, redirect }) {
    try {
      const threadRresponse = await $axios.$get(`threads/${params.slug}/edit`);
      store.commit('threads/setCurrentThread', threadRresponse.data);
    } catch (err) {
      if (err.response.status === 404) {
        error({ statusCode: 404, message: 'Thread Not Found' });
      } else if (err.response.status === 429) {
        error({ statusCode: 429, message: 'Too Many Attempt' });
      } else if (err.response.status === 401) {
        redirect('/login');
      } else {
        error({ statusCode: 500, message: 'Server Error' });
      }
    }
  },
  methods: {
    updateAndGoThumb() {
      this.updateThread().then(res => {
        if (this.form.scrape_image) {
          setTimeout(() => {
            this.$router.push({
              name: 'threads.show',
              params: { slug: res.data.slug },
            });
          }, 1500);
        } else {
          this.$router.push({
            name: 'threads.thumbnail',
            params: { slug: res.data.slug },
          });
        }
      })
    },
    updateAndGoThread() {
      this.updateThread().then(res => {
        this.show_share_modal = true;

        // this.$router.push({
        //   name: 'threads.show',
        //   params: { slug: res.data.slug },
        // });
      });
    },
    updateThread() {
      this.errors = [];
      if (this.form.channel == '') {
        this.form.channel = this.defaultChannel;
      }

      return this.form
        .submit('post', `threads/${this.thread.slug}`, {
          transformRequest: [function (data, headers) {
            return serialize(data)
          }],

        })
        .then((res) => {
          this.updatedThread = res.data;

          this.$toast.open({
            type: 'success',
            position: 'top-right',
            message: 'Thread Update Successfully',
          });
          return res;
        })
        .catch((err) => {
          // console.log(err);
        });
    },
    // handleSlideImagePath (event) {
    //   const file = event.target.files[0]
    //   this.form.slide_image_path = file
    // },
    async rewordContent() {
      if (!this.form.body?.trim()) {
        this.showToast('Please enter some text to reword', 'warning');
        return;
      }

      const loadingToast = this.showToast('Rewording content...', 'info', 0);

      try {
        const response = await this.$axios.$post('/reword-content', {
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
  },
};
</script>

<style lang="scss" scoped>
.thread-thumb-placeholder {
  width: 150px;
  height: 150px;
  background-color: #eeeeee;
}

#tinymce iframe {
  width: 100% !important;
  height: 350px !important;
}

.tox-tinymce {
  min-height: 500px !important;
}

.error {
  color: red;
}

.help-block.error {
  color: red;
}

.uiv .dropdown-menu>.active>a,
.uiv .dropdown-menu>.active>a:focus,
.uiv .dropdown-menu>.active>a:hover {
  color: #fff;
  text-decoration: none;
  background-color: #337ab7;
  outline: 0;
}

dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 1000;
  display: none;
  float: left;
  min-width: 10rem;
  padding: 0.5rem 0;
  margin: 0.125rem 0 0;
  font-size: 1rem;
  color: #212529;
  text-align: left;
  list-style: none;
  background-color: #38a9ff;
  background-clip: padding-box;
  border: 1px solid rgba(0, 0, 0, 0.15);
  border-radius: 0.25rem;
}

.thread-body {
  width: 100%;
  height: 100%;
}

body.cke_editable.cke_editable_themed.cke_contents_ltr.cke_show_borders {
  font-size: 20px !important;
}

.svg-inline--fa path {
  fill: currentColor;
}


.card-title {
  font-size: 24px;
  font-weight: bold;
}

.big-label {
  line-height: 32px;
  font-weight: 700;
  font-size: 20px;
}

span.import_wikipedia_image_checkbox {
  display: inline-flex;
  align-items: center;

  img {
    margin-left: 5px;
  }
}

// blockquote, q {
//   quotes: auto !important;
//   display: block !important;
//   margin-block-start: 1em !important;
//   margin-block-end: 1em !important;
//   margin-inline-start: 41px !important;
//   margin-inline-end: 41px !important;
// }</style>
