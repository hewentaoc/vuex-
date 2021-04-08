<template>
  <div class="hello">
     <h1>{{$store.getters.add}}</h1>
     <h1>{{$store.getters['test/getAge']}}</h1>
     <h2>{{$store.state.name}}</h2>
     <h2>{{$store.state.count}}</h2>
     <h2>{{$store.state.test}}</h2>
     <h2>{{$store.state.test.age}}</h2>
     <button @click="changeNumber(1)">Add</button>
     <button @click="changeNumber(-1)">Delete</button>
     <button @click="action">Action</button>
     <button @click="getW">getter2</button>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  mounted:function(){
    console.log(555,this.$store.getters)
  },  
  methods:{
    getW(){
      this.$store.dispatch('test/change');
    },
    changeNumber(num){
      this.$store.commit('change',num)
      // this.$store.commit('test/change',num)
    },
    action(){
      // this.$store.dispatch('test/change')
       this.$store.dispatch('change')
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
