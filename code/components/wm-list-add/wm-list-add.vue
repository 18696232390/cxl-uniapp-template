<template>
	<view>
		<view :animation="animationDataContent" class="animationContent" :style="{'background-color': bgColor }" @click="rotateAndScaleThenTranslate">
			<label class="wm-icon wm-icon-gengduo1 moreIcon" v-if="moreFlag" :style="{'color': fontColor }"></label>
			<view :animation="animationData" @tap="clickAdd" class="bottom-float" :style="{'background-color': bgColor }">
				<label class="wm-icon wm-icon-add addIcon" :style="{'color': fontColor }"></label>
			</view>
		</view>
	</view>
</template>

<script>
	/**
	 * wm-list-add 带状态的提交按钮
	 * @description 一个动效的侧面添加按钮，适用于list场景，避免遮挡用户视线。
	 * @property {String} bgColor 背景颜色（默认：#5094f2）
	 * @property {String} fontColor 文字颜色（默认：#ffffff）
	 * @property {Boolean} isOpen 默认是否关闭动画（默认：否）
	 * @example
	 * <wm-list-add ref="add"/>
	 */
	export default {
		name: 'wm-list-add',
		props: {
			// 背景颜色
			bgColor: {
				type: String,
				default: '#5094f2'
			},
			// 文字颜色
			fontColor: {
				type: String,
				default: '#ffffff'
			},
			// 是否关闭动画
			isOpen: {
				type: Boolean,
				default: false
			},
			//列表滑动关闭动画
			isClose:{
				type: Boolean,
				default: false
			}
		},
		created() {
			this.init()
		},
		data() {
			return {
				animationData: {},
				animationDataContent: {},
				moreFlag: false,
			}
		},
		methods: {
			init() {
				if (!this.isOpen) {
					this.closeAnimation()
				}
			},
			clickAdd() {
				this.$emit('clickAdd');
			},
			// 关闭右侧添加
			closeAnimation() {
				if (this.moreFlag) return

				const animation1 = uni.createAnimation({
					duration: 500,
					timingFunction: 'ease',
				})
				const animation = uni.createAnimation({
					duration: 1000,
					timingFunction: 'ease',
				})

				this.animationDataContent = animation1
				this.animation = animation

				animation1.scale(1, 1).rotate(0).step()
				animation.scale(1, 1).rotate(90).step()

				this.animationData = animation.export()
				this.animationDataContent = animation1.export()
				console.log(this.animationData)
				setTimeout(function() {
					animation1.translate(42).step()
					animation.translate(0, -42).step()
					this.animationData = animation.export()
					this.animationDataContent = animation1.export()
					this.moreFlag = true
				}.bind(this), 1000)
			},
			// 打开右侧添加
			rotateAndScaleThenTranslate() {
				var animation1 = uni.createAnimation({
					duration: 500,
					timingFunction: 'ease',
				})
				this.animation1 = animation1
				// 先旋转，然后平移
				this.animation1.rotate(0).scale(1, 1).step()
				this.animation1.translate(0).step()
				this.animationDataContent = this.animation1.export()


				var animation = uni.createAnimation({
					duration: 1000,
					timingFunction: 'ease',
				})
				this.animation = animation
				// 先旋转，然后平移
				this.animation.rotate(-90).scale(1, 1).step()
				this.animation.translate(0, 0).step()
				this.animationData = this.animation.export()

				this.moreFlag = false

				// 5秒自动收回
				setTimeout(() => {
					this.closeAnimation()
				}, 5000)
			},
		}
	}
</script>

<style>
	@import url("./css/wm-icon.css");

	.animationContent {
		position: fixed;
		width: 130rpx;
		/* background-color: #5094f2; */
		height: 100rpx;
		bottom: 160rpx;
		right: 0;
		z-index: 10;
		border-radius: 50rpx 0 0 50rpx;
	}

	.bottom-float {
		position: absolute;
		left: 0;
		top: 0;
		width: 100rpx;
		height: 100rpx;
		border-radius: 50rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		/* background-color: #5094f2; */
		box-shadow: 0 0 20px 0px rgba(0, 0, 0, 0.1);
		transition: transform 0.4s;
		transform: translateX(0) rotate(0deg);
		color: #FFFFFF;
	}

	.moreIcon {
		position: absolute;
		line-height: 100rpx;
		left: 8rpx;
		top: 0;
		font-size: 40rpx;
	}

	.addIcon {
		font-size: 66rpx;
	}
</style>
