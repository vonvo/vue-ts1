//统一对接口进行管理

import axios from '.';
export function getNotes<T>(page:number,size:number){
    return axios.get<T>(`/note/page/${page}/${size}`) as Promise<T>

}


// 定义下这个接口

export function addNotes<T>(note:T){
    return axios.post<T>(`/note`,note)
}
