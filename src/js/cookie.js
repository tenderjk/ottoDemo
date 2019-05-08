const setCookie=function(key,value,options) {
    str=""; 
    str+=key+"="+value+";";
    options=options||{};
    if(options.expires) {
        let d=new Date();
        d.setDate(d.getDate()+parseInt(options.expires));
        str+="expires="+d+";";
    }
    
    (options.path) && (str+="path="+options.path+";");
    document.cookie=str;
}

const delCookie=function(key,path) {
    setCookie(key,0,{expires:-1,path});
}

const getCookie=function(key) {
    let arr=document.cookie.split("; ");
    let subarr=arr.filter((v)=>{
            return v.split("=")[0]==key;     
    })
    return subarr.length>0?subarr[0].split("=")[1]:"";
    
}
