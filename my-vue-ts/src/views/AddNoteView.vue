<template>
    <div class="add-note-box">
        <van-nav-bar left-arrow >
            <template #right>
                <van-icon name="success" size="18"  @click="doAddNotes" />
            </template>
        </van-nav-bar>
        <van-field class="field" rows="1" autosize  type="textarea" placeholder="请输入笔记内容" v-model="state.note.content"></van-field>
    </div>
</template>

<script lang="ts" setup>
// import { ref } from 'vue';

// const note=ref<Note>({
//     content:"",
//     dates:""
// })
import { reactive ,onMounted} from 'vue';
import { useListStore } from '@/stores/notelist';
import { showSuccessToast } from 'vant';


//手动路由跳转
import { useRouter,useRoute } from 'vue-router';


const router=useRouter();

const store=useListStore();
const state=reactive({
    note:{
        content:"",
        dates:""
    },
    oldContent:"",
    id:""
})

const date=new Date();
const doAddNotes=async ()=>{


    //装填数据
    state.note.dates=`${date.getFullYear()}年${(date.getMonth()+1)}月${date.getDate()}日`

    //更新笔记
    if(state.id){
        if(state.note.content!==state.oldContent){
            const payload={
                id:state.id,
                note:state.note
            }
            store.getupdateNoteList(payload).then((res)=>{
                if(res){
                    showSuccessToast("更新成功");
                    //跳转到列表页
                    router.push({name:"list"});
                }
            })
        }
    }else{
        //添加笔记
        store.addNoteList(state.note).then((res)=>{
            if(res){
                showSuccessToast("添加成功");
                //跳转到列表页
                router.push({name:"list"});
            }
        })
    }
}
const route=useRoute();
const initNote=async ()=>{
    const id=route.query.id 
    if(!id) return
    const res=await store.getNoteById(id as string)
    if(res){
        state.note.content=res.content
        state.oldContent=res.content
        state.id=res._id as string
    }
}
onMounted(()=>{
    
    initNote()
})


</script>

<style lang="scss" scoped>
.add-note-box{
    width: 100%;
    overflow-x: hidden;
    overflow-y: auto;
    flex: 1;
    background: #fff;
    .field{ 
        font-size: 0.22rem;
    }

}
</style>
