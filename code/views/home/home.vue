<template>
	<view>
		<u-navbar :is-back="false" title="快速开发脚手架"></u-navbar>
		<view class="content">
			<view class="search-body">
				<u-search placeholder="请搜索" v-model="keyword"></u-search>
			</view>
			<view class="wrap">
				<u-swiper :list="swiperList" :effect3d="true" :height="300"></u-swiper>
			</view>
			<view style="margin: .3rem;"  v-for="(item,index) in 3" :key="index">
				<view class="wrap">
					<view class="comment">
						<view class="top">
							<view class="left">
								<view class="heart-photo">
									<image :src="comment.url" mode=""></image>
								</view>
								<view class="user-info">
									<view class="name">{{ comment.name }}</view>
									<view class="date">06-25 13:58</view>
								</view>
							</view>
							<view class="right" :class="{ highlight: comment.isLike }">
								{{ comment.likeNum }}
								<u-icon v-if="!comment.isLike" name="thumb-up" class="like" color="#9a9a9a" :size="30" @click="getLike"></u-icon>
								<u-icon v-if="comment.isLike" name="thumb-up-fill" class="like" :size="30" @click="getLike"></u-icon>
							</view>
						</view>
						<view class="content">
							<view>
								{{ comment.contentText }}
							</view>
							<view>
								<image class="msg_content_img" src="../../js_sdk/levine-APPPush/levine-APPPush/static/push/activity.png"></image>
							</view>
						</view>
						<view class="all-reply">
							<view class="all-reply-top">全部回复（{{ comment.allReply }}）</view>
							<view class="item" v-for="(item, index) in commentList" :key="index">
								<view class="comment">
									<view class="top">
										<view class="left">
											<view class="heart-photo">
												<image :src="item.url" mode=""></image>
											</view>
											<view class="user-info">
												<view class="name">{{ item.name }}</view>
												<view class="date">{{ item.date }}</view>
											</view>
										</view>
										<view class="right" :class="{ highlight: item.isLike }">
											<view class="num">{{ item.likeNum }}</view>
											<u-icon v-if="!item.isLike" name="thumb-up" class="like" :size="30" color="#9a9a9a" @click="getLike(index)"></u-icon>
											<u-icon v-if="item.isLike" name="thumb-up-fill" class="like" :size="30" @click="getLike(index)"></u-icon>
										</view>
									</view>
									<view class="reply" v-if="item.reply">
										<view class="username">{{ item.reply.name }}</view>
										<view class="text">{{ item.reply.contentStr }}</view>
									</view>
									<view class="content">{{ item.contentText }}</view>
								</view>
							</view>
						</view>
					</view>
			
				</view>

			</view>

		</view>

		<!-- <button type="default" @click="open">打开自定义推送弹框</button> -->
		<wm-list-add ref="add" @clickAdd="clickAdd" />
		<!-- <cherry-blossom ref="cherryBlossom"></cherry-blossom> -->
	</view>
</template>

<script>
	import wmListAdd from '@/components/wm-list-add/wm-list-add';
	// import cherryBlossom from '@/components/cherryBlossom-yh/cherryBlossom.vue'
	
	export default {
		components: {
			wmListAdd
			// ,cherryBlossom
		},
		data() {
			return {
				userLocalInfo:{},
				commentList: [],
				comment: '',
				keyword: '遥看瀑布挂前川',
				swiperList: [{
						image: 'https://cdn.uviewui.com/uview/swiper/1.jpg',
						title: '昨夜星辰昨夜风，画楼西畔桂堂东'
					},
					{
						image: 'https://cdn.uviewui.com/uview/swiper/2.jpg',
						title: '身无彩凤双飞翼，心有灵犀一点通'
					},
					{
						image: 'https://cdn.uviewui.com/uview/swiper/3.jpg',
						title: '谁念西风独自凉，萧萧黄叶闭疏窗，沉思往事立残阳'
					}
				],
			}
		},
		onLoad() {
			this.getUserLocalInfo();
			this.getReply();
			plus.runtime.setBadgeNumber(1);
		},
		methods: {
			getUserLocalInfo(){
				// https://api.vvhan.com/api/visitor.info
				this.$u.get('https://api.vvhan.com/api/visitor.info', {}).then(res => {
					console.log('访客信息',res);
					this.userLocalInfo = res
					var ip = res.ip
					var time = res.time
					var system = res.system
					var week = res.week
				});
			},
			clickAdd() {
				console.log('点击加号执行操作')
				uni.showToast({
					title: '点击了加号'
				})
			},
			open() {
				let params = {
					inApp: true, // app内横幅提醒
					voice: true, // 声音提醒
					vibration: true, // 振动提醒
					messageType: '消息分类',
					messageTitle: '通知标题',
					messageContent: '通知文案通知文案通知文案通知文案通知文案通知文案通知文案通知文案通知文案通知文案',
					messageImage: 'https://test999.cgc999.com/group1/M00/00/57/CgEKmGAC87eARAQFAANXI1t4oU4904.png'
				}
				this.$appPush(params)
			},
			// 点赞
			getLike(index) {
				if (index === 0 || index > 0) {
					this.commentList[index].isLike = !this.commentList[index].isLike;
					if (this.commentList[index].isLike == true) {
						this.commentList[index].likeNum++;
					} else {
						this.commentList[index].likeNum--;
					}
				} else {
					if (this.comment.isLike == true) {
						this.comment.isLike = !this.comment.isLike;
						this.comment.likeNum--;
					} else {
						this.comment.isLike = !this.comment.isLike;
						this.comment.likeNum++;
					}
				}
			},

			// 回复列表
			getReply() {
				this.comment = {
					id: 1,
					name: '叶轻眉',
					date: '12-25 18:58',
					contentText: '我不信伊朗会没有后续反应，美国肯定会为今天的事情付出代价的',
					url: 'https://cdn.uviewui.com/uview/template/SmilingDog.jpg',
					allReply: 12,
					likeNum: 33,
					isLikes: false
				};
				this.commentList = [{
						name: '新八几',
						date: '12-25 18:58',
						contentText: '不要乱打广告啊喂！虽然是真的超好用',
						url: 'https://cdn.uviewui.com/uview/template/SmilingDog.jpg',
						likeNum: 33,
						isLike: false,
						reply: {
							name: 'uview',
							contentStr: 'uview是基于uniapp的一个UI框架，代码优美简洁，宇宙超级无敌彩虹旋转好用，用它！'
						}
					},
					{
						name: '叶轻眉1',
						date: '01-25 13:58',
						url: 'https://cdn.uviewui.com/uview/template/SmilingDog.jpg',
						contentText: '我不信伊朗会没有后续反应，美国肯定会为今天的事情付出代价的',
						allReply: 0,
						likeNum: 11,
						isLike: false,
						reply: {
							name: '粘粘',
							contentStr: '今天吃什么，明天吃什么，晚上吃什么，我只是一只小猫咪为什么要烦恼这么多'
						}
					},
					{
						name: '叶轻眉2',
						date: '03-25 13:58',
						contentText: '我不信伊朗会没有后续反应，美国肯定会为今天的事情付出代价的',
						allReply: 0,
						likeNum: 21,
						url: 'https://cdn.uviewui.com/uview/template/SmilingDog.jpg',
						isLike: false,
						allReply: 2,
						reply: {
							name: '豆包',
							contentStr: '想吃冰糖葫芦粘豆包，但没钱5555.........'
						}
					},
					{
						name: '叶轻眉3',
						date: '06-20 13:58',
						contentText: '我不信伊朗会没有后续反应，美国肯定会为今天的事情付出代价的',
						allReply: 0,
						likeNum: 150,
						url: 'https://cdn.uviewui.com/uview/template/SmilingDog.jpg',
						isLike: false
					}
				];
			}

		}
	}
</script>

<style>
	.search-body {
		margin-bottom: 2px;
		margin-left: 2px;
		margin-right: 2px;
		margin-top: 2px;
	}
	
	.msg_content_img{
		width: 85px;
		height: 85px;
	}
</style>


<style lang="scss" scoped>
	page {
		background-color: #f2f2f2;
	}

	.comment {
		padding: 30rpx;
		font-size: 32rpx;
		background-color: #ffffff;

		.top {
			display: flex;
			justify-content: space-between;
		}

		.left {
			display: flex;

			.heart-photo {
				image {
					width: 64rpx;
					height: 64rpx;
					border-radius: 50%;
					background-color: #f2f2f2;
				}
			}

			.user-info {
				margin-left: 10rpx;

				.name {
					color: #5677fc;
					font-size: 28rpx;
					margin-bottom: 4rpx;
				}

				.date {
					font-size: 20rpx;
					color: $u-light-color;
				}
			}
		}

		.right {
			display: flex;
			font-size: 20rpx;
			align-items: center;
			color: #9a9a9a;

			.like {
				margin-left: 6rpx;
			}

			.num {
				font-size: 26rpx;
				color: #9a9a9a;
			}
		}

		.highlight {
			color: #5677fc;

			.num {
				color: #5677fc;
			}
		}
	}

	.all-reply {
		margin-top: 10rpx;
		padding-top: 20rpx;
		background-color: #ffffff;

		.all-reply-top {
			margin-left: 20rpx;
			padding-left: 20rpx;
			border-left: solid 4rpx #5677fc;
			font-size: 30rpx;
			font-weight: bold;
		}

		.item {
			border-bottom: solid 2rpx $u-border-color;
		}

		.reply {
			padding: 20rpx;
			background-color: rgb(242, 242, 242);
			border-radius: 12rpx;
			margin: 10rpx 0;

			.username {
				font-size: 24rpx;
				color: #7a7a7a;
			}
		}
	}
</style>
