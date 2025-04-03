<template>
  <div>    <!-- Modal -->
    <div class="modal show fade" id="reportModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Submit a Story</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="submitReport">
               <div class="form-group row">
              <label for="note" class="col-sm-12 col-form-label"
                >Your Story</label
              >
              <div class="col-sm-12">
                <textarea
                  type="text"
                  class="form-control"
                  id="note"
                  placeholder="Enter note"
                  v-model="form.note"
                  :class="{ 'is-invalid': form.errors.has('note') }"
                >
                </textarea>
                <div class="invalid-feedback" v-if="form.errors.has('note')">
                  {{form.errors.get('note')}}
                </div>
              </div>
            </div>
            <div class="form-group row">
              <label for="source" class="col-sm-12 col-form-label"
                >Source</label
              >
              <div class="col-sm-12">
                <input
                  type="text"
                  class="form-control"
                  id="source"
                  placeholder="Enter source"
                  v-model="form.source"
                  :class="{ 'is-invalid': form.errors.has('source') }"
                />
                <div class="invalid-feedback" v-if="form.errors.has('source')">
                  {{form.errors.get('source')}}
                </div>
              </div>
            </div>
            <div class="form-group row">
              <label for="email" class="col-sm-12 col-form-label"
                >Email</label
              >
              <div class="col-sm-12">
                <input
                  type="text"
                  class="form-control"
                  id="email"
                  placeholder="Enter email"
                  v-model="form.email"
                  :class="{ 'is-invalid': form.errors.has('email') }"
                />
                <div class="invalid-feedback" v-if="form.errors.has('email')">
                  {{form.errors.get('email')}}
                </div>
              </div>
            </div>
            <div class="form-group row">
              <div class="col-sm-8 mt-2">
                <button class="btn btn-primary">Submit</button>
                <!-- <base-button :loading="form.busy" nativeType="submit">Submit</base-button> -->
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
  export default {
    data(){
      return {
        form: this.$vform({
          note: '',
          source: '',
          email: '',
        }),
        slide_id: null
      }
    },
    created() {

    this.$nuxt.$on('showSubmitModal',(slide_id)=>{
      this.slide_id = slide_id;
      // console.log(slide_id)
      $('#reportModal').modal('show');
    })
  },
  methods: {
    async submitReport(){
         try {
           if(this.slide_id == null) return;
           const res = await this.form.post(`slides/slide/${this.slide_id}/report`)
           this.slide_id = null;
           $('#reportModal').modal('hide');
            this.$toast.open({
              type: 'success',
              position: 'top-right',
              message: 'Thank you for your submission! We will notify you if/when it is published.',
            });


        } catch (error) {
          // this.form.errors.set(error.response.data.errors.errors);
        }
      },
    },
  }
</script>

<style lang="scss" scoped>
//    a {
//     margin-left: 1%;
//     margin-right:1%;
//   }
//   svg {
//     font-size: 75%;
//     margin-right:2px;
//   }
//   .card{
//     margin:0;
//   }

//   .card-body{
//       font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
//       font-size: 16px;
//       font-weight: 400;
//       line-height: 1.5;
//       color: #212529;
//       text-align: left;
//       background-color: #fff;

//         a {
//         color: #007bff;
//       }
//       padding: 0;
//   }

//   .modal.fade .modal-dialog {
//       transition: transform 0.3s ease-out;
//       transform: translate(0, 0px);
//   }

//   .fade:not(.show) {
//       opacity: 1;
//   }

//   .modal-header {
//       width: 100%;
//       padding: .5rem 1rem;
//   }

//    div.modal,
//    div.modal-dialog,
//    div.card-body,
//    div.modal-content,
//    div.modal-header,
//    div.modal-body,
//    div.modal-footer,
//    div.form-group,
//    div.col-sm-3,
//    div.col-sm-4,
//    div.col-sm-6,
//    div.col-sm-8,
//    div.col-sm-10,
//    div.col-sm-12

//   {
//     margin: 0;
//     margin-left: 0;
//     margin-right: 0;
//     text-shadow: none;
// }
// div.modal-header{
//   display: flex;
//   justify-content: space-between;
// }

// .modal-title{
//   display: inherit;
// }
//  div.modal-content{
//    border: none;
//    padding: 1rem
//  }
// .modal-footer{
//   border-top: none;
// }

// .modal-body{
//   padding:0;
//   width:100%;
// }

// .form-group{
//   width: 100%;
// }


//  div.form-group.row{
//   margin-bottom: 10px;
// }

// .modal{
//   height: auto;
// }

.modal{
color: rgb(33, 37, 41);
font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
font-size: 16px;
font-weight: 400;
line-height: 24px;
margin-block-end: 16px;
margin-block-start: 0px;
margin-bottom: 16px;
margin-inline-end: 0px;
margin-inline-start: 0px;
margin-top: 0px;
pointer-events: auto;
text-align: left;
}
</style>
