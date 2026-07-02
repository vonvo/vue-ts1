//防抖函数
export function debounce(fn:Function,wait:number=500){
    let timer:any;
    return function(...args:any){
        if(timer){
            clearTimeout(timer);
        }
        timer=setTimeout(()=>{
            fn(args)
            clearTimeout(timer);
        },wait);
    }
}