window.onload=function () {
	let fontSize=parseInt(document.documentElement.offsetWidth/10);
	document.documentElement.style.fontSize=fontSize+"px";
	
	

	$("#banner").banner({
	width:"6.04",
    items:$("#banner").find("a"),
    left:$("#left"),
    right:$("#right"),
    jumpBtn:true,
    delayTime:3000,
    moveTime:700,
    autoPlay:true    
	})

	function getStyle(ele,attr) {
		// body...
		if(ele.currentStyle) {
			return ele.currentStyle[attr];
		}
		else {
			return getComputedStyle(ele,false)[attr];
		}
	}
	function bindEve(ele,eve,callback) {
		if(ele.addEventListner) {
			ele.addEventListner(eve,callback);
		}
		else if(ele.attachEvent) {
			ele.attachEvent("on"+eve,callback)
		}
		else {
			ele["on"+eve]=callback;
		}
	}
	class ShowUnserInfo {
		constructor() {
			this.username=getCookie("user");
			this.usernameP=document.getElementById("username");
			this.logged=document.querySelector(".logged");
			this.nolog=document.querySelector(".nolog");
			
			
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
	let showinfo=new ShowUnserInfo();
	showinfo.init();
	class IndexNavTab{
		constructor() {
			this.leftSubnavList=document.querySelectorAll(".subnav-l ul li");
			this.rightSubnavList=document.querySelectorAll(".subnav-r .list");
			this.subnav=document.querySelector(".subnav");
		}
		clearAll() {
			for(let i=0;i<this.leftSubnavList.length;i++) {
				this.leftSubnavList[i].style.backgroundColor="";
				this.rightSubnavList[i].style.display="none";
			}
		}
		bind() {
			for(let i=0;i<this.leftSubnavList.length;i++) {
				bindEve(this.leftSubnavList[i],"mouseenter",()=>{
					clearTimeout(this.timer1);
					this.timer1=setTimeout(()=>{
						this.clearAll();
						this.leftSubnavList[i].style.backgroundColor="#ffe4dc";
						this.rightSubnavList[i].style.display="flex";
					},300)
					
				})
			}
			bindEve(this.subnav,"mouseleave",()=>{
				// this.timer2=setTimeout()
				clearTimeout(this.timer2);
				clearInterval(this.timer1);
				this.timer2=setTimeout(()=>{this.clearAll()},300)
				
			})
		}

	}
	let navtab=new IndexNavTab();
	navtab.bind();

	class Ellipsis{
		constructor() {
			this.description=document.querySelectorAll("#ads .description");
		}
		init() {
			for(let i=0;i<this.description.length;i++) {
				this.description[i].parentNode.parentNode.title=this.description[i].innerHTML;
				if(this.description[i].scrollHeight-this.description[i].offsetHeight>5) {
					this.pseudo=document.createElement("div");
					this.pseudo.innerHTML="...";
					this.pseudo.setAttribute("class","ellipsis");
					this.description[i].appendChild(this.pseudo);
				}
			}
		}
	}
	
	let ellipsis=new Ellipsis();
	ellipsis.init();

	class Slide {
		constructor(contain,left,right) {
			this.contain=contain;
			this.left=left;
			this.right=right;
			this.index=0;
		}
		init() {
			this.left.style.visibility="hidden";
			this.contain.style.left=0;
			this.bindEve();
			this.scrollWidth=this.contain.scrollWidth;
		}
		bindEve() {
			let that=this;
			this.nextFlag=true;
			this.prevFlag=true;
			this.right.onclick=(function() {
				let timer3=null;
				return function() {
				clearTimeout(timer3);
				timer3=setTimeout(()=>{
				that.prevFlag=true;
				that.left.style.visibility="visible";
				let left=Math.abs(parseInt(that.contain.style.left))+that.contain.offsetWidth;
				let distance=that.scrollWidth-left;
				if(distance>that.contain.offsetWidth) {
					that.index++;
					slowdown(that.contain,{left:-(that.index*that.contain.offsetWidth)})
				}
				else {
					if(that.nextFlag==true) {	
					slowdown(that.contain,{left:-(that.index*that.contain.offsetWidth+distance)})
					that.nextFlag=false;
					that.right.style.visibility="hidden";
					that.index++;
					}
				}
				console.log(that.index)
			},300)
			}	
			})();
			this.left.onclick=(function() {
				let timer4=null;
				return function() {
				clearTimeout(timer4);
				timer4=setTimeout(()=>{
				that.nextFlag=true;
				that.right.style.visibility="visible";
				// if(left-that.contain.offsetWidth>that.contain.offsetWidth) {
				// 	console.log()
				// 	that.index--;
				// 	slowdown(that.contain,{left:-(that.index*that.contain.offsetWidth)})
					
				// }
				// else {
				// 	console.log("!!!!!")
				// 	if(that.prevFlag==true) {	
				// 	slowdown(that.contain,{left:0})
				// 	that.prevFlag=false;
				// 	that.left.style.visibility="hidden";
				// 	that.index=0;
				// 	}
				// }
				if(that.index>0) {
					that.index--;
					slowdown(that.contain,{left:-(that.index*that.contain.offsetWidth)})
				}
				if(that.index==0) {
					that.prevFlag=false;
					that.left.style.visibility="hidden";
				}
				console.log(that.index)
			},300)
			}	
			})();

		}
		
		
	}
	let adsContain=document.querySelector("#ads ul");
	let adsleft=document.querySelector("#ads .ads-btn #ads-left-btn");
	let adsright=document.querySelector("#ads .ads-btn #ads-right-btn");
	let adsSlide=new Slide(adsContain,adsleft,adsright)
	adsSlide.init();

	let familHomeContain=document.querySelector("#family-home ul");
	let familHomeleft=document.querySelector("#family-home .btn #family-left-btn");
	let familHomeright=document.querySelector("#family-home .btn #family-right-btn");
	let familHomeSlide=new Slide(familHomeContain,familHomeleft,familHomeright);
	familHomeSlide.init();

	let fashionContain=document.querySelector("#fashion ul");
	let fashionleft=document.querySelector("#fashion .btn #fashion-left-btn");
	let fashionright=document.querySelector("#fashion .btn #fashion-right-btn");
	let fashionSlide=new Slide(fashionContain,fashionleft,fashionright);
	fashionSlide.init();
}
