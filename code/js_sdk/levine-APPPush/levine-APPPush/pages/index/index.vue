<template>
	<view class="content">
		<button type="default" @click="open">打开自定义推送弹框</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello'
			}
		},
		onLoad() {

		},
		methods: {
			open() {
				let params = {
					inApp: true, // app内横幅提醒
					voice: true,	// 声音提醒
					vibration: true,	// 振动提醒
					messageType: '消息分类',
					messageTitle: '通知标题',
					messageContent: '通知文案通知文案通知文案通知文案通知文案通知文案通知文案通知文案通知文案通知文案',
					messageImage: 'https://test999.cgc999.com/group1/M00/00/57/CgEKmGAC87eARAQFAANXI1t4oU4904.png'
				}
				this.$appPush(params)
			}
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 100vh;
		background: #f4f4f4;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
