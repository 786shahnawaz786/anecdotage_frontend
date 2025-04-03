<template>
  <div
    :id="`i${id}`"
    class="i"
    style="display: block;opacity: 1;"
    :style="{left: leftStyle,}"
  >
    <li>
      <div
        :id="`i${id}`" style="width: 100%; height: 50%; text-align: center;overflow:hidden;"
        :style="{'background-color': `#${slide.slide_color_2}`}"
        :data-content-size="slide.slide_body_length"
      >
        <img
          style="width: auto; height: 101%; position: relative; left: "
          class="i_vAlign90"
          :src="backgroundImagePath"
        />
      </div>
      <div
        :id="`i${id}t1`"
        style="width: 70%;height: 50%;text-align: center;line-height: 110%;color: #efefef;margin: 0 auto;"
        :style="{'font-size': contentFontSize,'background-color': `#${slide.slide_color_bg}`}"

      >
        <p style="margin-top:20px;font-size:20px;" v-html="slide.full_image_description"></p>
        <div class="i_simple_t i_vAlign50" style="width:80%;top:100px;">
          <div>
            <div :style="{'color': `#${slide.slide_color_0}`}" v-html="slide.style_slide_body"></div>
            <!-- <div class="factTools">
              <a
                href="https://www.cultofmac.com/126338/why-steve-jobs-mercedes-never-had-a-license-plate/"
                target="_blank"
                :style="{'color': `#${slide.slide_color_1}`}"
                >♦ SOURCE</a
              >
              <div :style="{'color': `#${slide.slide_color_1}`}">♺ SHARE</div>
            </div> -->

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

       if(length<70){
        return '84%'
      }
      else if(length< 80){
        return '90%'
      }
      else if(length< 90){
        return '85%'
      }
      else if(length< 100){
        return '85=0%'
      }
      else if(length< 110){
        return '80%'
      }
      else if(length< 120){
        return '75%'
      }


      else if(length< 140){
        return '73%'
      }


      else if(length< 160){
        return '70%'
      }


      else if(length< 170){
        return '65%'
      }




      else if(length< 180){
        return '60%'
      }


      else if(length< 200){
        return '55%'
      }

      else if(length< 210){
        return '53%'
      }

      else if(length< 220){
        return '50%'
      }

      else if(length< 230){
        return '48%'
      }

      else if(length< 240){
        return '45%'
      }

      else if(length< 250){
        return '42%'
      }
      else if(length< 260){
        return '40%'
      }


      else if(length< 280){
        return '38%'
      }

      else if(length< 300){
        return '35%'
      }

      else if(length< 320){
        return '33%'
      }

      else if(length< 360){
        return '32%'
      }

      else if(length< 380){
        return '30%'
      }



      else if(length< 400){
        return '28%'
      }

      return '25%'



    }
  },
};
</script>

<style lang="sass" scoped>
</style>
