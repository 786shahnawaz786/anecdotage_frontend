<template>
  <div class="container">
    <div class="row">
      <div class="col-md-12">
        <div></div>
        <div class="card card-m-5">
          <div class="card-body">
          <h1>Welcome</h1>
            <form @submit.prevent="submit">
              <div class="form-group row">
                <label for="name" class="col-sm-3 col-form-label"
                  >Name <span class="required">*</span>
                </label>
                <div class="col-sm-9">
                  <BaseInput
                    :form="form"
                    field="name"
                    inputType="text"
                    v-model="form.name"
                    id="name"
                    placeholder="Enter Your Name"
                  ></BaseInput>
                </div>
              </div>
              <div class="form-group row">
                <label for="subject" class="col-sm-3 col-form-label"
                  >Subject <span class="required">*</span>
                </label>
                <div class="col-sm-9">
                  <BaseInput
                    :form="form"
                    field="subject"
                    inputType="text"
                    v-model="form.subject"
                    id="subject"
                    placeholder="Enter Your Subject"
                  ></BaseInput>
                </div>
              </div>
              <div class="form-group row">
                <label for="body" class="col-sm-3 col-form-label"
                  >Body <span class="required">*</span>
                </label>
                <div class="col-sm-9">
                  <vue-ckeditor
                    v-model="form.body"
                    :config="config"
                    placeholder="Enter your body"
                  />
                  <p class="text-danger" v-if="form.errors.errors.body">
                    {{ form.errors.errors.body[0] }}
                  </p>
                </div>
              </div>
              <div class="form-group row">
                <div class="col-sm-9 offset-sm-3">
                  <BaseButton :loading="form.busy"> Submit </BaseButton>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <!-- <div class="col-md-4">
        <Sidebar />
      </div> -->
    </div>
  </div>
</template>

<script>
import Sidebar from '@/layouts/partials/Sidebar';
import VueCkeditor from 'vue-ckeditor2';
import { mapGetters } from 'vuex';
import scrollToTop from '@/mixins/scrollToTop'
import BaseInput from '@/components/form/inputs/BaseInput'
import BaseButton from '@/components/form/buttons/BaseButton'
export default {

  name: 'contact',
   mixins: [scrollToTop],
  data() {
    return {
      config: {
        height: 150,
      },
      form: this.$vform({
        body: '',
        name: '',
        subject: '',
      }),
    };
  },
  head() {
    return {
      title: this.settings.site_title,
      //  script:[
      //   {
      //     hid:'ckeditor',
      //     src:'https://cdn.ckeditor.com/4.10.0/standard/ckeditor.js',
      //     defer: true,
      //     callback: () => { this.ckeditorLoad = true }
      //   }
      // ]
    };
  },
  computed: {
    ...mapGetters({
      settings: 'settings',
    }),
  },
  components: {
    Sidebar,
    VueCkeditor,
    BaseInput, BaseButton
  },

  methods: {
    async submit() {
      try {
        const res = await this.form.post('contact');
        this.$toast.open({
          type: 'success',
          position: 'top-right',
          message: 'Your message sent to admin successfully',
        });
      } catch (error) {}
    },
  },
};
</script>


<style lang="scss" scoped>
span.required {
  color: red;
  /* padding-top: 2px; */
  /* line-height: unset; */
}
</style>

