<template>
  <tab-bar>
    <tab-bar-item path="/home">
      <img slot="item-icon" src="~assets/img/PNG/17 Store.png">
      <img slot="item-icon-active" src="~assets/img/PNG/16 Clothes.png">
      <div slot="item-text">首页</div>
    </tab-bar-item >
    <tab-bar-item path="/category">
      <img slot="item-icon" src="~assets/img/PNG/02 Shopping Bag.png">
      <img slot="item-icon-active" src="~assets/img/PNG/04 Costumer Care.png">
      <div slot="item-text">分类</div>
    </tab-bar-item>
    <tab-bar-item path="/cart">
      <img slot="item-icon" src="~assets/img/PNG/03 Trolley.png">
      <img slot="item-icon-active" src="~assets/img/PNG/05 Wallet.png">
      <div slot="item-text">购物车</div>
    </tab-bar-item>
    <tab-bar-item path="/profile">
      <img slot="item-icon" src="~assets/img/PNG/07 Gift.png">
      <img slot="item-icon-active" src="~assets/img/PNG/08 Sales.png">
      <div slot="item-text">我的</div>
    </tab-bar-item>
  </tab-bar>
</template>

<script>
  import TabBar from 'components/common/tabbar/TabBar'
  import TabBarItem from 'components/common/tabbar/TabBarItem'
    export default {
        name: "MainTabBar",
        components: {
          TabBar,
          TabBarItem
        },
    }
</script>

<style scoped>

</style>
