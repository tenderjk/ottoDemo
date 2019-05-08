const ajaxGet=function(url,data) {
    let str="?";
    let d=new Date();
    data=data||{};
    for(let items in data) {
        str+=items+"="+data[items]+"&";
    }
    url+=str+"_random_t="+d.getTime();
    let p= new Promise(function(success,error){
        var ajax = new XMLHttpRequest();
        ajax.open("get",url);
        ajax.onreadystatechange = function(){
            if(ajax.readyState == 4 && ajax.status == 200){
                success(ajax.responseText)
            }else if(ajax.readyState == 4 && ajax.status != 200){
                error(ajax.status)
            }
        }
        ajax.send(null);
    })

    return p;
}

const ajaxPost=function(url,data) {
    let str="";
    data=data||{};
    for(let items in data) {
        str+=items+"="+data[items]+"&";
    }
    str=str.slice(0,str.length-1);
    let p=new Promise((success,failed)=>{
        let ajax=new XMLHttpRequest();
        ajax.open("post",url);
        ajax.onreadystatechange=function() {
            if(ajax.readyState==4 && ajax.status==200) {
                success(ajax.responseText);
            }
            else if(ajax.readyState==4 && ajax.status!=200) {
                failed(ajax.status);
            }
        }
        ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
        ajax.send(str);
    })
    return p;
}

const jsonp=function(url,callback,data) {
    let str="?";
    for(let items in data) {
        str+=items+"="+data[items]+"&";
    }
    let d=new Date();
    url+=str+"_t="+d.getTime();
    let p=new Promise((success,failed)=>{
        let script=document.createElement("script");
        script.src=url;
        document.body.appendChild(script);
        window[data[data.column]]=function(res) {
            success(res);
        }    
    })
    return p;
}

// jsonp(url,callback,{column:"_fnName",_fnName:"cbFunc"})




