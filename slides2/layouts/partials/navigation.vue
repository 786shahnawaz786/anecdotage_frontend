<template>
  <!-- Header -->
  <div id="header">
    <!-- Logo -->
    <div id="logo">
      <div

      >
        <!-- <img
          id="logo_image"
          src="~assets/images/logoX.png"
          title="FACTSlides is an endless stream of amazing facts presented as colorful slides"
          alt="FACTSlides is an endless stream of amazing facts presented as colorful slides"
          border="0"
        /> -->


        <!-- <img
          id="logo_image"
          :src="settings.logo_path"
          border="0"
          @click="goToAnecdotage"
        /> -->

        <span
          class="logo_text"
          @click="goToAnecdotage"
          :style="logoStyle"
        >
          Anecdotage
        </span>
      </div>

      <div id="logo_menu">
        <img id="logo_menu_up" src="~assets/images/menuup.png" />
        <a href="/">Random Facts</a>
        <a href="/about" onclick="return UTIL_sWin('/about')">About Us</a>
        <a href="/faq" onclick="return UTIL_sWin('/faq')">FAQ</a>
        <a href="/privacy" onclick="return UTIL_sWin('/privacy')"
          >Privacy Policy</a
        >
        <a href="/contact" onclick="return UTIL_sWin('/contact')">Contact Us</a>
      </div>
    </div>
    <!-- categories -->
    <!-- <div id="categories" @click="categories_toggle"> -->
    <div id="categories-item" style="float: right;">
      <div style="width: max-content;float: right;" @click="goToCategories">
        CATEGORIES
        <!-- <img id="categoriesDown1" src="~assets/images/categoriesDown.png" /> -->
        <i class="fas fa-sitemap top-category-icon"></i>
      </div>
    </div>


    <!-- Main Categories -->
    <div id="mainCategories_menu"  @mouseleave="categories_toggle">
      <img id="mainCategories_menu_up" src="~assets/images/menuup.png" />

      <div v-for="category in categories" :key="category.id">
        <nuxt-link
          :to="{name:'category', params:{category:category.search_term}}"
        >
          {{ category.display_text }}
        </nuxt-link >
      </div>

    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  data() {
    return {

    };
  },
  computed: {
    ...mapGetters({
      settings: 'settings',
      categories: 'categories',
      slideLogoColor: 'slideLogoColor',
    }),
    logoStyle(){
      return {color: `#${this.slideLogoColor}`};
    }

  },
  methods: {
    goToCategories(){
      // alert('Im a categories')
      this.$router.push('#categories')
    },
    categories_toggle() {
      if ($('#mainCategories_menu').is(':visible')) {
        this.categories_hide();
      } else {
        this.categories_show();
      }
    },

    categories_hide() {
      document.getElementById('mainCategories_menu').style.display = 'none';
    },

    categories_show(mainCategory, category, isOnMouseOver) {
      // show the main categories menu
      $('#mainCategories_menu').show();
    },
    goToAnecdotage(){
      window.location = 'https://anecdotage.com'
    }
  },
};
</script>

<style lang="scss" scoped>
#header{
  // margin-bottom: 5px;
  background-color: black;
}

#mainCategories_menu div {
    font-size: 0.3em;
    font-family: 'avenir';
    line-height: 1em;
    height: auto;
    padding: 0.5em;
    padding-left: 1.5em;
    padding-right: 1.5em;
    background-color: #181818;
    cursor: default;
    border-bottom: 0.1em solid #303030;
    text-align: left;
    -ms-user-select: none;
    user-select: none;
    -moz-user-select: none;
    -khtml-user-select: none;
    -webkit-user-select: none;
    -o-user-select: none;
}


#logo_image{
  cursor: pointer;
}
.logo_text{
  text-transform: lowercase;
}
.top-category-icon{
    font-size: .8em;
    width: auto;
}

</style>
