<template>
  <div :id="`i${id}`" class="i" style=" display: block; opacity:1; background-color:#000000;
  background-repeat:no-repeat; background-size:cover; background-position:50% 50%; "
  :style="{'background-image':  `url(${backgroundImagePath})` , left: leftStyle}"
  >
    <li>
      <div class="i_filter1"></div>
      <div  :id="`i${id}t1`" style="width:100%; height:100%; text-shadow:0.03em 0.03em 0.06em black; ;  line-height: 110%; "
        :style="{'font-size': contentFontSize}"
        :data-content-size="slide.slide_body_length"
      >
        <div class="i_simple_t i_vAlign50 ">
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

       if(length<50){
        return '180%'
      }
      else if(length < 80){
        return '170%'
      }
      else if(length < 100){
        return '165%'
      }
      else if(length< 110){
        return '160%'
      }
      else if(length< 120){
        return '155%'
      }


      else if(length < 130){
        return '150%'
      }


      else if(length< 140){
        return '145%'
      }
      else if(length< 150){
        return '140%'
      }

      else if(length< 160){
        return '135%'

      }


      else if(length< 170){
        return '130%'
      }





      else if(length< 180){
        return '125%'
      }
      else if(length< 190){
        return '120%'
      }




      else if(length< 200){
        return '117%'
      }


      else if(length< 225){
        return '115%'
      }

      else if(length< 250){
        return '110%'
      }

      else if(length< 265){
        return '108%'
      }


      else if(length< 280){
        return '105%'
      }



      else if(length< 310){
        return '100%'
      }




      else if(length< 330){
        return '95%'
      }

      else if(length< 350){
        return '90%'
      }




      else if(length< 375){
        return '85%'
      }




      else if(length< 400){
        return '80%'
      }
      else if(length< 425){
        return '78%'
      }
      else if(length< 450){
        return '75%'
      }
      else if(length< 475){
        return '73%'
      }
      else if(length< 500){
        return '70%'
      }
      else if(length< 525){
        return '68%'
      }
      else if(length< 550){
        return '65%'
      }
      else if(length< 575){
        return '63%'
      }
      else if(length< 600){
        return '60%'
      }
      else if(length< 625){
        return '57%'
      }
      else if(length< 650){
        return '55%'
      }

      return '52%'
    }
  },
  //Okbottle-water.jpg
};
</script>

<style lang="sass" scoped>
</style>
