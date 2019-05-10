define([
    'cookie'
],function() {
    class ShowUnserInfo {
    constructor() {
        this.username=getCookie("user");
        this.usernameP=document.getElementById("username");
        this.logged=document.querySelector(".logged");
        this.nolog=document.querySelector(".nolog");
        this.carnum=document.querySelector(".carnum");
        this.shopcarBtn=document.getElementById("shopcar");
        this.search=document.getElementById("search");
        this.searchList=document.getElementById("searchList");
        this.init();
        
    }
    init() {
        if(this.username) {
            this.logged.style.display="flex";
            this.nolog.style.display="none";
            this.usernameP.innerHTML=this.username;
            this.logout=document.getElementById("logout");
            this.logout.onclick=function() {
                delCookie("user","/");
                delCookie("shopcar","/");
                window.location.reload();	
            }
        }
        else {
            this.nolog.style.display="flex";
            this.logged.style.display="none";
            this.login=document.getElementById("login");
            this.login.onclick=function() {
                window.location.href="login.html";
            }
        }
        this.bindEve();
        this.count();
    }
    bindEve() {
        let that=this;
        this.shopcarBtn.onclick=function() {
            if(!getCookie("user")) {
                window.location.href="login.html";
            }
            else {
                window.location.href="shopcar.html";
            }
        }

        this.search.oninput=function() {
            // if(this.value!="") {
                let str="";
                that.searchList.innerHTML="";
                ajaxGet("api/search.php",{search:this.value}).then((res)=>{
                    res=JSON.parse(res);
                    for(let i=0;i<res.length;i++) {
                        str+=`
                        <option >${res[i].name}</option>
                        `
                    }
                    console.log(str)
                    that.searchList.innerHTML=str;
                });
                
            }
            
        // }

    }
    count() {
        this.shopcar=getCookie("shopcar");
        if(this.shopcar) {
            let num=0;
            this.shopcar=JSON.parse(this.shopcar);
            for(let i=0;i<this.shopcar.length;i++) {
                num+=parseInt(this.shopcar[i].num);
            }
            if(num>99) {
                num="99+";
            }
            this.carnum.innerHTML=num;
            this.carnum.style.visibility="visible";     
        }
        else {
            this.carnum.style.visibility="hidden";
        }
    }
}

return {
    ShowUnserInfo
}

})
