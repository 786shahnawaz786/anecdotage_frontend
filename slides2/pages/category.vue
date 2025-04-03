<template>
  <div>
    <Slides />
    <!-- Categories -->

    <Trending />
  </div>
</template>

<script>
import Trending from '@/components/Trending';
import Slides from '@/components/Slides';
export default {
  components: {
    Trending,
    Slides,
  },
  head() {
    // Set Meta Tags for this Page
    script: [
      // { type: 'text/javascript', src: '~/assets/js/fsLiteSlideshow1.js' },
    ];
  },
  mounted() {
      document.body.scrollTop = 0; // For Safari
      document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  },
  methods: {
    // const slides = await $axios.$get(`slides/all?per_page=100`)
  },
  beforeRouteUpdate(to, from, next){
    let fromRouteParam = from.params.route;
    let toRouteParam = to.params.route;

    if(fromRouteParam && toRouteParam){
      let fromParam = fromRouteParam.split('-').pop()
      let toParam = toRouteParam.split('-').pop()

      if(fromParam> toParam){
        this.$nuxt.$store.commit('SET_GO_LAST', true)
      }
    }

    next()
},

   watchQuery: true,

  async fetch({ params, query, error, $axios, store }) {
      store.commit('SET_IS_LOADED', false);
    let q = await Object.keys(query)
      .map((k) => `${k}=${query[k]}`)
      .join('&');



      let type;
      let param;

      if(params.route){
        const route = params.route;

        if(route.startsWith('p-')){
          type = 'page';

        }
        const splitParam = route.split('-');
        param = splitParam.length >0 ? splitParam[1]: null;
      }

      if(type == 'page' && param != null){
      q+= `&page=${param}`;
      }


    try {
          const slides = await $axios.$get(`/slides/category/${params.category}?${q}`)
          store.commit('SET_SLIDES', slides.data)
          store.commit('SET_SLIDE_PAGINATE', slides.meta)
            store.commit('SET_IS_LOADED', true);
          // console.log(slides)
    } catch (err) {
      if (err.response.status === 404) {
        error({ statusCode: 404, message: 'Category Not Found' });
      } else {
        error({ statusCode: 500, message: 'Server Error' });
      }
    }
  },
};
</script>
