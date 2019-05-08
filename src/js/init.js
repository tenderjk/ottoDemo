define(function() {
    class ShowUnserInfo {
    constructor() {
        this.username=getCookie("user");
        this.usernameP=document.getElementById("username");
        this.logged=document.querySelector(".logged");
        this.nolog=document.querySelector(".nolog");
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
    }
}

return {
    ShowUnserInfo
}

})
