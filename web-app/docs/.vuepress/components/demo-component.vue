<template>
  <div>
    <p class="demo">
      {{ msg }}
    </p>
    <button @click="clicky" color="red">This Button Does Nothing</button>
    <p>
     showSecret: {{showSecret}}
    </p>
    {{this.$site}}
  </div>

</template>

<script>
  export default {
    data() {
      return {
        clickNum: 0,
        showSecret: false,
        msg: 'Hello this is '
      }
    },
    methods:{
      clicky() {
        this.clickNum += 1 
        console.log(`and yet you still clicked it ${this.clickNum} time${this.clickNum>1 ? 's':''}`)
        this.showSecret = !this.showSecret
      }
    }

  }
</script>
