<template>
  <div class="container">
    <div class="row">
      <div class="col-md-12">
        <div class="content">
            <div class="card card-m-5">
                  <div class="card-body">
                    <form @submit.prevent="submit">
                      <div class="form-group row">
                        <label for="name" class="col-sm-3 col-form-label"
                          >Name <span class="required">*</span>
                        </label>
                        <div class="col-sm-9">
                          <base-input
                            :form="form"
                            field="name"
                            inputType="text"
                            v-model="form.name"
                            id="name"
                            placeholder="Enter Your Name"
                          ></base-input>
                        </div>
                      </div>
                      <div class="form-group row">
                        <label for="subject" class="col-sm-3 col-form-label"
                          >Subject <span class="required">*</span>
                        </label>
                        <div class="col-sm-9">
                          <base-input
                            :form="form"
                            field="subject"
                            inputType="text"
                            v-model="form.subject"
                            id="subject"
                            placeholder="Enter Your Subject"
                          ></base-input>
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
                          <base-button :loading="form.busy"> Submit </base-button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
         </div>
      </div>
    </div>
  </div>
</template>


<script>
import VueCkeditor from 'vue-ckeditor2';
import { mapGetters } from 'vuex';
export default {
  name: 'contact',
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
    };
  },
  computed: {
    ...mapGetters({
      settings: 'settings',
    }),
  },
  components: {
    VueCkeditor,
  },
  methods: {
    async submit() {
      try {
        const res = await this.form.post('contact');

        this.form.body = ''
        this.form.name = ''
        this.form.subject = ''

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

 .card-body{
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
      font-size: 16px;
      font-weight: 400;
      line-height: 1.5;
      color: #212529;
      text-align: left;
      background-color: #fff;

        a {
        color: #007bff;
      }

      min-height: 60vh;
  }
</style>
