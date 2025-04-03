<template>
  <div class="container">
    <div class="card card-m-5">
      <div class="card-body">
        <div class="row">
          <div class="col-md-3">
            <div class="card sidebard-card">
              <div class="card-body">
                <ul class="nav nav-pills flex-column">
                  <li class="nav-item">
                    <nuxt-link
                      :to="{ name: 'admin.show.settings' }"
                      class="nav-link"
                      :class="{
                        active: $nuxt.$route.name == 'admin.show.settings',
                      }"
                      >Settings</nuxt-link
                    >
                  </li>
                  <li class="nav-item">
                    <nuxt-link
                      :to="{ name: 'admin.show.settings.logo' }"
                      class="nav-link"
                      :class="{
                        active: $nuxt.$route.name == 'admin.show.settings.logo',
                      }"
                      >Logo</nuxt-link
                    >
                  </li>


                  <li class="nav-item">
                    <nuxt-link
                      :to="{ name: 'admin.show.faq' }"
                      class="nav-link"
                      :class="{ active: $nuxt.$route.name == 'admin.show.faq' }"
                      >Faq</nuxt-link
                    >
                  </li>
                  <li class="nav-item">
                    <nuxt-link
                      :to="{ name: 'admin.show.about' }"
                      class="nav-link"
                      :class="{
                        active: $nuxt.$route.name == 'admin.show.about',
                      }"
                      >About</nuxt-link
                    >
                  </li>
                  <li class="nav-item">
                    <nuxt-link
                      :to="{ name: 'admin.show.privacy' }"
                      class="nav-link"
                      :class="{
                        active: $nuxt.$route.name == 'admin.show.privacy',
                      }"
                      >Privacy</nuxt-link
                    >
                  </li>
                  <li class="nav-item">
                    <nuxt-link
                      :to="{ name: 'admin.show.categories' }"
                      class="nav-link"
                      :class="{
                        active: $nuxt.$route.name == 'admin.show.categories',
                      }"
                      >Categories</nuxt-link
                    >
                  </li>
                  <li class="nav-item">
                    <nuxt-link
                      :to="{ name: 'admin.show.screenshots' }"
                      class="nav-link"
                      :class="{
                        active: $nuxt.$route.name == 'admin.show.screenshots',
                      }"
                      >Screenshots</nuxt-link
                    >
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="col-md-9">
            <div class="content">
               <NuxtChild />
               <div class="form-group row">
                <div class="py-5">
                  <a class="btn btn-danger text-white" @click="$router.go(-1)"> &larr; Back</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  middleware: ['admin'],
  head() {
    return {
      title: this.settings.site_title,
    };
  },
  computed: {
    ...mapGetters({
      settings: 'settings',
    }),
  },
};
</script>

<style lang="scss" scoped>
  .sidebard-card {
    .card-body {
      padding: 5px;
    }
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
  .content{
     min-height: 75vh;
  }
</style>
