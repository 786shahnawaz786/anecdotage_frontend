export default{
  computed: {
    signedIn() {
      return this.$auth.loggedIn;
    },
    isAdmin() {
      if (this.signedIn) {
        return this.$store.state.auth.user.is_admin;
      }
      return false;
    },

    facebookIconUrl(){
      return 'https://www.factslides.com/imgs/FB.png'
    },
    twitterIconUrl(){
      return 'https://www.factslides.com/imgs/TW.png'
    },
    shareHtml(){
      return `
        <div class="share-div" style=" display: flex;justify-content: space-between;padding: 5px 0px;align-items: center; width:300px;" >
          <div class="single-share">
            <a class="share-link" style="display:inline-block; cursor:pointer; text-decoration:none;"
                onclick="window.open('${this.facebookShareUrl}','popup','width=600,height=600,scrollbars=no,resizable=no'); return false;"
            >
              <img src="${this.facebookIconUrl}" style="width:40px" /> Facebook
            </a>
          </div>
          <div class="single-share">
            <a class="share-link" style="display:inline-block; cursor:pointer; text-decoration:none;"
              onclick="window.open('${this.twitterShareUrl}','popup','width=600,height=600,scrollbars=no,resizable=no'); return false;"
            >
              <img src="${this.twitterIconUrl}" style="width:40px"  />  Twitter
            </a>
          </div>
        </div>
      `
    },
    appurl() {
      return process.env.APP_URL;
    },
    threadUrl(){
      return `https://anecdotage.com/anecdotes/${this.slide.slug}`
    },
    threadTitle(){
      // return this.slideUrl.replace(/'.?\s|'/,'')
       return this.slide.title.replace(/(<([^>]+)>)/gi, '').replace(/'|"/gi,'');
    },
    twitterShareUrl(){
      return  `https://twitter.com/intent/tweet?url=${this.slideUrl}&text=${this.threadTitle}&via=anecdotage_com`;
    },
    facebookShareUrl(){
      return `https://www.facebook.com/sharer/sharer.php?u=${this.slideUrl}&title=${this.threadTitle}`;
    },
  },
}
