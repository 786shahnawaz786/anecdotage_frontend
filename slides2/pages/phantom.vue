<template>
  <div>
    <Slides :arrow="false" />
  </div>
</template>

<script>
import Slides from '@/components/Slides';
export default {
  components: {
    Slides,
  },
  head() {
    // Set Meta Tags for this Page
    script: [
      // { type: 'text/javascript', src: '~/assets/js/fsLiteSlideshow1.js' },
    ];
  },
  data(){
    return {
      goLast: false,
    }
  },

  async fetch({ params, query, error, $axios, store }) {
    await store.commit('SET_IS_LOADED', false);
    try {
       let url = `/slides/slide/${params.slug}`

      const slides = await $axios.$get(url)
      if(slides.meta.total == 0){
        error({ statusCode: 404, message: 'Slide Not Found' });
      }


      store.commit('SET_SLIDES', slides.data)
      store.commit('SET_SLIDE_PAGINATE', slides.meta)
      store.commit('SET_IS_LOADED', true);
      // console.log(slides)
    } catch (err) {
      if (err.response.status === 404) {
        error({ statusCode: 404, message: 'Slide Not Found' });
      } else {
        error({ statusCode: 500, message: 'Server Error' });
      }
    }
  },
};
</script>
