
import Vuex from '../vuex/index'
// import Vuex from 'vuex'
import Vue from 'vue';
console.log(Vuex)
Vue.use(Vuex)
let store  = new Vuex.Store({
    modules:{
      test:{
        namespaced:true,
        state:{
          age:24
        },
        modules:{

        },
        mutations:{
          change:function(state,payload){
            console.log(state,'change2',payload)
            state.age = state.age + 1;
          }
        },
        actions:{
          change({commit},payload){
            console.log(555,'actions')
            commit('change','pp')
          }
        }
      },
    },
    state:{
      name:'hwt',
      count:0
    },
    
    namespaced:true,
    mutations:{
      change:function(state,payload){
        console.log(state,'change1')
        state.count = state.count + payload;
      }
    },
    actions:{
      change({commit},payload){
        console.log(444,'actions')
      }
    }
})
window.store = store;
export default store;