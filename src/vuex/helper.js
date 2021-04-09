
function handleMap(params,extra){
    let type = [];
    let path = '';
    if(Array.isArray(params)){
        type = params;
    }else if(Array.isArray(extra)){
        type = extra;
        path = params;
    }else{
        throw new Error('Error');
    }
    return {
        type,
        path,  
    }
}

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


function mapGetters(params,extra){
    let {type , path } = handleMap(params,extra);
    let res = {}
    type.forEach((item)=>{
        res[item] = function(){
           let getters = this.$store.getters;
           return path ? getters[path +'/'+ item] : getters[item]; 
        }
    })
    return res;
}







function mapMutations(params,extra){
    let {type , path } = handleMap(params,extra);
    let res = {}
    type.forEach((item)=>{
        res[item] = function(...payload){
            let curPath = path ? path + '/' +  item : item;
            this.$store.commit(curPath,...payload)
        }
    })
    return res;
}

function mapActions(params,extra){
    let {type , path } = handleMap(params,extra);
    let res = {}
    type.forEach((item)=>{
        res[item] = function(...payload){
            let curPath = path ? path + '/' +  item : item;
            this.$store.dispatch(curPath,...payload)
        }
    })
    return res;
}

function getContextState(root,type,path){
    path = path.split('/')
    let res = path.reduce((prev,item)=>{
        return prev[item]
    },root);
    return res[type];
}

export {
    mapState,
    mapGetters,
    mapMutations,
    mapActions
}