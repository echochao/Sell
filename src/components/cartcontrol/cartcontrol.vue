<template>
	<div class="cartcontrol">
		<transition name="move">
			<div class="cart-decrease icon-remove_circle_outline" v-show="food.count>0" @click.stop.prevent="decreaseCart($event)"></div>
		</transition>	
		<div class="cart-count" v-show="food.count>0">{{food.count}}</div>
		<div class="cart-add icon-add_circle" @click.stop.prevent="addCart($event)"></div>
	</div>
	

</template>

<script type="text/javascript">
	import Vue from "vue";

	export default{

		props: {
			food: {
				type: Object
			}
		},
		methods: {
			addCart(event) {
				if(!event._constructed){
					return;
				}
				if(!this.food.count){
					Vue.set(this.food,'count',1);
				}else{
					this.food.count++
				}
				this.$emit('cartadding',event.target);
			},
			decreaseCart(event) {
				if(!event._constructed){
					return;
				}
				if(this.food.count){
					this.food.count--;
				}
			}
		}
	}	
</script>
<style lang="stylus">
	.move-enter-active, .move-leave-active {
  		transition: all .3s linear
  		opacity: 1
  		transform: rotate(0deg)
	}
	.move-enter, .move-leave-active {
	   opacity: 0
	   transform: rotate(180deg)
	}	

	.cartcontrol
		font-size: 0
		.cart-decrease, .cart-add
			display: inline-block
			font-size: 24px
			color: rgb(0, 160, 220)
			padding: 6px
		 .cart-add
			display: inline-block
			font-size: 24px
			color: rgb(0, 160, 220)
			padding: 6px			
		.cart-count
			display: inline-block
			font-size: 10px
			width: 12px
			height: 24px
			line-height: 24px
			padding: 6px 0px
			text-align: center
			color: rgb(147, 153, 159)
			vertical-align: top
		
</style>