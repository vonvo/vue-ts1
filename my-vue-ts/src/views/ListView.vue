<template>
    <div class="note-box">
        <van-search placeholder="搜索便签" v-model="stateV.searchValue" input-align="center" @search="handleSearch"   mouse-event-touch @clear="handleClear"></van-search>
        <div class="list-box" ref="refListBox">
            <div class="list-left">
                <div class="list-item" v-for="item in state.leftList" :key="item?._id" >
                    <div class="item-content">
                        <p class="item-text">
                            {{item?.content}}
                        </p>
                    </div>
                    <div class="item-bottom">
                        <p>
                            {{item?.dates}}
                        </p>
                    </div>
                </div>
            </div>
            <div class="list-right">
                <div class="list-item" v-for="item in state.rightList" :key="item?._id" >
                    <div class="item-content">
                        <p class="item-text">
                            {{item?.content}}
                        </p>
                    </div>
                    <div class="item-bottom">
                        <p>
                            {{item?.dates}}
                        </p>
                    </div>
                </div>
            </div>
            <div class="init-list">
                <div class="list-item" v-for="item in notes" :key="item?._id" :ref="el=>{
                    if(el!=null){
                        items.push(el as HTMLElement);

                    }
                }">
                    <div class="item-content">
                        <p class="item-text">
                            {{item?.content}}
                        </p>
                    </div>
                    <div class="item-bottom">
                        <p>
                            {{item?.dates}}
                        </p>
                    </div>
                </div>
            </div>
        </div>      
    </div>  
</template>

<script lang="ts" setup>
import { onMounted, ref, watch,nextTick, reactive } from 'vue';
// import { getNotes } from '../api/note';
import type { NoteList, NoteListState,Note } from '../types';
import { useListStore } from '../stores/notelist';
import { debounce } from '../utils/debounce';
import useLoadMore from '../use/useLoadMore';   
import { List } from 'vant';

const refListBox = ref<HTMLElement | null>(null);

//判断是否触底，用hooks函数写



const stateV=reactive({
    searchValue:"",
    page:1,
    size:13,

})



const listStore=useListStore();

const handleSearch=()=>{
    //当输入框为空时，获取所有笔记
    if(!stateV.searchValue.trim()){
        listStore.getNotesList(stateV.page,stateV.size).then((res)=>{
        // console.log(res,"11");
        items.value=[]
        notes.value=res
    })
    }else{
        listStore.getNotesListSearch(stateV.searchValue).then((res)=>{
        items.value=[]
        notes.value=res
    })
    
}
}

const handleClear=()=>{
    listStore.getNotesList(stateV.page,stateV.size).then((res)=>{
        // console.log(res,"11");
        items.value=[]
        notes.value=res
    })
    
}

const items=ref([] as HTMLElement[]);
const notes =ref([] as NoteList);

const noteListState: NoteListState={
    leftList:[] ,
    rightList:[]
}

const state=reactive(noteListState);


const initLRlist=()=>{
    let leftHeightSum=0;
    let rightHeightSum=0;
    const leftArr :Note[]=[] 
    const rightArr:Note[]=[]
    nextTick(()=>{
        console.log(items.value);
        items.value!.forEach((item,index)=>{
            if(leftHeightSum<=rightHeightSum){
                //哪边高度低放哪边
                leftArr.push(notes.value[index]!);
                leftHeightSum+=item?.clientHeight;
                
            }else{
                rightArr.push(notes.value[index]!);
                rightHeightSum+=item?.clientHeight;
            }
        })
        state.leftList=leftArr.reverse();
        state.rightList=rightArr.reverse();
    })

}

const initList=()=>{
    // getNotes<NoteList>(1,20).then((res)=>{
    //     console.log(res);
    //     notes.value=res;

    // })

    listStore.getNotesList(stateV.page,stateV.size).then((res)=>{
        console.log(res,"11");
        notes.value=res
    })
    
    
     notes.value=listStore.list;
}

//分页请求
const loadMore=()=>{
    stateV.page++;
    listStore.getNotesList(stateV.page,stateV.size).then((res)=>{
        items.value=[]
        notes.value=res
    })
    
}

onMounted(()=>{
    initList();
    useLoadMore(refListBox,()=>{
        loadMore();
    })
})
//实时搜索，用watch
watch(()=>stateV.searchValue,debounce(handleSearch,1000))


watch(notes,()=>{
    initLRlist();
})
</script>
<style scoped lang="scss">
.note-box {
  width: 100%;
  overflow: hidden;
  flex: 1;
  padding: 0 0.1rem;
  box-sizing: border-box;
  .van-search{
    //样式的穿透
    :v-deep(.van-search_content){
        background-color: rgb(247,247,247);
        border-radius: 0.2rem;
    }
    background-color: rgb(247,247,247);
    
  }
  .list-box {
    width: 100%;
    height: 100%;
    overflow: auto;
    &::-webkit-scrollbar {
      /* 滚动条宽 */
      display: none;
    }
    &::-webkit-scrollbar-thumb {
      /* 滚动条 拖动条 */
      background-color: rgba(0, 0, 0, 0.2);
      border-radius: 6px;
    }
    &::-webkit-scrollbar-track {
      /* 滚动条背景槽 */
      background-color: #eee;
      border-radius: 6px;
    }
    .list-left {
      width: 50%;
      float: left;
      padding-bottom: 50px;
      padding-left: 5px;
    }
    .list-right {
      width: 50%;
      float: left;
      display: flex;
      flex-flow: column wrap;
      align-items: flex-end;
      padding-bottom: 50px;
      padding-right: 5px;
    }
    .init-list {
      width: 50%;
      /* background-color: rgb(122, 129, 127); */
      position: absolute;
      visibility: hidden; 
      height: 2rem;
      overflow: hidden; 
    }
    .list-item {
      box-sizing: border-box;
      width: 95%;
      max-height: 2rem;
      background-color: rgb(245, 245, 245);
      border-radius: 0.15rem;
      margin-top: 0.1rem;
      padding: 0.2rem;
      position: relative;
      box-shadow: 2px 2px 9px #ccc;
      .item-content {
        max-height: 1.25rem;
        font-size: 0.16rem;
        line-height: 0.25rem;
        overflow: hidden;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 5;
        line-clamp: 5;
        color: rgb(99, 99, 99);
        .item-text:first-line {
          color: rgb(27, 27, 27);
          font-weight: 600;
        }
      }
      .item-bottom {
        height: 0.35rem;
        color: rgb(151, 151, 151);
        display: flex;
        align-items: flex-end;
      }
      .click-model {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
      }
    }
  }
}
</style>
