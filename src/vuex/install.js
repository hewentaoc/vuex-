
export let Vue = null;
//初始化执行的函数
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