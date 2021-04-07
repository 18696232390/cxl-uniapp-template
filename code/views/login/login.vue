<template>
	<view class="login-bg">
		<view class="login-form">
			<view class="login-form-title">登录/注册</view>
			<view class="login-form-input">
				<view class="login-form-input-item">
					<view class="login-form-input-label">手机号</view>
					<view class="login-form-input-input" ><input v-model="phoneNum"/></view>
				</view>
				<view class="login-form-input-item">
					<view class="login-form-input-label">验证码</view>
					<view class="login-form-input-input" ><input v-model="validCode"/></view>
					<view class="login-form-input-yzm">
							<button size="mini" class="login-form-submit-btn-yzm" @tap="getValidCodeHandler()">获取验证码</button>
					</view>
				</view>
			</view>
			<view class="login-form-submit">
				<button size="mini" class="login-form-submit-btn" @tap="doSubmitHandler()">登 录</button>
			</view>
		</view>
		
		<view class="login-dsf">
				——— &nbsp;&nbsp;&nbsp; 第三方登录 &nbsp;&nbsp;&nbsp; ———
		</view>
		
		<view class="login-dsf-btns">
			<view class="login-dsf-btn login-dsf-wx" @tap="doLoginByWx()"></view>
			<view class="login-dsf-btn login-dsf-qq" @tap="doLoginByQq()"></view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				phoneNum:'',
				validCode:''
			}
		},
		methods: {
			getValidCodeHandler(){
				uni.showToast({
					icon:'none',
					title:"获取验证码"
				})
			},
			doSubmitHandler(){
				uni.showToast({
					icon:'none',
					title:"登录"+this.phoneNum+"|"+this.validCode
				})
				uni.navigateTo({
					url:'/views/home/home'
				})
			},
			doLoginByWx(){
				uni.showToast({
					icon:'none',
					title:"微信登录"
				})
			},
			doLoginByQq(){
				uni.showToast({
					icon:'none',
					title:"QQ登录"
				})
			}
		}
	}
</script>

<style>
	.login-bg{
		background-image: url(../../static/login/loginBg.png);
		height: 100vh;
		width: 100%;
		background-repeat: no-repeat;
		background-size: cover;
	}
	
	.login-form {
	    width: 80%;
	    margin: 0 auto;
	    position: relative;
	    top: 21%;
	    background-color: #fff;
	    border-radius: 5px;
		padding: 8px;
		box-shadow: 0px 2px 18px -3px #e6e1e1;
	}
	.login-form-title {
	    font-size: 22px;
	    font-weight: 600;
	    margin: 20px;
	}
	
	.login-form-submit-btn{
		background-image: url(../../static/login/loginFormBtn.png);
		color: #fff;
		width: 45%;
		border-radius: 9px;
		border: 0px;
		background-size: cover;
	}
	.login-form-input-label {
	    color: rgb(166,166,166);
	    font-size: 11px;
	}
	
	.login-form-submit {
	    text-align: center;
		 margin-bottom: 1rem;
	}
	.login-form-input-input {
	    font-size: 26px;
	    border-bottom: 1px solid #d4d4d4;
	    margin: .3rem;
	}
	.login-form-input-yzm {
	    position: relative;
	    left: 66%;
	}

	.login-form-input {
	    margin-bottom: 1rem;
	}
	
	.login-dsf {
	    position: absolute;
	    z-index: 999;
	    width: 100%;
	    text-align: center;
	    color: rgb(128 128 128 / 61%);
	    bottom: 22%;
	}
	
	.login-dsf-btns {
	    position: absolute;
	    z-index: 999;
	    width: 100%;
	    text-align: center;
	    bottom: 11%;
	    display: inline-block;
	}
	
	.login-dsf-btn {
	    display: inline-flex;
	    margin: 0px 20px;
	    border-radius: 400px;
	    width: 55px;
	    height: 55px;
	}
	.login-dsf-wx{
		background-image: url(../../static/login/loginWx.png);
		background-size: cover;
		background-repeat: no-repeat;
	}
	.login-dsf-qq{
		background-image: url(../../static/login/loginQQ.png);
		background-size: cover;
		background-repeat: no-repeat;
	}
	
</style>
