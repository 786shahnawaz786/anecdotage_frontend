<template>
  <div class="row">
    <div class="col-md-12">
      <div class="row">
        <div class="col-md-12">
          <button class="btn btn-primary float-right" type="button" data-toggle="modal" data-target="#newCategoryModal">Add New</button>
        </div>
      </div>
        <div class="row">
          <div class="col-md-2"></div>
          <div class="col-md-8">
            <table class="table table-sm">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Search Term</th>
                  <th scope="col">Display Text</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr  v-for="(category, index) in categories" :key="category.id">
                  <td scope="row">{{ index + 1 }}</td>
                  <td>{{ category.search_term }}</td>
                  <td>{{ category.display_text }}</td>
                  <td><button class="btn btn-default btn-sm" @click.prevent="showCategoryUpdateModal(category)"><i class="fas fa-edit"></i></button> </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
    </div>
      <!-- Modal -->
      <div class="modal fade" id="updateCategoryModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Update Category</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <form @submit.prevent="updateCategorySubmit">
                <div class="form-group row">
                  <label for="display_text" class="col-sm-4 col-form-label"
                    >Display Text</label
                  >
                  <div class="col-sm-8">
                    <input
                      type="text"
                      class="form-control"
                      id="display_text"
                      placeholder="Display Text"
                      v-model="updateCategoryform.display_text"
                    />
                  </div>
                </div>
                <div class="form-group row">
                  <label for="search_term" class="col-sm-4 col-form-label"
                    >Search term</label
                  >
                  <div class="col-sm-8">
                    <input
                      type="text"
                      class="form-control"
                      id="search_term"
                      placeholder="Search Term"
                      v-model="updateCategoryform.search_term"
                    />
                  </div>
                </div>

                <div class="form-group row">
                  <div class="col-sm-8 offset-sm-4">
                    <base-button :loading="updateCategoryform.busy"> Update </base-button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <!-- Modal -->
      <div class="modal fade" id="newCategoryModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Add new category</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <form @submit.prevent="newCategorySubmit">
                <div class="form-group row">
                  <label for="display_text" class="col-sm-4 col-form-label"
                    >Display Text</label
                  >
                  <div class="col-sm-8">
                    <input
                      type="text"
                      class="form-control"
                      id="display_text"
                      placeholder="Display Text"
                      v-model="newCategoryform.display_text"
                    />
                  </div>
                </div>
                <div class="form-group row">
                  <label for="search_term" class="col-sm-4 col-form-label"
                    >Search term</label
                  >
                  <div class="col-sm-8">
                    <input
                      type="text"
                      class="form-control"
                      id="search_term"
                      placeholder="Search Term"
                      v-model="newCategoryform.search_term"
                    />
                  </div>
                </div>

                <div class="form-group row">
                  <div class="col-sm-8 offset-sm-4">
                    <base-button :loading="newCategoryform.busy"> Update </base-button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

  </div>
</template>

<script>
import categoryVue from '../category.vue';
export default {
  data() {
    return {
      updateCategoryform: this.$vform({
        display_text: '',
        search_term: '',
      }),
      newCategoryform: this.$vform({
        display_text: '',
        search_term: '',
      }),
      category_id: null
    };
  },
  head() {
    return {
      title: this.settings.site_title,
    };
  },
  computed: {
    settings() {
      return this.$store.getters.settings;
    },
    categories() {
      return this.$store.getters.categories;
    },
  },
  methods: {
    showCategoryUpdateModal(category){
      this.category_id = category.id;
      this.updateCategoryform.display_text = category.display_text;
      this.updateCategoryform.search_term = category.search_term;

      $('#updateCategoryModal').modal('show')
    },
    async updateCategorySubmit() {
      try {
        const category = await this.updateCategoryform.put(`slides/admin/categories/${this.category_id}`);
        const categories = await this.$axios.$get(`slides/categories`)
        this.$store.commit('SET_CATEGORIES', categories.data)

        // this.$store.commit('SET_SETTINGS', settings.data)


        this.category_id = null
        this.updateCategoryform.display_text = '';
        this.updateCategoryform.search_term = ''
        $('#updateCategoryModal').modal('hide')

        this.$toast.open({
        type: 'success',
        position: 'top-right',
        message: 'Category Update Successfully',
        // duration: 300000
      });
      } catch (e) {}
    },


    async newCategorySubmit() {
      try {
        const category = await this.newCategoryform.post(`slides/admin/categories`);
        const categories = await this.$axios.$get(`slides/categories`)
        this.$store.commit('SET_CATEGORIES', categories.data)

        this.newCategoryform.display_text = '';
        this.newCategoryform.search_term = ''
        $('#newCategoryModal').modal('hide')

        this.$toast.open({
        type: 'success',
        position: 'top-right',
        message: 'Category Add Successfully',
        // duration: 300000
      });
      } catch (e) {}
    },
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

  td {
    background-color: transparent;
    color:#212529;
    font-family: serif;
  }

</style>
