<template>
  <!-- Header -->
  <div id="header">
    <!-- Logo -->
    <div id="logo">
      <div
        @click="logo_toggle"
        @mouseover="desktopLogoShowMenu"
        @mouseout="desktopLogoHideMenu"
      >
        <img
          id="logo_image"
          src="~assets/images/logoX.png"
          title="FACTSlides is an endless stream of amazing facts presented as colorful slides"
          alt="FACTSlides is an endless stream of amazing facts presented as colorful slides"
          border="0"
        />
      </div>

      <div id="logo_menu" @mouseover="logo_showMenu" @mouseout="logo_hideMenu">
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

    <!-- Theme -->
    <div id="theme">
      <h1 itemprop="name">
        <div>Random Facts</div>
      </h1>
    </div>

    <!-- categories -->
    <div
      id="categories"
      @click="categories_toggle"
      @mouseover="desktopCategoryShowMenu"
      @mouseout="desktopCategoryHideMenu"
    >
      <div>
        CATEGORIES
        <img id="categoriesDown1" src="~assets/images/categoriesDown.png" />
      </div>
    </div>
    <!-- Categories -->
    <div id="categories_menu">
      <div id="categories_menu_left">
        <div
          id="categories_menu_12"
          class="categories_menu_1"
          @click="categories_show(1, 12)"
          @mouseover="categories_show(1, 12, true)"
        >
          Asia
          <span
            id="categories_menuMobile_12"
            class="categories_menuMobile"
          ></span>
        </div>

        <div
          id="categories_menu_13"
          class="categories_menu_1"
          @click="categories_show(1, 13)"
          @mouseover="categories_show(1, 13, true)"
        >
          America
          <span
            id="categories_menuMobile_13"
            class="categories_menuMobile"
          ></span>
        </div>

        <div
          id="categories_menu_14"
          class="categories_menu_1"
          @click="categories_show(1, 14)"
          @mouseover="categories_show(1, 14, true)"
        >
          Africa
          <span
            id="categories_menuMobile_14"
            class="categories_menuMobile"
          ></span>
        </div>

        <div
          id="categories_menu_15"
          class="categories_menu_1"
          @click="categories_show(1, 15)"
          @mouseover="categories_show(1, 15, true)"
        >
          Europe
          <span
            id="categories_menuMobile_15"
            class="categories_menuMobile"
          ></span>
        </div>

        <div
          id="categories_menu_16"
          class="categories_menu_1"
          @click="categories_show(1, 16)"
          @mouseover="categories_show(1, 16, true)"
        >
          Oceania
          <span
            id="categories_menuMobile_16"
            class="categories_menuMobile"
          ></span>
        </div>

        <div
          id="categories_menu_17"
          class="categories_menu_1"
          @click="categories_show(1, 17)"
          @mouseover="categories_show(1, 17, true)"
        >
          Antarctica
          <span
            id="categories_menuMobile_17"
            class="categories_menuMobile"
          ></span>
        </div>

        <div
          id="categories_menu_18"
          class="categories_menu_1"
          @click="categories_show(1, 18)"
          @mouseover="categories_show(1, 18, true)"
        >
          U.S.A.
          <span
            id="categories_menuMobile_18"
            class="categories_menuMobile"
          ></span>
        </div>

        <div
          id="categories_menu_47"
          class="categories_menu_1"
          @click="categories_show(1, 47)"
          @mouseover="categories_show(1, 47, true)"
        >
          United Nations
          <span
            id="categories_menuMobile_47"
            class="categories_menuMobile"
          ></span>
        </div>

        <div
          id="categories_menu_19"
          class="categories_menu_1"
          @click="categories_show(1, 19)"
          @mouseover="categories_show(1, 19, true)"
        >
          Cities
          <span
            id="categories_menuMobile_19"
            class="categories_menuMobile"
          ></span>
        </div>

        <div
          id="categories_menu_20"
          class="categories_menu_1"
          @click="categories_show(1, 20)"
          @mouseover="categories_show(1, 20, true)"
        >
          Places
          <span
            id="categories_menuMobile_20"
            class="categories_menuMobile"
          ></span>
        </div>

        <div
          id="categories_menu_25"
          class="categories_menu_2"
          @click="categories_show(2, 25)"
          @mouseover="categories_show(2, 25, true)"
        >
          Historic Events
          <span
            id="categories_menuMobile_25"
            class="categories_menuMobile"
          ></span>
        </div>

        <div
          id="categories_menu_28"
          class="categories_menu_2"
          @click="categories_show(2, 28)"
          @mouseover="categories_show(2, 28, true)"
        >
          People & Civilizations
          <span
            id="categories_menuMobile_28"
            class="categories_menuMobile"
          ></span>
        </div>

        <div
          id="categories_menu_38"
          class="categories_menu_3"
          @click="categories_show(3, 38)"
          @mouseover="categories_show(3, 38, true)"
        >
          Social Issues
          <span
            id="categories_menuMobile_38"
            class="categories_menuMobile"
          ></span>
        </div>

        <div
          id="categories_menu_37"
          class="categories_menu_3"
          @click="categories_show(3, 37)"
          @mouseover="categories_show(3, 37, true)"
        >
          Life & Love
          <span
            id="categories_menuMobile_37"
            class="categories_menuMobile"
          ></span>
        </div>

        <div
          id="categories_menu_29"
          class="categories_menu_3"
          @click="categories_show(3, 29)"
          @mouseover="categories_show(3, 29, true)"
        >
          Tech & Invention
          <span
            id="categories_menuMobile_29"
            class="categories_menuMobile"
          ></span>
        </div>

        <div
          id="categories_menu_36"
          class="categories_menu_3"
          @click="categories_show(3, 36)"
          @mouseover="categories_show(3, 36, true)"
        >
          Humor & Offbeat
          <span
            id="categories_menuMobile_36"
            class="categories_menuMobile"
          ></span>
        </div>

        <div
          id="categories_menu_35"
          class="categories_menu_3"
          @click="categories_show(3, 35)"
          @mouseover="categories_show(3, 35, true)"
        >
          Religion
          <span
            id="categories_menuMobile_35"
            class="categories_menuMobile"
          ></span>
        </div>

        <div
          id="categories_menu_45"
          class="categories_menu_3"
          @click="categories_show(3, 45)"
          @mouseover="categories_show(3, 45, true)"
        >
          Books & Language
          <span
            id="categories_menuMobile_45"
            class="categories_menuMobile"
          ></span>
        </div>

        <div
          id="categories_menu_33"
          class="categories_menu_3"
          @click="categories_show(3, 33)"
          @mouseover="categories_show(3, 33, true)"
        >
          Movies & TV
          <span
            id="categories_menuMobile_33"
            class="categories_menuMobile"
          ></span>
        </div>

        <div
          id="categories_menu_32"
          class="categories_menu_3"
          @click="categories_show(3, 32)"
          @mouseover="categories_show(3, 32, true)"
        >
          Art & Music
          <span
            id="categories_menuMobile_32"
            class="categories_menuMobile"
          ></span>
        </div>

        <div
          id="categories_menu_31"
          class="categories_menu_3"
          @click="categories_show(3, 31)"
          @mouseover="categories_show(3, 31, true)"
        >
          Food & Drink
          <span
            id="categories_menuMobile_31"
            class="categories_menuMobile"
          ></span>
        </div>

        <div
          id="categories_menu_30"
          class="categories_menu_3"
          @click="categories_show(3, 30)"
          @mouseover="categories_show(3, 30, true)"
        >
          Business & Economy
          <span
            id="categories_menuMobile_30"
            class="categories_menuMobile"
          ></span>
        </div>

        <div
          id="categories_menu_34"
          class="categories_menu_3"
          @click="categories_show(3, 34)"
          @mouseover="categories_show(3, 34, true)"
        >
          Sports & Games
          <span
            id="categories_menuMobile_34"
            class="categories_menuMobile"
          ></span>
        </div>

        <div
          id="categories_menu_43"
          class="categories_menu_3"
          @click="categories_show(3, 43)"
          @mouseover="categories_show(3, 43, true)"
        >
          Science
          <span
            id="categories_menuMobile_43"
            class="categories_menuMobile"
          ></span>
        </div>

        <div
          id="categories_menu_40"
          class="categories_menu_4"
          @click="categories_show(4, 40)"
          @mouseover="categories_show(4, 40, true)"
        >
          Animals & other lifeforms
          <span
            id="categories_menuMobile_40"
            class="categories_menuMobile"
          ></span>
        </div>

        <div
          id="categories_menu_39"
          class="categories_menu_4"
          @click="categories_show(4, 39)"
          @mouseover="categories_show(4, 39, true)"
        >
          Body & Health
          <span
            id="categories_menuMobile_39"
            class="categories_menuMobile"
          ></span>
        </div>

        <div
          id="categories_menu_44"
          class="categories_menu_4"
          @click="categories_show(4, 44)"
          @mouseover="categories_show(4, 44, true)"
        >
          Space
          <span
            id="categories_menuMobile_44"
            class="categories_menuMobile"
          ></span>
        </div>

        <div
          id="categories_menu_42"
          class="categories_menu_4"
          @click="categories_show(4, 42)"
          @mouseover="categories_show(4, 42, true)"
        >
          Global Issues
          <span
            id="categories_menuMobile_42"
            class="categories_menuMobile"
          ></span>
        </div>

        <div
          id="categories_menu_41"
          class="categories_menu_4"
          @click="categories_show(4, 41)"
          @mouseover="categories_show(4, 41, true)"
        >
          Phenomena
          <span
            id="categories_menuMobile_41"
            class="categories_menuMobile"
          ></span>
        </div>

        <div
          id="categories_menu_46"
          class="categories_menu_4"
          @click="categories_show(4, 46)"
          @mouseover="categories_show(4, 46, true)"
        >
          Plants & Minerals
          <span
            id="categories_menuMobile_46"
            class="categories_menuMobile"
          ></span>
        </div>
      </div>
      <div id="categories_menu_right">
        <img src="~assets/images/menuright.png" />
      </div>
    </div>

    <!-- Main Categories -->
    <div id="mainCategories_menu" @mouseover="categories_show()">
      <img id="mainCategories_menu_up" src="~assets/images/menuup.png" />

      <div
        id="mainCategories_menu_1"
        @click="categories_show(1)"
        @mouseover="categories_show(1)"
      >
        World
      </div>
      <span
        id="mainCategories_menuMobile_1"
        class="mainCategories_menuMobile"
      ></span>

      <div
        id="mainCategories_menu_2"
        @click="categories_show(2)"
        @mouseover="categories_show(2)"
      >
        History
      </div>
      <span
        id="mainCategories_menuMobile_2"
        class="mainCategories_menuMobile"
      ></span>

      <div
        id="mainCategories_menu_3"
        @click="categories_show(3)"
        @mouseover="categories_show(3)"
      >
        Society
      </div>
      <span
        id="mainCategories_menuMobile_3"
        class="mainCategories_menuMobile"
      ></span>

      <div
        id="mainCategories_menu_4"
        @click="categories_show(4)"
        @mouseover="categories_show(4)"
      >
        Nature
      </div>
      <span
        id="mainCategories_menuMobile_4"
        class="mainCategories_menuMobile"
      ></span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      slideshowsMenuPopulated: false,
    };
  },
  methods: {
    UTIL_obj(n) {
      return document.getElementById(n);
    },
    logo_showMenu() {
      this.UTIL_obj('logo_menu').style.display = 'inherit';
    },

    logo_hideMenu() {
      this.UTIL_obj('logo_menu').style.display = 'none';
    },

    logo_toggle() {
      if (this.UTIL_obj('logo_menu').style.display == 'none') {
        this.logo_showMenu();
      } else {
        this.logo_hideMenu();
      }
    },
    UTIL_browserIsMobile() {
      return this.$device.isMobile;
    },
    desktopLogoShowMenu() {
      if (!this.UTIL_browserIsMobile()) {
        this.logo_showMenu();
      }
    },
    desktopLogoHideMenu() {
      if (!this.UTIL_browserIsMobile()) {
        this.logo_hideMenu();
      }
    },

    //

    categories_toggle() {
      if ($('#mainCategories_menu').is(':visible')) {
        this.categories_hide();
      } else {
        this.categories_show();
      }
    },

    categories_hide() {
      this.UTIL_obj('mainCategories_menu').style.display = 'none';
      this.UTIL_obj('categories_menu').style.display = 'none';
      this.UTIL_obj('slideshows_menu').style.display = 'none';
    },

    categories_show(mainCategory, category, isOnMouseOver) {
      // show the main categories menu
      $('#mainCategories_menu').show();

      // are we in mobile mode?
      var isMobileMode = $('#mainCategories_menu img').is(':visible') == false;
      if (isMobileMode && isOnMouseOver) {
        return false;
      }

      // show the back
      $('#categories_menu_back').show();

      // if a main category was specified...
      if (mainCategory != null) {
        // color the main category
        $('#mainCategories_menu div').removeClass(
          'mainCategories_menu_selected'
        );
        $('#mainCategories_menu_' + mainCategory).addClass(
          'mainCategories_menu_selected'
        );

        // if we are in mobile mode.. put the subcategories under this main category
        if (isMobileMode) {
          $('.categories_menu_' + mainCategory).addClass(
            'categories_menu_selectedmobile'
          );
          $('#mainCategories_menuMobile_' + mainCategory).append(
            $('.categories_menu_' + mainCategory)
          );
          $('#mainCategories_menuMobile_' + mainCategory).show();
        }

        // hide all categories
        $('#categories_menu_left div').hide();

        // show only the categories from the main category selected
        $('.categories_menu_' + mainCategory).show();

        // show the categories menu
        $('#categories_menu').show();

        // hide the slideshows menu
        $('#slideshows_menu').hide();

        // position the right arrow
        $('#categories_menu_right img').css(
          'padding-top',
          $('#mainCategories_menu_' + mainCategory).offset().top -
            $('#categories_menu').offset().top
        );
      }

      // if a category was specified...
      if (category != null) {
        // color the category
        $('#categories_menu div').removeClass('mainCategories_menu_selected');
        $('#categories_menu_' + category).addClass(
          'mainCategories_menu_selected'
        );

        // hide all slides
        $('#slideshows_menu_left div').hide();

        // if we are in mobile mode.. put the slideshows under this category
        if (isMobileMode) {
          $('.categories_menuMobile').hide();
          //$("#slideshows_menu_left").append( $(".slideshows_menu_item") );
          $('#categories_menuMobile_' + category).append(
            $('.slideshows_menu_' + category)
          );
          $('#categories_menuMobile_' + category).css('display', 'block');
          $('html, body').animate(
            {
              scrollTop: $('#categories_menu_' + category).offset().top,
            },
            1000
          );
        }

        // show only the categories from the main category selected
        $('.slideshows_menu_' + category).show();

        // show the slideshows menu
        $('#slideshows_menu').show();

        // position the right arrow
        var arrowpos =
          $('#categories_menu_' + category).offset().top -
          $('#slideshows_menu').offset().top;
        $('#slideshows_menu_right img').css('padding-top', arrowpos);

        // if the right arrow is located below the end of the menu.. enlarge the menu.. otherwise.. set the height back to auto
        var mr = $('#slideshows_menu_left');
        if (arrowpos + $('#slideshows_menu_right img').height() > mr.height()) {
          mr.css('padding-top', arrowpos);
        } else {
          mr.css('padding-top', '0');
        }
      }

      // if slideshows menu were never populated... do it now
      if (this.slideshowsMenuPopulated == false) {
        this.slideshowsMenuPopulated = true;

        var sm = '';
        $('.trending_item_title').each(function (index, element) {
          sm +=
            '<div onclick="slideshows_click($(this))" class="' +
            $(this).attr('categories') +
            '"><a href="/' +
            $(this).find('a').attr('href') +
            '">' +
            $(this).text() +
            '</a></div>';
        });

        $('#slideshows_menu_left').html(sm);
      }
    },

    desktopCategoryShowMenu() {
      if (!this.UTIL_browserIsMobile()) {
        this.categories_show();
      }
    },
    desktopCategoryHideMenu() {
      if (!this.UTIL_browserIsMobile()) {
        this.categories_hide();
      }
    },
  },
};
</script>

<style lang="sass" scoped>
</style>
