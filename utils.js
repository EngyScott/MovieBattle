const debounce = (func, delay = 1000)=>{
    let timeoutd;
    return(...args)=>{
        if(timeoutd){
            clearTimeout(timeoutd)
        }
        timeoutd = setTimeout(()=>{
            func.apply(null, args);
        }, delay)
    }
}