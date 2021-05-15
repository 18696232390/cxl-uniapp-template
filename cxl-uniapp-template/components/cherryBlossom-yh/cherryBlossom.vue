<template>
	<view class="backCanvas">
		<canvas canvas-id="canvas" class="canvas"></canvas>
	</view>
</template>

<script>
	export default {
		name: 'cherryBlossom',
		data() {
			return {
				sakuraList: [],
				width: uni.getSystemInfoSync().windowWidth,
				height:uni.getSystemInfoSync().windowHeight,
				drawStatus:false
			}
		},
		onLoad() {
			
		},
		onReady() {
			this.init()
		},
		methods:{
			init() {
				var _that = this
				this.getYhImg()
				_that.ctx = uni.createCanvasContext('canvas',_that)
				_that.ctx.fillRect(0,0,_that.width,_that.height)
				this.drawAll()
			},
			//初始化樱花的图片
			getYhImg() {
				var _that = this
				//  #ifdef MP-WEIXIN
				wx.getImageInfo({
					src:"",  //此地址为樱花图片yh.png在图床上的链接，为减小小程序内存
					success: res=> {
						_that.path = res.path
					},
					fail:res=> {
						uni.showToast({
							title:"樱花图片获取异常",
							icon:"none"
						})
					}
				})
				//  #endif 
			},
			drawAll() {
				var _that = this
				setInterval(function() {
					if(_that.drawStatus) {
						_that.ctx.clearRect(0,0,_that.width,_that.height);
						_that.sakuraListUpdate()
						_that.sakuraListDraw()
					}else {
						_that.canvasDraw()
					}
				},50)
			},
			canvasDraw() {
				var _that = this
				_that.drawStatus = true
				for (var i = 0; i < 30; i++) {
					var sakura = {x: _that.getRandom('x'), y: _that.getRandom('y'), 
								  s: _that.getRandom('s'), r: _that.getRandom('r'), 
								  fn: {x: _that.getRandom('fnx'),y: _that.getRandom('fny'),r: _that.getRandom('fnr')}
								 }
					_that.sakuraDraw(sakura)
				    _that.sakuraList.push(sakura);
					setTimeout(function(){
						_that.ctx.clearRect(0,0,_that.width,_that.height);
						 _that.sakuraListUpdate()
						 _that.sakuraListDraw()
					},50)
				}
				_that.ctx.draw()
			},
			sakuraDraw(sakura) {
				var _that = this
				//var src = "./static/yh.png"     
				_that.ctx.save();
				_that.ctx.translate(sakura.x, sakura.y);
				_that.ctx.rotate(sakura.r);
				_that.ctx.drawImage(_that.path, 0, 0, 40 * sakura.s, 40 * sakura.s) //如果yh.png樱花图片放置在项目中  _that.path可替换为src 
				_that.ctx.restore();
			},
			sakuraUpdate(sakura) {
				sakura.x = sakura.fn.x(sakura.x, sakura.y);
				sakura.y = sakura.fn.y(sakura.y, sakura.y);
				sakura.r = sakura.fn.r(sakura.r);
				if (sakura.x > this.width ||
				    sakura.x < 0 ||
				    sakura.y > this.height ||
				    sakura.y < 0
				) {
				    sakura.r = this.getRandom('fnr');
				    if (Math.random() > 0.4) {
				        sakura.x = this.getRandom('x');
				        sakura.y = 0;
				        sakura.s = this.getRandom('s');
				        sakura.r = this.getRandom('r');
				    } else {
				        sakura.x = this.width;
				        sakura.y = this.getRandom('y');
				        sakura.s = this.getRandom('s');
				        sakura.r = this.getRandom('r');
				    }
				}
				return sakura
			},
			sakuraListUpdate() {
				var _that = this
				this.sakuraList.forEach(function(item,index){
					var sakura = _that.sakuraUpdate(item)
					_that.sakuraList.splice(index,1,sakura)
				})
			},
			sakuraListDraw() {
				var _that = this
				this.sakuraList.forEach(function(item){
					_that.sakuraDraw(item)
				})
				_that.ctx.draw()
			},
			getRandom(option) {
			    var ret, random;
			    switch (option) {
			        case 'x':
			            ret = Math.random() * this.width;
			            break;
			        case 'y':
			            ret = Math.random() * this.height;
			            break;
			        case 's':
			            ret = Math.random();
			            break;
			        case 'r':
			            ret = Math.random() * 6;
			            break;
			        case 'fnx':
			            random = -0.5 + Math.random() * 1;
			            ret = function (x, y) {
			                return x + 0.5 * random - 1.7;
			            };
			            break;
			        case 'fny':
			            random = 1.5 + Math.random() * 0.7
			            ret = function (x, y) {
			                return y + random;
			            };
			            break;
			        case 'fnr':
			            random = Math.random() * 0.03;
			            ret = function (r) {
			                return r + random;
			            };
			            break;
			    }
			    return ret;
			}
			
		}
	}
	
</script>

<style lang="scss" scoped>
	.backCanvas {
		height: 100%;
		width: 100%;
		position: fixed;
		left: 0;
		top: 0;
		pointer-events: none;
		z-index: -1;
		background-color: #FFFAFA;
		
		.canvas {
			height: 100%;
			width: 100%;
		}
	}
</style>
