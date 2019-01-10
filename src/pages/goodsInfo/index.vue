<template>
  <div class="goodsinfo-container">
    <transition @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
      <div class="ball" v-show="ballFlag" ref="ball"></div>
    </transition>
    <!-- 商品轮播区域 -->
    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <mt-swipe :speed="300" :auto="3000">
            <mt-swipe-item v-for="(item, index) in linbotu" :key="index">
              <img :src="item.src" alt="">
            </mt-swipe-item>
          </mt-swipe>
        </div>
      </div>
    </div>

    <!-- 商品购买区域 -->
    <div class="mui-card">
      <div class="mui-card-header">
        {{ goodsinfo.title }}
      </div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p class="price">
            市场价
            <del>￥{{ goodsinfo.market_price }}</del>
            &nbsp;&nbsp;销售价: 
            <span class="now_price">
              ￥{{goodsinfo.selll_price}}
            </span>
          </p>
          <div class="buy-count">
            购买数量:
            <div class="num-box">
              <!-- || 一般用于默认值的处理 -->
              <!-- && 如果前面的结果为false , 后面的代码就不会执行 -->
              <input 
                :disabled="buyCount <= 1"
                @click="buyCount >1 && buyCount--"
                type="button"
                value="-">
              <input type="text" v-model="butCount">
              <input 
                :disabled="buyCount >= goodsinfo.stock_quantity"
                @click="buycount < goodsinfo.stock_quantity && buyCount++"
                type="button"
                value="+"> 
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>