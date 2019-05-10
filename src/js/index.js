require.config({
	// 　　　　baseUrl: "js",
	paths: {
		"jquery": "../libs/jquery",
		"ajax": "AJAX",
		"cookie": "cookie",
		"banner": "banner1.0.0",
		"init": "init",
		"move": "slowdown"
	},
	shim: {
		"banner": ["jquery"]
	}

});


require(["jquery", "ajax", "init", "banner", "move"], function ($, _, init, banner, _) {





	let fontSize = parseInt(document.documentElement.offsetWidth / 10);
	document.documentElement.style.fontSize = fontSize + "px";

	$("#input_header").load("model.html #sametop", (response, status, xhr) => {
		if (status == "success") {
			new init.ShowUnserInfo();
		}
	});

	$("#input_footer").load("model.html #samefooter");




	ajaxGet("api/mock.json").then((res) => {
		res = JSON.parse(res);
		let nav = new Nav();
		nav.init(res);
		let navtab = new IndexNavTab();
		navtab.bind();
	});

	ajaxGet("api/fashion.json").then((res) => {
		res = JSON.parse(res);
		let str = "";
		res.forEach((v) => {
			str += `
			<li>
				<a href="">
					<div class="out-box">
						<div class="inner-box">
							<img src="${v.url}">
						</div>
					</div>
					<p>${v.title}</p> 
				</a>
			</li>
			`
		});

		let fashionContain = document.querySelector("#fashion ul");
		fashionContain.innerHTML=str;
		let fashionleft = document.querySelector("#fashion .btn #fashion-left-btn");
		let fashionright = document.querySelector("#fashion .btn #fashion-right-btn");
		let fashionSlide = new Slide(fashionContain, fashionleft, fashionright);
		fashionSlide.init();

	});

	ajaxGet("api/home.json").then((res) => {
		res = JSON.parse(res);
		let str="";
		res.forEach((v)=>{
			str+=`
			<li>
				<a href="">
					<div class="out-box">
						<div class="inner-box">
							<img src="${v.url}">
						</div>
					</div>
					<p>${v.title}</p>
				</a>
			</li>
			`
		});
		let familHomeContain = document.querySelector("#family-home ul");
		familHomeContain.innerHTML=str;
		let familHomeleft = document.querySelector("#family-home .btn #family-left-btn");
		let familHomeright = document.querySelector("#family-home .btn #family-right-btn");
		let familHomeSlide = new Slide(familHomeContain, familHomeleft, familHomeright);
		familHomeSlide.init();
	})

	ajaxGet("api/banner.json").then((res) => {
		res = JSON.parse(res);
		let str = "";
		for (let i = 0; i < res.length; i++) {
			str += `<a><img src="${res[i].url}"></a>`
		}
		let imgbox = document.querySelector(".imgbox");
		imgbox.innerHTML = str;
		$("#banner").banner({
			width: "6.04",
			items: $("#banner").find("a"),
			left: $("#left"),
			right: $("#right"),
			jumpBtn: true,
			delayTime: 3000,
			moveTime: 700,
			autoPlay: true
		})
	})


	ajaxGet("api/goods.php", { type: "like" }).then((res) => {
		res = JSON.parse(res);
		let str = "";
		let adsContain = document.querySelector("#ads ul");
		for (let i = 0; i < res.length; i++) {
			str += `
			<li>
				<a href="details.html?id=${res[i].id}">
					<img src="${res[i].thumbnailUrl}">
					<p class="brand">${res[i].name}</p>
					<p class="description" title="">${res[i].description}</p>
					<s>原价￥${res[i].oriPrice}</s>
					<span>￥${res[i].price}</span>
				</a>
			</li>
			`
		}
		adsContain.innerHTML = str;
		let adsleft = document.querySelector("#ads .ads-btn #ads-left-btn");
		let adsright = document.querySelector("#ads .ads-btn #ads-right-btn");
		let adsSlide = new Slide(adsContain, adsleft, adsright);

		adsSlide.init();

		let ellipsis = new Ellipsis();
		ellipsis.init();

	});

	ajaxGet("api/activity.json").then((res) => {
		res = JSON.parse(res);
		let activityContain = document.querySelector("#activity ul");
		let str = "";
		for (let i = 0; i < res.length; i++) {
			str += `
			<li>
				<a href=""><img src="${res[i].url}">
					<h4>${res[i].title}</h4>
					<p>${res[i].description}</p>
				</a>
			</li>
			`
		}
		activityContain.innerHTML = str;

	});

	function getStyle(ele, attr) {
		// body...
		if (ele.currentStyle) {
			return ele.currentStyle[attr];
		}
		else {
			return getComputedStyle(ele, false)[attr];
		}
	}
	function bindEve(ele, eve, callback) {
		if (ele.addEventListner) {
			ele.addEventListner(eve, callback);
		}
		else if (ele.attachEvent) {
			ele.attachEvent("on" + eve, callback)
		}
		else {
			ele["on" + eve] = callback;
		}
	}


	// 渲染三级菜单数据
	class Nav {
		constructor() {
			this.navContain = document.querySelector(".nav");
			this.subnavContain = document.querySelector(".subnav-l ul");
			this.childContain = document.querySelector(".subnav-r");
		}

		init(res) {
			this.navstr = "";
			this.subnavstr = "";
			this.childnavstr = "";
			for (let i = 0; i < res.length; i++) {
				let nav = res[i];
				this.navstr += `
				<li>
					<a href="${nav.url}">${nav.title[0]}</a>
				</li>	`;
				if (nav.children) {
					let subnav = nav.children;
					for (let i = 0; i < subnav.length; i++) {
						this.subnavstr += `
							<li>
								<a href="${subnav[i].url[0]}">${subnav[i].title[0]}</a>
								<span>/</span>
								<a href="${subnav[i].url[1]}">${subnav[i].title[1]}</a>
								<span>/</span>
								<a href="${subnav[i].url[2]}">${subnav[i].title[2]}</a>
							</li>
							`

						if (subnav[i].children) {
							let childnav = subnav[i].children;
							this.childnavstr += '<div class="list">';
							for (let j = 0; j < childnav.length; j++) {
								this.childnavstr += `<div><h2>${childnav[j].title[0]}</h2>`;
								if (childnav[j].subtitle) {
									this.childnavstr += "<ul>";
									for (let k = 0; k < childnav[j].subtitle.length; k++) {
										this.childnavstr += `
										<li><a href="${childnav[j].subtitle[k].url}">${childnav[j].subtitle[k].title}</a></li>
										`
									}
									this.childnavstr += "</ul>";
								}
								this.childnavstr += "</div>";

							}
							this.childnavstr += "</div>"
						}
					}
				}
			}
			this.navContain.innerHTML = this.navstr;
			this.subnavContain.innerHTML = this.subnavstr;
			this.childContain.innerHTML += this.childnavstr;

		}
	}
	// class ShowUnserInfo {
	// 	constructor() {
	// 		this.username=getCookie("user");
	// 		this.usernameP=document.getElementById("username");
	// 		this.logged=document.querySelector(".logged");
	// 		this.nolog=document.querySelector(".nolog");


	// 	}
	// 	init() {
	// 		if(this.username) {
	// 			this.logged.style.display="flex";
	// 			this.nolog.style.display="none";
	// 			this.usernameP.innerHTML=this.username;
	// 			this.logout=document.getElementById("logout");
	// 			this.logout.onclick=function() {
	// 				delCookie("user","/");
	// 				window.location.reload();	
	// 			}
	// 		}
	// 		else {
	// 			this.nolog.style.display="flex";
	// 			this.logged.style.display="none";
	// 			this.login=document.getElementById("login");
	// 			this.login.onclick=function() {
	// 				window.location.href="login.html";
	// 			}
	// 		}
	// 	}
	// }
	// let showinfo=new ShowUnserInfo();
	// showinfo.init();

	// 三级导航显示
	class IndexNavTab {
		constructor() {
			this.leftSubnavList = document.querySelectorAll(".subnav-l ul li");
			this.rightSubnavList = document.querySelectorAll(".subnav-r .list");
			this.subnav = document.querySelector(".subnav");
		}
		clearAll() {
			for (let i = 0; i < this.leftSubnavList.length; i++) {
				this.leftSubnavList[i].style.backgroundColor = "";
				this.rightSubnavList[i].style.display = "none";
			}
		}
		bind() {
			for (let i = 0; i < this.leftSubnavList.length; i++) {
				bindEve(this.leftSubnavList[i], "mouseenter", () => {
					clearTimeout(this.timer1);
					this.timer1 = setTimeout(() => {
						this.clearAll();
						this.leftSubnavList[i].style.backgroundColor = "#ffe4dc";
						this.rightSubnavList[i].style.display = "flex";
					}, 300)

				})
			}
			bindEve(this.subnav, "mouseleave", () => {
				// this.timer2=setTimeout()
				clearTimeout(this.timer2);
				clearInterval(this.timer1);
				this.timer2 = setTimeout(() => { this.clearAll() }, 300)

			})
		}

	}


	class Ellipsis {
		constructor() {
			this.description = document.querySelectorAll("#ads .description");
		}
		init() {
			for (let i = 0; i < this.description.length; i++) {
				this.description[i].parentNode.parentNode.title = this.description[i].innerHTML;
				if (this.description[i].scrollHeight - this.description[i].offsetHeight > 5) {
					this.pseudo = document.createElement("div");
					this.pseudo.innerHTML = "...";
					this.pseudo.setAttribute("class", "ellipsis");
					this.description[i].appendChild(this.pseudo);
				}
			}
		}
	}



	class Slide {
		constructor(contain, left, right) {
			this.contain = contain;
			this.left = left;
			this.right = right;
			this.index = 0;
		}
		init() {
			this.left.style.visibility = "hidden";
			this.contain.style.left = 0;
			this.bindEve();
			this.scrollWidth = this.contain.scrollWidth;
		}
		bindEve() {
			let that = this;
			this.nextFlag = true;
			this.prevFlag = true;
			this.right.onclick = (function () {
				let timer3 = null;
				return function () {
					clearTimeout(timer3);
					timer3 = setTimeout(() => {
						that.prevFlag = true;
						that.left.style.visibility = "visible";
						let left = Math.abs(parseInt(that.contain.style.left)) + that.contain.offsetWidth;
						let distance = that.scrollWidth - left;
						if (distance > that.contain.offsetWidth) {
							that.index++;
							slowdown(that.contain, { left: -(that.index * that.contain.offsetWidth) })
						}
						else {
							if (that.nextFlag == true) {
								slowdown(that.contain, { left: -(that.index * that.contain.offsetWidth + distance) })
								that.nextFlag = false;
								that.right.style.visibility = "hidden";
								that.index++;
							}
						}
						// console.log(that.index)
					}, 300)
				}
			})();
			this.left.onclick = (function () {
				let timer4 = null;
				return function () {
					clearTimeout(timer4);
					timer4 = setTimeout(() => {
						that.nextFlag = true;
						that.right.style.visibility = "visible";
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
						if (that.index > 0) {
							that.index--;
							slowdown(that.contain, { left: -(that.index * that.contain.offsetWidth) })
						}
						if (that.index == 0) {
							that.prevFlag = false;
							that.left.style.visibility = "hidden";
						}
						// console.log(that.index)
					}, 300)
				}
			})();

		}


	}


	

	


})
