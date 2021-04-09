
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
          three: {
            namespaced:true,
            state: {
              name: 'a',
            },
            getters:{
              getZjof:function(state){
                return 'getters3: hwt getZjof :' + state.name;
              }
            }
          }
        },
        getters:{
          getAge:function(state){
            return 'getters2: hwt' + state.age;
          }
        },
        mutations:{
          change2:function(state,payload){
            console.log(state,'change2',payload)
            state.age = state.age + 1;
          }
        },
        actions:{
          actionChange2({commit},payload){
            console.log(555,'actions')
            commit('change2','pp')
          }
        }
      },
    },
    namespaced:true,
    state:{
      name:'hwt',
      count:44,
    },
    getters:{
      add(state){
        console.log(666,state)
        return ' getters' + ':' + state.count + state.name;
      }
    },
    mutations:{
      change:function(state,payload){
        console.log(state,'change1')
        state.count = state.count + payload;
        state.name = 'po'
      }
    },
    actions:{
      actionChange({commit},payload){
        console.log(444,'actions')
      }
    }
})
window.store = store;
export default store;