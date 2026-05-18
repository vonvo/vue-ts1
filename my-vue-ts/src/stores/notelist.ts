import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { Note ,NoteList} from '@/types'
import { getNotes } from '../api/note';


export const useListStore = defineStore('list', ()=>{

  const list = ref([] as Note[])
  const  getNotesList =async ()=>{
    const res=await getNotes<NoteList>(1,20)
    list.value=res;
    return res;
}
  

  return { list, getNotesList }
})
