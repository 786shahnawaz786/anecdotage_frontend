<template>
  <div class="row">
    <div class="col-md-12">
      <form @submit.prevent="updateInfo">
        <div class="form-group row">
          <label for="site_name" class="col-sm-4 col-form-label"
            >Site name</label
          >
          <div class="col-sm-8">
            <input
              type="text"
              class="form-control"
              id="site_name"
              placeholder="Site Name"
              v-model="form.site_name"
            />
          </div>
        </div>
        <div class="form-group row">
          <label for="site_title" class="col-sm-4 col-form-label"
            >Site Title</label
          >
          <div class="col-sm-8">
            <input
              type="text"
              class="form-control"
              id="site_title"
              placeholder="Site Title"
              v-model="form.site_title"
            />
          </div>
        </div>
        <div class="form-group row">
          <label for="default_email_address" class="col-sm-4 col-form-label"
            >Default Email Address</label
          >
          <div class="col-sm-8">
            <input
              type="text"
              class="form-control"
              id="default_email_address"
              placeholder="Default Email Address"
              v-model="form.default_email_address"
            />
          </div>
        </div>
        <div class="form-group row">
          <label for="footer_copyright_text" class="col-sm-4 col-form-label"
            >Footer Copyright Text</label
          >
          <div class="col-sm-8">
            <input
              type="text"
              class="form-control"
              id="footer_copyright_text"
              placeholder="Footer Copyright Text"
              v-model="form.footer_copyright_text"
            />
          </div>
        </div>
        <div class="form-group row">
          <label for="seo_meta_title" class="col-sm-4 col-form-label"
            >Seo Meta Title</label
          >
          <div class="col-sm-8">
            <input
              type="text"
              class="form-control"
              id="seo_meta_title"
              placeholder="Seo Meta Title"
              v-model="form.seo_meta_title"
            />
          </div>
        </div>
        <div class="form-group row">
          <label for="seo_meta_description" class="col-sm-4 col-form-label"
            >Seo Meta Description</label
          >
          <div class="col-sm-8">
            <textarea
              cols="30"
              rows="2"
              class="form-control"
              id="seo_meta_description"
              placeholder="Seo Meta Description"
              v-model="form.seo_meta_description"
            ></textarea>
          </div>
        </div>
        <div class="form-group row">
          <label for="seo_meta_keyword" class="col-sm-4 col-form-label"
            >Seo Meta Keywords</label
          >
          <div class="col-sm-8">
            <textarea
              cols="30"
              rows="2"
              class="form-control"
              id="seo_meta_keyword"
              placeholder="Seo Meta Keywords"
              v-model="form.seo_meta_keyword"
            ></textarea>
          </div>
        </div>
        <div class="form-group row">
          <label for="social_facebook" class="col-sm-4 col-form-label"
            >Social Facebook</label
          >
          <div class="col-sm-8">
            <input
              type="text"
              class="form-control"
              id="social_facebook"
              placeholder="Social Facebook"
              v-model="form.social_facebook"
            />
          </div>
        </div>
        <div class="form-group row">
          <label for="social_twitter" class="col-sm-4 col-form-label"
            >Social Twitter</label
          >
          <div class="col-sm-8">
            <input
              type="text"
              class="form-control"
              id="social_twitter"
              placeholder="Social Twitter"
              v-model="form.social_twitter"
            />
          </div>
        </div>
        <div class="form-group row">
          <label for="social_instagram" class="col-sm-4 col-form-label"
            >Social Instagram</label
          >
          <div class="col-sm-8">
            <input
              type="text"
              class="form-control"
              id="social_instagram"
              placeholder="Social Instagram"
              v-model="form.social_instagram"
            />
          </div>
        </div>
        <div class="form-group row">
          <label for="social_linkedin" class="col-sm-4 col-form-label"
            >Social Linkedin</label
          >
          <div class="col-sm-8">
            <input
              type="text"
              class="form-control"
              id="social_linkedin"
              placeholder="Social Linkedin"
              v-model="form.social_linkedin"
            />
          </div>
        </div>
        <div class="form-group row">
          <label for="google_analytics" class="col-sm-4 col-form-label"
            >Google Analytics</label
          >
          <div class="col-sm-8">
            <textarea
              cols="30"
              rows="2"
              class="form-control"
              id="google_analytics"
              placeholder="Google Analytics"
              v-model="form.google_analytics"
            ></textarea>
          </div>
        </div>
        <div class="form-group row">
          <label for="facebook_pixels" class="col-sm-4 col-form-label"
            >Facebook Pixels</label
          >
          <div class="col-sm-8">
            <textarea
              cols="30"
              rows="2"
              class="form-control"
              id="facebook_pixels"
              placeholder="Facebook Pixels"
              v-model="form.facebook_pixels"
            ></textarea>
          </div>
        </div>
        <div class="form-group row">
          <div class="col-sm-8 offset-sm-4">
            <base-button :loading="form.busy"> Update </base-button>
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
      form: this.$vform({
        site_name: '',
        site_title: '',
        default_email_address: '',
        footer_copyright_text: '',
        seo_meta_title: '',
        seo_meta_description: '',
        seo_meta_keyword: '',
        social_facebook: '',
        social_twitter: '',
        social_instagram: '',
        social_linkedin: '',
        google_analytics: '',
        facebook_pixels: '',
      }),
    };
  },
  head() {
    return {
      title: this.settings.site_title,
    };
  },
  computed: {
    settings() {
      return this.$store.getters.settings;
    },
  },
  methods: {
    async updateInfo() {
      try {
        const settings = await this.form.put(`slides/admin/settings`, this.form);
        this.$store.commit('SET_SETTINGS', settings.data)
        this.$toast.open({
          type: 'success',
          position: 'top-right',
          message: 'Settings Update Successfully',
          // duration: 300000
        });


      } catch (e) {}
    },
  },
  mounted() {
    Object.keys(this.form).forEach((k) => {
      if (this.settings.hasOwnProperty(k)) {
        this.form[k] = this.settings[k];
      }
    });
  },
};
</script>

<style lang="scss" scoped>
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
  }

  .nav-pills .nav-link {
   color: #007bff;
      &:visited {
            color: #007bff;
      }
  }

  .nav-pills .nav-link.active, .nav-pills .show > .nav-link {
      color: #fff;
      background-color: #007bff;
  }

  a:visited {
      color:  #007bff;
  }

</style>
