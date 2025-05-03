<template>
  <header class="fixed-topx">
    <nav
      class="navbar navbar-expand-lg navbar-light bg-light align-items-center"
    >
      <div class="container">
        <nuxt-link :to="{ name: 'index' }" class="navbar-brand">
          <img :src="settings.logo_path" alt="Logo" height="36" style="width:auto; height:36px" width="100%"/>
        </nuxt-link>
        <button
          aria-controls="navbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
          class="navbar-toggler"
          data-target="#navbar"
          data-toggle="collapse"
          type="button"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div id="navbar" class="collapse navbar-collapse">
          <ul class="navbar-nav font-14 fw-300">
            <li class="nav-item dropdown navbar-menu-item">
              <a
                id="menuLink"
                aria-expanded="false"
                aria-haspopup="true"
                class="nav-link dropdown-toggle"
                data-toggle="dropdown"
                href="#"
              >
                {{ routeName }}
                <svg aria-hidden="true" class="svg-inline--fa fa-caret-down" data-fa-i2svg="" data-icon="caret-down"
                     data-prefix="fas" data-v-6ea372ba="" focusable="false" role="img"
                     viewBox="0 0 320 512" xmlns="http://www.w3.org/2000/svg">
                  <path d="M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z"
                        fill="currentColor"></path>
                </svg>

              </a>
              <div aria-labelledby="menuLink" class="dropdown-menu">
                <nuxt-link :to="{ name: 'threads.rated' }" class="dropdown-item"
                >Top Rated
                </nuxt-link
                >
                <nuxt-link
                  :to="{ name: 'threads.trending' }"
                  class="dropdown-item"
                >Trending
                </nuxt-link
                >
                <nuxt-link
                  :to="{ name: 'threads.recent' }"
                  class="dropdown-item"
                >Most Recent
                </nuxt-link
                >
                <nuxt-link
                  :to="{ name: 'threads.viewed' }"
                  class="dropdown-item"
                >Most Viewed
                </nuxt-link
                >

                <nuxt-link
                  :to="{ name: 'threads.last.viewed' }"
                  class="dropdown-item"
                >Last Viewed
                </nuxt-link
                >
                <nuxt-link
                  :to="{ name: 'threads.closest' }"
                  class="dropdown-item"
                >Closest
                </nuxt-link
                >
                <nuxt-link
                  v-if="$auth.loggedIn && $auth.user.email === 'kakooljay@gmail.com'"
                  :to="{ name: 'books' }"
                  class="dropdown-item"
                >
                  Add Books
                </nuxt-link>

                <nuxt-link
                  :to="{ name: 'backup' }"
                  class="dropdown-item"
                >Backups
                </nuxt-link
                >
                <nuxt-link
                  v-if="$auth.loggedIn && $auth.user.email === 'kakooljay@gmail.com'"
                  :to="{ name: 'showtabledatabase' }"
                  class="dropdown-item"
                >Shows Database Table
                </nuxt-link
                >
                <nuxt-link


                  :to="{ name: 'listbooks' }"
                  class="dropdown-item"
                >Books
                </nuxt-link
                >
               
                <nuxt-link
                  v-if="$auth.loggedIn && $auth.user.email === 'kakooljay@gmail.com'"
                  :to="{ name: 'Links' }"
                  class="dropdown-item"


                >Links
                </nuxt-link
                >
                <!-- <nuxt-link class="dropdown-item" :to="{ name: 'threads.video' }"
                  >Video</nuxt-link
                > -->
                <!-- <nuxt-link
                  class="dropdown-item"
                  :to="{ name: 'admin.sortbytitle.length' }"
                  v-show="isAdmin"
                  >Sort By Title Length</nuxt-link
                > -->
                <nuxt-link
                  v-show="isAdmin"
                  :to="{ name: 'threads.sortbytitle.length' }"
                  class="dropdown-item"
                >Sort By Title Length
                </nuxt-link
                >

              </div>
            </li>

            <li class="nav-item dropdown navbar-menu-item">
              <a
                id="channelLink"
                aria-expanded="false"
                aria-haspopup="true"
                class="nav-link dropdown-toggle"
                data-toggle="dropdown"
                href="#"
                role="button"
              >
                Categories
                <svg aria-hidden="true" class="svg-inline--fa fa-caret-down" data-fa-i2svg="" data-icon="caret-down"
                     data-prefix="fas" data-v-6ea372ba="" focusable="false" role="img"
                     viewBox="0 0 320 512" xmlns="http://www.w3.org/2000/svg">
                  <path d="M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z"
                        fill="currentColor"></path>
                </svg>

              </a>
              <div aria-labelledby="channelLink" class="dropdown-menu">
                <nuxt-link
                  v-for="channel in channels"
                  :key="channel.id"
                  :class="{'active-tag': activeTag(channel)}"
                  :to="{ name: 'tags', params: { slug: channel.slug } }"
                  class="dropdown-item"
                >{{ channel.name }}
                </nuxt-link
                >
              </div>
            </li>

            <li class="nav-item dropdown navbar-menu-item">
              <a
                :style="{ 'background-image': `url(${defaultEmojiUrl})` }"
                aria-expanded="true"
                aria-haspopup="true"
                aria-label="browse by emoji"
                class="dropdown-toggle emoji-dropdown"
                data-toggle="dropdown"
                href="#"
                role="button"
                style="
                  width: 24px;
                  height: 24px;
                  display: block;
                  background-size: contain;
                  background-repeat: no-repeat;
                "
              >
                <svg aria-hidden="true" class="svg-inline--fa fa-caret-down emoji-caret" data-fa-i2svg=""
                     data-icon="caret-down" data-prefix="fas" data-v-6ea372ba="" focusable="false"
                     role="img" viewBox="0 0 320 512" xmlns="http://www.w3.org/2000/svg">
                  <path d="M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z"
                        fill="currentColor"></path>
                </svg>

              </a>

              <div class="dropdown-menu">
                <nuxt-link
                  v-for="emoji in emojis"
                  :key="emoji.id"
                  :style="backgroundEmoji(emoji.name)"
                  :to="{ name: 'emojis', params: { emoji: emoji.name } }"
                  class="navigation-emoji navigation-emoji-icon dropdown-item"
                >{{ emoji.name }}
                </nuxt-link
                >
              </div>
            </li>
          </ul>
          <SearchForm></SearchForm>
          <div
            class="upload-shot white-path font-14 fw-500 text-uppercase d-flex"
          >
            <nuxt-link :to="{ name: 'maps' }" aria-label="Maps" class="navbar-menu-icon" href="#">
              <img
                alt=""
                class="navbar-icon marker"
                data-placement="top"
                data-toggle="tooltip"
                height="24"
                src="~assets/images/map_marker.png"
                style="width:16px; height:24px" title="View Map" width="16"
              />
            </nuxt-link>
            <nuxt-link
              :to="{ name: 'threads.create' }"
              aria-label="Create New Thread"
              class="navbar-menu-icon"
            >
              <img
                alt=""
                class="navbar-icon pen"
                data-placement="top"
                data-toggle="tooltip"
                height="24"
                src="~assets/images/pen_with.png"
                style="width:17px; height:24px" title="Add a Post" width="17%"
              />
            </nuxt-link>
          </div>
          <!-- <div
            class="notification white-path font-14 fw-500 text-uppercase mr-auto d-flex"
            v-if="$auth.loggedIn"
          >
            <MessageNotification />
            <Notifications />
          </div> -->

          <!-- Before Login -->
          <template v-if="!$auth.loggedIn">
            <ul class="before-login font-14 fw-300 text-uppercase">
              <li>
                <nuxt-link
                  :to="{ name: 'login' }"
                  class="btn btn-dark my-2 my-sm-0"
                >Sign In
                </nuxt-link
                >
              </li>
              <li>
                <nuxt-link
                  :to="{ name: 'register' }"
                  class="btn btn-primary my-2 my-sm-0"
                >Sign Up
                </nuxt-link
                >
              </li>
            </ul>
          </template>
          <!-- End Before Login -->

          <!-- After Login -->
          <template v-else>
            <ul class="author-page white-path">

              <MessageNotification/>
              <Notifications/>

              <!-- Profile Dropdown -->
              <li class="dropdown">
                <a
                  id="userDropdown"
                  aria-expanded="false"
                  aria-haspopup="true"
                  class="dropdown-toggle"
                  data-toggle="dropdown"
                  role="button"
                  style="color: black; font-size: 14px"

                >
                  <img
                    :alt="$auth.user.name"
                    :src="$auth.user.photo_url"
                    class="user-thumb"
                    height="36"
                    style="width:36px; height:36px"
                    width="36"
                  />
                  <!-- {{$auth.user.name}} -->
                  Me
                  <span class="down-chevron" style="margin-left: 5px">
                    <svg aria-hidden="true" class="svg-inline--fa fa-caret-down" data-icon="caret-down" data-prefix="fas"
                         focusable="false" role="img" viewBox="0 0 320 512"
                         xmlns="http://www.w3.org/2000/svg"><path d="M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z"
                                                     fill="currentColor"></path>
                    </svg>
                  </span>
                </a>

                <div
                  aria-labelledby="userDropdown"
                  class="dropdown-menu user-dropdown font-14 fw-500"
                >
                  <nuxt-link
                    :to="{
                      name: 'profile.show',
                      params: { username: $auth.user.username },
                    }"
                    class="dropdown-item"
                    href="#"
                    title="Profile"
                  >
                    <svg aria-hidden="true" class="svg-inline--fa fa-user" data-icon="user" data-prefix="fas"
                         focusable="false" role="img" viewBox="0 0 448 512"
                         xmlns="http://www.w3.org/2000/svg">
                      <path d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z"
                            fill="currentColor"></path>
                    </svg>
                    Profile
                  </nuxt-link>
                  <nuxt-link
                    :to="{
                      name: 'profile.settings.info',
                      params: { username: $auth.user.username },
                    }"
                    class="dropdown-item"
                    href="#"
                    title="Setting"
                  >
                    <svg aria-hidden="true" class="svg-inline--fa fa-cogs" data-icon="cogs" data-prefix="fas"
                         focusable="false" role="img" viewBox="0 0 640 512"
                         xmlns="http://www.w3.org/2000/svg">
                      <path d="M512.1 191l-8.2 14.3c-3 5.3-9.4 7.5-15.1 5.4-11.8-4.4-22.6-10.7-32.1-18.6-4.6-3.8-5.8-10.5-2.8-15.7l8.2-14.3c-6.9-8-12.3-17.3-15.9-27.4h-16.5c-6 0-11.2-4.3-12.2-10.3-2-12-2.1-24.6 0-37.1 1-6 6.2-10.4 12.2-10.4h16.5c3.6-10.1 9-19.4 15.9-27.4l-8.2-14.3c-3-5.2-1.9-11.9 2.8-15.7 9.5-7.9 20.4-14.2 32.1-18.6 5.7-2.1 12.1.1 15.1 5.4l8.2 14.3c10.5-1.9 21.2-1.9 31.7 0L552 6.3c3-5.3 9.4-7.5 15.1-5.4 11.8 4.4 22.6 10.7 32.1 18.6 4.6 3.8 5.8 10.5 2.8 15.7l-8.2 14.3c6.9 8 12.3 17.3 15.9 27.4h16.5c6 0 11.2 4.3 12.2 10.3 2 12 2.1 24.6 0 37.1-1 6-6.2 10.4-12.2 10.4h-16.5c-3.6 10.1-9 19.4-15.9 27.4l8.2 14.3c3 5.2 1.9 11.9-2.8 15.7-9.5 7.9-20.4 14.2-32.1 18.6-5.7 2.1-12.1-.1-15.1-5.4l-8.2-14.3c-10.4 1.9-21.2 1.9-31.7 0zm-10.5-58.8c38.5 29.6 82.4-14.3 52.8-52.8-38.5-29.7-82.4 14.3-52.8 52.8zM386.3 286.1l33.7 16.8c10.1 5.8 14.5 18.1 10.5 29.1-8.9 24.2-26.4 46.4-42.6 65.8-7.4 8.9-20.2 11.1-30.3 5.3l-29.1-16.8c-16 13.7-34.6 24.6-54.9 31.7v33.6c0 11.6-8.3 21.6-19.7 23.6-24.6 4.2-50.4 4.4-75.9 0-11.5-2-20-11.9-20-23.6V418c-20.3-7.2-38.9-18-54.9-31.7L74 403c-10 5.8-22.9 3.6-30.3-5.3-16.2-19.4-33.3-41.6-42.2-65.7-4-10.9.4-23.2 10.5-29.1l33.3-16.8c-3.9-20.9-3.9-42.4 0-63.4L12 205.8c-10.1-5.8-14.6-18.1-10.5-29 8.9-24.2 26-46.4 42.2-65.8 7.4-8.9 20.2-11.1 30.3-5.3l29.1 16.8c16-13.7 34.6-24.6 54.9-31.7V57.1c0-11.5 8.2-21.5 19.6-23.5 24.6-4.2 50.5-4.4 76-.1 11.5 2 20 11.9 20 23.6v33.6c20.3 7.2 38.9 18 54.9 31.7l29.1-16.8c10-5.8 22.9-3.6 30.3 5.3 16.2 19.4 33.2 41.6 42.1 65.8 4 10.9.1 23.2-10 29.1l-33.7 16.8c3.9 21 3.9 42.5 0 63.5zm-117.6 21.1c59.2-77-28.7-164.9-105.7-105.7-59.2 77 28.7 164.9 105.7 105.7zm243.4 182.7l-8.2 14.3c-3 5.3-9.4 7.5-15.1 5.4-11.8-4.4-22.6-10.7-32.1-18.6-4.6-3.8-5.8-10.5-2.8-15.7l8.2-14.3c-6.9-8-12.3-17.3-15.9-27.4h-16.5c-6 0-11.2-4.3-12.2-10.3-2-12-2.1-24.6 0-37.1 1-6 6.2-10.4 12.2-10.4h16.5c3.6-10.1 9-19.4 15.9-27.4l-8.2-14.3c-3-5.2-1.9-11.9 2.8-15.7 9.5-7.9 20.4-14.2 32.1-18.6 5.7-2.1 12.1.1 15.1 5.4l8.2 14.3c10.5-1.9 21.2-1.9 31.7 0l8.2-14.3c3-5.3 9.4-7.5 15.1-5.4 11.8 4.4 22.6 10.7 32.1 18.6 4.6 3.8 5.8 10.5 2.8 15.7l-8.2 14.3c6.9 8 12.3 17.3 15.9 27.4h16.5c6 0 11.2 4.3 12.2 10.3 2 12 2.1 24.6 0 37.1-1 6-6.2 10.4-12.2 10.4h-16.5c-3.6 10.1-9 19.4-15.9 27.4l8.2 14.3c3 5.2 1.9 11.9-2.8 15.7-9.5 7.9-20.4 14.2-32.1 18.6-5.7 2.1-12.1-.1-15.1-5.4l-8.2-14.3c-10.4 1.9-21.2 1.9-31.7 0zM501.6 431c38.5 29.6 82.4-14.3 52.8-52.8-38.5-29.6-82.4 14.3-52.8 52.8z"
                            fill="currentColor"></path>
                    </svg>
                    Settings
                  </nuxt-link>
                  <nuxt-link
                    v-show="$auth.user.is_admin"
                    :to="{ name: 'admin.show' }"
                    class="dropdown-item"
                    href="#"
                    title="Setting"
                  >
                    <svg aria-hidden="true" class="svg-inline--fa fa-cogs" data-icon="cogs" data-prefix="fas"
                         focusable="false" role="img" viewBox="0 0 640 512"
                         xmlns="http://www.w3.org/2000/svg">
                      <path d="M512.1 191l-8.2 14.3c-3 5.3-9.4 7.5-15.1 5.4-11.8-4.4-22.6-10.7-32.1-18.6-4.6-3.8-5.8-10.5-2.8-15.7l8.2-14.3c-6.9-8-12.3-17.3-15.9-27.4h-16.5c-6 0-11.2-4.3-12.2-10.3-2-12-2.1-24.6 0-37.1 1-6 6.2-10.4 12.2-10.4h16.5c3.6-10.1 9-19.4 15.9-27.4l-8.2-14.3c-3-5.2-1.9-11.9 2.8-15.7 9.5-7.9 20.4-14.2 32.1-18.6 5.7-2.1 12.1.1 15.1 5.4l8.2 14.3c10.5-1.9 21.2-1.9 31.7 0L552 6.3c3-5.3 9.4-7.5 15.1-5.4 11.8 4.4 22.6 10.7 32.1 18.6 4.6 3.8 5.8 10.5 2.8 15.7l-8.2 14.3c6.9 8 12.3 17.3 15.9 27.4h16.5c6 0 11.2 4.3 12.2 10.3 2 12 2.1 24.6 0 37.1-1 6-6.2 10.4-12.2 10.4h-16.5c-3.6 10.1-9 19.4-15.9 27.4l8.2 14.3c3 5.2 1.9 11.9-2.8 15.7-9.5 7.9-20.4 14.2-32.1 18.6-5.7 2.1-12.1-.1-15.1-5.4l-8.2-14.3c-10.4 1.9-21.2 1.9-31.7 0zm-10.5-58.8c38.5 29.6 82.4-14.3 52.8-52.8-38.5-29.7-82.4 14.3-52.8 52.8zM386.3 286.1l33.7 16.8c10.1 5.8 14.5 18.1 10.5 29.1-8.9 24.2-26.4 46.4-42.6 65.8-7.4 8.9-20.2 11.1-30.3 5.3l-29.1-16.8c-16 13.7-34.6 24.6-54.9 31.7v33.6c0 11.6-8.3 21.6-19.7 23.6-24.6 4.2-50.4 4.4-75.9 0-11.5-2-20-11.9-20-23.6V418c-20.3-7.2-38.9-18-54.9-31.7L74 403c-10 5.8-22.9 3.6-30.3-5.3-16.2-19.4-33.3-41.6-42.2-65.7-4-10.9.4-23.2 10.5-29.1l33.3-16.8c-3.9-20.9-3.9-42.4 0-63.4L12 205.8c-10.1-5.8-14.6-18.1-10.5-29 8.9-24.2 26-46.4 42.2-65.8 7.4-8.9 20.2-11.1 30.3-5.3l29.1 16.8c16-13.7 34.6-24.6 54.9-31.7V57.1c0-11.5 8.2-21.5 19.6-23.5 24.6-4.2 50.5-4.4 76-.1 11.5 2 20 11.9 20 23.6v33.6c20.3 7.2 38.9 18 54.9 31.7l29.1-16.8c10-5.8 22.9-3.6 30.3 5.3 16.2 19.4 33.2 41.6 42.1 65.8 4 10.9.1 23.2-10 29.1l-33.7 16.8c3.9 21 3.9 42.5 0 63.5zm-117.6 21.1c59.2-77-28.7-164.9-105.7-105.7-59.2 77 28.7 164.9 105.7 105.7zm243.4 182.7l-8.2 14.3c-3 5.3-9.4 7.5-15.1 5.4-11.8-4.4-22.6-10.7-32.1-18.6-4.6-3.8-5.8-10.5-2.8-15.7l8.2-14.3c-6.9-8-12.3-17.3-15.9-27.4h-16.5c-6 0-11.2-4.3-12.2-10.3-2-12-2.1-24.6 0-37.1 1-6 6.2-10.4 12.2-10.4h16.5c3.6-10.1 9-19.4 15.9-27.4l-8.2-14.3c-3-5.2-1.9-11.9 2.8-15.7 9.5-7.9 20.4-14.2 32.1-18.6 5.7-2.1 12.1.1 15.1 5.4l8.2 14.3c10.5-1.9 21.2-1.9 31.7 0l8.2-14.3c3-5.3 9.4-7.5 15.1-5.4 11.8 4.4 22.6 10.7 32.1 18.6 4.6 3.8 5.8 10.5 2.8 15.7l-8.2 14.3c6.9 8 12.3 17.3 15.9 27.4h16.5c6 0 11.2 4.3 12.2 10.3 2 12 2.1 24.6 0 37.1-1 6-6.2 10.4-12.2 10.4h-16.5c-3.6 10.1-9 19.4-15.9 27.4l8.2 14.3c3 5.2 1.9 11.9-2.8 15.7-9.5 7.9-20.4 14.2-32.1 18.6-5.7 2.1-12.1-.1-15.1-5.4l-8.2-14.3c-10.4 1.9-21.2 1.9-31.7 0zM501.6 431c38.5 29.6 82.4-14.3 52.8-52.8-38.5-29.6-82.4 14.3-52.8 52.8z"
                            fill="currentColor"></path>
                    </svg>
                    Admin
                  </nuxt-link>

                  <div class="dropdown-divider"></div>
                  <a class="dropdown-item" href="#" @click.prevent="logout">
                    <svg aria-hidden="true" class="svg-inline--fa fa-lock " data-icon="lock" data-prefix="fas"
                         focusable="false" role="img" viewBox="0 0 448 512"
                         xmlns="http://www.w3.org/2000/svg">
                      <path d="M400 224h-24v-72C376 68.2 307.8 0 224 0S72 68.2 72 152v72H48c-26.5 0-48 21.5-48 48v192c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V272c0-26.5-21.5-48-48-48zm-104 0H152v-72c0-39.7 32.3-72 72-72s72 32.3 72 72v72z"
                            fill="currentColor"></path>
                    </svg>
                    Sign Out
                  </a>
                </div>
              </li>
              <!-- End Profile Dropdown -->
            </ul>
          </template>
          <!-- End After Login -->
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
import SearchForm from './SearchForm';

import MessageNotification from '@/components/chat/MessageNotification';
import Notifications from '@/components/Notifications';
import {mapGetters} from 'vuex';

export default {
  data() {
    return {};
  },
  components: {
    SearchForm,
    MessageNotification,
    Notifications,
  },
  computed: {
    ...mapGetters({
      channels: 'channels',
      emojis: 'emojis',
      settings: 'settings',
    }),
    isAdmin() {
      if (this.$auth.loggedIn) {
        return this.$store.state.auth.user.is_admin;
      }
      return false;
    },

    defaultEmojiUrl() {
      if (this.$nuxt.$route.name == 'emojis') {
        return `${process.env.APP_URL}images/emojis/${this.$route.params.emoji}.png`;
      }
      return process.env.APP_URL + 'images/emojis/default.png';
    },

    routeName() {
      if (this.$nuxt.$route.name == 'threads.rated') {
        return 'Top Rated';
      } else if (this.$nuxt.$route.name == 'threads.trending') {
        return 'Trending';
      } else if (this.$nuxt.$route.name == 'threads.viewed') {
        return 'Most Viewed';
      } else if (this.$nuxt.$route.name == 'threads.recent') {
        return 'Most Recent';
      } else if (this.$nuxt.$route.name == 'threads.last.viewed') {
        return 'Last Viewed';
      } else if (this.$nuxt.$route.name == 'threads.closest') {
        return 'Closest';
      } else if (this.$nuxt.$route.name == 'threads.video') {
        return 'Video';
      } else {
        return 'Top Rated';
        // return 'Most Recent';
      }
    },
  },
  methods: {
    logout() {
      this.$auth.logout();
      this.$nuxt.$emit('logout');
      // this.$router.push('/').catch(()=>{});
      // this.$router.push({ name: 'index' });
      location.href = '/'
    },
    backgroundEmoji(emoji) {
      return `background-image: url(${process.env.APP_URL}images/emojis/${emoji}.png)`;
    },
    activeTag(tag) {
      if (this.$nuxt.$route.name == 'tags') {
        return this.$route.params.slug == tag.slug;
      }
      return false;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~assets/scss/imports/mixins';

li.nav-item {
  font-weight: 700;
  text-transform: uppercase;
}


a.nav-link {
  color: black !important;
}

.navbar-menu-item {
  margin: 0px 5px;
}

.svg-inline--fa {
  path {
    fill: currentColor;
    color: currentColor;
  }
}

.navbar-brand {
  margin-right: .5rem;
}

.dropdown-item:hover,
.dropdown-item:focus {
  color: #16181b;
  text-decoration: none;
  background-color: #6c757d;
}

.navbar-icon {
  width: 24px;
  height: auto;
}

ul.author-page.white-path {
  margin-left: auto;
}

.active-tag {
  color: #ed7d30;
}

.emoji-caret {
  margin-left: 28px;
  margin-top: 5px;
  color: rgba(0, 0, 0, 0.5);
}

.navigation-emoji {
  order: none;
  background: 0 0;
  background-size: 20px;
  background-repeat: no-repeat;
  background-position: 10px 5px;
  /* margin-left: 10px; */
  /* padding-left: 35px !important; */
  color: #212529;
}

li.navigation-emoji-icon {
  padding: 5px 0px;
}

li.navigation-emoji-icon:hover {
  background-color: #6c757d;
}

a.navigation-emoji.navigation-emoji-icon.dropdown-item {
  padding: 0.25rem 2.5rem;
}

a.dropdown-toggle.emoji-dropdown {
  margin-top: 5px;
}

.upload-shot.white-path.font-14.fw-500.text-uppercase.d-flex {
  display: flex;
  align-items: center;
  width: 65px;
  justify-content: space-between;
}

@media (max-width: 990px) {

  .upload-shot.white-path.font-14.fw-500.text-uppercase.d-flex {
    margin-left: 5px;
    margin-bottom: 0;
  }
  a {
    height: 36px;
  }

}

.notification.white-path.font-14.fw-500.text-uppercase.mr-auto.d-flex {
  margin-left: 10px;

  @include respond(tab-land) {
    margin-left: 0px;
  }

  @include respond(tab-port) {
    margin-bottom: 0px;
  }
  @include respond(phone) {
  }
}


@media (max-width: 991px) {
  ul.before-login {
    display: flex;
    flex-direction: column;

    li {
      margin-left: 0;
      margin-bottom: 0;
    }

    a.before-login li:last-child a {
      width: fit-content;
    }
  }

  .upload-shot {
    flex-direction: column;
  }

}

@media (max-width: 991px) {
  ul.before-login {
    display: flex;
    flex-direction: column;

    li {
      margin-left: 0;
      margin-bottom: 10px;
    }

    a.before-login li:last-child a {
      width: fit-content;
    }
  }

  .upload-shot {
    flex-direction: column;
  }

  .navbar-nav {
    flex-direction: row;
    // justify-content: space-around;
  }

  a.dropdown-toggle.emoji-dropdown {
    margin-top: 12px;
  }
  .nav-item.dropdown.navbar-menu-item {
    width: 100px;
  }

  .upload-shot.white-path.font-14.fw-500.text-uppercase.d-flex {
    flex-direction: row;

    a {
      width: 100px;
    }
  }
}


@media (max-width: 574px) {
  ul.before-login li {
    margin-bottom: 0px !important;

    a {
      margin-bottom: 0;
      margin-top: 0;
    }
  }
}
</style>
