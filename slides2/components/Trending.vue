<template>
   <!-- Trending -->

    <div id="trending">
      <div id="trending_icon">
        <!-- <img src="~assets/images/trending.png" /> -->
        <i class="fas fa-sitemap" ></i>
        </div>
      <div id="trending_title">
        <div id="categories">
          <span>CATEGORIES</span>
        </div>
        <!--
		<div id="search">
			<form id="search_form" onsubmit="var v=this.search_form_box.value; if (v=='' || v=='Search Facts') { alert('Please specify your search'); return false } else { location='/k-'+ escape(v); return false; }">
				<input type="text" id="search_form_box" name="search_form_box" value="Search Facts" onfocus="if (this.value=='Search Facts') { this.value='' }" onblur="if (this.value=='') { this.value='Search Facts' }"  />
				<img id="search_form_icon" onclick="$('#search_form').submit()" src="~assets/images/search.png" border="0"  align="absmiddle" />
			</form>
		</div>
-->
      </div>

      <div id="trending_content">
        <div>

          <div class="trending_content_item" style="height: auto; padding: 0" v-for="category in categories" :key="category.id">
            <div class="trending_item_title" categories="slideshows_menu_25 ">
              <nuxt-link
               :to="{name:'category', params:{category:category.search_term}}"
              >
                {{ category.display_text }}
              </nuxt-link >
            </div>
          </div>

        </div>
      </div>
        <div id="scrollToTop">
          <nuxt-link to="#header" id="scrollToTopLink">
            <i class="fas fa-arrow-circle-up" data-toggle="tooltip" data-placement="top" title="Tooltip on left"></i>
          </nuxt-link>
        </div>
    </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  export default {
    computed:{
      ...mapGetters({
        settings: 'settings',
        categories: 'categories',
      }),
    },
    mounted() {
        $('[data-toggle="tooltip"]').tooltip()
    },
  }
</script>

<style lang="scss" scoped>
  .fa-sitemap{
    color: #fff;
    text-shadow: 1px 1px 1px #ccc;
    font-size: 2em;
    width: auto;
  }

  //

  #trending_icon {
    float: left;
    width: 7%;
    font-size: 0.46em;
    text-align: center;
    padding-top: 1em;
    padding-bottom: 0.2em;
    margin-bottom: 0.4em;
    background-color: #0f0f0f;
}

#trending{
  position:relative;

  & *{
    font-family: Arial, Helvetica, sans-serif;
  }
}

div#scrollToTop {
    position: absolute;
    right: 0;
    bottom: 30%;
    width: 64px;
    height: 64px;
    // overflow: hidden;
    // background: white;
    border-radius: 50%;
    cursor: pointer;
}

a#scrollToTopLink:hover, a#scrollToTopLink:active, a#scrollToTopLink:visited{
  color: white;
}


</style>
