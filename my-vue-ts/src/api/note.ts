//统一对接口进行管理

import axios from '.';
export function getNotes<T>(page:number,size:number){
    return axios.get<T>(`/note/page/${page}/${size}`) as Promise<T>

}