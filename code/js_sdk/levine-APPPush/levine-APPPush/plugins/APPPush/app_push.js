export class appPush{
	constructor(option = {}) {
		console.log(option)
		// app内横幅提醒
		this.inApp = option.inApp;
		// 声音提醒
		this.voice = option.voice;
		// 振动提醒
		this.vibration = option.vibration;
		// 消息分类
		this.messageType = option.messageType || '';
		// 通知标题
		this.messageTitle = option.messageTitle || '';
		// 时间
		this.messageTime = option.messageTime || '现在';
		// 通知文案
		this.messageContent = option.messageContent || '';
		// 缩略图
		this.messageImage = option.messageImage || '';	
		
		
	    this.screenWidth = plus.screen.resolutionWidth;
	    this.screenHeight = plus.screen.resolutionHeight;
	    // 比例
	    this.propotation = this.screenWidth / 750
	    //弹窗容器宽度
	    this.popupViewWidth = this.propotation * 710;
	    // 弹窗容器高度
	    this.popupViewHeight = this.propotation * 192;
	    // 弹窗容器的Padding
	    this.viewContentPadding = this.propotation * 30;
		// 弹框容器的宽度
		this.viewContentWidth = parseInt(this.popupViewWidth - (this.viewContentPadding * 2))
		// 弹框到顶部的距离
		this.system = uni.getSystemInfoSync()
		// 过度时间
		this.duration = 200
		// 关闭时间
		this.closeTime = 3000
		
		console.log(this.inApp, this.voice, this.vibration)
		
		this.top = (this.propotation * 20) + this.system.statusBarHeight;
		this.initTop = -this.system.statusBarHeight
		
		this.body = null;
		this.bodyBg = null;
		this.timer = null;
		
		this.flag = false
		this.cur = {
			x: 0,
			y: 0,
			pageX: 0,
			pageY: 0
		}
		
	}
	
	// 生成弹框主体
	createView() {
		// console.log((this.propotation * 20) + this.system.statusBarHeight+ '--------------')
		let view = new plus.nativeObj.View('popupView', {
			// tag: 'rect',
			top: (this.propotation * 20) + this.system.statusBarHeight,
			left: this.propotation * 20,
			height: this.popupViewHeight,
			width: this.popupViewWidth
		})
		// 绘制白色背景
		view.drawRect({
			color:"#fff",
			radius:"10px"
		})
		let viewContentList = [
			{
				src: '/static/push/message-icon.png',
				id: 'icon',
				tag: 'img',
				position: {
					top: this.viewContentPadding + "px",
					left: this.viewContentPadding + "px",
					width: (this.propotation * 24) + 'px',
					height: (this.propotation * 24) + 'px',
				}
			},
			{
				tag: 'font',
				id: 'pop-title',
				text: this.messageType,
				textStyles: {
					size: (this.propotation * 24) + 'px',
					align: "left",
					color: "#4F555B"
				},
				position: {
					top: this.viewContentPadding + "px",
					left: (this.propotation * 64) + 'px',
					height: (this.propotation * 24) + 'px',
					width: this.viewContentWidth + "px",
				}
			},
			{
				tag: 'font',
				id: 'time',
				text: this.messageTime,
				textStyles: {
					size: (this.propotation * 24) + 'px',
					align: "right",
					color: "#4F555B"
				},
				position: {
					top: this.viewContentPadding + "px",
					left: this.viewContentPadding + "px",
					height: (this.propotation * 24) + 'px',
					width: this.viewContentWidth + "px",
				}
			},
			{
				tag: 'font',
				id: 'push-title',
				text: this.messageTitle,
				textStyles: {
					size: (this.propotation * 30) + 'px',
					align: "left",
					color: "#202123",
					overflow: "ellipsis"
				},
				position: {
					top: (this.propotation * 82) + 'px',
					left: (this.propotation * 30) + 'px',
					height: (this.propotation * 30) + 'px',
					width: (this.propotation * 505) + 'px',
				}
			},
			{
				tag: 'font',
				id: 'push-content',
				text: this.messageContent,
				textStyles: {
					size: (this.propotation * 24) + 'px',
					align: "left",
					color: "#4F555B",
					overflow: "ellipsis"
				},
				position: {
					top: (this.propotation * 130) + 'px',
					left: (this.propotation * 30) + 'px',
					height: (this.propotation * 24) + 'px',
					width: (this.propotation * 505) + 'px',
				}
			},
			{
				src: this.messageImage,
				id: 'image',
				tag: 'img',
				position: {
					top: (this.propotation * 68) + 'px',
					// right: "0px",
					left: (this.propotation * 586) + 'px',
					width: (this.propotation * 100) + 'px',
					height: (this.propotation * 100) + 'px',
				}
			},
			{
				src: '/static/push/img-bg.png',
				id: 'img-bg',
				tag: 'img',
				position: {
					top: (this.propotation * 68) + 'px',
					// right: "0px",
					left: (this.propotation * 586) + 'px',
					width: (this.propotation * 100) + 'px',
					height: (this.propotation * 100) + 'px',
				}
			},
		]
		view.draw(viewContentList)
		// view.addEventListener("click",(e)=>{
		// 	console.log('---------------------')
		// });
		view.addEventListener("touchstart", (event) => {
			// console.log(event)
			this.flag = true;  
			var touch;  
			if (event.touches) {  
				touch = event.touches[0];  
			} else {  
				touch = event;  
			}  
			this.cur.x = touch.clientX;  
			this.cur.y = touch.clientY;
			this.cur.pageX = touch.pageX;
			this.cur.pageY = touch.pageY;  
		})
		view.addEventListener("touchmove", (event) => {
			// console.log(e)
			var touch;  
			if (event.touches) {  
				touch = event.touches[0];  
			} else {  
				touch = event;
			}  
			let moveX = touch.pageX - this.cur.x;   
			let moveY = touch.pageY - this.cur.y;   
			let x = moveX;  
			let y = moveY;
			// console.log(x, y)
			// console.log(this.cur, touch)
			if (x < 0) {  
				// x = 0;  
			} else if (x > (this.popupViewWidth - this.popupViewWidth)) {  
				// x = this.screenWidth - 40;  
			}  
			if (y < 0) {  
				// y = 0;  
			} else if (y >= ((this.propotation * 20) + this.system.statusBarHeight)) {  
				y = ((this.propotation * 20) + this.system.statusBarHeight);  
			}  
			this.body.setStyle({  
				top: y + 'px',  
				left: x + 'px'  
			});
		})
		/**
		 * 这里有一个bug暂时无法解决，当用户快速往左滑时，滑动区域超出屏幕会监听不到touchend事件😂，很难被发现我就不解决了
		 */
		view.addEventListener("touchend", (event) => {
			// console.log(this.cur, event)
			var touch;
			if (event.touches) {  
				touch = event.touches[0];  
			} else {  
				touch = event;  
			}
			let differX = Math.abs(this.cur.pageX) - Math.abs(touch.pageX)
			let differY = Math.abs(this.cur.pageY) - Math.abs(touch.pageY)
			this.flag = false
			// console.log(differX, differY)
			if(Math.abs(differX) > 5 || Math.abs(differY) > 5) {	// 上下移动或左右移动超过5px则关闭弹窗
				this.hide()
			} else {	// 否则当作单击事件
				console.log('-------------------')
				this.hide()
			}
		})
		this.body = view;
		
	// 	let bodyBg = new plus.nativeObj.View('bodyBg',{
	// 		top: (this.propotation * 20) + this.system.statusBarHeight,
	// 		left: this.propotation * 20,
	// 		height: this.popupViewHeight,
	// 		width: this.popupViewWidth,
	// 		backgroundColor:'rgba(0, 0, 0, 1)',
	// 	});
	// 	bodyBg.draw([
	// 	  {tag:'font',id:'confirm',text:'关闭关闭',textStyles:{color:'red',size:'16px'}},
	// 	]);
	
	// 	bodyBg.addEventListener("click",(e)=>{
	// 		console.log('---------------------')
	// 	});
	// 	this.bodyBg = bodyBg
	}
	// 显示/关闭弹框动画
	modelAnimationOpenOrClose(type) {
		var options = {type:type,duration:this.duration};
		plus.nativeObj.View.startAnimation(options,this.body, () => {
			// 关闭原生动画
			plus.nativeObj.View.clearAnimation();
		});
	}
	bgAnimationOpenOrClose(type) {
		var options = {type:type,duration:this.duration};
		plus.nativeObj.View.startAnimation(options,this.bodyBg, () => {
			// 关闭原生动画
			plus.nativeObj.View.clearAnimation();
		});
	}
	// closeAnimation() {
	// 	// push弹框距离最顶部的距离
	// 	let top = (this.propotation * 20) + this.system.statusBarHeight
	// 	// 完全隐藏时的顶部距离
	// 	let hideTop = -this.system.statusBarHeight
	// 	this.timer = setInterval(() => {
	// 		this.top = this.top - 2
	// 		if(this.top < hideTop * 2) {
	// 			clearInterval(this.timer)
	// 			this.timer = null
	// 		}
	// 		this.body.setStyle({
	// 			top:this.top
	// 		})
	// 	}, 1)
	// }
	// 显示弹框
	show() {
		this.tips()
		if(this.inApp) {
			this.createView()
			// this.modelAnimationOpenOrClose('slide-in-right')
			this.body.show()
			// this.bodyBg.show()
			setTimeout(() => {
				if(this.body) {
					this.hide()
				}
			}, this.closeTime)
		}
	}
	// 关闭弹框
	hide() {
		this.modelAnimationOpenOrClose('slide-out-right')
		this.body.hide()
		setTimeout(() => {
			plus.nativeObj.View.clearAnimation();
			this.body = null
		}, this.duration)
		// this.bgAnimationOpenOrClose('slide-out-right')
		// this.bodyBg.hide()
	}
	// 调用系统提示音和振动
	tips() {
		if(this.voice) {
			let system = uni.getSystemInfoSync().platform
			if(system == 'ios') {
				let player = plus.audio.createPlayer( "/static/audio/ios.mp3" );
				player.play()
			} else {
				let main = plus.android.runtimeMainActivity();
				let RingtoneManager = plus.android.importClass("android.media.RingtoneManager");
				let uri = RingtoneManager.getActualDefaultRingtoneUri(main, RingtoneManager.TYPE_NOTIFICATION);
				console.log(uri)
				let MediaPlayer = plus.android.importClass("android.media.MediaPlayer");  
				let player = MediaPlayer.create(main, uri);  
				player.setLooping(false);  
				player.prepare();  
				player.start();
			}
		}
		if(this.vibration) {
			plus.device.vibrate()
		}
	}
}

export default appPush