<template>
	<div class="star" :class="starType">
		<span class="star-item" :class="itemClass" v-for="itemClass in itemClasses"></span>
	</div>
</template>

<script type="text/javascript">

	const LENGTH = 5;
	const CLS_ON = 'on';
	const CLS_HALF = 'half';
	const CLS_OFF = 'off';

	export default{
		props: {
			size: {
				type: Number
			},
			score: {
				type: Number
			}
		},
		computed: {
			starType() {
				return "size-" + this.size
			},
			itemClasses() {
				let result = [];
				let score = Math.floor(this.score * 2) / 2;
				let integer = Math.floor(score);
				let hasDecimal = score % 1 !== 0;
				for( let i=0; i < integer; i++){
					result.push(CLS_ON)
				};
				if(hasDecimal){
					result.push(CLS_HALF)
				};
				while(result.length < LENGTH){
					result.push(CLS_OFF)	
				}
				return result;
			}
		}
	};
</script>

<style lang="stylus" rel="stylesheet/stylus">

	@import "../../commom/stylus/mixim.styl"

	.star
		font-size: 0
		.star-item
			display: inline-block
			background-repeat: no-repeat
		&.size-48
			.star-item
				height: 20px
				width: 20px
				background-size: 20px 20px
				margin-right: 20px
				&:last-child
					margin-right: 0
				&.on
					bg-image('star48_on')
				&.half
					bg-image('star48_half')
				&.off
					bg-image('star48_off')		
		&.size-36
			.star-item
				height: 15px
				width: 15px
				background-size: 15px 15px
				margin-right: 6px
				&:last-child
					margin-right: 0
				&.on
					bg-image('star36_on')
				&.half
					bg-image('star36_half')
				&.off
					bg-image('star36_off')					
		&.size-24	
			.star-item
				height: 10px
				width: 10px
				background-size: 10px 10px
				margin-right: 3px
				&:last-child
					margin-right: 0
				&.on
					bg-image('star24_on')
				&.half
					bg-image('star24_half')
				&.off
					bg-image('star24_off')						
</style>