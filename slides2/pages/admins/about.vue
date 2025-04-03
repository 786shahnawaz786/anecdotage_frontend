<template>
  <div class="row">
    <div class="col-md-12">
      <form @submit.prevent="updateInfo">
        <div class="form-group row">
          <div class="col-sm-12">
            <vue-ckeditor v-model="form.about" :config="config" />
          </div>
        </div>
        <div class="form-group row">
          <div class="col-sm-12">
            <base-button :loading="form.busy"> Update About </base-button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import VueCkeditor from 'vue-ckeditor2';
export default {
  data() {
    return {
      config: {
        height: 300,
      },
      form: this.$vform({
        about: '',
      }),
    };
  },
  components: { VueCkeditor },
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
          message: 'Terms Update Successfully',
        });
      } catch (e) {}
    },
  },
  mounted() {
    this.form.about = this.settings.about;
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
