<template>
  <div class="container">
    <div class="row">
      <div class="col-md-8">
        <div v-if="!isAdmin">

          <!-- Ezoic - TEST - top_of_page -->
          <div id="ezoic-pub-ad-placeholder-125"> </div>
          <!-- End Ezoic - TEST - top_of_page -->
        </div>
        <safe-search :postCounts="pageinateData.total" :totalThreadsCount="totalThreadsCount" :card="true"></safe-search>
        <div>
          <!-- Ezoic - mid_content - mid_content -->
          <!-- <div id="ezoic-pub-ad-placeholder-105"> </div> -->
          <!-- End Ezoic - mid_content - mid_content -->
        </div>
        <div>
        <h1>Test Banner</h1>
        </div>
        <template v-if="$route.query.show && $route.query.show == 'all' ">
            <ThreadSimple
            v-for="thread in threads"
            :key="thread.id"
            :thread="thread" />
        </template>

        <template v-else>
          <SingleThread
            v-for="thread in threads"
            :key="thread.id"
            :thread="thread"
          ></SingleThread>
           <Pagination
          :pagination="pageinateData"
          routeName="threads.rated"
          :param="{ key: '', value: '' }"
        />
        </template>

        <!-- <Pagination
          :pagination="pageinateData"
          routeName="index"
          :param="{ key: '', value: '' }"
        /> -->

        <!-- Ezoic - bottom_of_page - bottom_of_page -->
          <div id="ezoic-pub-ad-placeholder-120" v-if="!isAdmin"> </div>
          <!-- End Ezoic - bottom_of_page - bottom_of_page -->
      </div>
      <div class="col-md-4">
        <div></div>
        <Sidebar />
      </div>
    </div>
  </div>
</template>

<script>
import scrollToTop from '@/mixins/scrollToTop'
import getSettings from '@/mixins/getSettings'
import threadLists from '@/mixins/threadLists'
import userStatus from '@/mixins/userStatus'
export default {
  name: 'index',
  mixins: [scrollToTop,getSettings, threadLists, userStatus],

  watchQuery: true,


  async fetch({ params, query, app, $axios, store }) {
    const q = await Object.keys(query)
      .map((k) => `${k}=${query[k]}`)
      .join('&');

    try {
      // const threadRresponse = await $axios.$get(`threads?${q}`);
      const threadRresponse = await $axios.$get(`threads/filter/rated?${q}`);
      store.commit('threads/setThreads', threadRresponse.data);
      store.commit('threads/setPageinateData', threadRresponse.meta);
      store.commit('threads/setTotalThreadsCount', threadRresponse.total_threads_count);
      // return { threads: threadRresponse.data, pageinateData: threadRresponse.meta};
    } catch (e) {
      console.log(e);
    }
  },
};
</script>


