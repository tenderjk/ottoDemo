
function slowdown(ele,attrs,callback) {
    clearInterval(ele.t);
    let isDown;
    ele.t=setInterval(()=>{
        isDown=true;
        for(let items in attrs) {
            let bound=attrs[items];
            let nowStyle=items!="opacity"?parseInt(getStyle(ele,items)):parseFloat(getStyle(ele,items))*100;
            let step=(bound-nowStyle)/4;
            step=step>0?Math.ceil(step):Math.floor(step);
            if(nowStyle!=bound) {
                ele.style[items]=items!="opacity"?nowStyle+step+"px":(nowStyle+step)/100;
                isDown=false;
            }
        }
        if(isDown==true) {
            clearInterval(ele.t);
            callback && callback();
        }
    },30)    
}


function getStyle(obj,attr) {
    if(obj.currentStyle) {
        return obj.currentStyle[attr];
    }
    else {
        return getComputedStyle(obj,false)[attr];
    }
}