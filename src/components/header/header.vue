<template>
	<div class="header">
		<div class="content-wrapper">
			<div class="avatar">
				<img width="64" height="64" :src="seller.avatar">
			</div>
			<div class="content">
				<div class="title">
					<span class="brand"></span>
					<span class="name">{{seller.name}}</span>
				</div>
				<div class="description">
					{{seller.description}}/{{seller.deliveryTime}}分钟送达
				</div>
				<div v-if="seller.supports" class="support">
					<span class="icon" :class="classMap[seller.supports[0].type]"></span>
					<span class="text">{{seller.supports[0].description}}</span>
				</div>
			</div>
			<div v-if="seller.supports" class="support-count" @click="showDetail">
				<span class="count">{{seller.supports.length}}个</span>
				<i class="icon-keyboard_arrow_right"></i>
			</div>
		</div>
		<div class="bulletin-wrapper" @click="showDetail">
			<span class="bulletin-title"></span><span class="bulletin-text">{{seller.bulletin}}</span>
			<i class="icon-keyboard_arrow_right"></i>
		</div>
		<div class="background">
			<img :src="seller.avatar" width="100%" height="100%">
		</div>
		<transition name="fade">
			<div class="detail" v-show="detailShow">
				<div class="detail-wrapper clearfix">
					<div class="detail-main">
						<h1 class="name">{{seller.name}}</h1>
						<div class="star-wrapper">
							<star :size="48" :score="seller.score"></star>
						</div>
						<div class="title">
							<div class="line"></div>
							<div class="text">优惠信息</div>
							<div class="line"></div>
						</div>
						<ul v-if="seller.supports" class="supports">
							<li  v-for="sup in seller.supports" class="support-item">
								<span class="icon" :class="classMap[sup.type]"></span><span class="text">{{sup.description}}</span>
							</li>
						</ul>
						<div class="title">
							<div class="line"></div>
							<div class="text">商家公告</div>
							<div class="line"></div>
						</div>
						<div class="bulletin">
							<p class="content">{{seller.bulletin}}</p>
						</div>
					</div>
				</div>
				<div class="detail-close">
					<i class="icon-close" @click='hideDetail'></i>
				</div>
			</div>
		</transition>
	</div>

</template>

<script type="text/javascript">

	import star from "components/star/star"

	export default{
		props: {
			seller: {
				type: Object
			}
		},
		data() {
			return{
				detailShow: false
			}
		},
		methods: {
			showDetail(){
				this.detailShow = true;
			},
			hideDetail(){
				this.detailShow = false;
			}
		},
		created(){
			this.classMap = ['decrease','discount','special','invoice','guarantee']
		},
		components: {
			star
		}
	};
</script>

<style lang="stylus" rel="stylesheet/stylus">

	@import "../../commom/stylus/mixim.styl";
	
	.fade-enter-active, .fade-leave-active {
  		transition: all .5s
	}
	.fade-enter, .fade-leave-active {
	  	opacity: 0
	}	

	.header
		position: relative
		overflow: hidden
		color: #fff
		background: rgba(7, 17, 27, .5)
		.content-wrapper
			font-size: 0
			padding: 24px 12px 18px 24px
			position: relative
			.avatar
				display: inline-block
				vertical-align: top
				img
					border-radius: 2px
			.content
				display: inline-block	
				font-size: 14px
				margin-left: 16px
				.title
					margin: 2px 0 8px 0
					.brand
						display: inline-block
						vertical-align: top
						width: 30px
						height: 18px
						bg-image('brand')
						background-size: 30px 18px
						background-repeat: no-repeat
					.name
						vertical-align: top
						margin-left: 6px
						font-size:  16px
						line-height: 18px
						font-weight: bold
				.description
					margin-bottom: 10px
					font-size: 12px
					line-height 12px
				.support
					.icon
						vertical-align: top
						display: inline-block
						width: 12px
						height: 12px
						margin-right: 4px
						background-size 12px 12px
						background-repeat: no-repeat
						&.decrease
							bg-image('decrease_1')
						&.discount
							bg-image('discount_1')
						&.guarantee
							bg-image('guarantee_1')
						&.invoice
							bg-image('invoice_1')
						&.special
							bg-image('special_1')
					.text
						vertical-align: top
						font-size: 10px
						line-height: 12px
			.support-count
				position: absolute
				right: 12px
				bottom: 14px
				padding 0 8px
				height: 24px
				line-height: 24px
				border-radius: 14px	
				background: rgba(0,0,0,0.2)
				text-align: center
				.count
					font-size: 10px
					line-height: 24px
				.icon-keyboard_arrow_right
					font-size: 10px
					line-height: 24px
					margin-left: 2px
		.bulletin-wrapper
			position: relative
			height:	28px
			line-height: 28px
			padding: 0 22px 0 12px
			white-space: nowrap//文字不换行
			overflow: hidden
			text-overflow: ellipsis//显示为省略号
			background: rgba(7, 17, 26, .2)			
			.bulletin-title
				display: inline-block
				vertical-align: top
				width: 22px
				height: 12px
				bg-image('bulletin')
				background-size: cover
				background-repeat: no-repeat
				margin-top: 8px
			.bulletin-text
				font-size: 10	px
				line-height: 28px
				margin: 0 4px
			.icon-keyboard_arrow_right
				position: absolute	
				font-size: 10px
				top: 9px
				right: 12px
		.background
			position: absolute
			top: 0
			left: 0
			width: 100%
			height: 100%
			z-index: -1
			filter: blur(10px)
		.detail
			position: fixed
			top: 0
			left: 0
			z-index: 100
			height: 100%
			width: 100%
			overflow: auto
			background: rgba(7, 17, 27, .8)
			backdrop-filter: 10px
			.detail-wrapper
				min-height: 100%
				.detail-main
					width: 100%
					padding-bottom: 64px
					.name
						text-align: center
						font-size: 16px
						line-height: 16px
						font-weight: 700
						color: rgb(255, 255, 255)
						padding: 64px 0 16px 0
					.star-wrapper
						padding: 2px 0
						text-align: center		
					.supports
						width: 80%
						margin: 0 auto
						.support-item
							font-size: 0
							padding: 0 12px
							margin-bottom: 12px
							.icon
								vertical-align: top
								display: inline-block
								width: 16px
								height: 16px
								margin-right: 6px
								background-size 16px 16px
								background-repeat: no-repeat
								&.decrease
									bg-image('decrease_2')
								&.discount
									bg-image('discount_2')
								&.guarantee
									bg-image('guarantee_2')
								&.invoice
									bg-image('invoice_2')
								&.special
									bg-image('special_2')
							.text
								vertical-align: top
								font-size: 12px
								line-height: 16px				
					.title
						display: flex
						width: 80%
						margin 28px auto 24px auto
						.line
							flex: 1
							height: 1px
							background: rgba(255, 255, 255, .2)
							position: relative
							top: 6.5px
						.text
							padding 0 12px
							font-size: 14px
							line-height: 14px
							font-weight: 700	
					.bulletin
						width: 80%
						margin: 0 auto
						.content
							padding: 0 12px
							line-height: 24px
							font-size: 12px
							color: rgb(255, 255, 255)													
			.detail-close
				text-align: center	
				 position: relative
				 width: 32px
				 height: 32px
				 margin: -48px auto 0 auto
				 font-size: 32px
				 color: rgba(255, 255, 255, .5)
					

				
				
					
						
																			
										
						
						
				

</style>

