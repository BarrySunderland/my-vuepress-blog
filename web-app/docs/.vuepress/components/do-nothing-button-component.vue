<template>
  <div>
    <button fill-color="green" @click="clicky">This button does nothing</button>
    <div  v-if="this.showSecret">
      <p>... yet you still clicked it {{clickNum<=1 ? '':`${clickNum} times`}}</p>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
          showSecret : false,
          clickNum : 0 
      }
    },
    methods:{
      clicky() {
        this.clickNum += 1 
        this.showSecret = true
      },
    },
  }
</script>

<style lang="css">

button {
  background-color: #009e059c; 
  border-radius: 5px;
  border: none;
  color: white;
  padding: 10px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
}

button:hover {
    background-color: #009e05; 

}
</style>

