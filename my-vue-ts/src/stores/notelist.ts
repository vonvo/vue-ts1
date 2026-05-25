import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { Note ,NoteList} from '@/types'
import { getNotes,addNotes } from '../api/note';


export const useListStore = defineStore('list', ()=>{

  const list = ref([] as Note[])
  const  getNotesList =async ()=>{
    const res=await getNotes<NoteList>(1,200)
    list.value=res;
    return res;
  }
  const  addNoteList =async (payload:Note)=>{
    const res=await addNotes<Note>(payload)
    // list.value=res;
    return res;
  }

  
  

  return { list, getNotesList,addNoteList }
})
