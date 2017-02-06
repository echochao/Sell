<template>
  <div class="shopcart">
    <div class="content">
    	<div class="content-left"  @click="toggleList">
    		<div class="icon-wrapper">
    			<div class="icon" :class="{'highlight': totleCount>0}">
    				<span class="icon-shopping_cart"></span>
    			</div>
          <div class="num" v-show="totleCount>0">{{totleCount}}</div>
    		</div>
    		<div class="price" :class="{'highlight': totleCount>0}">¥{{totlePrice}}</div>
    		<div class="desc">另需配送费¥{{deliveryPrice}}元</div>
    	</div>
    	<div class="content-right">
        <div class="pay" v-if="totlePrice==0">¥{{minPrice}}起送</div>
        <div class="pay" v-if="totlePrice>=minPrice" :class="{'highlight': (totlePrice>=minPrice)}">去结算</div>
        <div class="pay" v-else>还差¥{{minPrice-totlePrice}}起送</div>
      </div>
    </div>
    <transition name="cartshow">
      <div class="shopcart-list" v-show="listShow">
        <div class="list-header">
          <h1 class="title">购物车</h1>
          <span class="clear" @click="clearCart">清空</span>
        </div>
        <div class="list-content" ref="shopcartList">
          <ul>
            <li class="food-item" v-for="food in selectFoods">
              <span class="name">{{food.name}}</span>
              <span class="price">￥{{food.price*food.count}}</span>
              <div class="cartcontrol-wrapper">
                <cartcontrol :food="food" @cartadding="drop" ></cartcontrol>
              </div>
            </li>
          </ul>
        </div> 
      </div>
    </transition>
    <div class="ball-container">
     <transition v-for="ball in balls" name="drop" @before-enter="drop_beforeEnter" @enter="drop_enter" @after-enter=" drop_afterEnter">
      <div class="ball" v-show="ball.show">
        <span class="inner inner-hook"></span> 
      </div>
     </transition>
    </div>
  </div>
</template>
<style lang="stylus">

  @import "../../commom/stylus/mixim.styl";
  
  .cartshow-enter-active, .cartshow-leave-active {
    transition: all 0.5s
  }
  .cartshow-enter, .cartshow-leave-active {
    transform: translate3D(0,100%,0)
  }


  .shopcart
    position: fixed
    bottom: 0
    left: 0
    height: 48px
    width: 100%
    z-index: 30
    .content
      display: flex
      font-size: 0
      color: rgba(255, 255, 255, .4)
      .content-left
        flex: 1
        background: #141d27
        .icon-wrapper
          vertical-align: top
          display: inline-block
          background: #141d27
          height: 56px
          width: 56px
          border-radius: 50%
          position: relative
          top: -10px
          z-index: 100
          margin: 0 12px
          .icon
            height: 44px
            width: 44px
            border-radius: 50%
            background: #2b343c
            margin: 6px
            position: absolute
            text-align: center
            .icon-shopping_cart
              font-size: 24px
              line-height: 44px
            &.highlight
              background: rgb(0, 160, 220)
              color: #fff
          .num
            position: absolute
            top: 0
            right: 0
            width: 24px
            height: 16px
            border-radius: 16px
            font-size: 9px
            font-weight: 400
            line-height: 16px
            text-align: center
            color: #fff
            background: rgb(240, 20, 20)
            box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, .4)       
        .price
          display: inline-block
          line-height: 24px
          vertical-align: top           
          font-size: 16px
          font-weight: 700
          padding-right: 12px
          margin-right: 12px
          margin-top: 12px
          border-right: 1px solid rgba(255,255,255,.1)
          &.highlight
            color: #fff
        .desc
          display: inline-block
          font-size: 12px
          line-height: 48px
      .content-right
        flex: 0 0 105px
        width: 105px
        background: #2b343c
        text-align: center
        .pay
          font-size: 12px
          line-height: 48px
          font-weight: 700
          &.highlight
            color: #fff
            background: #00b43c
    .shopcart-list
      position: fixed
      bottom: 48px
      left: 0
      width: 100%
      z-index: -1
      .list-header
         height: 40px
         line-height: 40px
         background: #f3f5f7
         padding: 0 18px
         font-size: 12px
         border-bottom: 1px solid rgba(7, 17, 27,0.1)
         .title
           display: inline-block
           color: rgb(7, 17, 27)
          .clear
           display: inline-block 
           font-size: 12px
           color: rgb(0, 160, 220)
           position: absolute
           right: 18px
           top:0 
      .list-content
        max-height: 282px
        background: #fff
        overflow: hidden
        .food-item
          height: 48px
          border-1px(rgba(7, 17, 27,0.1))
          margin: 0 18px
          .name
            font-size: 12px
            line-height: 48px
            color: rgb(7, 17, 27)
          .price
            font-size: 10px
            font-weight: 700
            line-height: 48px
            color: rgb(240, 20, 20)
            position: absolute
            right: 90px
            top:0
          .cartcontrol-wrapper
            position: absolute
            right: 0
            top: 6px
    .ball-container
      .ball
        position: fixed
        left: 32px
        bottom: 22px
        z-index: 200
        transition: all .4s cubic-bezier(0.49,-0.29,0.75,0.41)
        .inner
          display: block
          height: 16px
          width: 16px
          border-radius: 50%
          background: rgb(0, 160, 220)
          transition: all .4s linear
                         
</style>

<script>
import BScroll from "better-scroll";
import cartcontrol from "../cartcontrol/cartcontrol";
import Vue from "vue";
export default {
  data() {
    return{
      fold: true,
      balls: [{show:false},{show:false},{show:false},{show:false},{show:false},{show:false},{show:false},{show:false},{show:false},{show:false}],
      dropBalls: []
    }
  },
  props: {
    deliveryPrice: {
      type: Number,
      default: 0
    },
    minPrice: {
      type: Number,
      default: 0
    },
    selectFoods: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  components: {
    cartcontrol
  },
  methods: {
    toggleList(){
      if(this.totleCount){
        this.fold=!this.fold;
      }
    },
    clearCart(){
      this.selectFoods.forEach((food)=>{
        food.count=0;
      })
    },
    drop(el){
     for(let i=0;i<this.balls.length;i++){
      let ball = this.balls[i];
      if(!ball.show){
        ball.show = true;
        ball.el = el;
        this.dropBalls.push(ball);
        //console.log(this.dropBalls);
        return; 
      }
     }
    },
    drop_beforeEnter(el){
      let count = this.balls.length;
      while(count--){
        let ball = this.balls[count];
        if(ball.show){
          let rect = ball.el.getBoundingClientRect();
          let x = rect.left-32;
          let y = rect.top+22-window.innerHeight;
          el.style.display = "";
          el.style.transform = 'translate3d(0,'+y+'px,0)';
          let inner = el.getElementsByClassName('inner-hook')[0];
          inner.style.transform = 'translate3d('+x+'px,0,0)';
        }
      }
    },
    drop_enter(el){
      let rf = el.offsetHeight;//浏览器重绘
      this.$nextTick(()=>{
        el.style.transform = 'translate3d(0,0,0)';
        let inner = el.getElementsByClassName('inner-hook')[0];
        inner.style.transform = 'translate3d(0,0,0)';
      })
    },
    drop_afterEnter(el){
      let ball = this.dropBalls.shift();
      if(ball){
        ball.show = false;
        el.style.display="none";
      }
    }
  },
  computed: {
    totlePrice(){
      let totle=0;
      // for(let i=0;i<this.selectFoods.length;i++){
      //   totle += this.selectFoods[i].price * this.selectFoods[i].count;
      // }
      this.selectFoods.forEach((food)=>{
        totle += food.price * food.count;
      });
      return totle;
    },
    totleCount(){
      let totle=0;
      this.selectFoods.forEach((food)=>{
        totle += food.count;
      });
      return totle;
    },
    listShow(){
      if(!this.totleCount){
        this.fold = true;
        return false;
      }else{
        this.$nextTick(()=>{
          if(!this.cartScroll){
            this.cartScroll = new BScroll(this.$refs.shopcartList,{click:true});
          }else{
            this.cartScroll.refresh();
          }
        });
        return !this.fold;
      }
    }
  }
};
</script>
