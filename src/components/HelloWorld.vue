<template>
  <div class="hello">
     <h1>{{$store.getters.add}}</h1>
     <h1>{{$store.getters['test/getAge']}}</h1>
     <h1>{{$store.getters['test']}}</h1>
     <h2>{{$store.state.name}}</h2>
     <h2>{{$store.state.count}}</h2>
     <h2>{{$store.state.test}}</h2>
     <h2>{{$store.state.test.age}}</h2>
     <h2>{{$store.state.test.three.name}}</h2>
     <h2>mapState:{{this.name}}</h2>
     <h2>mapState:{{this.count}}</h2>
     <h2>-----------</h2>
     <h2>mapState2:{{this.age}}</h2>
     <h2>-----------</h2>
     <h2>mapGetters:{{this.add}}</h2>
     <h2>mapGetters2:{{this.getAge}}</h2>
     <h2>mapGetters2:{{this.getZjof}}</h2>
     <button @click="changeNumber(1)">Add</button>
     <button @click="changeNumber(-1)">Delete</button>
     <button @click="changeAge">Age</button>
     <button @click="action">Action</button>
     <button @click="getW">getter2</button>
  </div>
</template>

<script>
import {mapState,mapGetters,mapMutations,mapActions} from '../vuex/index'
// import {mapState,mapGetters} from 'vuex';
// console.log(mapState)
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  mounted:function(){
    // console.log(555,this.$store.getters)
  },  
  computed:{
    ...mapState(['name','count']),
    ...mapState('test',['age']),
    ...mapGetters(['add']),
    ...mapGetters('test',['getAge']),
    ...mapGetters('test/three',['getZjof'])
  },
  methods:{
    ...mapMutations(['change']),
    ...mapMutations('test',['change2']),
    ...mapActions(['actionChange']),
    ...mapActions('test',['actionChange2']),
    getW(){
      // this.$store.dispatch('test/change');
    },
    changeNumber(num){
      this.change(1)
      // this.$store.commit('change',num)
      // this.$store.commit('test/change',num)
    },
    changeAge(){
      console.log('age',this.change2)
      this.change2(3)
    },
    action(){
      // this.$store.dispatch('test/change')
      //  this.$store.dispatch('change')
      this.actionChange(99)
      this.actionChange2(990)
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
