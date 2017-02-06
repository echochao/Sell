<template>
	<div class="ratings" ref="ratings">
		<div class="rating-content">
			<div class="overview">
				<div class="overview-left">
					<div class="score">{{seller.score}}</div>
					<div class="title">综合评分</div>
					<div class="rank">高于周围商家{{seller.rankRate}}%</div>
				</div>
				<div class="overview-right">
					<div class="score-wrapper">
						<span class="title">服务态度</span>
						<star :size="36" :score="seller.serviceScore"></star>
						<span class="score">{{seller.serviceScore}}</span>
					</div>
					<div class="score-wrapper">
						<span class="title">商品评分</span>
						<star :size="36" :score="seller.foodScore"></star>
						<span class="score">{{seller.foodScore}}</span>
					</div>
					<div class="delivery-wrapper">
						<span class="title">送达时间</span>
						<span class="delivery">{{seller.deliveryTime}}分钟</span>
					</div>
				</div>
			</div>
			<split></split>
			<ratingselect :desc="desc" :ratings="ratings" :select-type="selectType" :only-content="onlyContent" @changeType="changeType" @changeContent="changeContent"></ratingselect>
			<div class="rating-list">
				<ul v-show="ratings && ratings.length">
					<li v-for="rating in ratings" class="rating-list-item" v-show="needShow(rating.rateType,rating.text)" >
						<div class="item-header">
							<div class="avatar">
								<img :src="rating.avatar">
							</div>
							<div class="user">
								<div class="name">{{rating.username}}</div>
								<div class="desc">
									<star :size="24" :score="rating.score"></star>
									<span class="deliverytime" v-show="rating.deliveryTime">{{rating.deliveryTime}}分钟送达</span>
								</div>
								<div class="time">{{rating.rateTime | getDate}}</div>
							</div>
						</div>
						<div class="item-content">
							<div class="text">{{rating.text}}</div>
							<div class="item-name">
								<span :class="classMap[rating.rateType]"></span>
								<span class="item" v-for="food in rating.recommend">{{food}}</span>
							</div>	
						</div>
					</li>
				</ul>
				<div class="no-rating" v-show="!ratings || !ratings.length">暂无评价</div>
			</div>
		</div>
	</div>

</template>

<script type="text/javascript">
	import BScroll from "better-scroll";
    import star from "../star/star";
    import split from "../split/split";
    import ratingselect from "../ratingselect/ratingselect"

    const　ALL = 2;
    const ERR_OK = 0;

	export default{
		props:{
			seller:{
				type:　Object
			}
		},
		data(){
			return{
				ratings :[],
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
		components:{
			star,
			split,
			ratingselect
		},
		created(){
			this.classMap=["icon-thumb_up","icon-thumb_down"];
			this.$http.get('/api/ratings').then((res)=>{
				res = res.body;
				if(res.errno === ERR_OK){
					this.ratings = res.data;
					this.$nextTick(()=>{
						this.ratingScroll = new BScroll(this.$refs.ratings,{click:true});
					})
				}
			});
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
			changeType(type){
				this.selectType = type;
				this.needShow();
				this.$nextTick(()=>{
					this.ratingScroll.refresh()
				});
			},
			changeContent(){
				this.onlyContent = !this.onlyContent;
				this.needShow();
				this.$nextTick(()=>{
					this.ratingScroll.refresh()
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
			}
		}
	};
</script>

<style lang="stylus" rel="stylesheet/stylus">
	@import "../../commom/stylus/mixim.styl";
	.ratings
		position: absolute
		top: 174px
		left: 0px
		bottom 0px
		width: 100%
		overflow: hidden
		.rating-content
			width: 100%
			.overview
				display: flex
				padding: 18px 0
				.overview-left
					flex: 0 0 137px
					width: 137px
					border-right: 1px solid rgba(7, 17, 27, .1)
					text-align: center
					padding: 6px 0
					@media only screen and (max-width: 320px)
						flex: 0 0 120px
						width: 120px
					.score
						line-height: 28px
						font-size: 24px
						color: rgb(255, 153, 0)
						margin-bottom: 6px
					.title
						line-height: 12px
						font-size: 12px	
						color: rgb(7, 17, 27)
						margin-bottom: 8px
					.rank
						font-size: 10px
						line-heigh: 10px
						color: rgb(147, 153, 159)
				.overview-right	
					flex: 1
					padding: 6px 0 6px 24px
					@media only screen and (max-width: 320px)
						padding-left: 6px
					.score-wrapper
						font-size: 0
						margin-bottom: 8px
						.title
							display: inline-block
							line-height: 18px
							font-size: 12px
							color: rgb(7, 17, 27)
						.star
							display: inline-block
							margin: 0 12px
							vertical-align: top
						.score
							display: inline-block
							line-height: 18px
							font-size: 12px
							color: rgb(255, 153, 0)
					.delivery-wrapper
						font-size: 0
						.title
							display: inline-block
							font-size: 12px
							line-height: 18px
							color: rgb(7, 17, 27)
						.delivery
							display: inline-block	
							font-size: 12px
							line-height: 18px
							color: rgb(147, 153, 159)
							margin-left: 12px		
			.rating-list
				.rating-list-item
					margin: 0 18px
					padding: 18px 0
					border-1px(rgba(7, 17, 27,.1))
					.item-header
						font-size: 10px
						line-height: 12px
						height: 28px
						margin-right: 12px
						.avatar
							display: inline-block
							vertical-align: top
							height: 28px
							width: 28px
							img
								height: 100%
								width: 100%
								border-radius: 50%
						.user
							display: inline-block
							margin-left: 12px
							.name
								font-size: 10px
								color: rgb(7, 17, 27)
								line-height: 12px
							.desc
								margin-top: 4px
								.star
									display: inline-block
									height: 12px
									vertical-align: top
								.deliverytime
									margin-left: 6px
									font-size: 10px
									display: inline-block
									line-height: 12px
									color: rgb(147, 153, 159)	
									
						.time
							position: absolute
							right: 0
							top: 18px
							font-size: 10px
							line-height: 12px
							color: rgb(147, 153, 159)
					.item-content
						margin-top: 6px
						font-size: 12px
						padding-left: 40px
						.text
							display: inline-block
							color: rgb(7, 17, 26)
							line-height: 24px
						.item-name
							font-size: 0
							margin-top: 6px
							.icon-thumb_up
								display: inline-block
								margin-right: 8px
								line-height: 16px
								font-size: 10px
								color: rgb(0, 160, 220)
							.icon-thumb_down
								display: inline-block
								margin-right: 8px
								line-height: 16px
								font-size: 10px
								color: rgb(147, 153, 159)	
							.item
								display: inline-block
								padding: 0 6px
								border: 1px solid rgba(7, 17, 27,.1)
								border-radius: 2px
								color: rgb(147, 153, 159)
								background: #fff
								font-size: 9px
								line-height: 16px
								margin-right: 8px
								margin-bottom: 4px
								vertical-align: top
															
				.no-rating
					text-align: center
					font-size: 12px
					line-height: 24px
					color: #4d555d					
						
</style>

