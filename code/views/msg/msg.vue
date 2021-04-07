<template>
	<view class="content">
		<u-navbar :is-back="false" title="消息"></u-navbar>
		<div class="aui-news-box">
			<a href="javascript:;" class="aui-news-item" v-for="(list, i) in lists" :key="i" @tap="doChatHandler(list)">
				<div class="aui-news-item-hd">
					<image style="width: 55px;height: 55px;" :src="list.img" alt="">
				</div>
				<div class="aui-news-item-bd">
					<h4>{{list.tit1}}</h4>
					<p>{{list.tit2}}</p>
				</div>
				<span class="aui-news-item-fr">{{list.time}}</span>
			</a>
		</div>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello',
				lists: [{
						"tit1": "服务通知",
						"tit2": "恭喜你参加的拼团已组成成功了，请您等待卖家发货",
						"time": "08:48",
						"img": '../../static/icon-item-001.png'
					},
					{
						"tit1": "优惠促销",
						"tit2": "恭喜你参加的拼团已组成成功了，请您等待卖家发货",
						"time": "08:48",
						"img": '../../static/icon-item-002.png'
					},
					{
						"tit1": "账户通知",
						"tit2": "恭喜你参加的拼团已组成成功了，请您等待卖家发货",
						"time": "昨天",
						"img": '../../static/icon-item-003.png'
					},
					{
						"tit1": "互动问答",
						"tit2": "恭喜你参加的拼团已组成成功了，请您等待卖家发货",
						"time": "星期六",
						"img": '../../static/icon-item-004.png'
					},
					{
						"tit1": "物流助手",
						"tit2": "恭喜你参加的拼团已组成成功了，请您等待卖家发货",
						"time": "星期六",
						"img": '../../static/icon-item-005.png'
					},
				],
			}
		},
		onLoad() {

		},
		methods: {
			doChatHandler(item) {
				console.log('我点击了',item)
				uni.navigateTo({
					url: '/views/msg/chat/chat'
				})
			}
		}
	}
</script>

<style>
	@import '../../css/style.css';
</style>
