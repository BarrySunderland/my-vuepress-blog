<template>
  <div>
    <hr>
    <p v-for="blogLink in blogLinks" :key="blogLink.id">
      <a :href="blogLink.path">{{ blogLink.title }}</a>
    </p>

  </div>

</template>

<script>
  export default {
    data() {
      return {
      }
    },
    methods:{
      clicky() {
        this.clickNum += 1 
        console.log(`and yet you still clicked it ${this.clickNum} time${this.clickNum>1 ? 's':''}`)
        this.showSecret = !this.showSecret
      },
      isBlogPage(page){
        let path = page['path']
        return path.startsWith('/blog/') && path.endsWith('.html')
      }
    },
    computed:{
      blogLinks(){
        return this.$site['pages'].filter(this.isBlogPage)
      },
    }
  }
</script>
