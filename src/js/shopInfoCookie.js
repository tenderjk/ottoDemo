define([
    'cookie'
], function(require) {
    'use strict';
    class ShopInfoCookie{
        constructor() {
            let data=getCookie("shopcar");
            if(!data) {
                this.shopcar=[];
            }
            else {
                this.shopcar=JSON.parse(data);
            }
        }

        add(id) {
           let flag=true;
           for(let i=0;i<this.shopcar.length;i++) {
               if(this.shopcar[i].id==id) {
                flag=false;
                this.shopcar[i].num++;
               }
           }
           if(flag==true) {
               this.shopcar.push({id,num:1});
           }
           
           setCookie("shopcar",JSON.stringify(this.shopcar),{expires:7,path:"/"});
        }

        upd(id,num) {
            for(let i=0;i<this.shopcar.length;i++) {
                if(this.shopcar[i].id==id) {
                 this.shopcar[i].num=num;
                 break;
                }
            }
            setCookie("shopcar",JSON.stringify(this.shopcar),{expires:7,path:"/"});
        }

        del(id) {
            for(let i=0;i<this.shopcar.length;i++) {
                if(this.shopcar[i].id==id) {
                 this.shopcar.splice(i,1);
                 break;
                }
            }
            if(this.shopcar.length==0) {
                delCookie("shopcar","/");
            }
            else{
                setCookie("shopcar",JSON.stringify(this.shopcar),{expires:7,path:"/"});
            }
            
        }

        count() {
            let num=0;
            for(let i=0;i<this.shopcar.length;i++) {
                num+=parseInt(this.shopcar[i].num);
            }
            if(num>99) {
                num="99+";
            }
            return num;
        }
    }


    return {
        car:ShopInfoCookie
    }

});