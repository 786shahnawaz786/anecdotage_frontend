export default{
  methods: {
    async imageToBlob(slide) {
      const img = new Image;
      const c = document.createElement("canvas");
      const ctx = c.getContext("2d");

      const imageData = await this.$axios.$post(`slides/screenshots/${slide.slug}`)
      img.src = imageData.base64

      return new Promise(resolve => {
        img.onload = function () {
          c.width = this.naturalWidth;
          c.height = this.naturalHeight;
          ctx.drawImage(this, 0, 0);
          c.toBlob((blob) => {
            // here the image is a blob
            resolve(blob)
          }, "image/png", 0.75);
        };
      })
    },
    async copyImage(slide){
      const blob = await this.imageToBlob(slide)
      const item = new ClipboardItem({ "image/png": blob });
      navigator.clipboard.write([item]);

      this.$toast.open({
        type: 'info',
        position: 'top',
        message: 'Slide copied to clipboard',
        duration: 1000,
      });
    }
  },
}
