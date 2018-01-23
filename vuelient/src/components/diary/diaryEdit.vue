<template>
  <div class="diaryEdit">
      <div class="header">
          <div>
            <el-select
                        v-model="optionsValue"
                        multiple
                        collapse-tags
                        placeholder="请选择">
                        <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
            </el-select>
                    <el-date-picker
                        v-model="dateValue"
                        type="date"
                        value-format="yyyy-MM-dd"
                        placeholder="选择日期">
                    </el-date-picker>
                    <el-time-picker
                        v-model="timeValue"
                        value-format="HH:mm:ss"
                        :picker-options="{
                        selectableRange: '00:00:00 - 23:59:59'
                        }"
                        placeholder="选择时间点">
                    </el-time-picker>
                    <el-input style="width:220px" v-model="diaryTitle" placeholder="请输入标题"></el-input>
          </div>
        <div>
            <el-button type="primary" @click="getUEContent" plain>保存</el-button>
            <el-button type="primary" @click="submitDiary">提交</el-button>
        </div>
      </div>
      <aside>
          <div>内容：</div>
          <UE :defaultMsg=defaultMsg :config=config ref="ue"></UE>
        </aside>
  </div>
</template>
<script>
    import UE from '../Ue/ue.vue';
    export default {
        data(){
            return{
                options:[],//select选项
                diaryTitle:'',//日记title
                optionsValue:'',//选中的select值
                dateValue:'',//选择的日期值
                timeValue:'',//选择的时间值
                diaryContent:[],//日记内容
                ue:'',
                defaultMsg:'',
                config: {
                    initialFrameWidth: null,
                    initialFrameHeight: 400
                },
            }
        },
         components: {UE},
        methods:{
            getSelecItems(){
                this.$http.post('/diarys/selectItems').then((result)=>{
                //成功
                    console.log(result.data.data);
                    if(result.status ===200){
                        this.options = result.data.data
                    }
                }).catch( (error)=> {
                //失败
                    console.log(error)
                });
            },
            getUEContent() {
                let content = this.$refs.ue.getUEContent();
                if(content){
                this.diaryContent = content;
                    toast.message({
                        text:'保存成功！'
                    })
                }else{
                    toast.message({
                        text:'文本不能为空！'
                    })
                }
            },
            submitDiary(){
                console.log(this.diaryTitle)
                console.log(this.dateValue)
                console.log(this.timeValue)
                console.log(this.optionsValue)
                console.log(this.diaryContent)
                let item = {
                    createDate:this.dateValue+' '+this.timeValue,
                    optionsValue:this.optionsValue,
                    diaryContent:this.diaryContent,
                    diaryTitle:this.diaryTitle
                };
                if(!this.dateValue 
                || !this.timeValue
                ||!this.optionsValue.length
                ||!this.diaryContent.length
                ||!this.diaryTitle
                ){
                    toast.message({
                        text:'输入框不能为空！'
                    })
                    return false;
                };
                this.$http.post('/diarys/add',item)
                    .then((result)=>{
                        //成功
                        this.$router.go(-1)
                    }).catch(function (error) {
                    //失败
                    console.log(error)
                    });
                 }
        },
        mounted(){
            this.getSelecItems()
        }
    }
</script>
<style lang="scss" scoped>
    .diaryEdit{
        margin-top: 20px;
        padding: 20px;
        border-radius: 4px;
        background: #fff;
        .header{
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
        >aside{
            padding-top: 20px;
        }
    }
</style>



