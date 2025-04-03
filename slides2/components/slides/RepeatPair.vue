<template>
  <div
     :id="`i${id}`"
    class="i"
    style="display: block;opacity: 1;"
    :style="{'background-image': `url(${backgroundImagePath})`,  left: leftStyle}"
  >
    <li>
      <div style="width: 100%; height: 20%;background-size: auto 100%;background-position: 0% 0%;" :style="{'background-image': `url(${backgroundImagePath})`,'background-color': `#${slide.slide_color_2}`}"></div>
      <div
        :id="`i${id}t1`"
        style="width: 100%; height: 60%;ftext-align: center;line-height: 110%;color: #ababab;"
        :style="{'font-size': contentFontSize,'background-color': `#${slide.slide_color_bg}`}"
        :data-content-size="slide.slide_body_length"
      >
        <div class="i_simple_t i_vAlign50">
          <div>
            <div :style="{'color': `#${slide.slide_color_0}`}" v-html="slide.style_slide_body"></div>
            <SlideTools :slide="slide" />
          </div>
        </div>
      </div>
      <div style="width: 100%; height: 20%;background-size: auto 100%;background-position: 0% 0%;" :style="{'background-image': `url(${backgroundImagePath})`,'background-color': `#${slide.slide_color_2}`}"></div>
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

       if(length<30){
        return '155%'
      }

      else if(length< 40){
        return '150%'
      }

      else if(length< 50){
        return '145%'
      }


      else if(length< 80){
        return '140%'
      }


      else if(length< 90){
        return '135%'
      }


      else if(length< 100){
        return '130%'
      }

      else if(length< 110){
        return '125%'
      }


      else if(length< 120){
        return '120%'
      }
      else if(length< 130){
        return '118%'
      }
      else if(length< 140){
        return '115%'
      }
      else if(length< 150){
        return '110%'
      }
      else if(length< 160){
        return '105%'
      }
      else if(length< 170){
        return '103%'
      }
      else if(length< 180){
        return '100%'
      }
      else if(length< 190){
        return '98%'
      }

      else if(length< 200){
        return '95%'
      }
      else if(length< 210){
        return '92%'
      }
      else if(length< 220){
        return '90%'
      }
      else if(length< 230){
        return '88%'
      }
      else if(length< 240){
        return '85%'
      }
      else if(length< 250){
        return '82%'
      }
      else if(length< 260){
        return '80%'
      }
      else if(length< 270){
        return '78%'
      }
      else if(length< 280){
        return '75%'
      }
      else if(length< 290){
        return '72%'
      }
      else if(length< 300){
        return '70%'
      }
      else if(length< 320){
        return '65%'
      }

      return '60%'
    }
  },
};
</script>

<style lang="scss" scoped>


</style>
