<template>
	<view>
		<view class="ls-button" hover-class="ls-button-click" :style="buttonStyle" :class="{ 'ls-button-work': status != 'available', 'ls-shadow': shadow && status == 'available' }" @click="submit">
			<text class="ls-button-text" :style="{'color': fontColor }" v-if="status == 'available'">{{ text }}</text>
			<view class="ls-success" v-if="status == 'success'">
				<view class="ls-first-strokes" :style="{ 'background-color': mainColor }"></view>
				<view class="ls-second-strokes" :style="{ 'background-color': mainColor }"></view>
			</view>
			<view class="ls-circle-loader" :style="cicrleLoaderStyle" v-show="status != 'available'">
				<view class="ls-loader-inner" :style="{ 'background-color': status == 'success' ? outlineColor : 'transparent' }" v-if="!plain"></view>
			</view>
		</view>
	</view>
</template>

<script>
/**
 * ls-state-button 带状态的提交按钮
 * @description 通常用户表单提交的提交按钮，它带有提交中以及提交成功的状态动画，既可以给用户一个友好的提交等待提示，又可以防止用户重复点击。
 * @property {String} color 按钮主题颜色（默认：#19cc95）
 * @property {String} fontColor 文字颜色（默认：#ffffff）
 * @property {Boolean} shadow 是否显示按钮阴影（默认：是）
 * @property {String} text 按钮文字（默认：提交）
 * @property {Boolean} plain 结果符号是否镂空（默认：否）
 * @example
 * <ls-state-button ref="button" @submit="handleSubmit"/>
 */
let buttonStyleSIT;
let submitSIT;
import {getColorRgb, getRgba} from './util';
export default {
	name: 'ls-state-button',
	props: {
		// 主题颜色
		color: {
			type: String,
			default: '#19cc95'
		},
		// 文字颜色
		fontColor: {
			type: String,
			default: '#ffffff'
		},
		// 是否显示按钮阴影
		shadow: {
			type: Boolean,
			default: true
		},
		// 按钮文字
		text: {
			type: String,
			default: '提交'
		},
		// 成功后的对号是否镂空
		plain: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {
			mainColor: '',
			outlineColor: '',
			status: 'available',
			buttonStyle: ''
		};
	},
	watch: {
		color() {
			this.init()
		}
	},
	computed: {
		cicrleLoaderStyle() {
			if (this.status == 'success') {
				return {
					'border-color': this.mainColor,
					animation: 'none'
				};
			}
			return {
				'border-top-color': this.mainColor,
				// 'border-right-color': this.mainColor
			};
		}
	},
	created() {
		this.init()
	},
	methods: {
		init() {
			this.status = 'available';
			if (!this.color) {
				console.warn('[ls-state-button]: color参数不合法');
				return;
			}
			let color = this.color.trim();
			if (/^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/.test(color)) {
				this.mainColor = getColorRgb(color);
				this.outlineColor = getRgba(this.mainColor, 0.2);
				this.buttonStyle = { 'background-color': this.mainColor, 'border-color': this.mainColor };
			} else if (/^rgb|^RGB/.test(color)) {
				this.mainColor = color;
				this.outlineColor = getRgba(this.mainColor, 0.2);
				this.buttonStyle = { 'background-color': this.mainColor, 'border-color': this.mainColor };
			} else {
				console.warn('[ls-state-button]: color参数不合法');
			}
		},
		submit() {
			if (this.status != 'available') {
				return;
			}
			this.status = 'loading';
			// 延迟0.2s执行，给按钮变形动画一个执行时间
			clearTimeout(buttonStyleSIT);
			buttonStyleSIT = setTimeout(() => {
				this.buttonStyle = { 'background-color': 'transparent', 'border-color': this.outlineColor };
			}, 200);
			this.$emit('submit');
		},
		success(callback) {
			this.status = 'success';
			if (callback) {
				clearTimeout(submitSIT);
				submitSIT = setTimeout(() => {
					callback();
				}, 700);
			}
		},
		fail(toast) {
			this.buttonStyle = { 'background-color': this.mainColor, 'border-color': this.mainColor };
			this.status = 'available';
			if (toast) {
				uni.showToast({
					icon: 'none',
					title: toast
				});
			}
		}
	}
};
</script>

<style>
/* 按钮 */
.ls-button {
	display: flex;
	align-items: center;
	justify-content: center;
	position: relative;
	height: 96rpx;
	line-height: 96rpx;
	border-radius: 96rpx;
	text-align: center;
	width: 100%;
	transition: all 0.2s;
	margin: auto;
	border-width: 8rpx;
	border-style: solid;
	box-sizing: border-box;
}

.ls-shadow::after {
	content: '';
	display: block;
	background: inherit;
	filter: blur(5rpx);
	position: absolute;
	width: 100%;
	height: 100%;
	top: 8rpx;
	left: 12rpx;
	z-index: -1;
	opacity: 0.4;
	transform-origin: 0 0;
	border-radius: inherit;
	transform: scale(1, 1.1);
}

.ls-loader-inner {
	position: absolute;
	bottom: 0;
	right: 0;
	width: 80%;
	height: 80%;
	border-radius: 500rpx;
	transition: all 1s;
}

.ls-button-work {
	width: 96rpx;
}

.ls-button-click:not(.ls-button-work) {
	animation: activeButton 0.25s linear;
}

.ls-button-text {
	font-size: 32rpx;
}

@keyframes activeButton {
	0% {
		transform: scale(1);
	}
	50% {
		transform: scale(1.01);
	}
	100% {
		transform: scale(1);
	}
}

/* 对号 */
.ls-success {
	width: 40rpx;
	height: 22rpx;
	border-radius: 0 0 0 4rpx;
	position: absolute;
	left: 50%;
	top: 50%;
	margin: -18rpx 0 0 -20rpx;
	transform: rotate(-45deg);
	overflow: hidden;
}

.ls-first-strokes,
.ls-second-strokes {
	content: '';
	position: absolute;
	border-radius: 8rpx;
}
.ls-first-strokes {
	width: 8rpx;
	height: 22rpx;
	border-radius: 8rpx;
	left: 0;
	animation: firstStrokes 0.2s linear 0.2s 1 both;
}
.ls-second-strokes {
	width: 40rpx;
	height: 8rpx;
	border-radius: 8rpx;
	bottom: 0;
	animation: secondStrokes 0.2s linear 0.4s 1 both;
}

@keyframes firstStrokes {
	0% {
		top: -100%;
	}
	100% {
		top: 0%;
	}
}
@keyframes secondStrokes {
	0% {
		left: -100%;
	}
	100% {
		left: 0%;
	}
}

/* 圆形进度 */
.ls-circle-loader {
	display: block;
	position: absolute;
	left: -8rpx;
	top: -8rpx;
	width: 80rpx;
	height: 80rpx;
	/* transform: translateX(-50%); */
	border-radius: 80rpx;
	border: 8rpx solid transparent;
	animation: dongHua 1.2s linear infinite;
	box-sizing: content-box;
}
.ls-circle-loader::after {
	content: '';
	width: 85%;
	height: 85%;
	background: linear-gradient(45deg,rgba(255,255,1) 0%,1) 40%,0.7) 60%,0) 100%);
	position: absolute;
	top: 0;
	left: 0;
	transform: translate(-5%, -5%);
}

@keyframes dongHua {
	0% {
		transform: rotate(0deg);
	}
	100% {
		transform: rotate(360deg);
	}
}
</style>
