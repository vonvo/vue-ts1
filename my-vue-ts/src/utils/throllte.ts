export function throttle(fn:Function,wait:number){
    let date:number=0;
    return function(...args:any){
        const now=Date.now();
        if(now-date>wait){
            fn(...args);
            date=now;
        }
    }
}