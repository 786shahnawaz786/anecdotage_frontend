<template>
  <div class="card single-item">
    <div class="card-body">
      <div class="screenshots-images">
        <img :src="slide.slide_screenshot_path" alt="">
      </div>
      <div class="screenshots-buttons">
        <a
          class="btn btn-sm btn-primary screenshot-btn"
            :content="shareHtml"
            v-tippy="{
                size: 'large',
                theme:'light-border',
                placement : 'top',
                arrow: true,
                interactive : true,
                animation : 'perspective',
                maxWidth: 400,
                showOnInit: false,
                trigger: 'mouseenter click'
            }"

          >
          <i class="fas fa-share-alt"></i> Share
        </a>


        <div
          class="btn btn-sm btn-success screenshot-btn"
          @click.prevent="copyImage(slide)">
          <i class="far fa-images"></i> Make Slide</div>
        <div
          class="btn btn-sm btn-success screenshot-btn"
          @click="copyURL">
          <i class="far fa-image"></i> Copy URL
        </div>
        <nuxt-link
          class="btn btn-sm btn-warning screenshot-btn"
          :to="{name:'index', params:{route:slide.slug}}"
        ><i class="fas fa-eye"></i> Visit Slide</nuxt-link>
        <a
          class="btn btn-sm btn-warning screenshot-btn"
          :href="threadUrl"
          target="_blank">
          <i class="fas fa-external-link-alt"></i>
        Visit Source</a>
        <a
          class="btn btn-sm btn-secondary screenshot-btn"
          style="cursor:pointer; text-decoration:none;"
         :content="slide.full_image_description"
         v-tippy="{
            size: 'large',
            theme:'light-border',
            placement : 'top',
            arrow: true,
            interactive : true,
            animation : 'perspective',
            trigger: 'mouseenter click',
            showOnInit: false,
        }"
        >
        <i class="fas fa-images"></i> Image Info</a>
        <nuxt-link
          class="btn btn-sm btn-dark screenshot-btn"
          :to="{name:'admin.show.slide.edit', params:{slug:slide.slug}}"
          v-if="isAdmin"
        >
        <i class="fa fa-pen"></i> Edit</nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
import CopyImage from '@/mixins/copyImage'
 import slideButttons from '@/mixins/slideButttons'
  export default {
    mixins: [CopyImage, slideButttons],
    props:{
      slide: {
        type: Object,
        required: true
      }
    },
    computed: {
      slideUrl(){
        const routeData = this.$router.resolve({
          name: 'index',
          params: { route: this.slide.slug },
        }).href;

        const routeURL = routeData.replace(/^\//g, '');

        return this.appurl + routeURL
      },
    },
    methods: {
      async copyURL(e) {
        if (window.getSelection) {
          await navigator.clipboard.writeText(this.slideUrl);

          this.$toast.open({
              type: 'default',
              position: 'top',
              message: 'URL copied to clipboard',
              duration: 500,
          });
        }
      },

    },
  }
</script>

<style lang="scss" scoped>

  .card-body{
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
      font-size: 16px;
      font-weight: 400;
      line-height: 1.5;
      color: #212529;
      text-align: left;
      background-color: #fff;

      a {
        color: #007bff;
      }
  }

  .single-item{
    margin-bottom: 10px !important;
    margin-top: 10px !important;
  }

  .card-body{
    padding:0 !important;
  }

  .screenshots-images{
    img {
      max-width: 100%;
    }
  }

  .screenshots-buttons{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    padding: 5px;
  }
  .screenshot-btn{
    margin:5px;
  }
  .card-body a.screenshot-btn{
    color: white;
  }
  @media only screen and (min-width: 768px) {
      .screenshots-buttons{
        flex-wrap: nowrap;
      }
  }
</style>
