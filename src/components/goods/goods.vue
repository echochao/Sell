 <template>
	<div class="goods">
		<food :food="selectedFood" ref="food" @cartadding="_drop"></food>
		<div class="menu-wrapper" ref="menuWrapper">
			<ul>
				<li v-for="(item,index) in goods" class="menu-item" :class="{'current':currentIndex===index}"@click="selectMenu(index,$event)">
				<span class="text border-1px">
					<span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>{{item.name}}
				</span>	
				</li>
			</ul>
		</div>
		<div class="foods-wrapper" ref="foodsWrapper">
			<ul>
				<li v-for="item in goods" class="food-list food-list-hook">
					<h1 class="title">{{item.name}}</h1>
					<ul>
						<li v-for="food in item.foods" class="food-item">
							<div @click="getSelectFood(food,$event)" class="text-wrapper border-1px">
								<img :src='food.icon' class="icon">
								<div class="content">
									<h2 class="name">{{food.name}}</h2>
									<p class="desc" v-show='food.description'>{{food.description}}</p>
									<div class="extra">
										<span class="sellcount">月售{{food.sellCount}}份</span>
										<span class="rating">好评率{{food.rating}}%</span>
									</div>
									<div class="price">
										<span class="new-price">¥{{food.price}}</span>
										<span class="old-price" v-show='food.oldPrice'>¥{{food.oldPrice}}</span>
									</div>
								</div>
							</div>	
							<div class="cartcontrol-wrapper">
								<cartcontrol :food="food" @cartadding="_drop"></cartcontrol>
							</div>
						</li>
					</ul>
				</li>
			</ul>
		</div>
		<shopcart :select-foods="selectFoods" :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice" ref="shopcart"></shopcart>
	</div>
</template>

<script type="text/javascript">
	import BScroll from "better-scroll";
	import shopcart from "components/shopcart/shopcart";
	import food from "components/food/food";
	import cartcontrol from "components/cartcontrol/cartcontrol";

	const ERR_OK = 0;

	export default{

		data() {
			return {
				goods: [],
				listHeight: [],
				scrollY: 0,
				selectedFood:{}
			}
		},
		props: {
			seller: {
				type: Object
			}
		},
		components: {
			shopcart,
			cartcontrol,
			food
		},
		created(){
			this.classMap = ['decrease','discount','special','invoice','guarantee'];
			this.$http.get('/api/goods').then((res)=>{
				res = res.body;
				if(res.errno === ERR_OK){
					this.goods = res.data;
					//console.log(this.$refs);
					// this.$nextTick(()=>{
					// 	this._initScroll();
					// });箭头函数的用法
					this.$nextTick(
						function(){
							this._initScroll();
							this._calculataHeight();
						}
					)
				}
			});
		},
		computed: {
			currentIndex() {
				for(let i=0;i<this.listHeight.length;i++){
					let h1=this.listHeight[i];
					let h2=this.listHeight[i+1];
					if(!h2 || (this.scrollY >= h1 && this.scrollY < h2)){
						return i;
					}
				}
				return 0;
			},
			selectFoods() {
				let foods=[];
				this.goods.forEach((good)=>{
					good.foods.forEach((food)=>{
						if(food.count){
							foods.push(food)
						}
					})
				})
				return foods;
			}
		},
		methods: {
			selectMenu(index,event) {
				if(!event._constructed){
					return;
				}
				let foodList = this.$refs.foodsWrapper.getElementsByClassName("food-list-hook");
				this.foodScroll.scrollToElement(foodList[index],300);
				//console.log(index);
			},
			_initScroll(){
				this.menuScroll = new BScroll(this.$refs.menuWrapper,{click: true});
				this.foodScroll = new BScroll(this.$refs.foodsWrapper,{probeType: 3,click: true});
				this.foodScroll.on('scroll',(pos)=>{
					this.scrollY = Math.abs(Math.round(pos.y));
					//console.log(this.scrollY);
				})
			},
			_calculataHeight(){
				let foodList = this.$refs.foodsWrapper.getElementsByClassName("food-list-hook");
				//console.log(foodList[0].style.height);
				let h = 0;
				this.listHeight.push(h);
				for( let i=0;i<foodList.length;i++){
					let item = foodList[i];
					h += item.clientHeight;
					this.listHeight.push(h);
				}
				//console.log(this.listHeight);
			},
			getSelectFood(food,event){
				if(!event._constructed){
					return;
				}
				this.selectedFood = food;
				this.$refs.food.show();
			},
			_drop(target){
				//体验优化,异步执行下落动画
				this.$nextTick(()=>{
					this.$refs.shopcart.drop(target);
				})
			}
		}
	};
</script>

<style lang="stylus" rel="stylesheet/stylus">

	@import "../../commom/stylus/mixim.styl";
	
	.goods
		display: flex
		position: absolute
		top: 174px
		bottom 48px
		width: 100%
		overflow: hidden
		.menu-wrapper
			flex: 0 0 80px
			width: 80px
			background: #f3f5f7
			.menu-item
				padding: 0 12px
				height: 54px
				display: table
				&:last-child
					.text
						border-none()	
				&.current
					position: relative
					z-index: 10
					margin-top: -1px
					background: #fff
					font-weight: 400
					.text
						border-none()
				.text
					font-size: 12px
					line-height: 14px
					display: table-cell
					vertical-align: middle
					width: 56px
					border-1px(rgba(7, 17, 27, .1))
					.icon
						display: inline-block
						vertical-align: top
						width: 12px
						height: 12px
						margin-right: 2px
						margin-top: 1px
						background-size cover
						background-repeat: no-repeat
						&.decrease
							bg-image('decrease_3')
						&.discount
							bg-image('discount_3')
						&.guarantee
							bg-image('guarantee_3')
						&.invoice
							bg-image('invoice_3')
						&.special
							bg-image('special_3')
		.foods-wrapper
			flex: 1
			.title
				height: 26px
				line-height: 26px
				font-size: 12px
				color: rgb(147, 153, 159)
				padding-left: 14px
				border-left: 2px solid #d9dde1
				background: #f3f5f7
			.food-item
				padding: 0 18px
				position: relative
				&:last-child
					.text-wrapper
						border-none()
				&:hover
					background: rgba(192,192,192,.1) 		
				.text-wrapper
					display: flex
					width: 100%
					padding: 18px 0
					border-1px(rgba(7, 17, 27, .1))	
					.icon
						flex: 0 0 57px
						width: 57px
						height: 57px
						margin-right: 10px
					.content
						flex: 1
						.name
							font-size: 14px
							height: 14px
							line-height: 14px
							color: rgb(7, 17, 27)
							margin-top: 2px
							margin-bottom: 8px
						.desc, .extra
							line-height: 10px
							font-size: 10px
							color: rgb(147, 153, 159)
						.desc
							margin-bottom: 8px
						.extra
							.sellcount
								margin-right: 12px						
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
				.cartcontrol-wrapper
					position: absolute
					right: 12px
					bottom: 12px
								
													
</style>
