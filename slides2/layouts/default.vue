<template>
  <div class="main">
    <SiteNavigation></SiteNavigation>
    <nuxt />
    <SiteFooter></SiteFooter>
    <SubmitModal></SubmitModal>
  </div>
</template>

<script>
import SiteNavigation from './partials/navigation';
import SiteFooter from './partials/footer';
import SubmitModal from '~/components/slides/buttons/Modal.vue';

import {mapGetters} from 'vuex'
export default {
  components: {
    SiteNavigation,
    SiteFooter,
    SubmitModal
  },
  head(){
    return {
      link: [{
          hid: 'icon',
          rel: 'icon',
          type: 'image/x-icon',
          href: this.settings.favicon_path
      }]
    }
  },

  computed: {
    ...mapGetters({
      settings: 'settings',
    }),
  },
};
</script>

<style lang="scss" scoped>
  .main {
    max-width: inherit;
  }
</style>
