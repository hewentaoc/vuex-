import {Vue} from './install'
export default class Store {
    constructor(options){
        let root = {};
        let path = [];
        this._mutations = {};
        this._actions = {};
        this._getters = {};
        this.init(options,root,path)
        let computed = this._computer;
        let vm  = new Vue({
            data:root.state|| {},
            computed:computed
        })
        this._vm = vm;
        this.state = vm._data;
    }
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
    /**
     * 触发actions函数
     * @param {*} type 
     * @param {*} payload 
     */
    dispatch = (type,payload)=>{
        if(this._actions[type]){
            this._actions[type].forEach((item)=>{
                item(payload)
            })
        }else{
            throw new Error(`${type} is not a function`)
        }
    }


    /**
     * 初始化
     * @param {*} options 
     * @param {*} root 
     * @param {*} path 
     */
    init(options,root,path){
      this.dspStore(options,root,path);
      this.observerGetters();
    }

    initVue(){

    }
    observerGetters(){
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
    }

    /**
     * 注册mutation函数
     * @param {*} mutations 
     * @param {*} path  记录模块的路径
     * @param {*} namespaced 
     */
    registerMutations(mutations,path,namespaced,context){
        if(!mutations){
            return;
        }
        if(typeof mutations != 'object'){
           throw new Error('Error!');
        }
        let store = this;
        let name = this.getNameSpaced(path,namespaced);
        for (const type in mutations) {
            let func = mutations[type];
            if(this._mutations[name + type]){
          　  this._mutations[name + type].push((payload)=>{
                　func.call(store,context.state,payload)
           　 });
            }else{
        　  　 this._mutations[name + type] = [(payload)=>{
                　func.call(store,context.state,payload)
            　 }]; 
            }
        }
    }
    /**
     * 注册actions(异步)函数
     * @param {*} actions 
     * @param {*} path 
     * @param {*} namespaced 
     */
    registerActions(actions,path,namespaced,context){
        if(!actions){
            return;
        }
        if(typeof actions != 'object'){
           throw new Error('Error!');  
        }
        let name = this.getNameSpaced(path,namespaced);
        let store = this;
        for (const type in actions) {
            let func = actions[type];
            if(this._actions[name + type]){
                this._actions[name + type].push((payload)=>{
                   func.call(store,{
                       commit:context.commit,
                       dispatch:context.dispatch,
                       state:context.state
                   },payload)
                })
            }else{
                this._actions[name + type] = [function(payload){
                   func.call(store,{
                        commit:context.commit,
                        dispatch:context.dispatch,
                        state:context.state
                   },payload)
                }]  
            }
        }
    }
    /**
     * 注册getters
     * @param {*} getters 
     * @param {*} path 
     * @param {*} namespaced 
     * @param {*} context 
     * @returns 
     */
    registerGetters(getters,path,namespaced,context){
        if(!getters){
            return;
        }
        if(typeof getters != 'object'){
            throw new Error('Error!'); 
        }
        let name = this.getNameSpaced(path,namespaced)
        let store = this;
        for (const type in getters) {
            let func = getters[type]
            // if(this._getters[name + type]){
            //     this._getters[name + type].push(()=>{
            //         func.call(store,context.state,func)
            //     })
            // }else{
            //    this._getters[name + type] = [()=>{
            //     func.call(store,context.state,func)
            // }]
            // }
            // console.log(666,name,type)
            this._getters[name + type] = (store)=>{
               return func.call(store,context.state)
            };
        }
    }
    /**
     * 得到此时模块的命名空间
     * @param {*} path 
     * @param {*} namespaced 
     * @returns 
     */
    getNameSpaced(path,namespaced){
        namespaced = !!namespaced;
        let result = path.reduce((prev,item)=>{
            return prev + (namespaced ? item + '/' : '');
        },'')
        return result;
    }
    /**
     * 深度遍历store
     * @param {*} options 
     * @param {*} root 
     * @param {*} path 
     */
    dspStore(options,root,path){
        let {modules = {},state = {},namespaced , mutations , actions , getters} = options;
        let next = {};
        if(path.length == 0){
            root.state = {
                ...state
            }
            next = root.state;
        }else{
            root[path[path.length - 1]] = {
                ...state
            }
            next = root[path[path.length - 1]];
        }
        const context = getContext(options,path,namespaced,this);
        this.registerGetters(getters,path,namespaced,context);
        this.registerMutations(mutations,path,namespaced,context);//注册mutation函数
        this.registerActions(actions,path,namespaced,context);
        if(typeof modules == 'object'){//遍历modules
            for (const key in modules) {
                path.push(key);
                this.dspStore(modules[key],next,path)
            }
        }
    }
}

/**
 * 得到模块对应的上下文
 * @param {*} options 
 * @param {*} path 
 * @param {*} namespaced 
 * @param {*} store 
 * @returns 
 */
function getContext(options,path,namespaced,store){
    const curPath = [...path];
    namespaced = !! namespaced;
    const context = {
        commit: namespaced ? (type,payload)=>{
            let name = store.getNameSpaced(curPath,namespaced);
            store.commit(name + type , payload)
        } : store.commit,
        dispatch: namespaced ? (type,payload)=>{
        } : store.dispatch
    }
    Object.defineProperties(context, {
        state: {
          get: () => getNestedState(store,curPath),
          enumerable: true,
        }
      })
    return context;
}

/**
 * 得到模块对应的state
 * @param {*} store 
 * @param {*} path 
 * @returns 
 */
function getNestedState(store,path){
    let root = store.state;
    let state = path.reduce((store,key)=>{
        return store[key];
    },root)
    return state;
}


// state: {}
// _children: {}
// _rawModule: {}
/**
state = {
    name:'hwt',
    test:{

    }
}



 */