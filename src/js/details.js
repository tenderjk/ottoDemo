require.config({

    // 　　　　baseUrl: "js",

    paths: {

        "jquery": "../libs/jquery",
        "ajax": "AJAX",
        "scar":"shopInfoCookie",
        "init":"init"
    }

});

require(["jquery","ajax","scar","init"],function($,_,car,init) {
    let fontSize=parseInt(document.documentElement.offsetWidth/10);
    document.documentElement.style.fontSize=fontSize+"px";
    //模块加载完成后执行
    $("#input_header").load("model.html #sametop",(response,status,xhr)=>{
        if(status=="success") {
            new init.ShowUnserInfo();
            
        }
    });
    
    $("#input_footer").load("model.html #samefooter");

    let returnContain=document.querySelector(".return");
    let returnBtn =document.querySelector(".return button");
    returnBtn.onclick=function() {
        window.history.back();
    }
    // ?id=1&ss=2
    let wrangMsg=document.querySelector(".wrangMsg")
    function getData() {
        let href=window.location.href;
        try {
            let param=href.split("?")[1].split("&");
            for(let i=0;i<param.length;i++) {
                let subparam=param[i].split("=");
                if(subparam[0]=="id") {
                    return subparam[1];
                }
            }

        }
        catch {

            return undefined;
        }
        
    }
    let postid=getData();
    // console.log(postid)
    if(postid) {
        ajaxGet("api/goods.php",{id:getData()}).then((res)=>{
            
            res=JSON.parse(res);console.log(res)
            if(res.code==0||res.length==0) {
                wrangMsg.style.display="flex";
                returnContain.style.display="none";
            }
            else {
                
                let main=document.querySelector("main");
                main.style.display="flex";
                let mainLeft=main.querySelector(".main-l");
                mainLeft.innerHTML=`
                        <div class="oriImg">
                        <img src=${res[0].url} alt="">
                        <span></span>
                        <div class="layer"></div>
                    </div>
                    <div class="bigImg">
                        <img class="big" src=${res[0].url} alt="">
                    </div>
                    <div class="name">
                        <p>${res[0].name}</p>
                    </div>
                `
                let smallImg=document.querySelector(".main-l .oriImg img");
                let bigImg=document.querySelector(".main-l .big");
                smallImg.onload=function() {
                    let scale=smallImg.offsetWidth/smallImg.naturalWidth;
                    let orismallImgHeihgt=smallImg.offsetHeight;
                    smallImg.style.height=smallImg.naturalHeight*scale+"px";
                    let scale2=smallImg.offsetHeight/orismallImgHeihgt;
                    bigImg.style.height=bigImg.offsetHeight*scale2+"px";
                    // span.style.height=span.offsetHeight*scale+"px";
                    // bigContain.style.height=bigContain.offsetHeight*scale+"px";
                    let loupe=new Loupe();
                    loupe.bindEve();
                }
                
                let mainRight=main.querySelector(".main-r");   
                let str="";
                if(res[0].oriPrice!=0) {
                    str=`
                        <li class="sale">
                            <s>${res[0].oriPrice}</s>
                            <span>${-(100-res[0].price/res[0].oriPrice*100).toFixed(0)}%</span>
                        </li>
                    `
                }
                mainRight.innerHTML=`
                <ul>
                ${str}
                <li class="price">
                    <i class="fa fa-jpy" aria-hidden="true"></i>${res[0].price}
                </li>

                <li class="other">
                    包含增值税,此外<a href="">运输成本</a>
                </li>
                <li class="stages">
                    您可以在48个月内分期，每月<i class="fa fa-jpy" aria-hidden="true"></i><span>${(res[0].price/48).toFixed(2)}</span>
                </li> 
                <li>
                    <button id="addCar" data-id=${res[0].id}><i class="fa fa-lg fa-plus-circle" aria-hidden="true"></i>加入购物车</button>
                </li>

                <li class="like">
                    <button><i class="fa fa-heart" aria-hidden="true"></i>加入收藏</button>
                </li>
            </ul>
                `
                
                let addcar=new Addchar();
                addcar.bindEve();
            }
            
        },
        ()=>{
            wrangMsg.style.display="flex";
            returnContain.style.display="none";
        })
    }
    else {
        wrangMsg.style.display="flex";
        returnContain.style.display="none";
    }

    class Loupe {
        constructor() {
            this.oriImgContain=document.querySelector(".oriImg");
            this.moveSpan=document.querySelector(".oriImg span");
            this.layer=document.querySelector(".layer");
            this.bigImgContain=document.querySelector(".bigImg");
            this.bigImg=document.querySelector(".big");
            this.MoveSpanWidth=this.moveSpan.offsetWidth;
            this.MoveSpanHeight=this.moveSpan.offsetHeight;
            this.oriImgContainWith=this.oriImgContain.offsetWidth;
            this.oriImgContainHeight=this.oriImgContain.offsetHeight;
            this.bigImgContainWidth=this.bigImgContain.offsetWidth;
            this.bigImgContainHeight=this.bigImgContain.offsetHeight;
            this.bigImgWidth=this.bigImg.offsetWidth;
            this.bigImgHeight=this.bigImg.offsetHeight;
        }

        bindEve() {
            let that=this;
            this.layer.onmouseover=function() {
                that.bigImgContain.style.visibility="visible";
                that.moveSpan.style.visibility="visible";
            }
            this.layer.onmousemove=(function() {
                let prev=new Date();
                // let timer=null;
                return function(e) {
                    e=e||window.event;
                    let left=e.offsetX||e.layerX;
                    let top=e.offsetY||e.layerY;
                    let now=new Date();
                    // clearTimeout(timer);
                    if(now-prev>50) {
                        // console.log(1)
                        that.move(left,top);
                        prev=now;
                    }
                    // else {
                    //     timer=setTimeout(() => {
                    //         console.log(2)
                    //         that.move(left,top);
                    //     },30);
                    // }
                    
                }
                
            })();
            this.layer.onmouseout=function() {
                that.bigImgContain.style.visibility="hidden";
                that.moveSpan.style.visibility="hidden";
            }
        }

        move(eleft,etop) {
            let left=eleft-this.MoveSpanWidth/2;
            let top=etop-this.MoveSpanHeight/2;
            left=left<0?0:left;
            top=top<0?0:top;
            left=left>this.oriImgContainWith-this.MoveSpanWidth?this.oriImgContainWith-this.MoveSpanWidth:left;
            top=top>this.oriImgContainHeight-this.MoveSpanHeight?this.oriImgContainHeight-this.MoveSpanHeight:top;
            this.moveSpan.style.left=left+"px";
            this.moveSpan.style.top=top+"px";

            let l =left/(this.oriImgContainWith-this.MoveSpanWidth);
            let t=top/(this.oriImgContainHeight-this.MoveSpanHeight);


            this.bigImg.style.left=-l*(this.bigImgWidth-this.bigImgContainWidth)+"px";
            this.bigImg.style.top=-t*(this.bigImgHeight-this.bigImgContainHeight)+"px";

        }
    }

    class Addchar{
        constructor() {
            this.shopcar=new car.car();
            this.addBtn=document.getElementById("addCar");
            this.carnum=document.querySelector(".carnum");
        }
        bindEve() {
            let that=this;
            this.addBtn.onclick=function() {
                if(!getCookie("user")) {
                    window.location.href="login.html";
                    return;
                }
                let id=this.getAttribute("data-id");
                that.shopcar.add(id);
                if(that.carnum.style.visibility=="hidden") {
                    that.carnum.style.visibility="visible";
                }
                that.carnum.innerHTML=that.shopcar.count();
            }
        }
    } 


    
    
})