<template>
  <div class="container">
    <div class="row">
      <div class="col-md-12">
        <div class="content">
          <div class="card">
            <div class="card-body"  v-html="settings.privacypolicy"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import { mapGetters } from 'vuex';

export default {
  name: 'privacy',
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
};
</script>

<style lang="scss" scoped>
  .content{
    min-height: 70vh;
    color: white;
    font-size: 24px;
    line-height: 36px;
    font-family: sans-serif;
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
      min-height: 60vh
  }
</style>
