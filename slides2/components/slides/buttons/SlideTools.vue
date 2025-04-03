<template>
  <div class="factTools">
     <a
      class="slide-tool-item slide-tool-share-html"
        :style="{'color': `#${slide.slide_color_0}`}"
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
      <i class="fas fa-share-alt"></i>Share
      </a>
      <a
        :style="{'color': `#${slide.slide_color_0}`}"
        class="slide-tool-item slide-tool-copy-img"
        @click.prevent="copyImage(slide)"
      >
        <i class="far fa-images"></i>Copy
      </a>
      <a
        style="cursor:pointer; text-decoration:none;"
        :href="threadUrl"
        target="_blank"
        :style="{'color': `#${slide.slide_color_0}`}"
        class="slide-tool-item slide-tool-source"
        >
        <i class="fas fa-external-link-alt"></i>Source</a
      >
      <a
      class="slide-tool-item slide-tool-image"
        style="cursor:pointer; text-decoration:none;"
        :style="{'color': `#${slide.slide_color_0}`}"
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
        <i class="fas fa-images"></i>Image</a>
      <a
        class="slide-tool-item slide-tool-add"
        :style="{'color': `#${slide.slide_color_0}`,'cursor':'pointer'}"
        @click.prevent="showSubmitModal"
      >

      <i class="fas fa-plus-circle" :style="{'color': `#${slide.slide_color_0}`}"></i>Add</a>


      <a
        class="slide-tool-item slide-tool-ready"
        :style="{'color': `#${slide.slide_color_0}`,'cursor':'pointer'}"
        v-if="isAdmin && !slide.ready"
        @click.prevent="makeReady"
      >
      <i class="fas fa-check-circle"></i>Ready
      </a>
      <nuxt-link
        class="slide-tool-item slide-tool-edit"
        :to="{name:'admin.show.slide.edit', params:{slug:slide.slug}}"
        :style="{'color': `#${slide.slide_color_0}`}"
        v-if="isAdmin"
      >
      <i class="fa fa-pen" :style="{'color': `#${slide.slide_color_0}`}"></i>Edit</nuxt-link>





    </div>
</template>

<script>
import CopyImage from '@/mixins/copyImage'
 import slideButttons from '@/mixins/slideButttons'
  export default {
    mixins: [CopyImage, slideButttons],
    props: {
      slide: {
        type: Object,
        required: true
      }
    },
    data(){
      return {
        // showSubmitModal: false,
        show: false,
        form: this.$vform({
          note: '',
          source: '',
          email: '',
        }),
      }
    },
    computed: {
      slideUrl(){
        // return `${this.appurl}i-${this.slide.id}`
        return `${this.appurl}${this.slide.slug}`
      },
    },
    methods: {
      showSubmitModal(){
        this.$nuxt.$emit('showSubmitModal', this.slide.id);
      },
     async makeReady(){
        try {
          const formData = new FormData;
          formData.append('ready', true);
          const slide = await this.$axios.$post(`slides/admin/slide/${this.slide.slug}`, formData,  {
              headers: {
                'Content-Type': 'multipart/form-data'
              }
          });
          //  this.$router.push({name:'index', params:{route:`i-${this.slide.id}`}})

          this.$nuxt.$emit('goToNext');
        } catch (error) {

        }
      }
    },
  }
</script>

<style lang="scss" scoped>
  a {
    margin-left: 1%;
    margin-right:1%;
  }
  svg {
    font-size: 75%;
    margin-right:5px;
  }
  .card{
    margin:0;
  }

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
      padding: 0;
  }

  .modal.fade .modal-dialog {
      transition: transform 0.3s ease-out;
      transform: translate(0, 0px);
  }

  .fade:not(.show) {
      opacity: 1;
  }

  .modal-header {
      width: 100%;
      padding: .5rem 1rem;
  }

  .factTools div.modal,
  .factTools div.modal-dialog,
  .factTools div.card-body,
  .factTools div.modal-content,
  .factTools div.modal-header,
  .factTools div.modal-body,
  .factTools div.modal-footer,
  .factTools div.form-group,
  .factTools div.col-sm-3,
  .factTools div.col-sm-4,
  .factTools div.col-sm-6,
  .factTools div.col-sm-8,
  .factTools div.col-sm-10,
  .factTools div.col-sm-12

  {
    margin: 0;
    margin-left: 0;
    margin-right: 0;
    text-shadow: none;
}
.factTools div.modal-header{
  display: flex;
  justify-content: space-between;
}

.modal-title{
  display: inherit;
}
 .factTools div.modal-content{
   border: none;
   padding: 1rem
 }
.modal-footer{
  border-top: none;
}

.modal-body{
  padding:0;
  width:100%;
}

.form-group{
  width: 100%;
}


.factTools div.form-group.row{
  margin-bottom: 10px;
}

.modal{
  height: auto;
}

.slide-tool-item{
  cursor: pointer;
  text-decoration: none;
}
</style>
