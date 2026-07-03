import type { Ref } from 'vue'
import { throttle } from '@/utils/throllte'


export default function useLoadMore(element: Ref<HTMLElement | null>,fn:Function){
    function loadMore(){
        //获取可视区域的高度
        const containerHeight=element.value?.clientHeight;
        //获取滚动高度
        const scrollTop=element.value?.scrollTop;

        const scrollHeight=element.value?.scrollHeight;
        
        //判断是否触底
        if(containerHeight!+scrollTop!+10>=scrollHeight!){
            fn();
        }
    }
    element.value?.addEventListener('scroll',throttle(loadMore,1000));
}