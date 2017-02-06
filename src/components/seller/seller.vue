<template>
	<div class="seller" ref="sellers">
		<div class="seller-wrapper">
			<div class="seller-header">
				<div class="content border-1px">
					<div class="name">{{seller.name}}</div>
					<div class="rating">
						<div class="star-wrapper">
							<star :size="36" :score="seller.score" class="star"></star>
						</div>
						<span class="rating-count">({{seller.ratingCount}})</span>
						<span class="sell-count">月售{{seller.sellCount}}单</span>
					</div>
					<div class="love">
						<div class="icon-favorite" :class="{'active':favorite}" @click='toggleFavorite($event)'></div>
						<div class="love-text">{{favoriteText}}</div>
					</div>
				</div>
			</div>
			<div class="service">
				<div class="service-part">
					<div class="title">起送价</div>
					<div class="text">
						<span class="num">{{seller.minPrice}}</span>
						<span class="unit">元</span>
					</div>
				</div>
				<div class="service-part">
					<div class="title">商家配送</div>
					<div class="text">
						<span class="num">{{seller.deliveryPrice}}</span>
						<span class="unit">元</span>
					</div>
				</div>
				<div class="service-part">
					<div class="title">平均配送时间</div>
					<div class="text">
						<span class="num">{{seller.deliveryTime}}</span>
						<span class="unit">分钟</span>
					</div>
				</div>
			</div>
			<split></split>
			<div class="bulletin">
				<h1 class="title">公告与活动</h1>
				<p class="text">{{seller.bulletin}}</p>
			</div>
			<div class="supports-wrapper">
				<ul v-if="seller.supports" class="supports">
					<li  v-for="sup in seller.supports" class="support-item">
						<span class="icon" :class="classMap[sup.type]"></span><span class="text">{{sup.description}}</span>
					</li>
				</ul>
			</div>
			<split></split>
			<div class="seller-pic">
				<h1 class="title">商家实景</h1>
				<div class="pic-wrapper" ref="picWrapper">
					<ul class="pic-list">
						<li class="pic-item" v-for="pic in seller.pics">
							<img :src="pic" width="120" height="90">
						</li>
					</ul>
				</div>
			</div>
			<split></split>
			<div class="seller-info">
				<h1 class="title border-1px">商家信息</h1>
				<ul>
					<li class="info-item border-1px" v-for="info in seller.infos">{{info}}</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script type="text/javascript">

	import star from "components/star/star";
	import split from "components/split/split";
	import BScroll from "better-scroll";
	import shopcart from "components/shopcart/shopcart";
	import {saveToLocal,loadFromLocal} from "commom/js/store.js"

    const ERR_OK = 0;

	export default{
		data(){
			return{
				favorite: (()=>{
					return loadFromLocal(this.seller.id,'favorite',false);
				})()
			}
		},
		props:{
			seller:{
				type: Object
			}
		},
		computed:{
			favoriteText(){
				return this.favorite? '收藏' : '未收藏';
			}
		},
		components:{
			star,
			split,
			shopcart
		},
		methods:{
			_initScroll(){	
				if(!this.sellerScroll){
					this.sellerScroll = new BScroll(this.$refs.sellers,{click:true});
					//console.log('yes')
					//console.log(this.sellerScroll);
				}else{
					this.sellerScroll.refresh();
					//console.log('no');
					//console.log(this.sellerScroll);
				}
			},
			_initPic(){
				if(this.seller.pics){
					let pic = 120;
					let margin = 6;
					let width = (pic+margin)*(this.seller.pics.length)-margin;
					let picList = this.$refs.picWrapper.getElementsByClassName("pic-list")[0];
					picList.style.width = width+"px";
					if(!this.picScroll){
						this.picScroll = new BScroll(this.$refs.picWrapper,{scrollX:true , eventPassThrough:'vertical'})
					}else{
						this.picScroll.refresh();
					}
				}
			},
			toggleFavorite(event){
				if(!event._constructed){
					return;
				}
				this.favorite = !this.favorite;
				saveToLocal(this.seller.id,'favorite',this.favorite);
			}
		},
		created(){
			this.classMap = ['decrease','discount','special','invoice','guarantee'];
		},
		mounted(){ 
			this._initScroll();
			this._initPic();
		},
		watch:{
			seller: function(){
					this.$nextTick(()=>{
						this._initScroll();
						this._initPic();
					})
				}
		}
	};
</script>

<style lang="stylus" rel="stylesheet/stylus">

	@import "../../commom/stylus/mixim.styl";
	
.seller
	position: absolute
	top: 174px
	bottom 0px
	left: 0px
	width: 100%
	overflow: hidden
	.seller-wrapper
		width: 100%
		.seller-header
			width: 100%
			font-size: 0
			.content
				padding: 18px 0
				margin: 0 18px
				border-1px(rgba(7,17,27,.1))
				.star
					display: inline-block
				.name
					font-size: 14px
					color: rgb(7,17,27)
				.rating
					margin-top: 8px
					height: 18px
					line-height: 18px
					.star-wrapper
						display: inline-block
						vertical-align: top;
					.rating-count
						margin-left: 8px
						font-size: 10px
					.sell-count
						margin-left: 12px
						font-size: 10px	
				.love
					position: absolute
					right: -10px
					top: 18px
					text-align: center
					width: 50px
					.icon-favorite
						color: #d4d6d9
						font-size: 24px
						&.active
							color: rgb(240, 20, 20)
					.love-text
						font-size: 10px
						color: rgb(77, 82, 93)
						line-height: 10px
						margin-top: 4px				
		.service
			width: 100%
			display: flex
			.service-part
				flex: 1
				margin: 18px 0
				text-align: center
				border-left: 1px solid rgba(7, 17, 27, .1)
				border-right: 1px solid rgba(7, 17, 27, .1)
				&:first-child, &:last-child
					border: none	
				.title
					font-size: 10px
					color: rgb(147, 153, 159)
					line-height: 18px
				.text
					margin-top: 4px
					font-size: 0
					.num
						font-size: 24px
						color: rgb(7, 17, 27)
						line-height: 24px
					.unit
						font-size: 10px					
		.bulletin
			padding: 18px 18px 0 18px
			.title
				font-size: 14px
				line-height: 14px
				margin-bottom: 8px
				font-weight: 700
				color: rgb(7, 17, 27)
			.text
				font-size: 8px
				line-height: 24px
				padding: 0 12px 16px 12px
				color: rgb(240, 20, 20)
				border-1px(rgba(7, 17, 27, .1))
		.supports
			margin: 0 18px
			.support-item
				font-size: 0
				padding: 16px 12px
				border-1px(rgba(7,17,27,.1))
				&:last-child
					border-none()
				.icon
					vertical-align: top
					display: inline-block
					width: 16px
					height: 16px
					margin-right: 6px
					background-size 16px 16px
					background-repeat: no-repeat
					&.decrease
						bg-image('decrease_4')
					&.discount
						bg-image('discount_4')
					&.guarantee
						bg-image('guarantee_4')
					&.invoice
						bg-image('invoice_4')
					&.special
						bg-image('special_4')
				.text
					vertical-align: top
					font-size: 12px
					line-height: 16px		
		.seller-pic
			padding: 18px
			.title
				font-size: 14px
				line-height: 14px
				margin-bottom: 12px
				font-weight: 700
				color: rgb(7, 17, 27)
			.pic-wrapper
				width: 100%
				overflow: hidden
				white-space: nowrap
				.pic-list
					font-size: 0
					.pic-item
						display: inline-block
						margin-right: 6px
						width: 120px
						height: 90px
						&:last-child
							margin: 0
							
		.seller-info
			padding: 18px
			.title
				font-size: 14px
				line-height: 14px
				padding-bottom: 12px
				font-weight: 700
				color: rgb(7, 17, 27)
				border-1px(rgba(7, 17, 27, .1))
			.info-item
				padding:16px 12px
				line-height: 16px
				color: rgb(7, 17, 27)
				font-size: 12px
				border-1px(rgba(7, 17, 27, .1))
				&:last-child
					border-none()
				
						
</style>

