<template>
  <div>
    <!-- Items -->
    <div id="items" itemprop="articleBody" style="margin-bottom: 0.4em">
      <ol id="itemsContainer" itemscope itemtype="http://schema.org/ItemList">
        <!-- <Full  :left="0" :id="1" />
        <Solid  :left="200" :id="2" />
        <Full  :left="200" :id="3" /> -->
      <template v-for="(slide, index) in slides" >
        <template v-if="slide.slide_image_pos=='r'">
          <Right :left="index > 0 ? 200: 0" :id="index + 1" :key="slide.id" :slide="slide"   />
        </template>


        <template v-else-if="slide.slide_image_pos=='rb'">
          <RightBig :left="index > 0 ? 200: 0" :id="index + 1" :key="slide.id" :slide="slide"   />
        </template>


        <template v-else-if="slide.slide_image_pos=='l'">
          <Left :left="index > 0 ? 200: 0" :id="index + 1" :key="slide.id" :slide="slide"   />
        </template>
        <template v-else-if="slide.slide_image_pos=='lb'">
          <LeftBig :left="index > 0 ? 200: 0" :id="index + 1" :key="slide.id" :slide="slide"   />
        </template>


        <template v-else-if="slide.slide_image_pos=='t'">
          <Top :left="index > 0 ? 200: 0" :id="index + 1" :key="slide.id" :slide="slide"   />
        </template>
        <template v-else-if="slide.slide_image_pos=='b'">
          <Bottom :left="index > 0 ? 200: 0" :id="index + 1" :key="slide.id" :slide="slide"   />
        </template>
        <template v-else-if="slide.slide_image_pos=='f'">
          <Full :left="index > 0 ? 200: 0" :id="index + 1" :key="slide.id"  :slide="slide"  />
        </template>
        <template v-else-if="slide.slide_image_pos=='s'">
          <Solid :left="index > 0 ? 200: 0" :id="index + 1" :key="slide.id" :slide="slide"  />
        </template>
        <template v-else-if="slide.slide_image_pos=='ru'">
          <RepeatUp :left="index > 0 ? 200: 0" :id="index + 1" :key="slide.id" :slide="slide"   />
        </template>
        <template v-else-if="slide.slide_image_pos=='rd'">
          <RepeatDown :left="index > 0 ? 200: 0" :id="index + 1" :key="slide.id"  :slide="slide"  />
        </template>

        <template v-else-if="slide.slide_image_pos=='rp' || slide.slide_image_pos=='p'">
          <RepeatPair :left="index > 0 ? 200: 0" :id="index + 1" :key="slide.id" :slide="slide"   />
        </template>


        <template v-else-if="slide.slide_image_pos=='ll'">
          <LeftL :left="index > 0 ? 200: 0" :id="index + 1" :key="slide.id" :slide="slide"   />
        </template>
        <template v-else-if="slide.slide_image_pos=='lt'">
          <LeftT :left="index > 0 ? 200: 0" :id="index + 1" :key="slide.id" :slide="slide"   />
        </template>


        <template v-else-if="slide.slide_image_pos=='rr'">
          <RightR :left="index > 0 ? 200: 0" :id="index + 1" :key="slide.id" :slide="slide"   />
        </template>

        <template v-else-if="slide.slide_image_pos=='rt'">
          <RightT :left="index > 0 ? 200: 0" :id="index + 1" :key="slide.id" :slide="slide"   />
        </template>



      </template>
      </ol>
    </div>

    <!-- Items end -->

    <template v-if="arrow">
        <!-- Prev button -->
        <a id="prevA" href="#" @click.prevent="getItem(true)"  v-if="is_loaded"
          >
          <!-- <img id="prevT" src="~assets/images/prevT.png" border="0" /><img
            id="prev"
            src="~assets/images/prevV2.png"
            border="0"
            title="TIP: You can also press the <-- arrow on your keyboard"
        /> -->
          <img id="prevT" src="~assets/images/back.png" border="0" /><img
            id="prev"
            src="~assets/images/prevV2.png"
            border="0"
            title="TIP: You can also press the <-- arrow on your keyboard"
        />


        </a>

        <!-- "Next" button -->
        <a id="nextA" @click.prevent="getItem(false)" href="/p-2" v-if="is_loaded"
          >
          <!-- <img id="nextT" src="~assets/images/nextT.png" border="0" /> -->
          <img id="nextT" src="~assets/images/next.png" border="0" />
          <img
            id="next"
            src="~assets/images/nextV2.png"
            border="0"
            title="TIP: You can also press the --> arrow on your keyboard"
        /></a>
    </template>
  </div>
</template>

<script>
import Top from './slides/Top';
import Bottom from './slides/Bottom';
import Full from './slides/Full';
import Solid from './slides/Solid';
import Left from './slides/Left';
import LeftBig from './slides/LeftBig';

import Right from './slides/Right';
import RightBig from './slides/RightBig';

import RepeatDown from './slides/RepeatDown';
import RepeatPair from './slides/RepeatPair';
import RepeatUp from './slides/RepeatUp';

import LeftL from './slides/LeftL';
import LeftT from './slides/LeftT';
import RightR from './slides/RightR';
import RightT from './slides/RightT';




import { mapGetters } from 'vuex';
import hotkeys from 'hotkeys-js';

export default {
  components: {
    Top,
    Bottom,
    Full,
    Solid,
    Left,
    LeftBig,
    Right,
    RightBig,
    RepeatDown,
    RepeatUp,
    RepeatPair,
    LeftL,
    LeftT,
    RightR,
    RightT,
  },
  head() {
    return this.headData
  },
  props: {
    arrow: {
      type: Boolean,
      default: true
    }
  },

  data() {
    return {
      item: 1,
      theEnd: false,
      pageN: 1,
      // pageSize: 9,
      // totalItems: 9,
      per_page: 10,
    };
  },
  watch:{
    item(oldSlide, newSlide){
      // this.$store.commit('SET_SLIDE_LOGO_COLOR', newSlide.slide_logo_color)
      if(this.slides[oldSlide-1]){
        this.$store.commit('SET_SLIDE_LOGO_COLOR',this.slides[oldSlide-1].slide_logo_color)
      }
    }
  },
  created() {
    this.$nuxt.$on('goToNext', ()=>{
      // console.log('call next')
      this.getItem(false);
    })
  },
  mounted() {
      if(this.currentSlide){
        this.$store.commit('SET_SLIDE_LOGO_COLOR', this.currentSlide.slide_logo_color);
      }

      //Disable prev button hide
      // if(this.pagiinateData.current_page > 1 || this.item > 1){
      //   $('#prevA').show();
      // }else{
      //    $('#prevA').hide();
      // }

      // $('#prevA').show();

      //Disable prev button hide

      if(this.goLast){
          this.getItem(false);
          this.getItem(false);
          this.getItem(false);
          this.getItem(false);
          this.getItem(false);
          this.getItem(false);
          this.getItem(false);
          this.getItem(false);
          this.getItem(false);
          this.$nuxt.$store.commit('SET_GO_LAST', false)
      }

    this.registeredKeyboardShortcuts();

  },
  methods: {
    registeredKeyboardShortcuts(){
      hotkeys('left, right', (event, handler)=>{
        switch(handler.key){
          case 'left':
            this.getItem(true);
            break;
          case 'right':
            this.getItem(false);
            break;
        }
      })
    },

    getItem(isPrev) {
      // set current item number.. either if we are going backwards (PREV)
      if (isPrev) {
        if(this.item == 1 && this.pagiinateData.current_page ==1){
          return ;
        }

        this.item -= 1;
        this.theEnd = false;
        // console.log(this.item)



        if( this.item == 0 &&  this.pagiinateData.current_page > 1){
         const routeName = this.$route.name;

          if(routeName == 'category'){
            this.$router.push({name: routeName, params:{category:this.$route.params.category, route: `p-${this.pagiinateData.current_page - 1}`}})
          }else{
            this.$router.push({name: routeName, params:{route: `p-${this.pagiinateData.current_page - 1}`}})
          }

        }

        // ... or we are going forward (NEXT)...
      } else {
        if(this.item == 1 && this.pagiinateData.current_page == 1 && this.pagiinateData.total == 1){
           this.$router.push({name: 'index'})
        }





        if( this.item == this.pagiinateData.per_page &&  this.pagiinateData.current_page < this.pagiinateData.last_page){
         const routeName = this.$route.name;

          if(routeName == 'category'){
            this.$router.push({name: routeName, params:{category:this.$route.params.category, route: `p-${this.pagiinateData.current_page + 1}`}})
          }else{
            this.$router.push({name: routeName, params:{route: `p-${this.pagiinateData.current_page + 1}`}})
          }

        }
        this.item += 1;
      }

      // show / hide the prev button
      // if (this.item > 1 || this.pageN > 1) {
      //   $('#prevA').show();
      // } else {
      //   $('#prevA').hide();
      // }


      //Disable prev button hide
      //  $('#prevA').show();
      // if(this.pagiinateData.current_page > 1 || this.item > 1){
      //   $('#prevA').show();
      // }else{
      //    $('#prevA').hide();
      // }

      //Disable prev button hide

      // show / hide the prev button
      if (this.item == this.totalItems || ((this.pagiinateData.current_page -1) * this.pagiinateData.per_page + this.item == this.pagiinateData.total)) {
        $('#nextA').hide();
      } else {
        $('#nextA').show();
      }

      // ------ move the slider

      //  move the previous item to the left... move the current item to the middle... move the next item to the right
      $('.i').hide();
      this.getItemSlideEffect(-2, isPrev);
      this.getItemSlideEffect(-1, isPrev);
      this.getItemSlideEffect(0, isPrev);
      this.getItemSlideEffect(+1, isPrev);
    },
    getItemSlideEffect(i, isPrev) {

      var obj = $('#items')
        .find('ol')
        .find('#i' + (this.item + i));
      if (obj == null) {
        return false;
      }

      switch (i) {
        case -2:
          obj.animate({ opacity: '0.3', left: '-200%' }, 500);
          break;
        case -1:
          if (isPrev) {
            obj.css('left', '-200%');
          }
          obj.show();
          obj.animate({ opacity: '0.2', left: '-100%' }, 500);
          break;

        // place the item on the screen
        case 0:
          if (isPrev) {
            obj.css('left', '-100%');
          }
          obj.show();
          obj.animate({ opacity: '1', left: '0%' }, 500);
          break;

        // place the item up next
        case 1:
          obj.css('left', !isPrev ? '200%' : '0%');
          obj.show();
          obj.animate({ opacity: '0.2', left: '100%' }, 500);
          break;
      }
    },

    async fetchSlide(page) {
      store.commit('SET_IS_LOADED', false);
      try {
        let url = ''
        if ('category' === this.$route.name) {
           url = `/slides/category/${this.$route.params.category}/?page=${page}&per_page=${this.per_page}`
        }else {
          url = `/slides/all/?page=${page}&per_page=${this.per_page}`
        }


        const slides = await this.$axios.$get(url)
        this.$store.commit('PUSH_SLIDES', slides.data)
        this.$store.commit('SET_SLIDE_PAGINATE', slides.meta)
        store.commit('SET_IS_LOADED', true);

      } catch (err) {
        if (err.response.status === 404) {
          error({ statusCode: 404, message: 'Slide Not Found' });
        } else {
          error({ statusCode: 500, message: 'Server Error' });
        }
      }
    },
  },
  computed: {
    ...mapGetters({
      settings: 'settings',
      slides: 'slides',
      pagiinateData: 'slidePaginate',
      is_loaded: 'isLoaded',
      goLast: 'goLast'
    }),
    totalItems(){
      return this.pagiinateData.total
    },
    pageSize(){
      return this.pagiinateData.total
    },
    currentSlide(){
      return this.slides[this.item - 1];
    },
    slideUrl(){
      return this.$router.resolve({
            name: 'index',
            params: { route: `i-${this.currentSlide.id}` },
          }).href
    },
    stripTagTitle() {
      return this.currentSlide.title.replace(/(<([^>]+)>)/gi, '');
    },
    headData(){
      if(this.is_loaded && this.currentSlide){
        return {
          title: `${this.stripTagTitle}`,
          meta: [
            // hid is used as unique identifier. Do not use `vmid` for it as it will not work
            {
              content:  this.currentSlide.slide_screenshot_path,
              property: 'og:image',
            },
            {
              content: this.settings.site_name,
              property: 'og:site_name',
            },
            {
              content: this.stripTagTitle,
              property: 'og:title',
            },
            {
              content: this.slideUrl,
              property: 'og:url',
            },
            {
              content: 'article',
              property: 'og:type',
            },
            {
              content: this.currentSlide.seo_meta_description,
              property: 'og:description',
            },
            {
              content: 'summary_large_image',
              name: 'twitter:card',
            },
            {
              content: '@anecdotage',
              name: 'twitter:site',
            },
            {
              content: '@anecdotage',
              name: 'twitter:creator',
            },
            {
              content:  this.slideUrl,
              name: 'twitter:url',
            },
            {
              content: this.stripTagTitle,
              name: 'twitter:title',
            },
            {
              content: this.currentSlide.seo_meta_description,
              name: 'twitter:description',
            },
            {
              content: this.currentSlide.thread_image_path,
              name: 'twitter:image',
            },

            //Meta Information
            {
              content: this.stripTagTitle,
              name: 'title',
            },
            //Meta Information
            {
              content: this.currentSlide.seo_meta_description,
              name: 'description',
            },
            {
              content: this.currentSlide.seo_meta_keyword + this.settings.seo_meta_keyword,
              name: 'keywords',
            },
          ],
        };
      }else{
         return {
          title: `${this.settings.site_title}`,
          meta: [

          ],
        };
      }
    }
  },

};
</script>

<style lang="scss" scoped>
</style>
