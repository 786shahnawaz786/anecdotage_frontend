<template>
  <div class="footer-container">
    <div id="footer">
      <div id="footer_logo">
        <!-- <a href="#">
          {{settings.site_name}}
        </a> -->
        <div id="footer_copyright" style="line-height: 1.2em" v-html="settings.footer_copyright_text">

        </div>
      </div>
      <div id="footer_about">
        <nuxt-link :to="{name:'about'}">
          About Us
        </nuxt-link>
        <nuxt-link :to="{name:'faq'}">
          FAQ
        </nuxt-link>
        <nuxt-link :to="{name:'privacy'}">
          Privacy Policy
        </nuxt-link>
        <nuxt-link :to="{name:'contact'}">
          Contact Us
        </nuxt-link>
      </div>
      <div id="footer_social">
        <a
          rel="noopener"
        :href="settings.social_facebook"
          target="_blank"
          click="GAevent('Social', 'FB')"
          ><img src="~assets/images/FB2.png" border="0"
        /></a>
        <a
          rel="noopener"
          :href="settings.social_twitter"
          target="_blank"
          click="GAevent('Social', 'TW')"
          ><img src="~assets/images/TW2.png" border="0"
        /></a>
        <!-- <a
          rel="noopener"
          href="https://www.pinterest.com/FACTSlides/"
          target="_blank"
          click="GAevent('Social', 'PI')"
          ><img src="~assets/images/PI2.png" border="0"
        /></a> -->
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  computed: {
    ...mapGetters({
      settings: 'settings',
    }),

  },
};
</script>

<style lang="scss" scoped>
#footer_social {
    float: right;
    text-align: right;
    display: flex;
    align-items: center;
}


#footer_logo {
    float: left;
}

#footer{

  #footer_copyright{
    color: #ffffff;
  }


  #footer_social {
    width: 10%;
    float: right;
    text-align: right;
    display: flex;
    align-items: flex-end;
    justify-content: flex-end;
  }

  & * {
     font-family: Arial, Helvetica, sans-serif;
  }
}

.footer-container{
    background-color: #181818;
}
</style>
