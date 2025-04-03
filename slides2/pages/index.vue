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
  data(){
    return {
      goLast: false,
    }
  },
  mounted() {},
  // beforeRouteEnter(to, from, next){
  //   console.log('to', to)
  //   console.log('from', from)
  //   next()
  // },
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
    await store.commit('SET_IS_LOADED', false);
    let q = await Object.keys(query)
      .map((k) => `${k}=${query[k]}`)
      .join('&');

    let type;
    let param;

    if(params.route){
      const route = params.route;

      if(route.startsWith('p-')){
        type = 'page';
        const splitParam = route.split('-');
        param = splitParam.length >0 ? splitParam[1]: null;
      }
      else{
        param = route;
        type = 'id'
      }
      // else if(route.startsWith('i-')){
      //   type = 'id'
      // }

      // else if(route.startsWith('i-')){
      //   param = route;
      //   type = 'id'
      //   // const splitParam = route.split('-');
      //   // if(splitParam.length >0){
      //   //    splitParam.shift();
      //   //    param = splitParam.join('-')
      //   // }
      // }

      //  param = route;

      // const splitParam = route.split('-');
    }

    if(type == 'page' && param != null){
     q+= `&page=${param}`;
    }




    try {
        let url = `/slides/all/?${q}`
      if(type && type =='id'){
        url = `/slides/slide/${param}`
      }

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
