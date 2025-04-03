<template>
  <div>
    <div>
    <!-- Items -->
    <div id="items" itemprop="articleBody" style="margin-bottom: 0.4em">
      <ol id="itemsContainer" itemscope itemtype="http://schema.org/ItemList">
      <template v-for="(slide, index) in slides" >
          <Potraits :left="index > 0 ? 200: 0" :id="index + 1" :key="slide.id" :slide="slide"   />
      </template>
      </ol>
    </div>
  </div>
  </div>
</template>

<script>

import Potraits from '@/components/slides/Potraits';




import { mapGetters } from 'vuex';
export default {
  components: {
    Potraits,
  },
  layout: 'potrait',
  data(){
    return {

    }
  },
  computed: {
     ...mapGetters({
      settings: 'settings',
      slides: 'slides',
    }),
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
