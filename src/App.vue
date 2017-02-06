<template>
<div id="app">
  <v-header :seller="seller"></v-header>
  <div class="tab border-1px">
    <div class="tab-item"><router-link :to="{path:'goods',query:{ id: this.seller.id}}">商品</router-link></div>
    <div class="tab-item"><router-link :to="{path:'ratings',query:{ id: this.seller.id}}">评价</router-link></div>
    <div class="tab-item"><router-link :to="{path:'seller',query:{ id: this.seller.id}}">商家</router-link></div>
  </div>
  <keep-alive>
  	<router-view :seller="seller"></router-view>
  </keep-alive>	
</div>
</template>
<script>
	import header from './components/header/header.vue';
	import {urlParse} from 'commom/js/util.js';

	const ERR_OK = 0;


	export default{
		data(){
			return{
				seller: {
					id:(()=>{
						let queryParam = urlParse();
						// console.log(queryParam);
						return queryParam.id;
					})()
				}
			}
		},
		created(){
			this.$http.get('/api/seller?id=' + this.seller.id).then((res)=>{
				res = res.body;
				if(res.errno === ERR_OK){
					//console.log(this.seller);
					this.seller = Object.assign({},this.seller,res.data);
				}
			});
		},
		components: {
		'v-header': header
		}
	};
</script>
<style lang="stylus" rel="stylesheet/stylus">

	@import "commom/stylus/mixim.styl"

	#app
		.tab
			display: flex
			width: 100%
			height: 40px
			line-height 40px
			background: #fff
			border-1px(rgba(7,17,27,0.1))
			.tab-item
				flex: 1
				text-align: center
				& > a
					display: block
					font-size: 14px
					color: rgb(77, 85, 93)
					&.router-link-active
						color: rgb(240, 20, 20)		
</style>