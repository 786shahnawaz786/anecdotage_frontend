<template>
  <div class="row">
    <div class="col-md-12">
        <div class="row">
          <div class="col-md-2"></div>
          <div class="col-md-8">
            <br>
            <br>
            <br>
            <br>
          </div>
        </div>
        <div class="row">
          <div class="col-md-2"></div>
          <div class="col-md-8">
            <button class="btn btn-primary btn-lg" @click.prevent="createAllReadySlideScreenshots">Create All Ready Slide Screenshots</button>
          </div>
        </div>
        <br>
        <br>
        <hr>
        <br>
        <br>
        <div class="row">
          <div class="col-md-2"></div>
          <div class="col-md-8">
            <button class="btn btn-success btn-lg" @click.prevent="createNewReadySlideScreenshots">Create New Ready Slide Screenshots</button>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {

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
    async createNewReadySlideScreenshots(){
      try {
        const category = await this.$axios.$post(`slides/admin/slides/batch-screenshot`);
        this.$toast.open({
          type: 'success',
          position: 'top-right',
          message: 'Slides add to queue for create screenshots.',
          // duration: 300000
        });

      } catch (error) {

      }
    },
    async createAllReadySlideScreenshots(){
      try {
        const category = await this.$axios.$post(`slides/admin/slides/batch-screenshot`,{type:2});
        this.$toast.open({
          type: 'success',
          position: 'top-right',
          message: 'Slides add to queue for create screenshots.',
          // duration: 300000
        });

      } catch (error) {

      }
    },

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

  td {
    background-color: transparent;
    color:#212529;
    font-family: serif;
  }

</style>
