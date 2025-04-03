<template>
  <div
     :id="`i${id}`"
    class="i"
    style="background-size: cover;background-position: center center;background-repeat: no-repeat-x;display: block;opacity: 1;left: 200%;"
    :style="{
      'background-image': `url(${backgroundImagePath})`,
      left: leftStyle
    }"
  >
    <li>
      <div style="width: 100%; height: 30%"></div>
      <div
        :id="`i${id}t1`"
        style="width: 100%;height: 40%;text-align: center;line-height: 110%;color: #3c8d10;"
         :style="{'background-color': `#${slide.slide_color_bg}` ,'font-size': contentFontSize}"
         :data-content-length="slide.slide_body_length"
      >
        <div class="i_stripes_t i_vAlign50">
          <div>
            <div :style="{'color': `#${slide.slide_color_0}`}" v-html="slide.style_slide_body"></div>
            <SlideTools :slide="slide" />
          </div>
        </div>
      </div>
    </li>
  </div>
</template>

<script>
import SlideTools from './buttons/SlideTools';
export default {
   props:{
    left: {
      type: Number,
      required: true,
    },
    id: {
      type: Number,
      required: true,
    },
    slide: {
      type: Object,
      required: true,
    },
  },
  components: {
    SlideTools
  },
  computed: {
    leftStyle(){
      return this.left > 0 ? `${this.left}%` : '0%'
    },
     backgroundImagePath(){
      return this.slide.thread_slide_image_path;
    },
     contentFontSize(){
      const length = this.slide.slide_body_length

       if(length<40){
        return '170%'
      }



      else if(length< 50){
        return '150%'
      }
      else if(length< 60){
        return '140%'
      }
      else if(length< 65){
        return '130%'
      }


      else if(length< 70){
        return '120%'
      }

      else if(length< 75){
        return '115%'
      }

      else if(length< 80){
        return '110%'
      }

      else if(length< 85){
        return '105%'
      }

      else if(length< 90){
        return '100%'
      }


      else if(length< 95){
        return '98%'
      }


      else if(length< 100){
        return '90%'
      }

      else if(length< 105){
        return '88%'
      }


      else if(length< 110){
        return '85%'
      }
      else if(length< 115){
        return '80%'
      }
      else if(length< 120){
        return '78%'
      }
      else if(length< 125){
        return '75%'
      }
      else if(length< 130){
        return '70%'
      }
      else if(length< 140){
        return '65%'
      }
      else if(length< 150){
        return '30%'
      }



      return '55%'
    }
  },
};
</script>

<style lang="sass" scoped>
</style>
