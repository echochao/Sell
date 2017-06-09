<template>
	<transition name="fly">
		<div class="food" v-show="showFlag" ref="food">
			<div class="food-content">
				<div class="image-header">
					<img :src="food.image">
					<div class="back" @click="hide">
						<span class="icon-arrow_lift"></span>
					</div>
				</div>
				<div class="content">
					<h1 class="title">{{food.name}}</h1>
					<div class="detail">
						<span class="sell-count">月售{{food.sellCount}}份</span>
						<span class="rating">好评率{{food.rating}}%</span>
					</div>
					<div class="price">
						<span class="new-price">¥{{food.price}}</span>
						<span class="old-price" v-show='food.oldPrice'>¥{{food.oldPrice}}</span>
					</div>
					<transition name="buy-show">
						<div class="buy" v-show="!food.count || food.count===0" @click.stop.prevent="addFirst(food)">加入购物车</div>
					</transition>
					<div class="cartcontrol-wrapper">
						<cartcontrol :food="food" @cartadding="cartadding"></cartcontrol>
					</div>
				</div>
				<split v-show="food.info"></split>
				<div class="info" v-show="food.info">
					<h1 class="title">公告与活动</h1>
					<p class="text">{{food.info}}</p> 
				</div>
				<split></split>
				<div class="rating-list-wrapper">
					<h1 class="title">商品评价</h1>
					<ratingselect :desc="desc" :ratings="food.ratings" :select-type.sync="selectType" :only-content="onlyContent" @changeType="changeType" @changeContent="changeContent"></ratingselect>
					<div class="rating-list">
						<ul v-show="food.ratings && food.ratings.length">
							<li v-for="rating in food.ratings" class="rating-list-item" v-show="needShow(rating.rateType,rating.text)" >
								<div class="item-header">
									<div class="time">{{rating.rateTime | getDate }}</div>
									<div class="user">
										<span class="user-name">{{rating.username}}</span>
										<img :src="rating.avatar" class="user-avatar">
									</div>
								</div>
								<div class="item-content">
									<span :class="classMap[rating.rateType]"></span>
									<span class="text">{{rating.text}}</span>
								</div>
							</li>
						</ul>
						<div class="no-rating" v-show="!food.ratings || !food.ratings.length">暂无评价</div>
					</div>
				</div>
      </div> 
		</div>
	</transition>
</template>

<script type="text/javascript">
	import Vue from "vue";
	import BScroll from "better-scroll";
	import cartcontrol from "components/cartcontrol/cartcontrol";
	import split from "components/split/split";
	import ratingselect from "components/ratingselect/ratingselect";

	const POSITIVE = 0;
 	const NEGATIVE = 1;
 	const ALL = 2;

	export default{
		props:{
			food:{
				type: Object
			}
		},
		data() {
			return{
				showFlag: false,
				desc:{
					all: '全部',
					positive: '推荐',
					negative: '吐槽'
				},
				onlyContent: true,
				selectType: ALL		
			}
		},
		created(){
			this.classMap=["icon-thumb_up","icon-thumb_down"];			
		},
		components:{
			cartcontrol,
			split,
			ratingselect
		},
		filters:{
			getDate(str){
				function getzf(num){  
            		if(parseInt(num) < 10) num = '0'+num;  
            		return num; 
            	};
				let oDate = new Date(str),  
            	oYear = oDate.getFullYear(),  
            	oMonth = oDate.getMonth()+1,  
            	oDay = oDate.getDate(),  
            	oHour = oDate.getHours(),  
            	oMin = oDate.getMinutes(),  
            	oSen = oDate.getSeconds(),  
            	oTime = oYear +'-'+ getzf(oMonth) +'-'+ getzf(oDay) +' '+ getzf(oHour) +':'+ getzf(oMin);
            	return oTime;
			}
		},
		methods:{
			show(){
				this.showFlag = true;
				this.onlyContent = true;
				this.selectType = ALL;
				this.$nextTick(()=>{
          			if(!this.foodScroll){
           				this.foodScroll = new BScroll(this.$refs.food,{click:true});
          			}else{
            			this.foodScroll.refresh();
          			}
       			})
			},
			hide(){
				this.showFlag = false;
			},
			addFirst(food){
				if(!event._constructed){
					return;
				}
				Vue.set(this.food,'count',1);
			},
			changeType(type){
				this.selectType = type;
				this.needShow();
				this.$nextTick(()=>{
					this.foodScroll.refresh();
				});
			},
			changeContent(){
				this.onlyContent = !this.onlyContent;
				this.needShow();
				this.$nextTick(()=>{
					this.foodScroll.refresh();
				});	
			},
			needShow(type,text){
				if(this.onlyContent && !text){
					return false;
				};
				if(this.selectType === ALL){
					return true;
				}else{
					return type === this.selectType;
				}
			},
			cartadding(target){
				this.$emit('cartadding',target);
			}
		}
	}
</script>

<style lang="stylus">
	@import "../../commom/stylus/mixim.styl";
	
	.fly-enter-active, .fly-leave-active {
  		transition: all .5s linear
	}
	.fly-enter, .fly-leave-active {
	   transform: translate3D(100%,0,0)
	}
	.buy-show-enter-active, .buy-show-leave-active {
  		transition: all .3s linear
	}
	.buy-show-enter, .buy-show-leave-active {
	   opacity: 0
	}	
	.food
		position: fixed
		top: 0
		left: 0
		bottom: 48px
		background:#fff
		width: 100%
		z-index: 10
		.food-content
			.image-header
				position: relative
				width: 100%
				height: 0
				padding-top: 100%
				img
					position: absolute
					top: 0
					left: 0
					height: 100%
					width: 100%
				.back
					position: absolute
					top: 10px
					left: 0
					.icon-arrow_lift
						display: block
						padding: 10px
						font-size: 20px
						color: #fff	
			.content
				padding: 18px
				position: relative
				.title
					font-size: 14px
					line-height: 14px
					font-weight: 700
					color: rgb(7, 17, 27)
				.detail
					margin-top: 8px
					margin-bottom: 18px
					line-height: 10px
					.sell-count, .rating
						font-size: 10px
						color: rgb(147, 153, 159)
						.rating
							margin-left: 12px
				.price
					font-size: 0		
					.new-price
						font-weight: 700
						line-height: 24px
						margin-right: 8px
						font-size: 14px
						color: rgb(240,20, 20)
					.old-price
						font-weight: 700
						line-height: 24px
						text-decoration: line-through
						font-size: 10px
						color: rgb(147, 153, 159)
				.buy
					position: absolute
					right: 18px
					bottom: 18px
					padding: 6px 12px
					border-radius: 24px
					height: 24px
					line-height: 24px
					font-size: 10px
					color: #fff
					background: rgb(0, 160, 220)
					z-index: 10
				.cartcontrol-wrapper
					position: absolute
					right: 18px
					bottom: 18px
			.info
				padding: 18px
				.title
					font-size: 14px
					line-height: 14px
					margin-bottom: 6px
					font-weight: 700
					color: rgb(7, 17, 27)
				.text
					font-size: 12px
					line-height: 	24px
					padding: 0 8px
					color: rgb(77, 85, 93)
			.rating-list-wrapper
				padding-top: 18px
				.title
					font-size: 14px
					line-height: 14px
					padding: 0 18px
					font-weight: 700
					color: rgb(7, 17, 27)
				.rating-list
					.rating-list-item
						margin: 0 18px
						padding: 18px 0
						border-1px(rgba(7, 17, 27,.1))
						.item-header
							font-size: 10px
							line-height: 12px
							height: 12px
							.time
								float: left
								color: rgb(147, 153, 159)
							.user
								float: right
								.user-name
									display: inline-block
									font-size: 10px
									line-height:12px
								.user-avatar
									display: inline-block
									height: 12px
									width: 12px
									border-radius: 50%
									margin-left: 6px
									vertical-align: top
						.item-content
							margin-top: 6px
							font-size: 12px
							.icon-thumb_up
								display: inline-block
								line-height: 24px
								color: rgb(0, 160, 220)
							.icon-thumb_down
								display: inline-block
								line-height: 24px
								color: rgb(147, 153, 159)
							.text
								display: inline-block
								color: rgb(7, 17, 26)
								line-height: 24px
								margin-left: 4px
								vertical-align: top	
					.no-rating
						text-align: center
						font-size: 12px
						line-height: 24px
						color: #4d555d
						
						
							
					
				
		
</style>
