// banner({
//     items:$(".banner1").find("a"),
//     left:$("#left"),
//     right:$("#right"),
//     jumpBtn:true,
//     delayTime:3000,
//     moveTime:300,
//     autoPlay:true    
// })

;(function($) {
    $.fn.banner=function(options) {
        let obj={};
        obj.items=options.items;
        // console.log(obj.items)
        obj.width=options.width;
        // this.children(".imgbox").children("a").css({position:"absolute",left:obj.width+"rem",top:0}).eq(0).css({left:0})
        // this.css({width:obj.width,height:obj.items.eq(0).height(),position:"relative",overflow:"hidden",margin:"10px auto"})
        
        obj.moveTime=options.moveTime||1000;
        if(options.jumpBtn==undefined||options.jumpBtn==false) {
            obj.jumpBtn=false;
        }
        if(options.jumpBtn==true) {
            obj.jumpBtn=true;
        }
        if(options.autoPlay==false||options.autoPlay==undefined) {
            obj.autoPlay=false;
        }
        if(options.autoPlay==true) {
            obj.autoPlay=true;
            obj.delayTime=options.delayTime||3000;
        }

        obj.nowIndex=0;
        obj.prevIndex=obj.items.length-1;
        if(options.jumpBtn==true) {
            var newul=$("<ul>");
            obj.items.each((i)=>{
                newul.append(`<li>${i+1}</li>`);
            });
            newul.css({margin:0,padding:0,})
            .children().css({borderRadius:"50%",outline:"none",background:"rgba(0,0,0,0.3)",color:"#fff",cursor:"pointer"});
            this.append(newul);
            newul.children().eq(0).css({background:"rgba(255,255,255,0.5)",color:"#000"})
            newul.children().on("click",function(){
                let index=$(this).index();
                if(index>obj.nowIndex) {
                    obj.move(obj.items.eq(obj.nowIndex),obj.items.eq(index),1);
                }
                else {
                    obj.move(obj.items.eq(obj.nowIndex),obj.items.eq(index),-1);
                }

                obj.nowIndex=index;
                obj.setJumpStyle(index);
            })

        }

        if(options.left!=undefined && options.left.length!=0 && options.right!=undefined && options.right.length!=0) {
            // options.left.parent().css({position: "absolute",height:"0.26rem",left: 0,top: 0,right: 0,bottom: 0,margin:"auto"});
            // options.left.parent().children().css({border:"none",background: "rgba(255,255,255,0.6)",width:"0.26rem",height:"0.26rem",position:"absolute",outline:"none",cursor:"pointer"});
            options.left.css({left:0});
            options.right.css({right:0});
            options.left.click((function(e) {
                timer=null;

                return function() {
                    
                    clearInterval(timer);
                    timer=setTimeout(()=>{             
                    if(obj.nowIndex==0) {
                        obj.nowIndex=obj.items.length-1;
                        obj.prevIndex=0;
                    }
                    else {
                        obj.nowIndex--;
                        obj.prevIndex=obj.nowIndex+1;
                    }
                    obj.move(obj.items.eq(obj.prevIndex),obj.items.eq(obj.nowIndex),-1);
                    if(options.jumpBtn==true) {
                        obj.setJumpStyle(obj.nowIndex);
                    }
                },500) 

                }

            })());

            options.right.click((function() {
                    timer=null;
                    return function() {
                        clearInterval(timer);
                        timer=setTimeout(()=>{obj.auto();console.log(2)},500);
                    }
                ;
            })());
        }
        obj.auto=function() {
            if(obj.nowIndex==obj.items.length-1) {
                obj.nowIndex=0;
                obj.prevIndex=obj.items.length-1;
            }
            else {
                obj.nowIndex++;
                obj.prevIndex=obj.nowIndex-1;
            }
            obj.move(obj.items.eq(obj.prevIndex),obj.items.eq(obj.nowIndex),1);
            if(options.jumpBtn==true) {
                obj.setJumpStyle(obj.nowIndex);
            }
        }
        if(obj.autoPlay==true) {
            obj.timer=setInterval(() => {
                obj.auto();
            }, obj.delayTime);
            this.hover(()=>{
                clearInterval(obj.timer);
            },()=>{
                obj.timer=setInterval(() => {
                    obj.auto();
                }, obj.delayTime);
            })
        }
        
        obj.move=function(prev,now,direction) {
            // console.log(obj.parent.find("a").eq(0).width()*direction)
            prev.css({left:0}).stop().animate({left:-direction*obj.width+"rem"},obj.moveTime);
            now.css({left:obj.width*direction+"rem"}).stop().animate({left:0},obj.moveTime);
        }
        obj.setJumpStyle=function(index) {
            newul.children().css({background:"rgba(0,0,0,0.3)",color:"#fff"}).eq(index).css({background:"rgba(255,255,255,0.5)",color:"#000"})
        }

        return obj;
    }
})(jQuery);