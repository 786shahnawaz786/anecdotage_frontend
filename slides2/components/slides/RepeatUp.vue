<template>
  <div
    :id="`i${id}`"
    class="i"
    style="display: block;opacity: 1;background-repeat: repeat-x;background-size: auto 35%;background-position: 50% 0%;left:200%    "
    :style="{'background-image': `url(${backgroundImagePath})`, left: leftStyle,'background-color':`#${slide.slide_color_bg}` }"
  >
    <li>
      <div
        :id="`i${id}t1`"
        style="width: 100%; height: 100%;font-size: 120%;line-height: 110%;color: #908893;"
        :style="{'font-size': contentFontSize}"
        :data-content-size="slide.slide_body_length"
      >
        <div
          style="top: 85%;transform: perspective(1px) translateY(-85%);-webkit-transform: perspective(1px) translateY(-85%);-ms-transform: perspective(1px) translateY(-85%);"
          class="i_simple_t"
        >
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
        return '130%'
      }
      else if(length< 80){
        return '120%'
      }
      else if(length< 100){
        return '115%'
      }
      else if(length< 120){
        return '110%'
      }
      else if(length< 130){
        return '105%'
      }

      else if(length< 140){
        return '103%'
      }
      else if(length< 150){
        return '102%'
      }

      else if(length< 160){
        return '101%'
      }


      else if(length< 170){
        return '100%'
      }



      else if(length< 175){
        return '97%'
      }


      else if(length< 180){
        return '96%'
      }
      else if(length< 185){
        return '95%'
      }

      else if(length< 188){
        return '94%'
      }


      else if(length< 193){
        return '92%'
      }

      else if(length< 195){
        return '91%'
      }


      else if(length< 198){
        return '90%'
      }


      else if(length< 200){
        return '89%'
      }

      else if(length< 203){
        return '88%'
      }


      else if(length< 205){
        return  '87%'
      }
      else if(length< 210){
        return '86%'
      }
      else if(length< 215){
        return '85%'
      }
      else if(length< 220){
        return '84%'
      }
      else if(length< 225){
        return '83%'
      }
      else if(length< 230){
        return '82%'
      }
      else if(length< 235){
        return '81%'
      }
      else if(length< 240){
        return '80%'
      }
      else if(length< 245){
        return '79%'
      }
      else if(length< 246){
        return '78%'
      }
      else if(length< 250){
        return '77%'
      }
      else if(length< 260){
        return '73%'
      }


      else if(length< 280){
        return '72%'
      }

      else if(length< 300){
        return '71%'
      }

      else if(length< 320){
        return '70%'
      }

      else if(length< 360){
        return '68%'
      }

      else if(length< 380){
        return '67%'
      }



      else if(length< 400){
        return '66%'
      }



      else if(length< 420){
        return '65%'
      }

      else if(length< 440){
        return '64%'
      }

      else if(length< 460){
        return '63%'
      }

      else if(length< 480){
        return '62%'
      }

      else if(length< 500){
        return '61%'
      }

      else if(length< 510){
        return '60%'
      }
      else if(length< 520){
        return '59%'
      }
      else if(length< 530){
        return '58%'
      }
      else if(length< 540){
        return '57%'
      }
      else if(length< 550){
        return '56%'
      }



    }
  },
};
</script>

<style lang="sass" scoped>
</style>
