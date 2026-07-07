import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { Note ,NoteList} from '@/types'
import { getNotes,addNotes,getNotesListByContent,updateNotes,getNotesById,deleteNoteById } from '../api/note';


export const useListStore = defineStore('list', ()=>{
  //笔记列表
  const list = ref([] as Note[])

  //获取分页笔记
  // const  getNotesList =async ()=>{
  //   const res=await getNotes<NoteList>(1,200)
  //   list.value=res;
  //   return res;
  // }
  const  getNotesList =async (page:number,size:number)=>{
    const res=await getNotes<NoteList>(page,size)
    if(page===1){
        list.value=res;
    }else{
        list.value.push(...res);
    }
    return [...list.value];
  }


  //添加笔记
  const  addNoteList =async (payload:Note)=>{
    const res=await addNotes<Note>(payload)
    // list.value=res;
    return res;
  }

  //按内容搜素笔记
  const  getNotesListSearch =async (payload:string)=>{
    const res=await getNotesListByContent<NoteList>(payload)
    list.value=res;
    return res;
  }

  //更新笔记
  const getupdateNoteList =async (payload:any)=>{
    const res=await updateNotes<Note>(payload.id,payload.note)
    return res;
  }
  //根据id值获取笔记
  const getNoteById =async (payload:string)=>{
    const res=await getNotesById<Note>(payload)
    return res;
  }
  //删除笔记
  const deleteNoteByIdList =async (payload:string)=>{
    const res=await deleteNoteById<Note>(payload)
    return res;
  }

  return { list, getNotesList,addNoteList,getNotesListSearch,getupdateNoteList,getNoteById,deleteNoteByIdList }
})

