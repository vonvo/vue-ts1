//统一对接口进行管理

import axios from '.';

//获取分页笔记
export function getNotes<T>(page:number,size:number){
    return axios.get<T>(`/note/page/${page}/${size}`) as Promise<T>

}

// 添加笔记
export function addNotes<T>(note:T){
    return axios.post<T>(`/note`,note)
}

//按内容搜素笔记
export function getNotesListByContent<T>(content:string){
    return axios.get<T>(`/note/content/${content}`) as Promise<T>
}