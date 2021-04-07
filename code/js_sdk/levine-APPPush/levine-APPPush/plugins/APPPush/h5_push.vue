<template>
	<view>
		<transition name="slide-fade">
			<view class="h5_push" @touchstart.stop.prevent="touchstart" @touchmove.stop.prevent="touchmove" @touchend.stop.prevent="touchend" v-if="show" :style="style">
				<view class="push-title">
					<view class="push-type">
						<image src="/static/push/message-icon.png"></image>
						{{messageType}}
					</view>
					{{messageTime}}
				</view>
				<view class="push-body">
					<view class="push-content">
						<view class="push-content-title">{{messageTitle}}</view>
						<view class="push-content-text">{{messageContent}}</view>
					</view>
					<image :src="messageImage" class="push-img" mode="aspectFill"></image>
				</view>
			</view>
		</transition>
	</view>
</template>

<script>
	export default{
		data() {
			return {
				show: false,
				// 关闭时间
				closeTime: 3000,
				// app内横幅提醒
				inApp: false,
				// 声音提醒
				voice: true,
				// 振动提醒
				vibration: false,
				// 消息分类
				messageType: '',
				// 通知标题
				messageTitle: '',
				// 时间
				messageTime: '现在',
				// 通知文案
				messageContent: '',
				// 缩略图
				messageImage: '',
				
				top: 20,
				left: 20,
				cur: {
					x: 0,
					y: 0,
					pageX: 0,
					pageY: 0
				}
			}
		},
		computed:{
			style() {
				let system = uni.getSystemInfoSync()
				let statusBarHeight = system.statusBarHeight
				return `top: calc(${statusBarHeight}px + ${this.top}rpx);left: ${this.left}rpx`
			}
		},
		created() {
			setTimeout(() => {
				this.show = false
			}, this.closeTime)
		},
		methods:{
			touchstart(event) {
				console.log(event)
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
				console.log(this.cur)
			},
			touchmove(event) {
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
				let system = uni.getSystemInfoSync()
				if (y >= (uni.upx2px(20) + system.statusBarHeight)) {  
					y = (uni.upx2px(20) + system.statusBarHeight);  
				}
				this.top = y / (uni.upx2px(y) / y)
				this.left = x / (uni.upx2px(x) / x)
				
				// this.body.setStyle({  
				// 	top: y + 'px',  
				// 	left: x + 'px'  
				// });
			},
			touchend(event) {
				console.log(event)
				var touch;
				if (event.touches.length) {  
					touch = event.touches[0];  
				} else {  
					touch = event.changedTouches[0];  
				}
				console.log(this.cur, touch)
				let differX = Math.abs(this.cur.pageX) - Math.abs(touch.pageX)
				let differY = Math.abs(this.cur.pageY) - Math.abs(touch.pageY)
				// console.log(differX, differY)
				if(Math.abs(differX) > 5 || Math.abs(differY) > 5) {	// 上下移动或左右移动超过5px则关闭弹窗
					this.show = false
				} else {	// 否则当作单击事件
					console.log('-------------------')
					this.show = false
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.h5_push{
		width: 710rpx;
		height: 192rpx;
		background: #FFFFFF;
		box-shadow: 0px 3rpx 18rpx 0px rgba(54, 58, 68, 0.08);
		border-radius: 20rpx;
		position: fixed;
		z-index: 9999999;
		.push-title{
			padding: 30rpx 30rpx 15rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			font-size: 24rpx;
			font-weight: 400;
			color: #4F555B;
			.push-type{
				display: flex;
				align-items: center;
				font-size: 24rpx;
				font-weight: 400;
				color: #4F555B;
				image{
					width: 24rpx;
					height: 24rpx;
					margin-right: 10rpx;
				}
			}
		}
		.push-body{
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 0 24rpx 0 30rpx;
			.push-content{
				width: calc(100% - 150rpx);
				.push-content-title{
					font-size: 30rpx;
					font-weight: 500;
					color: #202123;
					margin-bottom: 20rpx;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}
				.push-content-text{
					font-size: 24rpx;
					font-weight: 400;
					color: #4F555B;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}
			}
			.push-img{
				width: 100rpx;
				height: 100rpx;
				background: #F2F2F3;
				border: 0.5px solid #E9E9E9;
				border-radius: 10rpx;
				margin-left: 50rpx;
			}
		}
	}
	.slide-fade-enter-active {
	  transition: all .3s ease;
	}
	.slide-fade-leave-active {
	  transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
	}
	.slide-fade-enter, .slide-fade-leave-to
	/* .slide-fade-leave-active for below version 2.1.8 */ {
	  transform: translateX(10px);
	  opacity: 0;
	}
</style>
