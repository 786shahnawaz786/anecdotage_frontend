<template>
  <div
    :id="`i${id}`"
    class="i"
    style="display: block; opacity: 1; "
     :style="{left: leftStyle,'background-color': `#${slide.slide_color_bg}`}"
  >
    <li>
      <!-- <div style="float: left; height: 100%; width: 5%"></div> -->
      <div
        style="float: left; height: 100%; width: 30%;"
        :style="{'background-color': `#${slide.slide_color_2}`}"
       >
        <img
          :src="backgroundImagePath"
          style="width: initial; height: 101%; position: relative;float:left; z-index:0;"
          class="i_vAlign50"
        />
      </div>
      <!-- <div style="float: left; height: 100%; width: 5%"></div> -->
      <div
        :id="`i${id}t1`"
        style="float: left;height: 100%;width: 55%;text-align: left;line-height: 110%;color: white;"
        :style="{'font-size': contentFontSize}"
        :data-content-size="slide.slide_body_length"
      >
        <div class="i_simple_t i_vAlign50" style="left:10%" >
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
        return '140%'
      }
      else if(length< 80){
        return '130%'
      }
      else if(length< 100){
        return '125%'
      }
      else if(length< 120){
        return '120%'
      }
      else if(length< 130){
        return '115%'
      }

      else if(length< 140){
        return '113%'
      }
      else if(length< 150){
        return '110%'
      }

      else if(length< 160){
        return '109%'
      }


      else if(length< 170){
        return '108%'
      }



      else if(length< 175){
        return '107%'
      }


      else if(length< 180){
        return '106%'
      }
      else if(length< 185){
        return '105%'
      }

      else if(length< 188){
        return '104%'
      }

      else if(length< 190){
        return '103%'
      }
      else if(length< 193){
        return '102%'
      }

      else if(length< 195){
        return '101%'
      }


      else if(length< 198){
        return '100%'
      }


      else if(length< 200){
        return '99%'
      }

      else if(length< 203){
        return '97%'
      }


      else if(length< 205){
        return  '96%'
      }
      else if(length< 210){
        return '95%'
      }
      else if(length< 215){
        return '94%'
      }
      else if(length< 220){
        return '93%'
      }
      else if(length< 225){
        return '92%'
      }
      else if(length< 230){
        return '91%'
      }
      else if(length< 235){
        return '90%'
      }
      else if(length< 240){
        return '89%'
      }
      else if(length< 245){
        return '88%'
      }
      else if(length< 246){
        return '87%'
      }
      else if(length< 250){
        return '86%'
      }
      else if(length< 260){
        return '84%'
      }


      else if(length< 280){
        return '83%'
      }

      else if(length< 300){
        return '82%'
      }

      else if(length< 320){
        return '81%'
      }
      else if(length< 350){
        return '77%'
      }

      else if(length< 360){
        return '76%'
      }




      else if(length< 380){
        return '75%'
      }


      else if(length< 400){
        return '73%'
      }




      else if(length< 425){
        return '72%'
      }

      else if(length< 450){
        return '71%'
      }

      else if(length< 475){
        return '70%'
      }



      else if(length< 500){
        return '69%'
      }

      else if(length< 530){
        return '68%'
      }

      else if(length< 550){
        return '67%'
      }

      return '76%'
    }

  },
};
</script>

<style lang="scss" scoped>
.i_simple_t, .i_stripes_t {
    width: 100%;
    position: relative;
    left: 10%;
    text-align: center;
}

</style>
