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
    // ?id=1&ss=2

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
    if(postid) {
        ajaxGet("api/goods.php",{id:getData()}).then((res)=>{
            console.log(res)
        })
    }
    
})