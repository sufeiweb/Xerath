<template>
    <div class="reportMain">
      <div class="reportItems">

      </div>
    </div>
 </template>
 <script>
    export default {
        data() {
            return{
                message:'reportMain'
            }
        },
        //引用组件名
        components:{},
        //生命周期--组件挂载之前
        created(){},
        //生命周期--组件挂载之后
        mounted(){},
        //生命周期--组件被销毁之前
        beforeDestroy(){},
        //生命周期==组件销毁时
        destroyed(){},
        //组件方法集合
        methods:{},
        //监听事件
        watch:{},
        //计算属性
        computed:{}
    }
 </script>
 <style lang="scss" scoped>
    .reportMain{
      background: #FFF;
      padding: 20px;
      margin-top: 20px;
      border-radius: 4px;
      .reportItems{
        width: 250px;
        height: 300px;
        background: #f7f7f7;
        border-radius: 4px;
      }
    }
 </style>
