import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { Note ,NoteList} from '@/types'
import { getNotes,addNotes,getNotesListByContent } from '../api/note';


export const useListStore = defineStore('list', ()=>{
  //笔记列表
  const list = ref([] as Note[])

  //获取分页笔记
  const  getNotesList =async ()=>{
    const res=await getNotes<NoteList>(1,200)
    list.value=res;
    return res;
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

  return { list, getNotesList,addNoteList,getNotesListSearch }
})
