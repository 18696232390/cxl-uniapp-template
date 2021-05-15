<template>
	<view class="u-wrap">
		<u-navbar :is-back="true" title="答案之书"></u-navbar>
		{{result}}
		<button @tap="doFandonHandler()">翻动</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				result: ''
			}
		},
		methods: {
			// https://api.vvhan.com/api/love
			doFandonHandler() {
				this.$u.get('https://api.vvhan.com/api/love', {}).then(res => {
					console.log(res);
					this.result = res
				});
			}

		}
	}
</script>

<style>

</style>
