<template>
  <div class="hello">
     <h2>{{$store.state.name}}</h2>
     <h2>{{$store.state.count}}</h2>
     <h2>{{$store.state.test}}</h2>
     <h2>{{$store.state.test.age}}</h2>
     <button @click="changeNumber(1)">Add</button>
     <button @click="changeNumber(-1)">Delete</button>
     <button @click="action">Action</button>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  methods:{
    changeNumber(num){
      // this.$store.commit('change',num)
      this.$store.commit('test/change',num)
    },
    action(){
      this.$store.dispatch('test/change')
      //  this.$store.dispatch('change')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
