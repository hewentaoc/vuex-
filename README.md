
### 1. Vuex的实现			

   ### 　需要解决的问题

> 1. **如何使用Vuex**
> 2. **如何在全局使用$store**
> 3. **如何实现$store中state的动态更新**
> 4. **如何实现$store中getters中属性动态更新**
> 5. **如何实现modules,namespaced**
> 6. **如何实现mutations,actions,如何触发对应的函数**
> 7. **如何实现mapState**



### (1) .**如何使用Vuex**

```js
Vue.use(Vuex)
```

***Vue.use()***使用自定义组件

  需要自定义***install***属性的函数或者方法

才能在全局使用组件中的方法

Vue.use() 方法至少传入一个参数，该参数类型必须是 Object 或 Function，如果是 Object 那么这个 Object 需要定义一个 install 方法，如果是 Function 那么这个函数就被当做 install 方法。在 Vue.use() 执行时 install 会默认执行，当 install 执行时第一个参数就是 Vue，其他参数是 Vue.use() 执行时传入的其他参数。      

### (2) . 如何在全局使用$store

```js
new Vue({
  name:'root',
  render: h => h(App),
  store
}).$mount('#app')
```

在对Vue初始化的时候,传递的属性***store***会挂载在***Vue对象的options中***,

可以通过***Vue.mixin()***进行全局混入

![](assets/image.png)****

```js
export default function install(_Vue){
  Vue = _Vue;
  //将$store混合到每个实例中
  Vue.mixin({
      beforeCreate() {
        if(this.$options.store){
          this.$store = this.$options.store;
        }else{
          if(this.$options.parent && this.$options.parent.$store){
            this.$store = this.$options.parent.$store
          }
        }
      },
  })
}
```
###  (3). **如何实现$store中state的动态更新**

> 1. **对store中的配置项进行递归遍历得到处理后的state对象**
> 2. **定义一个Vue实例,将state值当成Vue的data,进行数据的监听**

      ```js
{
    "state": {
        "name": "hwt",
        "count": 44,
        "test": {
            "age": 24,
            "three": {
                "name": "a"
            }
        }
    }
}
      ```

### (4). **如何实现$store中getters中属性动态更新**

> 1. 在声明的Vue实例中，通过Vue中的computed属性来动态监听getters函数的变化　
> 2. 将计算属性(key,value)代理到this.getters中

 **在state数据发生变化的时候，会触发页面重新更新**，this.getters会被重新调用，得到此时computed属性返回最新的值，实现数据的动态更新

**可能是计算属性更改，导致get函数反复运行**

**可能是页面刷新，调用$store.getters.add,从而得到计算属性**

　state数据发生变化时候

```js
        this._computer = {

        }
        this.getters = {};
        let self = this;
        Object.keys(this._getters).forEach(item=>{
            let func = this._getters[item];
            this._computer[item] = function(){
                return func(this)
            }
            Object.defineProperty(this.getters,item,{
                get:function(){
                    return self._vm[item];
                }
            })
        })
```

### (5) 如何实现modules,namespaced

 1. 进行递归遍历的时候，modules会作为path逐级传递

 2. 没有namespaced，会把同名的函数存储在一个数组中

 3. 在store遍历阶段会注册***mutation函数***存储对象

 4. 然后通过commit方法进行触发

    ```js
    ['test']
    //没有namespaced
    this.mutation = {
        change:[function(){
            
        },function(){
            
        }],
        change2:[function(){
            
        }]
    }
    //有namespaced
    this.mutation = {
        change:[function(){
            
        }],
        'test/change':[function(){
            
        }]
    }
    
    ```

### (6) **如何实现mutations,actions,如何触发对应的函数**

　　通过commit,dispath,触发对应的函数

```js
 this.$store.commit('change',num)
 this.$store.commit('test/change',num)
    /*
      触发mutation函数
    */
commit = (type,payload)=>{
    if(this._mutations[type]){
        this._mutations[type].forEach((item)=>{
            item(payload);
        })
    }else{
        throw new Error(`${type} is not a function!`)
    }
}
```





### (7) **如何实现mapState**

将用到的state属性放在Vue的计算属性中

```js

function mapState(params,extra){
    let {type , path } = handleMap(params,extra);
    let res = {}
    type.forEach((item)=>{
        res[item] = function(){
           let state =　{};
           let root = this.$store.state;
           state = path.length > 0 ? getContextState(root,item,path) : root[item];
           return state; 
        }
    })
     
    return res;
}
```



## 需要解决的问题
> commit,dispatch函数的作用域  √
> state取值的作用域　√
> getter函数的实现 √
> getter函数有命名空间和没有命名空间的区别　√