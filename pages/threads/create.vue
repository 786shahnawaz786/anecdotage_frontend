<template>
  <div class="container">
    <div class="card card-m-5">
      <div class="card-header">
         <h2 class="card-title big-label">Post an Anecdote</h2>
        </div>
      <div class="card-body">
        <form
          class=""
          action=""
          method="post"
          enctype="multipart/form-data"
          @submit.prevent="createAndGoThumb"
        >
          <div class="row">
            <div class="col-md-6">
              <div class="form-group" :class="{ 'has-error': errors.title }">
                <label for="title" class="control-label"
                  >Title (required)</label
                >

                <BaseInput
                  :form="form"
                  field="title"
                  v-model="form.title"
                  placeholder="Enter Thread Title"
                  inputType="text"
                  :autofocus="true"
                ></BaseInput>
                <div class="form-check">
                  <input
                    type="checkbox"
                    class="form-check-input"
                    id="title_case"
                    v-model="title_case"
                  />
                  <label class="form-check-label" for="title_case"
                    >Apply Title Case</label
                  >
                </div>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-md-6">
              <div class="form-group">
                <label for="main_subject" class="control-label"
                  >Main Subject:</label
                >
                <input
                  type="text"
                  name="main_subject"
                  id="main_subject"
                  class="form-control"
                  v-model="form.main_subject"
                />
                <span class="help-block"
                  >Who or what is this story about? This will be added as a tag.
                </span>
              </div>
              <div class="form-group" >
                <div class="checkbox">
                  <label>
                    <input
                      type="checkbox"
                      value="1"
                      v-model="form.scrape_image"
                    />
                      <span class="import_wikipedia_image_checkbox" >Try to import Wikipedia image
                        <img  v-if="showImportWikipediaTooltip" width="20px" height="20px" src="~assets/images/icons/info.png" alt="Try to import image from wikipedia" data-toggle="tooltip" data-placement="bottom" :title="tooltipText" :data-original-title="tooltipText">
                        <img v-else  width="20px" height="20px" src="~assets/images/icons/info.png" alt="Try to import image from wikipedia"  title="" data-original-title="">
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
                <input
                  id="input"
                  class="form-control"
                  type="text"
                  placeholder="Choose a category"
                  autocomplete="off"
                />
                <typeahead
                  v-model="form.channel"
                  match-start
                  :append-to-body="true"
                  target="#input"
                  :async-function="searchChannel"
                  item-key="name"
                />
              </div>
            </div>
            <div class="col-md-8">
              <div class="form-group">
                <label for="tags" class="control-label"> Tags </label>
                <v-select
                  taggable
                  push-tags
                  v-model="form.tags"
                  :options="alltags"
                  multiple
                  @search="searchTag"
                  @input="selecetdTag"
                  :closeOnSelect="false"
                >
                  <template v-slot:no-options="{ search, searching }">
                    <template v-if="searching">
                      No results found for <em>{{ search }}</em
                      >.
                    </template>
                    <em style="opacity: 0.5" v-else
                      >Start typing to search for a tags.</em
                    >
                  </template>
                </v-select>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-12">
              <div
                class="form-group"
                :class="{ 'is-invalid': form.errors.errors.body }"
              >
                <label for="body" class="control-label"
                  >Your Story (required)</label
                >
                <div id="editor"></div>

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
          </div>
          <div class="more-fields" v-if="show_more_fields">
            <div class="row">
              <div class="col-md-6">
                <div class="form-group">
                  <label for="source" class="control-label">Source</label>
                  <input
                    type="text"
                    name="source"
                    id="source"
                    class="form-control"
                    v-model="form.source"
                  />
                  <span class="help-block">
                    Where did you hear this story? If this story was reported on
                    a website or other publication please list it here
                    (&lt;i&gt; &lt;a&gt; tags are allowed).</span
                  >
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group">
                  <label for="location" class="control-label">Location</label>
                  <input
                    type="text"
                    name="location"
                    id="location"
                    class="form-control"
                    v-model="form.location"
                  />
                  <span class="help-block"
                    >Where did your story take place? If google can find it,
                    we'll add maps & markers for this story. Example locations
                    are: "111 5th ave, NYC" and "Louvre."</span
                  >
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-md-4">
                <div class="form-group">
                  <label for="age_restriction">Age Restriction</label>
                  <select
                    name="age_restriction"
                    id="age_restriction"
                    class="form-control"
                    v-model="form.age_restriction"
                  >
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
                    <label
                      ><input
                        type="checkbox"
                        value="1"
                        v-model="form.cno.famous"
                      /> This story involves a famous person or thing</label
                    >
                  </div>

                  <div
                    class="checkbox"
                    v-if="form.cno.famous"
                    style="margin-left: 30px"
                  >
                    <label
                      ><input
                        type="checkbox"
                        value="1"
                        v-model="form.cno.celebrity"
                      /> Is it a celebrity?</label
                    >
                  </div>
                </div>
              </div>
            </div>
            <div class="row" v-if="isAdmin">
              <div class="col-md-6">
                <div class="form-group">
                  <div class="checkbox">
                    <label
                      ><input
                        type="checkbox"
                        v-model="form.copy_cno"
                      /> Copy CNO to items with Main Subject in Title</label
                    >
                  </div>
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-md-3">
                <div class="form-group">
                  <div class="checkbox">
                    <label
                      ><input
                        type="checkbox"
                        v-bind:value="1"
                        name="anonymous"
                        v-model="form.anonymous"
                      /> Post Anonymously</label
                    >
                  </div>
                </div>
              </div>
            </div>

           <template v-if="isAdmin">

              <div class="row">

                <div class="col-md-12">
                  <div class="form-group">
                    <label for="slide_body" class="control-label"
                      >Slide Body</label
                    >
                    <textarea
                      name="slide_body"
                      id="slide_body"
                      cols="30"
                      rows="3"
                      class="form-control"
                      v-model="form.slide_body"
                    ></textarea>
                  </div>
                </div>
              </div>

<!-- Currently Unused -->
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
                    <label for="slide_image_pos" class="control-label"
                      >Slide Image Position</label
                    >
                    <input
                      name="slide_image_pos"
                      id="slide_image_pos"
                      class="form-control"
                      v-model="form.slide_image_pos"
                    />
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group">
                    <label for="slide_color_bg" class="control-label"
                      >Slide Color BG</label
                    >
                    <input
                      name="slide_color_bg"
                      id="slide_color_bg"
                      class="form-control"
                      v-model="form.slide_color_bg"
                    />
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-4">
                  <div class="form-group">
                    <label for="slide_color_0" class="control-label"
                      >Slide Color 0</label
                    >
                    <input
                      name="slide_color_0"
                      id="slide_color_0"
                      class="form-control"
                      v-model="form.slide_color_0"
                    />
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="form-group">
                    <label for="slide_color_1" class="control-label"
                      >Slide Color 1</label
                    >
                    <input
                      name="slide_color_1"
                      id="slide_color_1"
                      class="form-control"
                      v-model="form.slide_color_1"
                    />
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="form-group">
                    <label for="slide_color_2" class="control-label"
                      >Slide Color 2</label
                    >
                    <input
                      name="slide_color_2"
                      id="slide_color_2"
                      class="form-control"
                      v-model="form.slide_color_2"
                    />
                  </div>
                </div>
              </div>
            </template>
          </div>

          <div class="row">
            <div class="col-md-12">
              <div class="form-group">
                <!-- <button class="btn btn-primary" type="submit" :disabled="form.wiki_info_page_url !='' && form.wiki_image_copyright_free != true">Add Thread</button> -->

                <!-- <BaseButton :loading="form.busy" type="success">Post Your Story</BaseButton>
                <BaseButton :loading="form.busy">Add An Image</BaseButton> -->
                <button
                  :disabled="form.busy"
                  type="button"
                  class="btn btn-success"
                  @click="createAndGoThread"
                >
                  <span v-if="form.busy">
                    <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="spinner" class="svg-inline--fa fa-spinner" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M304 48c0 26.51-21.49 48-48 48s-48-21.49-48-48 21.49-48 48-48 48 21.49 48 48zm-48 368c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zm208-208c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zM96 256c0-26.51-21.49-48-48-48S0 229.49 0 256s21.49 48 48 48 48-21.49 48-48zm12.922 99.078c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.491-48-48-48zm294.156 0c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.49-48-48-48zM108.922 60.922c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.491-48-48-48z"></path>
                    </svg>
                  </span>
                  Post Your Story
                </button>
                <button
                  :disabled="form.busy"
                  type="submit"
                  class="btn btn-primary"
                >
                  <span v-if="form.busy">
                    <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="spinner" class="svg-inline--fa fa-spinner" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M304 48c0 26.51-21.49 48-48 48s-48-21.49-48-48 21.49-48 48-48 48 21.49 48 48zm-48 368c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zm208-208c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zM96 256c0-26.51-21.49-48-48-48S0 229.49 0 256s21.49 48 48 48 48-21.49 48-48zm12.922 99.078c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.491-48-48-48zm294.156 0c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.49-48-48-48zM108.922 60.922c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.491-48-48-48z"></path>
                    </svg>
                  </span>
                  Add An Image
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
     <ShareModal v-if="show_share_modal" :thread="createdThread" @share-cancel="cancelShare(createdThread)" @hide-share-modal="show_share_modal = false"  @share-complete="completeShare(createdThread)" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import {serialize} from 'object-to-formdata'
import scrollToTop from '@/mixins/scrollToTop'
import userStatus from '@/mixins/userStatus'
import createEditThread from '@/mixins/createEditThread'
import ThreadShare from '@/mixins/threadShare'

export default {
  components: { },
  mixins: [scrollToTop,userStatus,createEditThread, ThreadShare],

  data() {
    return {
      title_case: true,
      createdThread: {},
      editor: null,
      editorConfig: {
        height: 300,
        extraAllowedContent: 'iframe[*]',
        contentsCss: [
          'body {font-size: 22px;}',
          'blockquote { display: block !important;}',
          'blockquote { margin-block-start: 1em !important;}',
          'blockquote { margin-block-end: 1em !important;}',
          'blockquote { margin-inline-start: 40px !important;}',
          'blockquote { margin-inline-end: 40px !important;}',
        ],
        scayt_autoStartup: true
      }
    };
  },
  head() {
    return {
      title: `${this.settings.site_title} | Create New Thread`,
    };
  },
  mounted() {
    // Wait for CKEditor to be loaded
    if (window.CKEDITOR) {
      this.initEditor();
    } else {
      // If CKEditor is not loaded yet, wait for it
      window.addEventListener('load', () => {
        if (window.CKEDITOR) {
          this.initEditor();
        }
      });
    }
  },
  beforeDestroy() {
    // Clean up editor instance
    if (this.editor) {
      this.editor.destroy();
    }
  },
  watch: {
    'form.title': {
      handler(newVal) {
        if (this.title_case && newVal) {
          this.form.title = this.toTitleCase(newVal);
        }
      },
      immediate: true
    },
    title_case: {
      handler(newVal) {
        if (newVal && this.form.title) {
          this.form.title = this.toTitleCase(this.form.title);
        }
      }
    }
  },
  methods: {
    toTitleCase(str) {
      if (!str) return '';
      return str.replace(
        /\w\S*/g,
        function(txt) {
          return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        }
      );
    },
    initEditor() {
      this.editor = CKEDITOR.replace('editor', this.editorConfig);
      
      // Set initial content if needed
      if (this.form.body) {
        this.editor.setData(this.form.body);
      }
      
      // Sync editor changes to v-model
      this.editor.on('change', () => {
        this.form.body = this.editor.getData();
      });
    },
    createAndGoThumb(){
     this.addNewThread().then(res=>{
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
    createAndGoThread(){
      this.addNewThread().then(res=>{
        this.show_share_modal = true;
      });
    },
    addNewThread() {
      this.errors = [];
      return this.form
        .submit('post',`threads`, {
              transformRequest: [ function (data, headers) {
                return serialize(data)
              }],

        } )
        .then((res) => {
          this.createdThread = res.data;

          this.$toast.open({
            type: 'success',
            position: 'top-right',
            message: 'Thread create Successfully',
          });
          return res;

        })
        .catch((err) => {
          // console.log(err);
        });
    },
    //Currently unused
    //  handleSlideImagePath (event) {
    //   const file = event.target.files[0]
    //   this.form.slide_image_path = file
    // },
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

.uiv .dropdown-menu > .active > a,
.uiv .dropdown-menu > .active > a:focus,
.uiv .dropdown-menu > .active > a:hover {
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

.card-title{
  font-size:24px;
  font-weight: bold;
}
.big-label{
   line-height:32px;
    font-weight: 700;
    font-size: 20px;
}

span.import_wikipedia_image_checkbox{
  display: inline-flex;
  align-items: center;
  img {
    margin-left:5px;
  }
}

span.import_wikipedia_image_checkbox{
  display: inline-flex;
  align-items: center;
  img {
    margin-left:5px;
  }
}
</style>
