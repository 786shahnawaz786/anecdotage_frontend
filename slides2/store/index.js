export const state = () => ({
  settings:null,
  slides: [],
  categories: [],
  slidePaginate: null,
  singleSlide: null,
  isLoaded: true,
  goLast: false,

  slideLogoColor: '',
  screenshots: [],
  screenshotPaginateData: null,
})

export const getters = {
  settings: state => state.settings,
  slides: state => state.slides,
  categories: state => state.categories,
  slidePaginate: state=>  state.slidePaginate,
  singleSlide: state=> state.singleSlide,
  isLoaded: state=> state.isLoaded,
  goLast: state=> state.goLast,
  slideLogoColor: state => state.slideLogoColor,
  screenshots: state => state.screenshots,
  screenshotPaginateData: state => state.screenshotPaginateData,
}

export const mutations = {
  SET_SETTINGS: (state, data)=> {
    state.settings = data;
  },
  SET_SLIDES: (state, data)=> {
    state.slides = data;
  },
  SET_CATEGORIES: (state, data) =>{
    state.categories = data;
  },
  SET_SLIDE_PAGINATE(state, data){
    state.slidePaginate = data;
  },
  PUSH_SLIDES(state, data){
    state.slides = [...state.slides,... data];
  },
  SET_SINGLE_SLIDE( state, data){
    state.singleSlide = data;
  },
  SET_IS_LOADED( state, data){
    state.isLoaded = data;
  },


  SET_GO_LAST(state, data){
    state.goLast = data;
  },
  SET_SLIDE_LOGO_COLOR(state, data){
    state.slideLogoColor = data;
  },

  SET_SCREENSHOTS(state, data){
    state.screenshots = data;
  },
  SET_SCREENSHOTS_PAGINATE(state, data){
    state.screenshotPaginateData = data;
  },


}

export const actions = {
  async nuxtServerInit ({ commit }, { req, $axios }) {

    const settings = await $axios.$get(`slides/settings`)
    const categories = await $axios.$get(`slides/categories`)

    // const slides = await $axios.$get(`slides/all?per_page=100`)

    commit('SET_SETTINGS', settings)
    // commit('SET_SLIDES', slides.data)
    commit('SET_CATEGORIES', categories.data)
  }
}
