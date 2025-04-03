<template>
  <div class="container">
    <div class="row">
      <div class="col-md-12">
        <div class="content">
          <single-screenshot   v-for="screenshot in screenshots" :key="screenshot.id" :slide="screenshot" />
        </div>
        <div class="pagination-content">
          <Pagination
            :pagination="pageinateData"
            routeName="screenshots"
            :param="{ key: '', value: '' }"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import { mapGetters } from 'vuex';
import Pagination from '@/components/Pagination';
import SingleScreenshot from '~/components/SingleScreenshot.vue';
export default {
  name: 'screenshots',
  head() {
    return {
      title: `Anecdotage | Stories | Screenshots`,
    };
  },
  components:{
    Pagination,
    SingleScreenshot,
  },
  computed: {
    ...mapGetters({
      settings: 'settings',
      screenshots: 'screenshots',
      pageinateData: 'screenshotPaginateData',
    }),

  },
  mounted() {
    document.querySelector('body').style.backgroundColor = '#ffffff';
  },

   watchQuery: true,

  async fetch({ params, query, error, $axios, store }) {
    try {
      let q = await Object.keys(query)
        .map((k) => `${k}=${query[k]}`)
        .join('&');

      const screenshots = await $axios.$get(`/slides/screenshots?${q}`);
      store.commit('SET_SCREENSHOTS',screenshots.data)
      store.commit('SET_SCREENSHOTS_PAGINATE',screenshots.meta)
      // console.log(slides)
    } catch (err) {
      if (err.response.status === 404) {
        error({ statusCode: 404, message: 'Screenshot Not Found' });
      } else {
        error({ statusCode: 500, message: 'Server Error' });
      }
    }
  },
};
</script>

<style lang="scss" scoped>
  body{
    background-color: white !important;
  }
  .content{
    min-height: 70vh;
    color: white;
    font-size: 24px;
    line-height: 36px;
    font-family: sans-serif;
  }
  .pagination-content{
    display: flex;
    justify-content: center;
  }

</style>
