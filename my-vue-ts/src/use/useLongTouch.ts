import type { Ref } from 'vue'
import { onMounted ,onUnmounted} from 'vue'

export default function (arr: Ref<HTMLElement | null> [],callback:Function){
    let timer:any=null;
    let isMove=false;
    const touchStart=(e:any)=>{
        const id=e.targetTouches[0].target.id;
        timer=setTimeout(()=>{
            if(!isMove){
               callback(id);
            }
        },1000);
    }
    const touchEnd=()=>{
        clearTimeout(timer);
        isMove=false;
    }
    const touchMove=()=>{
        isMove=true;
    }

    onMounted(()=>{
        arr.forEach(item=>{
            item.value?.addEventListener('touchstart',touchStart);
            item.value?.addEventListener('touchend',touchEnd);
            item.value?.addEventListener('touchmove',touchMove);
        })

    })
    onUnmounted(()=>{
        arr.forEach(item=>{
            item.value?.removeEventListener('touchstart',touchStart);
            item.value?.removeEventListener('touchend',touchEnd);
            item.value?.removeEventListener('touchmove',touchMove);
        })
    })
}
