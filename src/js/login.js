require.config({

    // 　　　　baseUrl: "js",

    paths: {

        "jquery": "../libs/jquery",
        "ajax": "AJAX",
        "cookie": "cookie",
        "init":"init"
    }

});


require(["jquery","ajax","cookie","init"], function ($,_,_,init) {
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
    
    
    window.onload=function() {
        let fontSize=parseInt(document.documentElement.offsetWidth/10);
        document.documentElement.style.fontSize=fontSize+"px";
        let loginBtn=document.querySelector(".login");
        let register=document.querySelector(".register");
        let nameInp=document.getElementById("name");
        let pwdInp=document.getElementById("pwd");
        let remember=document.getElementById("remember");
        let error=document.querySelector(".error");
        loginBtn.onclick=function() {
            let name=nameInp.value;
            this.innerHTML=`<i class="fa fa-spin fa-lg fa-circle-o-notch" aria-hidden="true"></i>`;
            ajaxPost("api/login.php",{username:name,password:pwdInp.value}).then((res)=>{
                res=JSON.parse(res);
                if(res.code==1) {
                    let obj=remember.checked?{path:"/",expires:7}:{path:"/"};
                    console.log("success");
                    setCookie("user",name,obj);
                    location.href="index.html";
                }
                else {
                    error.style.display="block";
                    this.innerHTML="登录";
                }
            },()=>{console.log(2)})
        }
        register.onclick=function() {
            window.location.href="register.html";
        }
    }
    
})

