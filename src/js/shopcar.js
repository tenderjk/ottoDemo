
require.config({

    // 　　　　baseUrl: "js",

    paths: {

        "jquery": "../libs/jquery",
        "ajax": "AJAX",
        "init":"init",
        "scar":"shopInfoCookie"
    }

});

require(["jquery","ajax","scar","init"],function($,_,shopcar,init) {
    if(!getCookie("user")) {
        location.href="login.html";
    }
    let fontSize=parseInt(document.documentElement.offsetWidth/10);
    document.documentElement.style.fontSize=fontSize+"px";
    //模块加载完成后执行
    $("#input_header").load("model.html #sametop",(response,status,xhr)=>{
        if(status=="success") {
            $("#input_footer").load("model.html #samefooter",(response,status,xhr)=>{
                if(status=="success") {
                    window.showuser= new init.ShowUnserInfo();
                }
            });
        }
    });

    ajaxGet("api/goods.php",{all:"all"}).then((res)=>{
        res=JSON.parse(res);
        let shopcar=new Shopchar();
        shopcar.init(res);
        
    })

    class Shopchar{
        constructor() {
            this.sc=new shopcar.car();
            this.allPrice=document.getElementById("allprice");
            this.shopcarList=document.querySelector("#shopcar-list dl");
            this.data=[];
        }
        init(res) {
            let str=`
            <dt>
                <p>OTTO</p>
                <span class="num">数量</span>
                <span class="price">总价</span>
                <span class="delete">删除</span>
            </dt>
            `;
            if(this.sc.shopcar.length==0) {
                
            }
            else {
                for(let i=0;i<res.length;i++) {
                    for(let j=0;j<this.sc.shopcar.length;j++) {
                        if(res[i].id==this.sc.shopcar[j].id) {
                            this.data.push({id:res[i].id,num:this.sc.shopcar[j].num,price:res[i].price});
                            str+=`
                            <dd data-id=${res[i].id}>
                                <div class="imgContain">
                                    <img class="thumbnail" src=${res[i].thumbnailUrl} alt="">
                                    <span class="name">${res[i].name}</span>
                                </div>
                                <div class="numContain">
                                    <input class="eachnum" value=${this.sc.shopcar[j].num} type="number"min="1" max="50">
                                </div>
                                <p class="price">${res[i].price}</p>
                                <i class="fa fa-times del" aria-hidden="true"></i>
                            </dd>
                            `;
                        }
                    }
                }
                this.shopcarList.innerHTML=str;
                this.count();
                this.bindEve();
            }        
        }

        bindEve() {
            let that=this;
            let del=document.querySelectorAll(".del");
            let num=document.querySelectorAll(".eachnum");
            for(let i=0;i<del.length;i++) {
                del[i].onclick=function() {
                    let id=this.parentNode.getAttribute("data-id");
                    that.sc.del(id);
                    this.parentNode.remove();
                    let index=that.findData(id);
                    that.data.splice(index,1);
                    that.count();
                    showuser.count();
                    if(that.data.length==0) {
                        that.shopcarList.innerHTML=`
                        <dt class="nothing">
                            <h4>未挑选商品，<a href="datalist.html">去看看?</a></h4>
                        </dt>`
                    }
                }

                num[i].onchange=function() {
                    let id=this.parentNode.parentNode.getAttribute("data-id");
                    if(this.value==""||this.value<=0) {
                        this.value=1;
                    }
                    this.value=this.value>100?100:this.value;
                    that.sc.upd(id,this.value);
                    let index=that.findData(id);
                    that.data[index].num=this.value;
                    that.count();
                    showuser.count();
                }
            }
        }

        findData(id) {
            for(let i=0;i<this.data.length;i++) {
                if(this.data[i].id==id) {
                    return i;
                }
            }
        }
        count() {
            let addprice=0;
            for(let i=0;i<this.data.length;i++) {
                addprice+=this.data[i].num*this.data[i].price;
            }
            this.allPrice.innerHTML=addprice.toFixed(2);
        }
    }
})