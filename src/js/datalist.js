require.config({

    // 　　　　baseUrl: "js",

    paths: {

        "jquery": "../libs/jquery",
        "ajax": "AJAX",
        "cookie": "cookie",
        "init":"init"
    }

});

require(["jquery","ajax","cookie","init"],function($,_,_,init) {
    let fontSize=parseInt(document.documentElement.offsetWidth/10);
    document.documentElement.style.fontSize=fontSize+"px";
    //模块加载完成后执行
    $("#input_header").load("model.html #sametop",(response,status,xhr)=>{
        if(status=="success") {
            $("#input_footer").load("model.html #samefooter",(response,status,xhr)=>{
                if(status=="success") {
                    new init.ShowUnserInfo();
                }
            });
        }
    });

    class Tab{
        constructor(tab) {
            this.tab=document.querySelectorAll(".tab");
            
        }
        init() {
            for(let i=0;i<this.tab.length;i++) {
                let btn=this.tab[i].querySelector("h3");
                btn.flag=0;
                btn.onclick=function() {
                    if(this.flag==0) {
                        this.querySelector("i").className="fa fa-chevron-up";
                        this.nextSibling.nextSibling.style.display="flex";
                        this.flag=1;
                    }
                    else {
                        this.querySelector("i").className="fa fa-chevron-down";
                        this.nextSibling.nextSibling.style.display="none";
                        this.flag=0;
                    }

                }
            }
        }

    }
    let tab=new Tab();
    tab.init();

    class LaodPage{
        constructor() {
            this.ulContain=document.querySelector(".main-right ul");
        }
        init() {
            ajaxGet("api/goods.php",{type:"furniture"}).then((res)=>{
                res=JSON.parse(res);
                if(res.code==0) {
                    console.log(res.msg);
                }
                else {
                    let str="";
                    for(let i=0;i<res.length;i++) {
                        if(res[i].oriPrice!=0) {
                            str+=`<li data-id=${res[i].id}>
                                    <div><img src="${res[i].thumbnailUrl}" alt=""></div>                        
                                    <p class="title">${res[i].name}</p>
                                    <a href="details.html?id=${res[i].id}"><p class="description">${res[i].description}</p></a> 
                                    <p class="price"><s>${res[i].oriPrice}</s><span>${res[i].price}</span></p>
                                    <i>%</i>
                                    </li>`
                        }
                        else {
                            str+=`<li data-id=${res[i].id}>
                                    <div><img src="${res[i].thumbnailUrl}" alt=""></div>                        
                                    <p class="title">${res[i].name}</p>
                                    <a href="details.html?id=${res[i].id}"><p class="description">${res[i].description}</p></a> 
                                    <p class="price"><span>${res[i].price}</span></p>
                                    </li>`
                        }
                        this.ulContain.innerHTML=str;

                        
                    }
                }
            })
        }

        bind() {
            eveEnt(this.ulContain,"click",(e)=>{
                e=e||window.event;
                let target=e.target||e.srcElement;
                console.log(target.nodeName);

                if(target.nodeName=="LI") {
                    let id=target.getAttribute("data-id");
                    location.href="details.html?id="+id;
                }
                else if(target.nodeName=="UL") {

                }
                else {
                    while(target.nodeName!="LI") {
                        target=target.parentNode;
                    }
                    let id=target.getAttribute("data-id");
                    location.href="details.html?id="+id;
                }
            })
        }
    }
    let loadpage=new LaodPage();
    loadpage.init();
    loadpage.bind();

    function eveEnt(ele,eve,callback) {
        if(ele.addEventListener) {
            ele.addEventListener(eve,callback);
        }
        else if(ele.attachEvent) {
            ele.attachEvent("on"+eve,callback);
        }
        else {
            ele["on"+eve]=callback;
        }
    }
    


})