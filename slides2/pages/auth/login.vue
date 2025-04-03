<template>
  <div class="container">
    <div class="row">
      <div class="col-md-6 offset-md-3">
        <div class="content">
            <div class="card">
              <div class="card-body">
                  <section class="authentication">
                    <div class="auth-body">
                      <h1 class="text-uppercase fw-500 mb-4 text-center font-22">Login</h1>
                      <form class="auth-form" @submit.prevent="submit">
                        <alert-error v-if="form.errors.errors.username" :form="form">
                          {{ form.errors.errors.username[0] }}
                        </alert-error>
                        <div class="form-group">
                          <base-input
                            :form="form"
                            field="email"
                            v-model="form.email"
                            placeholder="Email"
                          ></base-input>
                        </div>
                        <div class="form-group">
                          <base-input
                            :form="form"
                            field="password"
                            inputType="password"
                            v-model="form.password"
                            placeholder="Password"
                          ></base-input>
                        </div>
                        <div class="mt-4 mb-4 clearfix">
                            <base-button :loading="form.busy"> Login </base-button>
                        </div>
                        <div class="text-right">

                        </div>
                      </form>
                    </div>
                  </section>
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
  // middleware: ['guest'],
  name: 'login',
  data() {
    return {
      form: this.$vform({
        email: '',
        password: '',
      }),
    };
  },
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
  methods: {
    submit() {
      this.$auth
        .loginWith('local', {
          data: this.form,
        })
        .then((res) => {
          // this.form.reset();
          // console.log(res)
        })
        .catch((e) => {
          this.form.errors.set(e.response.data.errors);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
  .content{
    color: black;
    margin:100px 0;

    a {
      color: black;
    }
  }

    .alert {
    position: relative;
    padding: 0.75rem 1.25rem;
    margin-bottom: 1rem;
    border: 1px solid transparent;
    border-radius: 0.25rem;
    display: block;
    font-size: initial;
}

  .alert-danger {
    color: #721c24;
    background-color: #f8d7da;
    border-color: #f5c6cb;
}
</style>
