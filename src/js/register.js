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
    
    class Check{
        constructor() {
            this.name=document.getElementById("name");
            this.nickname=document.getElementById("nickname");
            this.email=document.getElementById("email");
            this.pwd=document.getElementById("pwd");
            this.ensurepwd=document.getElementById("ensurepwd");
            this.male=document.getElementById("male");
            this.female=document.getElementById("female");
            this.agree=document.getElementById("agree");
            this.register=document.querySelector(".register");
            this.error=document.querySelector(".error");
            this.nameFlag=this.emailFlag=this.nicknameFlag=this.passwordFlag=0;
            this.sex="男";
        }
        setErr(msg) {
            this.error.style.display="block";
            this.error.querySelector("span").innerHTML=msg;
        }
        hideErr() {
            this.error.style.display="none";
        }

        bindAgree() {
            let that=this;
            this.agree.onchange=function() {
                if(this.checked) {
                    that.register.className="right register";
                }
                else {
                    that.register.className="right register disabled";
                }
            }
            this.readysend();
            
        }

        readysend() {
            let that=this;
            this.register.onclick=function() {
                if(!that.agree.checked) {
                    return;
                }
                if(that.nameFlag==0) {
                    that.setErr("再检查一下用户名");
                    return;
                }
                if(that.nicknameFlag==0) {
                    that.setErr("再检查一下昵称");
                    return;
                }
                if(that.emailFlag==0) {
                    that.setErr("再检查一下邮箱");
                    return;
                }
                if(that.passwordFlag==0) {
                    that.setErr("再检查一下密码");
                    return;
                }

                ajaxPost("api/register.php",{
                    username:that.name.value,
                    password:that.pwd.value,
                    nickname:that.nickname.value,
                    email:that.email.value,
                    sex:that.sex
                }).then((res)=>{
                    res=JSON.parse(res);
                    if(res.code==1) {
                        setCookie("user",that.name.value);
                        window.location.href="index.html";
                    }
                    else {
                        that.setErr("未知错误,重试");
                    }
                })
            }
        }
        check() {
            let nameReg=/^[\w]{4,20}$/;
            let nicknameReg=/^[^\s]{3,20}$/;
            let emailReg=/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
            let passwordReg=/^[a-zA-Z0-9_-]{6,20}$/;
            let that=this;
            
            this.name.onchange=function() {
                
                if(nameReg.test(this.value)) {
                    ajaxPost("api/register.php",{username:this.value}).then((res)=>{
                        res=JSON.parse(res);
                        if(res.code==1) {
                            that.hideErr();
                            that.nameFlag=1;
                        }
                        else {
                            that.setErr("用户名已被注册");
                            that.nameFlag=0;
                        }
                    })
                }
                else {
                    that.setErr("用户名输入不正确");
                    that.nameFlag=0;
                }
                
            }

            this.email.onchange=function() {
                
                if(emailReg.test(this.value)) {
                    that.emailFlag=1;
                    that.hideErr();
                }
                else {
                    that.setErr("邮箱格式不正确");
                    that.emailFlag=0;
                }
                
            }

            this.nickname.onchange=function() {
                
                if(nicknameReg.test(this.value)) {
                    that.nicknameFlag=1;
                    that.hideErr();
                }
                else {
                    that.setErr("昵称格式不正确");
                    that.nicknameFlag=0;
                }
                
            }

            this.pwd.onchange=function() {
                if(passwordReg.test(this.value)) {
                    that.hideErr();
                    if(this.value==that.ensurepwd.value) {
                        that.passwordFlag=1;   
                    }
                    else {
                        that.passwordFlag=0;
                        if(that.ensurepwd.value!="") {
                            that.setErr("密码不一致");
                        }  
                    }
                    
                }
                else {
                    that.setErr("密码格式不正确");
                    that.passwordFlag=0;
                }
                
            }

            this.ensurepwd.onchange=function() {
                
                if(this.value==that.pwd.value) {
                    that.passwordFlag=1;
                    that.hideErr();
                }
                
                
                else {
                    that.setErr("密码不一致");
                    that.passwordFlag=0;
                }
                console.log(that.passwordFlag)
            }

            this.male.onchange=function() {
                if(this.checked) {
                    that.sex="男"
                }
            }
            this.female.onchange=function() {
                if(this.checked) {
                    that.sex="女";
                }
            }
            
            this.bindAgree();
        }
    
    }
    let check=new Check();
    check.check();
    
})