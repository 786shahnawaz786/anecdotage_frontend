<template>
  <div class="row">
    <div class="col-md-12">
      <form @submit.prevent="updateInfo" enctype="multipart/form-data">

        <div class="form-group row">
          <label for="slide_body" class="col-sm-4 col-form-label"
            >Site Body</label
          >
          <div class="col-sm-8">
            <textarea
              type="text"
              class="form-control"
              id="slide_body"
              placeholder="Site Body"
              v-model="form.slide_body"
              rows="10"
              autofocus
            ></textarea>
          </div>
        </div>
        <div class="form-group row">
          <label for="slide_image_pos" class="col-sm-4 col-form-label"
            >Site Image Position</label
          >
          <div class="col-sm-8">
            <input
              type="text"
              class="form-control"
              id="slide_image_pos"
              placeholder="Site Image Position"
              v-model="form.slide_image_pos"
            />
          </div>
        </div>
        <div class="form-group row">
          <label for="slide_color_bg" class="col-sm-4 col-form-label"
            >Site Color BG</label
          >
          <div class="col-sm-8">
            <input
              type="text"
              class="form-control"
              id="slide_color_bg"
              placeholder="Site Color BG"
              v-model="form.slide_color_bg"
            />
          </div>
        </div>
        <div class="form-group row">
          <label for="slide_color_0" class="col-sm-4 col-form-label"
            >Site Color 0</label
          >
          <div class="col-sm-8">
            <input
              type="text"
              class="form-control"
              id="slide_color_0"
              placeholder="Site Color 0"
              v-model="form.slide_color_0"
            />
          </div>
        </div>
        <div class="form-group row">
          <label for="slide_color_1" class="col-sm-4 col-form-label"
            >Site Color 1</label
          >
          <div class="col-sm-8">
            <input
              type="text"
              class="form-control"
              id="slide_color_1"
              placeholder="Site Color 1"
              v-model="form.slide_color_1"
            />
          </div>
        </div>
        <div class="form-group row">
          <label for="slide_color_2" class="col-sm-4 col-form-label"
            >Site Color 2</label
          >
          <div class="col-sm-8">
            <input
              type="text"
              class="form-control"
              id="slide_color_2"
              placeholder="Site Color 2"
              v-model="form.slide_color_2"
            />
          </div>
        </div>
        <div class="form-group row">
          <label for="image" class="col-sm-4 col-form-label"
            >Image</label
          >
          <div class="col-sm-8">
            <input
              type="file"
              class="form-control"
              id="image"
              placeholder="Select file"
              accept="images/*"
              @change="onFileSelected"
            />
          </div>
        </div>


        <div class="form-group row">
          <div class="col-sm-8 offset-sm-4">
            <base-button> Update </base-button>
          </div>
        </div>
        <hr>
        <div class="form-group row">
          <div class="col-sm-8 offset-sm-4">
            <button class="btn btn-success" type="button" @click.prevent="updateInfoAndReady"> Update & Ready </button>
          </div>
        </div>

        <div class="form-group row">
          <label for="slide_color_2" class="col-sm-4 col-form-label"
            >Slide Screenshot</label
          >
          <div class="col-sm-8">
            <img :src="slide.slide_screenshot_path" alt="" width="100%" height="auto">
          </div>
        </div>
        <div class="form-group row">
          <div class="col-sm-8 offset-sm-4">
           <button class="btn btn-success" @click.prevent="takeScreenshot">Take Screenshot</button>
          </div>
        </div>


      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form:{
        'slide_body':'',
        'slide_image_pos':'',
        'slide_color_bg':'',
        'slide_color_0':'',
        'slide_color_1':'',
        'slide_color_2':'',
        'select_file': null
      },
    };
  },

  computed: {
    settings() {
      return this.$store.getters.settings;
    },
    slide() {
      return this.$store.getters.singleSlide;
    },
  },
  methods: {
    goToBack(){

    },
    async updateInfo() {
      try {
        const formData = new FormData;
        formData.append('slide_body', this.form.slide_body);
        formData.append('slide_image_pos', this.form.slide_image_pos);
        formData.append('slide_color_bg', this.form.slide_color_bg);
        formData.append('slide_color_0', this.form.slide_color_0);
        formData.append('slide_color_1', this.form.slide_color_1);
        formData.append('slide_color_2', this.form.slide_color_2);
        formData.append('image_path', this.form.select_file);
        const slide = await this.$axios.$post(`slides/admin/slide/${this.slide.slug}`, formData,  {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
        });
        this.$router.push({name:'index', params:{route:`${this.slide.slug}`}})

        // console.log(slide)

      } catch (e) {}
    },
    async updateInfoAndReady() {

      console.log('ready')

      try {
        const formData = new FormData;
        formData.append('slide_body', this.form.slide_body);
        formData.append('slide_image_pos', this.form.slide_image_pos);
        formData.append('slide_color_bg', this.form.slide_color_bg);
        formData.append('slide_color_0', this.form.slide_color_0);
        formData.append('slide_color_1', this.form.slide_color_1);
        formData.append('slide_color_2', this.form.slide_color_2);


        formData.append('ready', true);


        formData.append('image_path', this.form.select_file);
        const slide = await this.$axios.$post(`slides/admin/slide/${this.slide.slug}`, formData,  {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
        });
        this.$router.push({name:'index', params:{route:`${this.slide.slug}`}})

        // console.log(slide)

      } catch (e) {}
    },
    async takeScreenshot() {

      try {
        const slide = await this.$axios.$post(`slides/admin/slide/${this.slide.slug}/screenshot`);
        // this.$router.push({name:'index', params:{route: `i-${this.slide.id}`}})
        this.$router.push({name:'index', params:{route: `${this.slide.slug}`}})

      } catch (e) {}
    },

     onFileSelected(event){
        if (! event.target.files.length) return;
        this.form.select_file = event.target.files[0];
    },
  },
  mounted() {
    Object.keys(this.form).forEach((k) => {
      if (this.slide.hasOwnProperty(k)) {
        this.form[k] = this.slide[k];
      }
    });

  },


  watchQuery: true,
  async fetch({ params, query, error, $axios, store }) {
    try {
          const slide = await $axios.$get(`slides/admin/slides/single/${params.slug}`)
          store.commit('SET_SINGLE_SLIDE', slide.data)
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

  .nav-pills .nav-link {
   color: #007bff;
      &:visited {
            color: #007bff;
      }
  }

  .nav-pills .nav-link.active, .nav-pills .show > .nav-link {
      color: #fff;
      background-color: #007bff;
  }

  a:visited {
      color:  #007bff;
  }

</style>
